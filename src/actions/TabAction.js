let noDocuments = 0;

export const ActionTypes = {
  CHANGE_TAB: "CHANGE_TAB"
};

export const Tabs = {
  SEARCH_TAB: 1,
  WRITE_TAB: 2,
  VIEW_TAB: 3
}

export const changeTab = (tabId) => ({
  type: ActionTypes.CHANGE_TAB,
  payload: tabId
})

export const changeTabb = (tabId) => {
  console.log("ChangeTab");
  return {
  type: ActionTypes.CHANGE_TAB,
  payload: tabId
  }
}

/*
export default {
  changeTab,
  ActionTypes,
  Tabs
};
*/


