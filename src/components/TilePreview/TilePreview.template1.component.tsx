import React from "react";
import { Component } from "react";
import MetaActionsEnum from "../../models/CDP/MetaAction/MetaAction.enum";
import OpenTileActionModel from "../../models/CDP/MetaAction/OpenTileAction.model";
import ITilePropModel from "../../models/tile/ITileProp.model";
import { ProcessMetaAction } from "../../services/helper.svc";

/* card small long preview - idea from launch includes a watermark for tile icon */
/* Not currently used  small.temlate3 is the active small preview */

export default class TilePreviewTemplate1 extends Component<ITilePropModel, any> {
  constructor(props: ITilePropModel) {
    super(props);
  }

  openTile = () => {
    const open = new OpenTileActionModel();
    open.actionType = MetaActionsEnum.OpenTile;
    open.tileCode = this.props.data.tileCode;
    open.tileVersion = this.props.data.tileVersion;
    if (Object.keys(this.props.data.TileData).length !== 0 ) {
      open.openData = this.props.data.TileData;
    }
    ProcessMetaAction(open, this.props.navigator);
  }

  render() {
    console.log("TilePreviewTemplate 1")
    const headerStyle = {
      background: `url(${this.props.data.tileIcon}) 50% / 50% auto no-repeat`,
    };
    const cardStyle = {
      backgroundColor: `${this.props.data.HexColor}`,
    };
    console.log(this.props)
    const tilePreview = this.props.data;
    // TODO make a shareable card Title component
    return (
      <div className="cdpTile tileTemplate1">
        <div className={`cdpCard card ${tilePreview.ColorClass}`} style={cardStyle} onClick={() => this.openTile()}>
          <div className="cardHeader">
            <div className="cardTitle">
              <div className="imageContainer">
                <img src={tilePreview.tileIcon} />
              </div>
              <div className="titleContainer">
                <span>{this.props.data.tileTitle}</span>
              </div>
              <div className="openTile">
              <i className="fa fa-2x fa-angle-right"></i>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
