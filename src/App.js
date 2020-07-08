import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './components/presentation/Login';
import ContentPane from './components/container/ContentPane';
import { getTypes } from './actions/TypesAction';

class App extends Component {

	componentDidMount() {
		this.refs.login.toggle();
		this.props.dispatch(getTypes());
	}

	render = () => {
		return (
			<Fragment>
				<main className="my-5 py-5">
					<ContentPane />
				</main>
				<Login ref='login'/>
			</Fragment>
		);
	}
}


const AppView = connect()(App)
export default AppView;




