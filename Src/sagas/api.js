
function* getDataFromServer(URL){
  let response = yield fetch(URL)
  let responseJson = yield response.json();
  return responseJson;
}
export const Api = {
    getDataFromServer
};
