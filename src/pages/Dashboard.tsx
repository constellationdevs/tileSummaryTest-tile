import React, { Component, createRef } from "react";
import IBasePropsModel from "../models/CDP/baseProps/IBaseProps.model";
import { Page } from "react-onsenui";
import {
  isNativeApp,
  showModal,
} from "../services/helper.svc";
import { container, tile } from "../services/container.svc";
import LandingPageModel from "../models/CDP/LandingPage.model";
import ConnectorInfo from "../components/ConnectorInfo.component";
import ConnectorInfoModel from "../models/CDP/ConnectorInfo.model";
import TilePreviewModel from "../models/tile/TilePreview.model";
import TileSummaryModel from "../models/tile/TileSummary.model";
import ContainerResponseModel from "../models/CDP/ContainerResponse.model";
import _ from "lodash";
import TilePreviews from "../components/TilePreview/TilePreviews";
import TileModel from "../models/tile/Tile.model";
import MemberTileModel from "../models/tile/MemberTile.model";
import ContainerTileModel from "../models/CDP/ContainerTile.model";
import ErrorModal, { ErrorModalModel } from "./CDP/ErrorModal";
import IBaseStateModel from "../models/CDP/baseStates/IBaseState.model";
import he from "he";

export interface IDashboardProps extends IBasePropsModel {
  componentModel: LandingPageModel;
}

export interface IDashboardState extends IBaseStateModel {
  ConnectorInfoModel: ConnectorInfoModel;
  TilePreviewList: TileListModel;
  ErrorModalData: ErrorModalModel;
  showPreviews: boolean;
  isLoading: boolean;
  loadingPreviews: boolean;
}

export class TileListModel {
  data: TilePreviewModel[];
  resp: TileSummaryModel;
}

class Dashboard extends Component<IDashboardProps, IDashboardState> {
  pageClass: string = "desktop";
  pageContainer: any = createRef();

  constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      componentModel: this.props.componentModel,
      ConnectorInfoModel: new ConnectorInfoModel(),
      TilePreviewList: new TileListModel(),
      ErrorModalData: new ErrorModalModel(),
      showPreviews: false,
      isLoading: true,
      loadingPreviews: true
    };
  }

  render() {
    const methods = {
      handleSubmit: this.onClickSubmit,
      handleInputChange: this.handleInputChange,
    };

    return (
      <Page key="dashboard" id="dashboard" className={this.pageClass}>
        <div className="cdp_page_container" ref={this.pageContainer}>
          <div className="cdp_hero">
            <ConnectorInfo componentModel={this.state.ConnectorInfoModel} isLoading={this.state.isLoading} methods={methods} navigator={this.props.navigator}></ConnectorInfo>
          </div>
          <div className="cdp_list_container">
            <TilePreviews componentModel={this.state.TilePreviewList} hidden={!this.state.showPreviews} isLoading={this.state.loadingPreviews} navigator={this.props.navigator}/>
          </div>
        </div>
        <ErrorModal componentModel={this.state.ErrorModalData.componentModel}/>
      </Page>
    );
  }

  componentDidMount() {
    if (isNativeApp()) {
      this.pageClass = "native";
    }
  }

  getTileSummary = (): Promise<TileSummaryModel | ErrorModalModel> => {
    return new Promise<any>((resolve, reject) => {
      console.log(this.state.ConnectorInfoModel)
      container.connectors.sendRequest(
        this.state.ConnectorInfoModel.connectorName,
        this.state.ConnectorInfoModel.connectorVersion,
        "tileSummary",
        {},
        (resp: ContainerResponseModel) => {
          const results = JSON.parse(he.decode(JSON.stringify(resp)));
          console.log(results)
          if (results.success) {
            const ts: TileSummaryModel = results.data;
            resolve(ts);
          } else {
            
            results.message = "Something went wrong with the connector request."
            results.data = {
              data: resp.data, 
              request: {
                connectorName: this.state.ConnectorInfoModel.connectorName,
                connectorVersion: this.state.ConnectorInfoModel.connectorVersion,
                connectorMethod: this.state.ConnectorInfoModel.connectorMethod
              }}
            
            const errResp = {componentModel: resp};
            console.error("Failed to get TS");
            reject(errResp);
          }
        }
      );
    });
  };

  handleInputChange = (event: any) => {
    event.preventDefault;
    const newCIM = _.cloneDeep(this.state.ConnectorInfoModel);
    newCIM[event.target.name] = event.target.value;
    this.setState({ConnectorInfoModel: newCIM})
  }

  onClickSubmit = (event: any) => {
    event.preventDefault();
    container.tile.ui.showSpinner("Getting tilesummary...");
    this.setState({showPreviews: true})
    this.getTileSummary().then(
      (resp: TileSummaryModel) => {
        console.log(resp);

        // clear form
        // this.setState({ConnectorInfoModel: new ConnectorInfoModel()})
        // create list of tile previews and save to some state variable
        const tileList = resp.PreviewTypes.map((type: string) => {
          console.log(type);
          const memberTile: MemberTileModel = tile.mockMemberTile;
          const containerTile: ContainerTileModel = tile.mockContainerTile;
          const tileModel = new TileModel(memberTile, containerTile);
          switch (type) {
            case "Icon":
              tileModel.memberSelectedPreviewTemplate = 1;
              break;
            case "Summary":
              tileModel.memberSelectedPreviewTemplate = 2;
              break;
            case "SummaryList":
              tileModel.memberSelectedPreviewTemplate = 3;
              break;
            default:
              tileModel.memberSelectedPreviewTemplate = 1;
              break;
          }

          return new TilePreviewModel(tileModel, resp);
        });
        tileList.sort((ta, tb) => ta.previewTemplate - tb.previewTemplate)
        console.log(tileList)
        this.setState({
          TilePreviewList: { data: tileList, resp: resp },
          loadingPreviews: false,
        });
      },
      (error: ErrorModalModel) => {
        console.log(error);
        container.tile.ui.hideSpinner();
        this.setState({
          showPreviews: false,
          ErrorModalData: error
        });
        showModal("ErrorModal")
      });
  };
}

export default Dashboard;
