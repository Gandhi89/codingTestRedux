import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import ActionBar from 'react-native-action-bar';
import CodingApp from './component/CodingApp';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import initialState from './reducer/initialState';
import reducer from './reducer/appReducer';

import createSagaMiddleware from 'redux-saga';
import { watchListViewVisibility, watchGridViewVisibility, watchShowData_AtoZ, watchShowData_ZtoA,watchFetchUser, watchShowdata_Avatar_Only } from './sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchListViewVisibility);
sagaMiddleware.run(watchGridViewVisibility);
sagaMiddleware.run(watchShowData_AtoZ);
sagaMiddleware.run(watchShowData_ZtoA);
sagaMiddleware.run(watchShowdata_Avatar_Only);
sagaMiddleware.run(watchFetchUser);

export default class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <CodingApp />
        </Provider>
    );
  }
}
