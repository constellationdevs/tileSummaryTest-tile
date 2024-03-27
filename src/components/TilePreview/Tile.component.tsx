import React, { Component } from "react";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import ContainerResponseModel from "../../models/CDP/ContainerResponse.model";
import TileModel from "../../models/tile/Tile.model";
import TilePreviewEnum from "../../models/tile/TilePreview.enum";
import TilePreviewModel from "../../models/tile/TilePreview.model";
import container from "../../services/container.svc";
import TilePreviewTemplate3 from "./TilePreview.template3.component";
import TilePreviewTemplate2 from "./TilePreview.template2.component";
import TileSummaryModel from "../../models/tile/TileSummary.model";
import TilePreviewTemplate1 from "./TilePreview.template1.component";
import { getStoredTileSummary, storeTileSummary } from "../../services/tile.svc";

export interface ITileProp extends IBasePropsModel {
  data: TileModel;  
  tileSummaryLoaded: any;
}

export interface ITileState {
  isLoading: boolean;
}

export default class TileComponent extends Component<ITileProp, ITileState> {
  TileData: TilePreviewModel;

  public constructor(props: ITileProp) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {
      this.componentInit();
    }
  }

  // componentWillUnmount(): void {
  //   console.log("unmount", this.props.data.tileCode);
  // }

  componentInit = () => {
    // check for a tile summary connector

    if (this.props.data.hasTileSummaryMethod) {
      const findTileSummary = getStoredTileSummary(this.props.data.tileCode, this.props.data.tileVersion);

      if (findTileSummary === undefined) {
        this.getTileSummary().then(
          (x: TileSummaryModel) => {
            // save data to tile object so we don't fetch again on mason rerender
            storeTileSummary(this.props.data.tileCode, this.props.data.tileVersion, x);

            if (x === undefined) {
              this.TileData = new TilePreviewModel(this.props.data, null);
              this.setState({ isLoading: false });
            } else {
              this.TileData = new TilePreviewModel(this.props.data, x);

              this.props.tileSummaryLoaded(this.TileData);
              this.setState({ isLoading: false });
            }
          },
          (x: any) => {
            console.error("Failed TS: " + JSON.stringify(x) + " TILE:"  + JSON.stringify(this.props.data));

            this.TileData = new TilePreviewModel(this.props.data, null);

            this.setState({ isLoading: false });
          }
        );
      } else {
        // use existing data
        if (findTileSummary === undefined) {
          this.TileData = new TilePreviewModel(this.props.data, null);
          this.setState({ isLoading: false });
        } else {
          this.TileData = new TilePreviewModel(this.props.data, findTileSummary);

          this.props.tileSummaryLoaded(this.TileData);
          this.setState({ isLoading: false });
        }
      }
    } else {
      this.TileData = new TilePreviewModel(this.props.data, null);
      this.setState({ isLoading: false });
    }
  };

  getTileSummary = (): Promise<TileSummaryModel> => {
    return new Promise<any>((resolve, reject) => {
      container.connectors.sendRequest(this.props.data.connectorName, this.props.data.connectorVersion, "tileSummary", {}, (resp: ContainerResponseModel) => {
        console.log(resp)
        if (resp.success) {
          const ts: TileSummaryModel = resp.data;
          resolve(ts);
        } else {
          console.error("Failed to get TS");
          reject("");
        }
      });
    });
  };

  renderTile = () => {
    
    switch (this.TileData.previewTemplate) {
      case TilePreviewEnum.Template1:
        return <TilePreviewTemplate1 key={`tilePreviewsmall1${this.TileData.tileCode}${this.TileData.tileVersion}`} data={this.TileData} navigator={this.props.navigator}></TilePreviewTemplate1>;
      case TilePreviewEnum.Template2:
        return <TilePreviewTemplate2 key={`tilePreviewMed1${this.TileData.tileCode}${this.TileData.tileVersion}`} data={this.TileData} navigator={this.props.navigator}></TilePreviewTemplate2>;
      case TilePreviewEnum.Template3:
        return <TilePreviewTemplate3 key={`tilePreviewLarge1${this.TileData.tileCode}${this.TileData.tileVersion}`} data={this.TileData} navigator={this.props.navigator}></TilePreviewTemplate3>;
      default:
        return <TilePreviewTemplate1 key={`tilePreviewsmall1${this.TileData.tileCode}${this.TileData.tileVersion}`} data={this.TileData} navigator={this.props.navigator}></TilePreviewTemplate1>;
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="cdpTile tileTemplate1">
          <div className="cdpCardContainer loader">
            <div className="cdpCard card"></div>
          </div>
        </div>
      );
    } else {
      return this.renderTile();
    }
  }
}
