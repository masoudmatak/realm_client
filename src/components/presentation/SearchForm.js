import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Field from '../../utils/Field';

const hrStyle = {
    color: 'gray',
    backgroundColor: 'gray',
    height: .5,
    borderColor: 'gray'
};

const SearchForm = (state) => {

    const getValueById = (id) => document.getElementById(id).value;
    
    const handleChange = v => { state.changeDocumentType(v); }

    // TODO: Gör om till rest
    const onFormSubmit = () => {
        let json = state.selected == '*' ? '{' : '{"metadata.type":"' + state.selected + '"';
        for (var i = 0; i < state.fields.length; i++) {
            const field = state.fields[i];
            const value = getValueById(field['id']);
            if (value != "") {
                if (json.length > 1) json += ','
                json += '"metadata.' + field['id'] + '":"' + getValueById(field['id']) + '"';
            }
        }
        json += '}';
        let urlParams = '?params=' + json;
        state.searchDocuments(urlParams);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            < Form >
                <FormGroup>
                    <h4>Dokumenttyper</h4>
                    <Input type="select" name="select" id="documentTypes" onChange={(e) => { handleChange(e.target.value); }}>
                        {state.types}
                    </Input>
                </FormGroup>

                <hr style={hrStyle} />
                <h4>Metadata</h4>
                {state.form}
                <hr style={hrStyle} />

                <Button color='primary' onClick={onFormSubmit}>Sök</Button>
            </Form >
        </div >
    )
}
export default SearchForm;