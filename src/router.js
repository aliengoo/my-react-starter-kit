"use strict";

import React from "react";
import {Router, Route} from "react-router";
import HomeView from "./home/HomeView";
import SocketsView from "./sockets/SocketsView";

const router = (
  <Router>
    <Route path="/" component={HomeView}/>
    <Route path="/sockets" component={SocketsView}/>
  </Router>
);

export default router;