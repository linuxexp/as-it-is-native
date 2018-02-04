import React, {Component} from "react";

import BookStore from "../services/BookStore";

import {
    Alert
} from "react-native";

import {
    Container, Header, Content,
    List, ListItem, Text
} from 'native-base';

import EntityList from "../components/EntityList";

import head from "lodash/head";

export default class Chapter extends Component {

    takeToVerse = (chapter) => {
        return (verse) => this.props.history
            .push("/chapter/:cid/verse/:vid".replace(":cid", chapter.index)
            .replace(":vid", verse.index));
    };

    getVerseTitle = (verse) => verse.content.en;
    getVersePurport = (verse) => head(verse.purport);

    render() {

        const cid = parseInt(this.props.match.params.cid);
        const chapter = BookStore.getChapter(BookStore.getBook(), cid);

        this.props.setTitle("Chapter $index".replace("$index", chapter.index+1),
            "$count verses".replace("$count", chapter.verses.length));

        return (
            <EntityList dataArray={chapter.verses}
                        onItemClick={this.takeToVerse(chapter)}
                        getEntityTitle={this.getVerseTitle}
                        getEntitySubtext={this.getVersePurport} />
        );
    }
}