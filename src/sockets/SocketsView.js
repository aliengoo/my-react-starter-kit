"use strict";

import React, {Component, PropTypes} from "react";
import SocketsActions from "./data/SocketsActions";
import SocketsStore from "./data/SocketsStore";
import socket from "../socket";

export default class SocketsView extends Component {
  constructor(props) {
    super(props);
    this.state = SocketsStore.getState();
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    SocketsStore.listen(this.onChange);
    socket.on('news', (data) => {
      console.log(data);
      SocketsActions.recvNews(data);
    });
  }

  componentWillUnmount() {
    SocketsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  onClick() {
    SocketsActions.sendNews("Hello, Web Sockets!");
  }

  render() {
    return (
      <div className="ui-container">
        <button onClick={this.onClick} type="button" className="ui button primary">Send message to server</button>
        <div>{JSON.stringify(this.state.data, null, 2)}</div>
      </div>
    );
  }
}