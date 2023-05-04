import ContainerResponseModel from "../models/CDP/ContainerResponse.model";
import ContainerTileModel from "../models/CDP/ContainerTile.model";
import MemberTileModel from "../models/tile/MemberTile.model";
import TileModel from "../models/tile/Tile.model";
import TileSummaryModel from "../models/tile/TileSummary.model";
import TileSummaryData from "../models/tile/TileSummaryData.model";
import container, { tile } from "./container.svc";

export function SaveTiles(tiles: any[]): Promise<boolean> {
  console.info("TILE - Save All", tiles);
  return new Promise((resolve, reject) => {
    const p = {
      config: tiles,
    };


    const params = {
      config: JSON.stringify(p)
    }

    container.connectors.sendRequest(tile.tileConfig.config.homeScreenConnector.name, tile.tileConfig.config.homeScreenConnector.version, "MemberTilesUpdate", params, function (response: ContainerResponseModel) {
      if (response.success) {
        resolve(response.data.success);
      } else {
        resolve(false);
      }
    });
  });
}




export function MergeTiles(memberTiles: MemberTileModel[], containerTiles: ContainerTileModel[]): TileModel[] {
    const tiles: TileModel[] =[];

    memberTiles.forEach((t: MemberTileModel, idx: number)=>{
      
        // find the container match
        const match = containerTiles.find((c: ContainerTileModel)=> c.TileCode.toUpperCase() === t.tileCode.toUpperCase() && c.TileVersion === t.tileVersion);
        
        if (match){
            const tile = new TileModel(t, match);
            tiles.push(tile);
        }


    });


    return tiles;
} 


// store individual tile's tileSummary on the tile object so we don't have to fetch it again when 
// masonry rerenders the preview (on window resize)
export function storeTileSummary(tileCode: string, tileVersion: string, data: TileSummaryModel) {


  const ts: TileSummaryData[] = tile.tileSummaryData;

  const match =  ts.find((t: TileSummaryData)=> t.tileCode.toLowerCase() === tileCode.toLowerCase() && t.tileVersion === tileVersion);


  if (match === undefined) {
    if (tile.tileSummaryData === undefined) {
         tile.tileSummaryData = [];
    }  

    const ts = new TileSummaryData();
    ts.tileCode = tileCode;
    ts.tileVersion = tileVersion;
    ts.data = data;
    tile.tileSummaryData.push(ts)
  }
}

// find the tile's tileSummary data
export function getStoredTileSummary(tileCode: string, tileVersion: string): TileSummaryModel|undefined {

  const ts: TileSummaryData[] = tile.tileSummaryData;

  const match =  ts.find((t: TileSummaryData)=> t.tileCode.toLowerCase() === tileCode.toLowerCase() && t.tileVersion === tileVersion);

  if (match){
    return match.data; 
  } else {
    return undefined;
  }
  

}