import _ from 'lodash';
import { PAGE_SIZE } from '../constants/index';
import ActionTypes from '../actions/Types';

const INITIAL_STATE = {
    currentPageNo: 0,
    pageCount: 0
}



const paging = (state = INITIAL_STATE, action) => {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      newState.currentPageNo = action.payload;
      return newState;
    case ActionTypes.LOAD_DOCUMENTS_SUCCESS:
      newState.pageCount = action.data.length / PAGE_SIZE;
      return newState;
    default:
      return newState;
  }
}

export default paging;