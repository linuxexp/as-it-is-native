import React, {Component} from "react";

import BookStore from "../services/BookStore";

import {
    Alert,
    View
} from "react-native";

import {
    Container, Header, Content,
    List, ListItem, Text,
    Icon
} from 'native-base';

import EntityList from "../components/EntityList";

export default class Chapters extends Component {

    takeToChapter = (chapter) => {
        this.props.history.push("/chapter/$index".replace("$index", chapter.index));
    };

    getChapterTitle = (chapter) => chapter.title;
    getEntitySubtext = (chapter) => chapter.purport;

    render() {

        const book = BookStore.getBook();
        this.props.setTitle("Chapters", "As it is");

        return (
            <EntityList dataArray={book}
                        onItemClick={this.takeToChapter}
                        getEntityTitle={this.getChapterTitle}
                        getEntitySubtext={this.getEntitySubtext} />
        );
    }
}