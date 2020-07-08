import { connect } from 'react-redux'
import { changeTab } from '../../actions/TabAction'
import { filter } from '../../actions/DocumentAction'
import Header from '../presentation/Header'


const mapStateToProps = (state, ownProps) => {
  return {
    activeTab: state.tab.activeTab,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTab: (tabId) => {
      dispatch(changeTab(tabId))
    },
    filter: (filterText) => {
      dispatch(filter(filterText))
    }
  }
}

const HeaderView = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderView;