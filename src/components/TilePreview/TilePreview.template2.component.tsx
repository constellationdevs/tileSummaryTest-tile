import React, { Component } from "react";
import MetaActionsEnum from "../../models/CDP/MetaAction/MetaAction.enum";
import OpenTileActionModel from "../../models/CDP/MetaAction/OpenTileAction.model";
import ITilePropModel from "../../models/tile/ITileProp.model";
import { ProcessMetaAction } from "../../services/helper.svc";

export default class TilePreviewTemplate2 extends Component<ITilePropModel, any> {
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
  };

  
  renderDetail1 = () => {
    if (this.props.data.Details1 || this.props.data.Details1Icon){
      return (
        <div className="detail">
          { this.props.data.Details1Icon && (
            <div className="detailIcon">
              <img src={this.props.data.Details1Icon} />
            </div>
          )}
          { this.props.data.Details1 &&
            <h3>{this.props.data.Details1}</h3>
          }
        </div>
      )
    } else {
      return <></>;
    }
  }
  
  renderDetail2 = () => {
    if (this.props.data.Details2 || this.props.data.Details2Icon ){
      return (
        <div className="detail">
          {this.props.data.Details2Icon && (
            <div className="detailIcon">
              <img src={this.props.data.Details2Icon} />
            </div>
          )}
          {this.props.data.Details2 && (
            <h4>{this.props.data.Details2}</h4>
          )}
        </div>
      )
    } else {
      return <></>;
    }
  }

  render() {
    const cardStyle = {
      backgroundColor: `${this.props.data.HexColor}`,
    };

  
    

 

    return (
      <div className="cdpTile tileTemplate2">
        <div className={`cdpCard card ${this.props.data.ColorClass}`} style={cardStyle} onClick={() => this.openTile()}>
          <div className="cardHeader">
            <div className="cardTitle">
              <div className="imageContainer">
                <img src={this.props.data.tileIcon} />
              </div>
              <div className="titleContainer">
                <span>{this.props.data.tileTitle}</span>
              </div>
              <div className="openTile">
                <i className="fa fa-2x fa-angle-right"></i>
              </div>
            </div>
            <div className="headerContainer">
              {this.props.data.CallOut !== "" ? <h2>{this.props.data.CallOut}</h2> : <></>}

              {this.renderDetail1()}
              {this.renderDetail2()}
              
            </div>
          </div>          
        </div>
      </div>
    );
  }
}
