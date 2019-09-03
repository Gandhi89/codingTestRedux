import * as types from '../constants/actionTypes';
import initialState from './initialState';
import Helper from '../util/helper';


export default function ( state = initialState ,action) {
  helper = new Helper();
  switch (action.type) {
    case types.GRIDVIEW_VISIBILITY_TRUE_ASYNC:
      return {
        showListView: false,
        showGridView: true,
        customData: action.receivedUsers
      }

    case types.LISTVIEW_VISIBILITY_TRUE_ASYNC:
      return {
        showListView: true,
        showGridView: false,
        customData: action.receivedUsers
      }

    case types.SHOWDATA_AtoZ_ASYNC:
      return {
        showListView: state.showListView,
        showGridView: state.showGridView,
        customData: helper.getDataA_Z(state.customData)
      }

    case types.SHOWDATA_ZtoA_ASYNC:
      return {
        showListView: state.showListView,
        showGridView: state.showGridView,
        customData: helper.getDataZ_A(state.customData)
      }

    case types.SHOWDATA_AVATAR_ONLY_ASYNC:
      return {
        showListView: state.showListView,
        showGridView: state.showGridView,
        customData: helper.getFilteredData(state.customData)
      }
      
    case types.FETCH_SUCCEEDED:
      return {
        showListView: state.showListView,
        showGridView: state.showGridView,
        fetchingData: false,
        customData: action.receivedUsers
      }

    default:
  }
  return state
}
