import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './components/presentation/Login';
import ContentPane from './components/container/ContentPane';
import { getTypes } from './actions/TypesAction';
//import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import * as RealmWeb from "realm-web";

window.app = new RealmWeb.App({ id: "mmdok-mtkbq" });

class App extends Component {
//http://localhost:3000/?email=tester%40foo.bar&password=mySecret

  componentDidMount() {
      this.refs.login.toggle();
      this.props.dispatch(getTypes());
      //this.testRealms();
  }

  async testRealms() {
    //const app = new RealmWeb.App({ id: "mmdok-mtkbq" });
    //const credentials = RealmWeb.Credentials.anonymous();
    console.log('Got app');
    const email = 'tester@foo.bar';
    const password = 'mySecret';
    //await app.auth.emailPassword.registerUser(email, password);
    const credentials = RealmWeb.Credentials.emailPassword(email, password);
    try {
      console.log('logging in...')
      const user = await window.app.logIn(credentials);
      console.log('logged in!');
      const file = await this.fileToBase64("test7.pdf", "file:///C:/Users/kmca04/Desktop/migrering.pdf");
      const metadata = {type:"Skoskador", size: 43}
      const result = await window.app.functions.upload(metadata, "theFileName2", "application/pdf", file);
      console.log("result:" + result.s3.ETag);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  }

  fileToBase64 = (filename, filepath) => {
    return new Promise(resolve => {
      var file = new File([filename], filepath);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        //let encoded = reader.result.toString().replace('data:*/*;base64', '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      //reader.onerror = error => reject(error);

      /*
      // Read file content on file loaded event
      reader.onload = function (event) {
        resolve(event.target.result);
      };

      // Convert data to base64 
      reader.readAsDataURL(file);
      */
    });
  };

  async login(email, password) {
    let isLoggedIn = false;
    const credentials = RealmWeb.Credentials.emailPassword(email, password);
    try {
      const user = await window.app.logIn(credentials);
      if (user) {
        isLoggedIn = true;
      }
    }
    catch (error) {
      console.error("Failed to log in:" +  error);
    }
    return isLoggedIn;
  }


  render = () => {
    return (
      <Fragment>
        <main className="my-5 py-5">
          <ContentPane />
        </main>
        <Login ref='login' loginUser={this.login}/>
      </Fragment>
    );
  }
}


const AppView = connect()(App)
export default AppView;