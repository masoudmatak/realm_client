import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Input, FormGroup, Label, Table } from 'reactstrap';
import DragAndDrop from './DragAndDrop';
import '../../styles/Filedrop.css';
import axios from 'axios';
import { SERVER_URL } from '../../constants';
import HttpClient from '../../utils/HttpClient';
import * as RealmWeb from "realm-web";



export default class Filelist extends Component {

  state = {
    files: [],
    showFileBrowser: false
  }

  httpClient = new HttpClient();

  constructor(props) {
    super(props);
    this.metadata = props.metadata;
  }

  importFile(e) {
    this.handleDrop(e.target.files);
  }

  handleDropNew = (files) => {
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i]) return
      fileList.push(files[i]);
    }
    this.setState({ files: fileList });
    this.submitFiles();
  }

  handleDrop = (files) => {
    if (!files) return;
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return
      files[i].sent = false;
      fileList.push(files[i]);
    }
    this.setState({ files: fileList });
    //this.submitFiles();
  }

  sleep = time => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  onSubmitFile = () => {
    let metadata = this.metadata();
    if (metadata == null) return;
    var fileList = [...this.state.files];
    for (let i = 0; i < fileList.length; i++) {
      this.submitFileRealms(i, fileList, metadata);
    }
  }
  async submitFileRealms(i, fileList, metadata) {
    this.base64(fileList[i]).then(file => 
      window.app.functions.upload(metadata, fileList[i].name, fileList[i].type, file)
    ).then(result => {
      fileList[i].sent = true;
      this.setState({ files: fileList });
    })
    .catch (error => {
      console.error("Failed to send file: " + error);
      alert(error);
    });
  }

  base64 = (file) => {
    return new Promise(resolve => {
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
    });
  };


  onFileBrowse = (e) => {
    //this.setState({showFileBrowser: true});
    document.getElementById('fileInput').click();
  }

  rows = () => {
    return this.state.files.map((file, index) => {
      let sentColumn;
      if (file.sent) {
        sentColumn = <td style={{ color: 'green' }}>&#10004;</td>
      } else {
        sentColumn = <td style={{ color: 'red' }}>&#10006;</td>
      }
      return (
        <tr key={index}>
          <td>{file.name}</td>
          <td>{file.type}</td>
          <td>{Math.round(file.size / 1028)}</td>
          {sentColumn}
        </tr>
      )
    })
  }
  //<td style={{color:'green'}}>&#10004;</td>
  //

  extraSpace = () => {
    const row = <tr><td><br /></td><td><br /></td><td><br /></td><td><br /></td></tr>;
    switch (this.state.files.length) {
      case 0: return <Fragment>{row}{row}{row}</Fragment>
      case 1: return <Fragment>{row}{row}</Fragment>
      case 2: return <Fragment>{row}</Fragment>
    }
  }


  render = () => {
    const styles = { textAlign: 'center', borderStyle: 'double', padding: '10px' };
    const styles2 = { display: 'none' };

    return (
      <Fragment>
        <DragAndDrop handleDrop={this.handleDrop}>
          <div style={styles}>
            <h3>Droppa filer här eller klicka på 'Välj fil'</h3>
            <FormGroup>
              <Input type="file" id="fileInput" style={styles2} multiple onChange={this.importFile.bind(this)} />
              <Button color="primary" onClick={this.onFileBrowse}>Välj fil</Button>
            </FormGroup>
            <Table striped hover>
              <thead>
                <tr><td>Filnamn</td><td>Mimetype</td><td>Storlek(MB)</td><td>Skickad</td></tr>
              </thead>
              <tbody>
                {this.rows()}
                {this.extraSpace()}
              </tbody>
            </Table>
            <ButtonGroup>
              <Button color="success" onClick={this.onSubmitFile} style={{ margin: '10px', borderRadius: '5px' }}>Skicka</Button>
              <Button color="danger" style={{ margin: '10px', borderRadius: '5px' }}>Rensa</Button>
            </ButtonGroup>
          </div>
        </DragAndDrop>
      </Fragment>
    );
  }
}

const extraSpace = () => {

}

