"use strict";

import alt from "../../alt";
import SocketsActions from "./SocketsActions";

export default class SocketsStore {
  constructor() {
    this.bindActions(SocketsActions);

    this.state = {
      fetching: false,
      data: null
    };
  }

  onRecvNews(data) {
    this.setState({
      fetching: false,
      data
    });
  }

  onSendNews(data) {
    this.setState({
      fetching: true
    });
  }
}

export default alt.createStore(SocketsStore);