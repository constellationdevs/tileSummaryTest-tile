import IBasePropsModel from "../CDP/baseProps/IBaseProps.model";
import TilePreviewModel from "./TilePreview.model";

export default interface ITilePropModel extends IBasePropsModel {
    data: TilePreviewModel;
  }