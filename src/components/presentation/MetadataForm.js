import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Field from '../../utils/Field';

export default class MetadataForm extends React.Component {

  constructor(props) {
    super(props);
    this.field = new Field(this.handleKeyUp);
    this.docType = null;
    if (props.types.length > 0) this.docType = props.types[0].props.children; //FIX THIS!
  }
  
  handleChange(v) {
    this.docType = v;
    this.props.changeDocumentType(v);
  }

  getValueById = (id) => {
    return document.getElementById(id).value;
  }

  getMetadata = () => {
    if (this.docType == null) {
      alert("Ingen dokumenttyp vald!");
      return null;
    } 
    let json = '{"type":"' + this.docType + '"';
    for (var i = 0; i < this.props.fields.length; i++) {
      const field = this.props.fields[i];
      json += ',"' + field['id'] + '":"' + this.getValueById(field['id']) + '"';
    }
    json += '}';
    return json;
  }


  getForm = () => {
    return this.props.fields.map((item, index) => this.field.getForm(item));
  }

  handleKeyUp = (e) => {
    const value = e.target.value;
    const format = e.target.getAttribute('format');
    if (value.match(format))
      e.target.setAttribute('class', 'is-valid form-control');
    else
      e.target.setAttribute('class', 'is-invalid form-control');
  }

  handleFieldChange = (v) => {
    console.log("HandleFieldChange");
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <h4>Metadata för dokumenten</h4>
          <hr style={{
            color: 'gray',
            backgroundColor: 'gray',
            height: .5,
            borderColor: 'gray'
          }} />
          <Label for="documentTypes">Dokumenttyp</Label>
          <Input type="select" name="select" id="documentTypes" onChange={(e) => { this.handleChange(e.target.value) }}>
            {this.props.types}
          </Input>
        </FormGroup>
        {this.getForm()}
      </Form>
    );
  }
}