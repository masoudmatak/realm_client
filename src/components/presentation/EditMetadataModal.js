import React, { Component, Fragment } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup } from 'reactstrap';
import { Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import HttpClient from '../../utils/HttpClient';

export default class EditMetadataModal extends Component {

  TITLE_ATTR = 'Attribut';

  constructor(props) {
    super(props);
    this.metadata = this.props.metadata;
    this.state = {
      modal: false,
      size: 'modal-sm',
      body: '',
      dropdownOpen: false,
      attrName: this.TITLE_ATTR,
      attrValue: ''
    };
  }

  toggle = () => {
    const d = this.metadata;
    this.setState({
      modal: !this.state.modal,
    });
    this.filename = d['filename'].value;
    console.log("Filename:" + this.filename);
  }

  toggleButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onFormSubmit = () => {
    const value = document.getElementById('value').value;
    const name = this.state.attrName;
    const id = this.state.attrId;
    this.hide();
    if (name != null && name != this.TITLE_ATTR) {
      this.metadata[name].value = value;
      let client = new HttpClient();
      client.sendUpdate(this.filename, id, value, () => {
        this.props.updateDocument(this.metadata);
      });
    }
  }

  hide = () => {
    this.setState({
      modal: false
    });
  }

  select = (event) => {
    let p = event.target.innerText;
    let v = this.metadata[p].value;
    let x = this.metadata[p].id;
    this.setState({
      attrName: p,
      attrValue: v,
      attrId: x
    });
  }

  getAttributes = () => {
    var d = this.metadata;
    const arr = [];
    let index = 0;
    for (var p in d) {
      const q = d[p];
      if (d[p].write) {
        arr.push(<DropdownItem key={index} onClick={this.select}>{p}</DropdownItem>);
        index++;
      }
    }
    return arr.map((row) => {
      return row
    })
  }

  render = () => {
    return (
      <div>
        <Modal isOpen={this.state.modal} close={this.hide} toggle={this.toggle} className={this.props.className} backdrop={false} style={{ backgroundColor: '#f1f1f1' }}>
          <ModalBody>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleButton}>
                  <DropdownToggle caret>
                    {this.state.attrName}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.getAttributes()}
                  </DropdownMenu>
                </ButtonDropdown>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="value" className="mr-sm-2">Nytt värde:</Label>
                <Input type="text" name="value" id="value" placeholder={this.state.attrValue}></Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onFormSubmit}>Skicka</Button>
            <Button color="secondary" onClick={this.toggle}>Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
