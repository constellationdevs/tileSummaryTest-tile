import React, { Component } from "react";
import { Icon, Modal, Button } from "react-onsenui";
import IBaseStateModel from "../../models/CDP/baseStates/IBaseState.model";
import ContainerResponse from "../../models/CDP/ContainerResponse.model";
import { hideModal } from "../../services/helper.svc";

export class ErrorModalModel {
  componentModel: ContainerResponse;
}
class ErrorModal extends Component<ErrorModalModel, IBaseStateModel> {

  onClickClose() {
    hideModal("ErrorModal");
  }

  render() {
    return (
      <Modal key="ErrorModal" id="ErrorModal">
        <div id="errorModalContainer">
          <Button
            className="closeBtn button"
            onClick={() => hideModal("ErrorModal")}
          >
            <Icon
              size={{default: 30}}
              icon={{default: 'fa-close'}}
            />
          </Button>
          {
            this.props.componentModel !== undefined ?
            <>
              <div>{this.props.componentModel.message}</div>
              <div>Request Path: {this.props.componentModel.data.request.connectorName}/{this.props.componentModel.data.request.connectorVersion}/{this.props.componentModel.data.request.connectorMethod}</div>
              <h3>Response Data: </h3>
              <pre id="json">{JSON.stringify(this.props.componentModel.data.data, null, 3)}</pre>
            </>
            : <div> Could not parse data object or no data was returned. Please check connector logs.</div>
          }
        </div>
      </Modal>
    );
  }
}

export default ErrorModal;
