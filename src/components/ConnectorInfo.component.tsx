import React, { Component } from "react";
import { Button, Input, List, ListItem } from "react-onsenui";
import _ from "lodash";
import BaseState from "../models/CDP/baseStates/IBaseState.model";
import IBasePropsModel from "../models/CDP/baseProps/IBaseProps.model";
import { ProcessCDPComponent } from "../services/helper.svc";
import { handleKeyPress } from "../services/accessibility.svc";
import ConnectorInfoModel from "../models/CDP/ConnectorInfo.model";

export interface IConnectorInfoProps extends IBasePropsModel {
  componentModel: ConnectorInfoModel;
  isLoading: boolean;
}
export interface IConnectorInfoState extends BaseState {
  componentModel: ConnectorInfoModel;
  isLoading: boolean;
}

class ConnectorInfo extends Component<IConnectorInfoProps, IConnectorInfoState> {
  connectorInfoModel: ConnectorInfoModel;

  // component structure
  render() {
    const connectorInfoModel = this.props.componentModel;

      return (
        <>
          <h2>Enter tile summary connector call info</h2>
          <h2>(Make sure this tile has permission to call your connector)</h2>
          {this.renderForm(connectorInfoModel)}
        </>
      );
  }

  renderForm = (model: ConnectorInfoModel) => {
    return (
      <List className="form-list">
        <ListItem>
            <Input placeholder="Connector Name" name="connectorName" id="name" onChange={this.props.methods.handleInputChange} value={model.connectorName}></Input>
          </ListItem>
          <ListItem>
            <Input placeholder="Connector Version" name="connectorVersion" id="version" onChange={this.props.methods.handleInputChange} value={model.connectorVersion}></Input>
          </ListItem>
          <ListItem>
            <Input placeholder="Connector Method" name="connectorMethod" id="method" onChange={this.props.methods.handleInputChange} value={model.connectorMethod}></Input>
          </ListItem>
          <ListItem>
            <Button
              // @ts-ignore
              role="button"
              onKeyDown={handleKeyPress}
              tabIndex={0}
              key="button"
              className="primaryBtn"
              modifier="large"
              onClick={this.props.methods.handleSubmit}
            >
              Retrieve Tile Summary
            </Button>
          </ListItem>
        </List>
    )
  }
  // process the CDP component model
  componentInit = () => {
    const promise = new Promise<void>((resolve, reject) => {
      ProcessCDPComponent(this.props.componentModel).then(
        (data) => {
          this.connectorInfoModel = data;
          this.setState({ isLoading: false });
          resolve();
        },
        () => {
          console.log("ConnectorInfo Error");
          reject();
        }
      );
    });
    return promise;
  };
}

export default ConnectorInfo;
