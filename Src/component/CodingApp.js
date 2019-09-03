import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import ActionBar from 'react-native-action-bar';
import {connect} from 'react-redux';


const COLUMNS=2;
const SCREEN_HEIGHT=Dimensions.get('window').height;
const SCREEN_WIDTH=Dimensions.get('window').width;
const GRIDVIEW_ITEM_WIDTH_DIVIDER = 2;



class CodingApp extends Component {

  _onPressItem = () => {
    console.log('open item');
  }


  componentDidMount(){
    this.props.fetchUserData();
  }



  // render grid view
  renderItemGridView({ item, index }) {
    return (
      <TouchableOpacity onPress={this._onPressItem} style={{width: SCREEN_WIDTH / GRIDVIEW_ITEM_WIDTH_DIVIDER, flex: 1}}>
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: item.backgroundColor, padding: 10 }}>
          <Image style={{ width: SCREEN_WIDTH / GRIDVIEW_ITEM_WIDTH_DIVIDER, height: 100 }} source={{ uri: item.avatar }} />
          <View style={{
            flex: 1,
            padding: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{marginBottom: 10}}>{item.first_name} {item.last_name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>);
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={this._onPressItem}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: item.backgroundColor }}>
          <Image style={{ width: 100, height: 100 }} source={{ uri: item.avatar }} />
          <View style={{
            flex: 1,
            paddingLeft: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <Text>{item.first_name} {item.last_name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>);
  }

  render() {
    // render 'ActivityIndicator' while fetching data from URL
    if(this.props.fetchingData){
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ActionBar
          containerStyle={styles.bar}
          title={'User List'}
          rightIcons={[
            {
              image: require('../../resources/img/grid.png'),
              onPress: () => {this.props.showGridViewToTrue()}
            },
            {
              image: require('../../resources/img/list.png'),
              onPress: () => {this.props.showListViewToTrue()},
            },
            {
              image: require('../../resources/img/sort_az.png'),
              onPress: () => {this.props.showData_AtoZ()},
            },
            {
              image: require('../../resources/img/sort_za.png'),
              onPress: () => {this.props.showData_ZtoA()},
            },
            {
              image: require('../../resources/img/avatar.png'),
              onPress: () => {this.props.showData_AvatarOnly()},
            },
          ]}
        />
        { this.props.showListView && (
          <FlatList
            contentContainerStyle={styles.list}
            data={this.props.customData}
            renderItem={this.renderItem}
          />
        )}
        { this.props.showGridView && (
          <FlatList
            numColumns={COLUMNS}
            contentContainerStyle={styles.list}
            data={this.props.customData}
            renderItem={this.renderItemGridView}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
      showListView: state.showListView,
      showGridView: state.showGridView,
      customData: state.customData,
      fetchingData: state.fetchingData
  }
}

function mapDispatcherToProps(dispatch){
  return{
      showGridViewToTrue: () => dispatch({type: 'GRIDVIEW_VISIBILITY_TRUE'}),
      showListViewToTrue: () => dispatch({type: 'LISTVIEW_VISIBILITY_TRUE'}),
      showData_AtoZ: () => dispatch({type: 'SHOWDATA_AtoZ'}),
      showData_ZtoA: () => dispatch({type: 'SHOWDATA_ZtoA'}),
      showData_AvatarOnly: () => dispatch({type: 'SHOWDATA_AVATAR_ONLY'}),
      fetchUserData: () => dispatch({type: 'FETCH_USERS'})

  }
}

export default connect (mapStateToProps, mapDispatcherToProps)(CodingApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }, list: {
    justifyContent: 'center'
  }
});
