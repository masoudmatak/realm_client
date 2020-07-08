import ActionTypes from '../actions/TabAction';
import SERVER_URL from '../constants';
import { SEARCH_TAB } from '../constants';
import _ from 'lodash';

const INITIAL_STATE = {
  activeTab: SEARCH_TAB
}

const tab = (state = INITIAL_STATE, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "CHANGE_TAB":
      newState.activeTab = action.payload;
      return newState;
    default:
      return state
  }
}

export default tab;