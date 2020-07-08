import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ActionMenu from './ActionMenu';

class MetadataView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      size: 'modal-xl',
      body: ''
    };
  }

  toggle = (metadata) => {
    this.setState({
      modal: true,
      body: this.getMetadataTable(metadata)
    });
    this.metadata = metadata;
  }

  updateDocument = (metadata) => {
    this.metadata = metadata;
    this.setState({body: this.getMetadataTable(metadata)});
    this.props.updateDocument(metadata);
  }

  getTableContent = metadata => {
    const arr = [];
    for (var property in metadata) {
      console.log(property + ":" + metadata[property].value);
      console.log(metadata[property].value == null);
      if (!property.startsWith('_')  && property != 'id')
        //arr.push(<tr><td key={property} style={{ textAlign: "right" }}>{property}:</td><td style={{ textAlign: "left" }}>5f0259faba68906b1f525724</td></tr>);
    arr.push(<tr><td key={property} style={{ textAlign: "right" }}>{property}:</td><td>{metadata[property].value}</td></tr>);
      }
    return arr.map((row, index) => {
      return row
    })
  }

  getMetadataTable = metadata => {
    return <table>
      <tbody>
      {this.getTableContent(metadata)}
      </tbody>
    </table>
  }

  hide = () => {
    this.setState({
      modal: !this.state.modal
    });
    //this.metadata['source']['value'] = 'G92';
    //this.metadata.datum.value = '1963-11-09';
    //this.props.updateDocument(this.metadata);
  }

  showDocument = () => {
    if (this.metadata != null && this.metadata['_key'] != null && this.metadata['_bucket']) {
      this.props.showDocument(this.metadata['_key'], this.metadata['_bucket']);
    }
  }

  getMetadata = () => {
    const metadata = this.metadata;
    return metadata;
  }

  render = () =>
    (
      <div>
        <Modal isOpen={this.state.modal} close={this.hide} toggle={this.toggle} className={this.props.className} backdrop={false}>
          <ModalHeader>Dokumenttitel</ModalHeader>
          <ModalBody>
            {this.state.body}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.showDocument}>Visa dokument</Button>{' '}
            <ActionMenu metadata={this.getMetadata()} updateDocument={this.updateDocument} />
            <Button color="secondary" onClick={this.hide}>Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    );

}

export default MetadataView;
