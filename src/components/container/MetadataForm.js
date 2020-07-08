import { connect } from 'react-redux'
import { changeUpdateType } from '../../actions/TypesAction'
import MetadataForm from '../presentation/MetadataForm'

const mapStateToProps = (state) => {
  state = state.types;
  const o = {
    documentTypes: state.documentTypes,
    types: state.uploadForm != null? state.uploadForm.types.filter((e, i) => i > 0)  : [],
    fields: state.uploadForm != null? state.uploadForm.fields : [],
    //selected: state.uploadForm != null? state.uploadForm.selected : 0,
    form: state.uploadForm != null? state.uploadForm.form : []
  }
  console.log("Form:" + o.form);
  return o;
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDocumentType: docType => {
      dispatch(changeUpdateType(docType))
    }
  }
}

const MetadataFormView = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(MetadataForm)

export default MetadataFormView;