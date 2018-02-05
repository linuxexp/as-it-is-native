import React, {Component} from "react";

import BookStore from "../services/BookStore";

import {
    Alert
} from "react-native";

import {
    Container, Header, Content,
    List, ListItem, Text
} from 'native-base';

import Utils from "../services/Utils";

export default class Chapter extends Component {

    styles = {
      textNode: {
          padding: 15
      },
      sansNode: {
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10
      }
    };

    render() {

        const vid = parseInt(this.props.match.params.vid);
        const cid = parseInt(this.props.match.params.cid);

        const verse = BookStore.getVerse(BookStore.getChapter(BookStore.getBook(), cid), vid);

        const purportToText = (purport) => {
            return purport.map((node, index) => <Text key={index} style={this.styles.textNode}>{node}</Text>);
        };

        const sansNodes = verse.content.sans.map((sz) => Utils.buildFromAnnotated(sz, verse.synonyms));
        // const sanNodeToText = (nodes) => nodes.map((sN, index) => <Text key={index} style={this.styles.sansNode}>{sN}</Text>);

        if (this.props.setStickyNodes) {
            this.props.setStickyNodes(sansNodes);
        }

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
                    {purportToText(verse.purport)}
                </Content>
            </Container>
        );
    }
}