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

  render() {
    return (
        <NativeRouter>
            <Navigation
                renderNavBar={NavBar}
                style={this.styles.bar}>
                <Card
                    exact
                    path="/"
                    component={Chapters}
                    backButtonTitle="Chapters"
                />
                <Card
                    exact
                    path="/chapter/:cid"
                    component={Chapter}
                />
                <Card
                    exact
                    path="/chapter/:cid/verse/:vid"
                    component={Verse}
                />
            </Navigation>
        </NativeRouter>
    );
  }
}