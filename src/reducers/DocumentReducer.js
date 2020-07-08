import ActionTypes from '../actions/Types';
import _ from 'lodash';
import { PAGE_SIZE } from '../constants';
import UserMessage from '../utils/UserMessage';

const INITIAL_STATE = {
  rawlist: [],  // documents from server
  filteredlist: [],  // filtered rawlist
  visiblelist: [],  // currently visible documents
  types: [], // document types
  sortOrder: {}, // sortorder for columns in document list , key=column name, value=true(ASC) or false(DESC)
  filter: '', //current filter for documents
  currentPageNo: 0, //visible page number
  pageCount: 0  //number of document pages
};

const documents = (state = INITIAL_STATE, action) => {
  let newState = _.cloneDeep(state);//{ ...state };
  switch (action.type) {
    case ActionTypes.LOAD_TYPES_SUCCESS:
      newState.types = getDocumentTypes(action.data);
      return newState;
    case ActionTypes.LOAD_DOCUMENTS_SUCCESS:
      newState.rawlist = selectFields(action.data, newState);
      reset(newState);
      return newState;
    case ActionTypes.LOAD_DOCUMENTS_FAILURE:
      new UserMessage().alert("Failure to documents");
      return state;
    case ActionTypes.CHANGE_PAGE:
      newState.currentPageNo = action.payload;
      newState.visiblelist = slice(newState.rawlist, newState.currentPageNo);
      return newState;
    case ActionTypes.FILTER_DOCUMENT_LIST:
      newState.filter = action.data;
      reset(newState);
      return newState;
    case ActionTypes.UPDATE_DOCUMENT:
      newState.rawlist[action.data._index] = action.data;
      rerender(newState);
      return newState;
    case ActionTypes.DELETE_DOCUMENT:
      const index = action.data;
      newState.rawlist.splice[action.data] = action.data;
      rerender(newState);
      return newState;
    case ActionTypes.SORT_DOCUMENTS:
      const column = action.data;
      const sortOrder = getSortOrder(column, newState);
      newState.sortOrder[column] = sortOrder;
      newState.rawlist = sort(newState.rawlist, column, sortOrder);
      reset(newState);
      return newState;
    default:
      return state
  }
}

const reset = state => {
  state.currentPageNo = 0;
  state.filteredlist = filter(state.rawlist, state.filter);
  state.visiblelist = slice(state.filteredlist, state.currentPageNo);
  state.pageCount = Math.ceil(state.filteredlist.length / PAGE_SIZE);
}

const rerender = state => {
  state.filteredlist = filter(state.rawlist, state.filter);
  state.visiblelist = slice(state.filteredlist, state.currentPageNo);
  state.pageCount = Math.ceil(state.filteredlist.length / PAGE_SIZE);
}


const getDocumentTypes = (data) => {
  const types = new Map();
  data.map(item => {
    types[item.name] = fieldsToSet(item.fields);
    return true;
  });
  return types;
}

const fieldsToSet = fields => {
  const map = new Map();
  fields.map(field => {
    map.set(field.id, field);
  });
  return map;
}

const selectFields = (data, state) => {
  const d = [];
  let currIndex = 0;
  for (let i = 0; i < data.length; i++) {
    let e = {};
    let o = data[i];
    let fieldCount = 0;
    if (o.hasOwnProperty('metadata') && typeof o.metadata === 'object') {
      const type = state.types[o.metadata.type];
      if (type == null) {
        console.log("No valid type set!");
        continue;
      }
      for (var key in o.metadata) {
        if (type.has(key)) {
          fieldCount++;
          const name = type.get(key).name;
          e[name] = { value: o.metadata[key] };
          Object.assign(e[name], type.get(key));
        }
      }
      if (fieldCount >= type.size) {
        e['id'] = { value: o['_id'] };
        e['_key'] = { value: o.s3['key'] };
        e['_bucket'] = { value: o.s3['bucket'] };
        e['_index'] = { value: currIndex++ };
        d.push(e);
      }
    }

  }
  return d;
}

const slice = (documents, currentPageNo) => documents.slice(currentPageNo * PAGE_SIZE, (currentPageNo + 1) * PAGE_SIZE)

const filter = (documents, filterText) => {
  let arr = documents.filter((row) => {
    for (var key in row) {
      if (row[key].value.toString().includes(filterText)) return true;
    }
    return false;
  });
  return arr;
}

const getSortOrder = (column, state) => {
  let sortOrder = true;
  if (column in state.sortOrder)
    sortOrder = !state.sortOrder[column];
  return sortOrder;
}

const sort = (documents, column, order) => {
  let documentCopy = [...documents];
  documentCopy.sort(sortFunction);
  return documentCopy;

  function sortFunction(a, b) {
    a = a[column].value;
    b = b[column].value;
    let cmp = (a === b) ? 0 : (a < b) ? -1 : 1;
    return order ? cmp : cmp * -1;
  }
}

export default documents;
