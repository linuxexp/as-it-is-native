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

    takeToVerse = (chapter, verse) => {
        this.props.history.push("/chapter/:cid/verse/:vid".replace(":cid", chapter.index)
            .replace(":vid", verse.index));
    };

    render() {

        const cid = parseInt(this.props.match.params.cid);
        const chapter = BookStore.getChapter(BookStore.getBook(), cid);

        return (
            <Container>
                <Content>
                    <List dataArray={chapter.verses}
                          renderRow={(verse) =>
                              <ListItem button={true}
                                onPress={() => this.takeToVerse.bind(this)(chapter, verse)}>
                                <Text numberOfLines={1}>{verse.content.en}</Text>
                              </ListItem>
                          }>
                    </List>
                </Content>
            </Container>
        );
    }
}