import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import confirm from "reactstrap-confirm";
import EditMetadataModal from './EditMetadataModal';
import HttpClient from '../../utils/HttpClient';

export default class ActionMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.key = this.props.metadata['_key'].value;
    this.bucket = this.props.metadata['_bucket'].value;
    this.state = {
      dropdownOpen: false
    };
    this.modal = React.createRef();
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  delete = () => {
    confirm({
      title: "Dubbelkoll...",
      message: "Vill du verkligen ta bort dokumentet?",
      confirmText: "JA",
      cancelText: "NEJ",
      confirmColor: "primary",
      cancelColor: "link text-danger"
    }).then(isOk => { if(isOk)
      new HttpClient().delete(this.filename, () => {
        this.props.deleteDocument(this.filename);
      });
    });
  }

  edit = () => {
    this.modal.current.toggle();
  }

  render() {
    return (
      <Fragment>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Åtgärder
        </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.edit}>Uppdatera</DropdownItem>
            <DropdownItem onClick={this.delete}>Radera</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Skicka som epost</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <EditMetadataModal ref={this.modal} filename={this.filename} metadata={this.props.metadata} 
              updateDocument={this.props.updateDocument} />
      </Fragment>
    );
  }
}