import React, {Component} from "react";

import BookStore from "../services/BookStore";

import {
    Alert
} from "react-native";

import {
    Container, Header, Content,
    List, ListItem, Text
} from 'native-base';

export default class Chapters extends Component {

    takeToChapter = (chapter) => {
        this.props.history.push("/chapter/$index".replace("$index", chapter.index));
    };

    render() {

        const book = BookStore.getBook();

        return (
            <Container>
                <Content>
                    <List dataArray={book}
                          renderRow={(chapter) =>
                              <ListItem button={true}
                                onPress={() => this.takeToChapter.bind(this)(chapter)}>
                                <Text numberOfLines={1}>{chapter.title}</Text>
                              </ListItem>
                          }>
                    </List>
                </Content>
            </Container>
        );
    }
}