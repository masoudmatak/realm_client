import { connect } from 'react-redux'
import { changeDocumentType } from '../../actions/TypesAction'
import { getDocuments } from '../../actions/DocumentAction'
import SearchForm from '../presentation/SearchForm'

const mapStateToProps = (state, ownProps) => {
  state = state.types;
  console.log("MapStateToProps for SearchFormView!!!!");
  const o = {
    documentTypes: state.documentTypes,
    types: state.searchForm != null? state.searchForm.types : [],
    fields: state.searchForm != null? state.searchForm.fields : [],
    selected: state.searchForm != null? state.searchForm.selected : 0,
    form: state.searchForm != null? state.searchForm.form : []
  }
  console.log("Form:" + o.form);
  return o;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeDocumentType: docType => {
      console.log("CHANGE DOCTYPE:" + typeof(docType));
      dispatch(changeDocumentType(docType))
    },
    searchDocuments: filter => {
      console.log("SearchDocuments");
      dispatch(getDocuments(filter))
    }
  }
}

const SearchFormView = connect(mapStateToProps, mapDispatchToProps)(SearchForm)

export default SearchFormView;