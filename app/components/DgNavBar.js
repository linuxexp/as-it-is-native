import React, {Component} from "react";

import {
    Container, Header, Left, Body,
    Right, Button, Icon, Title,
    Subtitle, Item, Input, Text
} from 'native-base';

export default class DgNavBar extends Component {

    state = {
        toolBar: true
    };

    style = {
        button: {
            color: "#ffffff"
        }
    };

    update = () => this.setState({toolBar: !this.state.toolBar});


    toolBar = () => {

        const subText = (title) => {
          if (title.subText) {
            return (
              <Subtitle>
                  {title.subText}
              </Subtitle>
            );
          }
          return;
        };

        const toolBar = () => {
            return (
                <Header style={{backgroundColor: "#FF4500"}} searchBar>
                    <Left>
                        <Button transparent>
                            <Icon style={this.style.button} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>
                        {this.props.title ? this.props.title.header: ""}
                    </Title>
                    {subText(this.props.title)}
                    </Body>
                    <Right>
                        <Button onPress={this.update.bind(this)} transparent>
                            <Icon style={this.style.button} name='search' />
                        </Button>
                    </Right>
                </Header>
            );
        };

        const searchBar = () => {
            return (
                <Header searchBar>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
            );
        };

        return (this.state.toolBar ? toolBar() : searchBar());
    };


    render() {
        return this.toolBar();
    }
}