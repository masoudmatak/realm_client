import { combineReducers } from 'redux'
import tab from './TabReducer'
import types from './TypesReducer'
import documents from './DocumentReducer'
import paging from './PagingReducer'

const mmdokApp = combineReducers({
  tab,
  types,
  documents
  //paging
})

export default mmdokApp
