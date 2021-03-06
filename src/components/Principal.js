import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import Contatos from './Contatos';
import Conversas from './Conversas';

export default class Principal extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Conversas' },
      { key: '2', title: 'Contatos' },
    ],
  };

  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props => <TabBarMenu navigation={this.props.navigation} {...props} />;

  _renderScene = SceneMap({
    '1': Conversas,
    '2': Contatos,
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});