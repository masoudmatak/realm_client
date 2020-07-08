import { connect } from 'react-redux'
import { PAGE_SIZE } from '../../constants';
import Documentlist from '../presentation/Documentlist'
import { changeTab } from '../../actions/TabAction'
import { sort, updateDocument, deleteDocument } from '../../actions/DocumentAction'
import { VIEW_TAB } from '../../constants';


const mapStateToProps = (state) => {
  let o = [];
  if (state.documents.visiblelist != null)
    o = {documents: state.documents.visiblelist,
        tst: 'hejhopp!'};
  return o;
}

const mapDispatchToProps = dispatch => {
  return {
    showDocument: (key, bucket) => {
      sessionStorage.setItem('key', key.value);
      sessionStorage.setItem('bucket', bucket.value);
      dispatch(changeTab(VIEW_TAB));
    },
    sort: (column) => {
      dispatch(sort(column));
    },
    update: (metadata) => {
      dispatch(updateDocument(metadata));
    },
    delete: (id) => {
      dispatch(deleteDocument(id));
    }
  }
}

const DocumentlistView = connect(mapStateToProps, mapDispatchToProps)(Documentlist)

export default DocumentlistView;