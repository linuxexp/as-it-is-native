/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Home from "./screens/Home";
import Auth from "./screens/Auth";
import Chapters from "./screens/Chapters";
import Chapter from "./screens/Chapter";
import Verse from "./screens/Verse";

import { NativeRouter, Link } from 'react-router-native'
import { Card, Navigation } from 'react-router-navigation'

import DgNavBar from "./components/DgNavBar";

import ConfigManager from "./services/ConfigManager";

import {
    AsyncStorage
} from "react-native";

const NavBar = () => {
    return (
        <DgNavBar/>
    )
};

export default class App extends Component {

  styles = {
    bar: {
        backgroundColor: "transparent"
    }
  };

  state = {
      title: {
          header: "DataGrid",
          subText: "As it is"
      }
  };

  setNavTitle = (header, sub) => {
    this.setState({
        title: {
            header: header,
            subText: sub
        },
        stickyNodes: []
    });
  };

  setStickyNodes = (nodes) => {
      this.setState({
            stickyNodes: nodes
      });
  };

  render() {

      /*ConfigManager.markAsRead({id: "la-la"})
          .then(function(r) {
             ConfigManager.device.getConfig()
                 .then(function(k) {
                    console.warn("manager ", k);
                 });
          });*/

      // ConfigManager.clearConfig();

    return (
        <NativeRouter>
            <Navigation
                renderNavBar={() => <DgNavBar title={this.state.title} stickyNodes={this.state.stickyNodes} />}
                style={this.styles.bar}>
                <Card
                    exact
                    path="/"
                    component={(props) => {
                           return (<Chapters setTitle={this.setNavTitle.bind(this)} {...props} />);
                        }
                    }
                    backButtonTitle="Chapters"
                    title="As it is"
                />
                <Card
                    exact
                    path="/chapter/:cid"
                    component={(props) => {
                        return (<Chapter setTitle={this.setNavTitle.bind(this)} {...props} />);
                    }}
                    title="Chapter view"
                />
                <Card
                    exact
                    path="/chapter/:cid/verse/:vid"
                    component={(props) => <Verse setStickyNodes={this.setStickyNodes.bind(this)} {...props} />}
                    title="verse view"
                />
            </Navigation>
        </NativeRouter>
    );
  }
}