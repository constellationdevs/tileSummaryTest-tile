import TileModel from "./Tile.model";
import TileColorModel from "./TileColor.model";
import TilePreviewEnum from "./TilePreview.enum";
import TileSummaryModel from "./TileSummary.model";
import TileSummaryListItemModel from "./TileSummaryListItem.model";
export default class TilePreviewModel {
  // from TileSummary connector call
  PreviewTypes: string[];
  PreviewDefault: string;
  TileData: any;
  // BackgroundColor: TileColorModel;
  CallOut: string;
  Details1: string;
  Details1Icon: string;
  Details2: string;
  Details2Icon: string;
  Image: string;
  Transactions: TileSummaryListItemModel[];

  // from container tile
  tileIcon: string;
  tileTitle: string;
  tileCode: string;
  tileVersion: string;
  connectorName: string;
  connectorVersion: string;
  hasTileSummaryMethod: boolean;

  // this decides the preview to render
  previewTemplate: TilePreviewEnum;

  // custom fields
  HexColor: string;
  ColorClass: string;

  constructor(memberTile: TileModel, tileSummary: TileSummaryModel | null) {

    this.PreviewTypes = [];

    // add fields from tile
    this.tileTitle = memberTile.tileTitle;
    this.tileCode = memberTile.tileCode;
    this.tileVersion = memberTile.tileVersion;
    this.connectorName = memberTile.connectorName;
    this.connectorVersion = memberTile.connectorVersion;
    this.hasTileSummaryMethod = memberTile.hasTileSummaryMethod;
    this.tileIcon = memberTile.tileIcon;
    this.TileData = {};
    // set the tile preview
    // start with default
    this.previewTemplate = TilePreviewEnum.Template1;
   
    // default css to member/cu color
    this.ColorClass = memberTile.tileColorCss;

    if (tileSummary !== null) {

      this.PreviewTypes = this.formatPreviewTypes(tileSummary.PreviewTypes);
      this.PreviewDefault = this.formatDefaultPreview(tileSummary.PreviewDefault);
      this.TileData = tileSummary.TileData !== undefined && tileSummary.TileData !== "" ? tileSummary.TileData : {};
      // this.BackgroundColor = tileSummary.BackgroundColor;
      this.CallOut = tileSummary.CallOut;
      this.Details1 = tileSummary.Details1;
      this.Details1Icon = tileSummary.Details1Icon;      
      this.Details2 = tileSummary.Details2;
      this.Details2Icon = tileSummary.Details2Icon;      
      this.Image = tileSummary.Image;
      this.Transactions = tileSummary.Transactions;


      this.HexColor = "";
      this.ColorClass = memberTile.tileColorCss;

      if (memberTile.overrideTileCss === false) {
        if (tileSummary.BackgroundColor !== undefined) {
          if (tileSummary.BackgroundColor.HexColor !== undefined && tileSummary.BackgroundColor.HexColor !== "") {
            this.HexColor = tileSummary.BackgroundColor.HexColor;
          }
          if (tileSummary.BackgroundColor.CDPClass !== undefined && tileSummary.BackgroundColor.CDPClass !== "") {
            this.ColorClass = tileSummary.BackgroundColor.CDPClass;
          }
        }
      }

      if ((memberTile.memberSelectedPreviewTemplate !== TilePreviewEnum.Template1) && this.PreviewTypes.indexOf(TilePreviewEnum[memberTile.memberSelectedPreviewTemplate].toString()) !== -1) {
        this.previewTemplate = memberTile.memberSelectedPreviewTemplate;
      }
     
    }
  }

  formatPreviewTypes = (tsTypes: string[]):string[] => {
    const previewTypes: string[] =[];
   

    tsTypes.forEach((type: string)=>{
      
      if (['icon', 'template1'].includes(type.toLowerCase())){
        previewTypes.push("Template1");
      }
      if (['summary', 'template2'].includes(type.toLowerCase())){
        previewTypes.push("Template2");
      }
      if (['summarylist', 'template3'].includes(type.toLowerCase())){
        previewTypes.push("Template3");
      }
      
    })

    return previewTypes;
  }

  formatDefaultPreview = (type: string):string => {
    let preview = 'Template1';
   
      
      if (['icon', 'template1'].includes(type.toLowerCase())){
        preview ="Template1";
      }
      if (['summary', 'template2'].includes(type.toLowerCase())){
        preview = "Template2";
      }
      if (['summarylist', 'template3'].includes(type.toLowerCase())){
        preview = "Template3";
      }
      
    

    return preview;
  }

}
