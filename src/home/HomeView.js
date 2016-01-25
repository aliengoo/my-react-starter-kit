/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";

export default class HomeView extends Component {
  render() {
    return (
      <div className="ui container">
        <header>
          <h1>
            Home
          </h1>
        </header>
      </div>
    );
  }
}

HomeView.defaultProps = {};

HomeView.propTypes = {};