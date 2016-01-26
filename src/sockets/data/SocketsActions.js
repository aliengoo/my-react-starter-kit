"use strict";

import alt from "../../alt";
// get the current socket instance
import socket from "../../socket";

export default class SocketsActions {
  // called when the client receives data from the server
  recvNews(data) {
    return data;
  }

  // called when the client sends data to the server
  sendNews(data) {
    socket.emit("news", data);
    return true;
  }
}

export default alt.createActions(SocketsActions);

