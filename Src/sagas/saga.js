
import {takeEvery, put} from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { Api } from './api';


function* listViewVisibilityAsync(){
console.log("LISTVIEW_VISIBILITY_TRUE_ASYNC");
  let customData = yield fetchUsersFromAPI();
  yield put({type: types.LISTVIEW_VISIBILITY_TRUE_ASYNC, receivedUsers: customData});
}
function* gridViewVisibilityAsync(){
console.log("GRIDVIEW_VISIBILITY_TRUE_ASYNC");
  let customData = yield fetchUsersFromAPI();
  yield put({type: types.GRIDVIEW_VISIBILITY_TRUE_ASYNC, receivedUsers: customData});
}
function* showData_AtoZ_Async(){

  yield put({type: types.SHOWDATA_AtoZ_ASYNC});
}
function* showData_ZtoA_Async(){
  console.log("SHOWDATA_ZtoA_ASYNC");
  yield put({type: types.SHOWDATA_ZtoA_ASYNC});
}
function* showData_Avatar_Only_Async(){
console.log("SHOWDATA_AVATAR_ONLY_ASYNC");
  yield put({type: types.SHOWDATA_AVATAR_ONLY_ASYNC});
}

function* fetchUsersFromAPI() {
  let customData_p1 = [];
  let customData_p2 = [];
  let customData_p3 = [];
    try {
        customData_p1 = yield Api.getDataFromServer(types.URL_p1);
        customData_p2 = yield Api.getDataFromServer(types.URL_p2);
        customData_p3 = yield Api.getDataFromServer(types.URL_p3);
        let customData = customData_p1.concat(customData_p2,customData_p3);
        return yield customData
        //yield put({ type: types.FETCH_SUCCEEDED, receivedUsers: customData });
    } catch (error) {
        console.log("error: ", error);
        //yield put({ type: FETCH_FAILED, error });
    }
}

function* fetchUser(){
  let customData = yield fetchUsersFromAPI();
  yield put({ type: types.FETCH_SUCCEEDED, receivedUsers: customData });
}

export function* watchListViewVisibility(){
  yield takeEvery(types.LISTVIEW_VISIBILITY_TRUE,listViewVisibilityAsync);
}
export function* watchGridViewVisibility(){
  yield takeEvery(types.GRIDVIEW_VISIBILITY_TRUE,gridViewVisibilityAsync);
}
export function* watchShowData_AtoZ(){
  yield takeEvery(types.SHOWDATA_AtoZ,showData_AtoZ_Async);
}
export function* watchShowData_ZtoA(){
  yield takeEvery(types.SHOWDATA_ZtoA,showData_ZtoA_Async);
}
export function* watchShowdata_Avatar_Only(){
  yield takeEvery(types.SHOWDATA_AVATAR_ONLY,showData_Avatar_Only_Async);
}
export function* watchFetchUser() {
  yield takeEvery(types.FETCH_USERS, fetchUser);
}
