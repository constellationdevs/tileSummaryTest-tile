import ContainerResponse from "../CDP/ContainerResponse.model";
import TileModel from "./Tile.model";
import TileColorModel from "./TileColor.model";
import TilePreviewEnum from "./TilePreview.enum";
import TileSummaryListItemModel from "./TileSummaryListItem.model";

export default class TileSummaryModel {
  BackgroundColor: TileColorModel;
  CallOut: string;
  Details1: string;
  Details1Icon: string;
  Details2: string;  
  Details2Icon: string;
  Image: string;
  PreviewDefault: string;
  PreviewTypes: string[];
  TileData: any;
  Transactions: TileSummaryListItemModel[];
}
