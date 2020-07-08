import { connect } from 'react-redux'
import { changePage } from '../../actions/Paging'
import Paging from '../presentation/Paging'

const mapStateToProps = (state, ownProps) => {
  console.log("MapStateToProps for PaginationView!!!!");
  const o = {
    currentPageNo: state.documents.currentPageNo,
    pageCount: state.documents.pageCount,
  }
  console.log("PageCount:" + o.pageCount);
  return o;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage: (event, index) => {
      console.log("CHANGE PAGE:" + index);
      event.preventDefault();
      dispatch(changePage(index))
    }
  }
}

const PagingView = connect(mapStateToProps, mapDispatchToProps)(Paging)

export default PagingView;