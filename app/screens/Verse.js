import React, {Component} from "react";

import BookStore from "../services/BookStore";

import {
    Alert,
    View,
    ToastAndroid
} from "react-native";

import {
    Container, Header, Content,
    List, ListItem, Text,
    Fab,
    Button,
    Icon
} from 'native-base';

import Utils from "../services/Utils";

import ConfigManager from "../services/ConfigManager";

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

    state = {
        active: false
    };

    markAsRead = (verse) => {
        ConfigManager.markAsRead(verse);
        ToastAndroid.show('Marked as Read', ToastAndroid.SHORT);
    };

    markInBookmarks = (verse) => {
        ConfigManager.markInBookmark(verse);
        ToastAndroid.show('Marked into Bookmarks', ToastAndroid.SHORT);
    };

    render() {

        const vid = parseInt(this.props.match.params.vid);
        const cid = parseInt(this.props.match.params.cid);

        const verse = BookStore.getVerse(BookStore.getChapter(BookStore.getBook(), cid), vid);

        const purportToText = (purport) => {
            return purport.map((node, index) => <Text key={index} style={this.styles.textNode}>{node}</Text>);
        };

        const sansNodes = verse.content.sans.map((sz) => Utils.buildFromAnnotated(sz, verse.synonyms));

        if (this.props.setStickyNodes) {
            this.props.setStickyNodes(sansNodes);
        }

        return (
            <Container>
                <View style={{flex:1}}>
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

                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                            <Icon name="more" />
                            <Button onPress={() => this.markInBookmarks.bind(this)(verse)} style={{ backgroundColor: '#34A34F' }}>
                                <Icon name="bookmark" />
                            </Button>
                            <Button onPress={() => this.markAsRead.bind(this)(verse)} style={{ backgroundColor: '#3B5998' }}>
                                <Icon name="checkmark" />
                            </Button>
                    </Fab>

                </View>




            </Container>
        );
    }
}