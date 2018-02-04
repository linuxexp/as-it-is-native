import React, {Component} from "react";

import BookStore from "../services/BookStore";

import {
    Alert
} from "react-native";

import {
    Container, Header, Content,
    List, ListItem, Text
} from 'native-base';

export default class Chapter extends Component {

    styles = {
      textNode: {
          padding: 15
      }
    };

    render() {

        const vid = parseInt(this.props.match.params.vid);
        const cid = parseInt(this.props.match.params.cid);

        const verse = BookStore.getVerse(BookStore.getChapter(BookStore.getBook(), cid), vid);

        const purportToText = (purport) => {
            return purport.map((node, index) => <Text key={index} style={this.styles.textNode}>{node}</Text>);
        };

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Text>
                                {verse.content.en}
                            </Text>
                        </ListItem>
                    </List>
                    <Text style={this.styles.textNode}>
                        Sanksrit node will come here
                    </Text>
                    {purportToText(verse.purport)}
                </Content>
            </Container>
        );
    }
}