import { connect } from 'react-redux'
import ContentPane from '../presentation/ContentPane'


const mapStateToProps = (state, ownProps) => {
  console.log("--MapStateToProps for contentPane " + ownProps);
  return {
    activeTab: state.tab.activeTab
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    }
  }

const ContentPaneView = connect(mapStateToProps)(ContentPane)

export default ContentPaneView;