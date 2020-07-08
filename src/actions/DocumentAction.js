import ActionTypes from './Types';
import {SERVER_URL} from '../constants';
export const showDocument = (docId) => ({
    type: ActionTypes.SHOW_DOCUMENT,
    payload: docId
  })

  export const filter = (txt) => ({
    type: ActionTypes.FILTER_DOCUMENT_LIST,
    data: txt
  })

  export const sort = (column) => ({
    type: ActionTypes.SORT_DOCUMENTS,
    data: column
  })

  export const updateDocument = (metadata) => ({
    type: ActionTypes.UPDATE_DOCUMENT,
    data: metadata
  })

  export const deleteDocument = (id) => ({
    type: ActionTypes.DELETE_DOCUMENT,
    data: id
  })
  
export function getDocuments(filter) {
    console.log("In GetDocuments");
    return dispatch => window.app.functions.list()
    .then(
      data => {console.log("Got response!! " + data); return dispatch({ type: 'LOAD_DOCUMENTS_SUCCESS', data })},
      err => dispatch({ type: 'LOAD_DOCUMENTS_FAILURE', err })
  );
}

  export function getDocumentsNodeJs(filter) {
    console.log("In GetDocuments");
    return dispatch => fetch(SERVER_URL + '/filelist' + filter) 
        .then(res => res.json())
        .then(
            data => {console.log("Got response!! " + data); return dispatch({ type: 'LOAD_DOCUMENTS_SUCCESS', data })},
            err => dispatch({ type: 'LOAD_DOCUMENTS_FAILURE', err })
        );
}