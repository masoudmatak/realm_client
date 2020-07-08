import React, {Fragment, useRef,  useState } from 'react'
import PropTypes from 'prop-types'
import MetadataView from './MetadataView'

import {
  Table
} from 'reactstrap';

const LOGO = '/images/mmdok_vit_svart.png';

const Documentlist = ({ documents, showDocument, sort, update }) => {

  const metadataView = useRef();
  const getDocuments = () => documents == null ? [] : documents;

  const getKeys = () => {
    return getDocuments().length > 0? Object.keys(getDocuments()[0]).slice(0,3) : [];
  }

  const getHeader = () => {
    var keys = getKeys();
    return keys.map((key, index) => {
      return <th onClick={e => handleHeaderClick(e, index)} key={key}>
              {key.toUpperCase()}
              </th>
    })
  }

  const getRows = () => {
    var keys = getKeys();
    return getDocuments().map((row, index) => {
        return <tr key={index}><RenderRow key={index} row={index} data={row} keys={keys} callback={handleRowClick}/>
               </tr>
    })
  }

  const handleHeaderClick = (e, index) => {
    e.preventDefault();
    const column = getKeys()[index];
    sort(column);
  }

  const handleRowClick = (rowIndex) => {  
    const o = documents[rowIndex];
    const metadata = {};
    for (var property in o) {
      if (!o.hasOwnProperty(property)) continue;
        metadata[property] = o[property];
    }
    sessionStorage.setItem('metadata', metadata);
    //metadataView.current.toggle();
    metadataView.current.toggle(metadata);
  }

  const updateDocument = (metadata) => {
    console.log(metadata['_index']);
    update(metadata);
  }

  return (
    <Fragment>
      <div>
        <Table striped hover>
          <thead>
            <tr>{getHeader()}</tr>
          </thead>
          <tbody>
            {getRows()}
          </tbody>
        </Table>
      </div>
      <MetadataView ref={metadataView} showDocument={showDocument} updateDocument={updateDocument} />
    </Fragment>
  );
}

const tdStyle = {
  whiteSpace: 'normal',
  wordWrap: 'break-word'
};
const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    const value = props.data[key] != null? props.data[key].value : "UNDEFINED";
    return <td key={key} style={tdStyle} onClick={e => props.callback(props.row)}>{value}</td>
  })
}
  
export default Documentlist;