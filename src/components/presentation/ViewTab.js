import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { PDFObject } from 'react-pdfobject'
import Header from '../container/Header';

const ViewTab = () => {

    const [url, setUrl] = useState(null);

    function base64ToArrayBuffer(base64) {
        var binaryString = atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
     }
     
    useEffect(() => {
       async function getUrl() {
        const key = sessionStorage.getItem('key');
        const bucket = sessionStorage.getItem('bucket');
        const result = await window.app.functions.download(key, bucket);
        //const b64 = btoa(String.fromCharCode.apply(null, result.buffer));
        //const bytes = base64ToArrayBuffer(b64);
        const blob = new Blob([result.buffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setUrl(url);
       }
       getUrl();
    }, [])




    return (
        <Container className="px-0">
            <Header/>
            <Row className="">
                <Col key={1} xs={{ order: 1 }} md={{ size: 12, order: 1 }} tag="aside">
                <PDFObject url={url} height="800px" />
                </Col>
            </Row>
        </Container>
    )
}

export default ViewTab;