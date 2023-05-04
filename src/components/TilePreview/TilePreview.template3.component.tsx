import React, { Component } from "react";
import MetaActionsEnum from "../../models/CDP/MetaAction/MetaAction.enum";
import OpenTileActionModel from "../../models/CDP/MetaAction/OpenTileAction.model";
import ITilePropModel from "../../models/tile/ITileProp.model";
import TileSummaryListItemModel from "../../models/tile/TileSummaryListItem.model";
import { ProcessMetaAction } from "../../services/helper.svc";

export default class TilePreviewTemplate3 extends Component<ITilePropModel, any> {
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
    if (this.props.data.Details1 !== "" || this.props.data.Details1Icon !== "") {
      return (
        <div className="detail">
          {this.props.data.Details1Icon !== "" ? (
            <div className="detailIcon">
              <img src={this.props.data.Details1Icon} />
            </div>
          ) : (
            <></>
          )}
          {this.props.data.Details1 !== "" ? <h3>{this.props.data.Details1}</h3> : <></>}
        </div>
      );
    } else {
      return <></>;
    }
  };

  renderDetail2 = () => {
    if (this.props.data.Details2 !== "" || this.props.data.Details2Icon !== "") {
      return (
        <div className="detail">
          {this.props.data.Details2Icon !== "" ? (
            <div className="detailIcon">
              <img src={this.props.data.Details2Icon} />
            </div>
          ) : (
            <></>
          )}
          {this.props.data.Details2 !== "" ? <h4>{this.props.data.Details2}</h4> : <></>}
        </div>
      );
    } else {
      return <></>;
    }
  };

  renderCardBody = () => {
    if (this.props.data.Transactions.length > 0) {
      return (
        <div className="cardBody">
          <div className="cardList">
            {this.props.data.Transactions.map((row: TileSummaryListItemModel, idx: number) => {
              return this.renderRow(row, idx);
            })}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  renderListCallouts = (row: TileSummaryListItemModel) => {
    const showCallout1 = row.CallOut1 !== "" || row.CallOut1Icon !== "";
    const showCallout2 = row.CallOut2 !== "" || row.CallOut2Icon !== "";

    const callout1Icon = row.CallOut1Icon ? (      
        <img className="calloutImg" src={row.CallOut1Icon} />      
    ) : (
      <></>
    );
    const callout1Text = row.CallOut1 !== "" ? <span className="calloutText">{row.CallOut1}</span> : <></>;

    const callout1 = showCallout1 ? (
      <div className="callout">
        {callout1Icon}
        {callout1Text}
      </div>
    ) : (
      <></>
    );

    const callout2Icon = row.CallOut2Icon ? (
      <img className="calloutImg" src={row.CallOut2Icon} />
    ) : (
      <></>
    );
    const callout2Text = row.CallOut2 !== "" ? <span className="calloutText">{row.CallOut2}</span> : <></>;

    const callout2 = showCallout2 ? (
      <div className="callout">
        {callout2Icon}
        {callout2Text}
      </div>
    ) : (
      <></>
    );

    if (showCallout1 || showCallout2) {
      return (
        <div className="listCallouts">
          {callout1}
          {callout2}
        </div>
      );
    } else {
      return <></>;
    }
  };

  renderRow = (row: TileSummaryListItemModel, idx: number) => {
    const img1 =
      row.Image1 !== "" ? (
        <div className="listImage">
          <img src={row.Image1} />
        </div>
      ) : (
        <></>
      );

    const main = (
      <div className="listMain">
        {row.Title !== "" ? <span className="listItem-title">{row.Title}</span> : <></>}
        {row.Detail !== "" ? <span className="listItem-subtitle">{row.Detail}</span> : <></>}
      </div>
    );

    const img2 =
      row.Image2 !== "" ? (
        <div className="listImage">
          <img src={row.Image2} />
        </div>
      ) : (
        <></>
      );


    return (
      <div className="cardListItem" key={`item${idx}`}>
        {img1}
        {main}
        {img2}
        {this.renderListCallouts(row)}
      </div>
    );
  };

  render() {
    const cardStyle = {
      backgroundColor: `${this.props.data.HexColor}`,
    };

    return (
      <div className="cdpTile tileTemplate3">
        <div className={`cdpCard card ${this.props.data.ColorClass}`} style={cardStyle}>
          <div className="cardHeader" onClick={() => this.openTile()}>
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
            <div className={"headerContainer"}>
              {this.props.data.CallOut !== "" ? <h2>{this.props.data.CallOut}</h2> : <></>}

              {this.renderDetail1()}
              {this.renderDetail2()}
            </div>
          </div>

          {this.renderCardBody()}
        </div>
      </div>
    );
  }
}
