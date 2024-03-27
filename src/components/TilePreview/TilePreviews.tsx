import React, { Component } from "react";
import IBaseStateModel from "../../models/CDP/baseStates/IBaseState.model";
import IBasePropsModel from "../../models/CDP/baseProps/IBaseProps.model";
import TilePreviewModel from "../../models/tile/TilePreview.model";
import TilePreviewEnum from "../../models/tile/TilePreview.enum";
import TilePreviewTemplate1 from "../../components/TilePreview/TilePreview.template1.component";
import TilePreviewTemplate2 from "../../components/TilePreview/TilePreview.template2.component";
import TilePreviewTemplate3 from "../../components/TilePreview/TilePreview.template3.component";
import { TileListModel } from "../../pages/Dashboard";

export interface ITilePreviewsProps extends IBasePropsModel {
  componentModel: TileListModel;
  hidden: boolean;
  isLoading: boolean;
}

export interface ITilePreviewsState extends IBaseStateModel {
  componentModel: TileListModel;
  hidePreviews: boolean;
  isLoading: boolean;
}

export default class TilePreviews extends Component<ITilePreviewsProps, ITilePreviewsState> {
  tilePreviews: null;


  constructor(props: ITilePreviewsProps) {
    super(props);
    this.state = {
      componentModel: this.props.componentModel,
      hidePreviews: true,
      isLoading: true
    };
  }

  componentDidUpdate(prevProps: Readonly<ITilePreviewsProps>, prevState: Readonly<ITilePreviewsState>): void {
      if (this.props.componentModel.data !== prevProps.componentModel.data ) {
        this.setState({componentModel: this.props.componentModel,
          isLoading: this.props.isLoading})
      }
  }

  render() {
    if (this.props.hidden) {
        return <></>
    } else {
      if (this.state.isLoading) {
        return (
          <div className="cdpTile tileTemplate1">
            <div className="cdpCardContainer loader">
              <div className="cdpCard card"></div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="cdp_columns">
            <div className="cdp_column">
                {this.props.componentModel.data.map((p: TilePreviewModel) => {
                    return this.renderPreview(p);
                })}
            </div>
            <div className="cdp_column">
              <pre id="json">{JSON.stringify(this.props.componentModel.resp, null, 3)}</pre>
            </div>
          </div>
        );
      }
    }
  }

  renderPreview = (preview: TilePreviewModel) => {
    console.log(preview.previewTemplate);
    switch (preview.previewTemplate) {
      case TilePreviewEnum.Template1:
        console.log("template 1");
        return (
          <TilePreviewTemplate1
            key="tileSummary_small"
            data={preview}
            navigator={this.props.navigator}
          />
        );
      case TilePreviewEnum.Template2:
        return (
          <TilePreviewTemplate2
          key="tileSummary_medium"
            data={preview}
            navigator={this.props.navigator}
          />
        );
      case TilePreviewEnum.Template3:
        return (
          <TilePreviewTemplate3
            key="tileSummary_large"
            data={preview}
            navigator={this.props.navigator}
          />
        );
      default:
        return (
          <TilePreviewTemplate1
            data={preview}
            navigator={this.props.navigator}
          />
        );
    }
  };
}
