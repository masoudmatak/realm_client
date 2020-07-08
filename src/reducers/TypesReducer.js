import _ from 'lodash';
import React from 'react';
import Field from '../utils/Field';

const INITIAL_STATE = { 
  documentTypes: null,
  searchForm: {
    types: [],
    fields: [],
    selected: null,
    form: null
  },
  uploadForm: {
    types: [],
    fields: [],
    selected: null,
    //form: null
  }
}

const types = (state = INITIAL_STATE, action) => {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case "CHANGE_DOCTYPE":
      updateForm(action.payload, newState.searchForm, newState);
      return newState;
    case "CHANGE_UPLOADTYPE":
      updateForm(action.payload, newState.uploadForm, newState);
      return newState;
    case "LOAD_TYPES_SUCCESS":
      updateState(action.data, newState.searchForm, newState, true);
      updateState(action.data, newState.uploadForm, newState, false);
      return newState;
    case "LOAD_TYPES_FAILURE":
      console.log("Failure to load types");
      return state;
    default:
      return state
  }
}


const updateState = (config, form, state, isSearch) => {
  const documentTypes = new Map();
  const field = new Field();

  config.map(item => {
      if (form.selected == null) form.selected = item.name;
      documentTypes[item.name] = item.fields.filter(field => { return isSearch? field.search : field.write; });
      return true;
  });
  
  state.documentTypes = documentTypes;
  form.fields = documentTypes[form.selected];
  form.types = config.map((entry, index) => <option key={index}>{entry.name}</option>);
  form.form = form.fields.map((item, index) => {return field.getForm(item)});
}

const updateForm = (selected, form, state) => {
  const field = new Field();
  form.selected = selected;
  form.fields = state.documentTypes[selected];
  form.form = form.fields.map((item) => {return field.getForm(item)});
}

export default types;