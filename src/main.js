/* @flow */
"use strict";

global.jQuery = require('jquery');
global.$ = global.jQuery;
global.semantic = require("../node_modules/semantic-ui/dist/semantic.min.js");

import React from "react";
import ReactDOM from "react-dom";

import router from "./router";

ReactDOM.render(router, document.getElementById("react-container"));