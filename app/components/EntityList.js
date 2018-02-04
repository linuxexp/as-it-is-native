/**
 * Created by raja on 04/02/18.
 */
import React, {Component} from "react";

import {
  View
} from "react-native";

import {
  Container, Content,
  List, ListItem,
  Text,
  Icon
} from "native-base";

export default class EnityList extends Component {

    styles = {
      listItem: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center"
      },
      entity: {
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingLeft: 10,
          paddingRight: 10
      },
      subText: {
        color: "#888888"
      },
      lightText: {
        color: "#bbbbbb"
      }
    };

    render() {

        const subText = (entity) => {
            if (this.props.getEntitySubtext) {
                return (
                    <View>
                        <Text style={this.styles.subText}
                              numberOfLines={1}>
                            {this.props.getEntitySubtext(entity)}
                        </Text>
                    </View>
                );
            }
            return;
        };

        return (
            <Container>
                <Content>
                    <List dataArray={this.props.dataArray}
                          renderRow={(entity) =>
                              <ListItem button={true}
                                onPress={() => this.props.onItemClick(entity)}>
                                <View style={this.styles.listItem}>
                                    <View>
                                        <Text style={this.styles.lightText}>{entity.index+1}</Text>
                                    </View>
                                    <View style={this.styles.entity}>
                                        <View>
                                            <Text numberOfLines={1}>{this.props.getEntityTitle(entity)}</Text>
                                        </View>
                                        {subText(entity)}
                                    </View>
                                    <View>
                                        <Icon style={this.styles.lightText}
                                              name="arrow-forward" />
                                    </View>
                                </View>
                              </ListItem>
                          }>
                    </List>
                </Content>
            </Container>
        );
    }
}