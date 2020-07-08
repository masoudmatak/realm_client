import {CONFIG_URL} from '../constants';
import ActionTypes from './Types';

export function getTypes() {
    console.log("In GetTypes");
    return dispatch => fetch(CONFIG_URL + '/types') 
        .then(res => res.json())
        .then(
            data => {console.log("Got response!! " + data); return dispatch({ type: 'LOAD_TYPES_SUCCESS', data })},
            err => dispatch({ type: 'LOAD_TYPES_FAILURE', err })
        );
}

export const changeDocumentType = (docType) => ({
    type: ActionTypes.CHANGE_DOCTYPE,
    payload: docType
  })

  export const changeUpdateType = (docType) => ({
    type: ActionTypes.CHANGE_UPLOADTYPE,
    payload: docType
  })


