"use strict";

import React from "react";
import {Router, Route} from "react-router";
import HomeView from "./home/HomeView";

const router = (
  <Router>
    <Route path="/" component={HomeView}/>
  </Router>
);

export default router;