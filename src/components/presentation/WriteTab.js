import React, {useRef} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../container/Header';
import MetadataForm from '../container/MetadataForm';
import Filelist from './Filelist';

const WriteTab = () => {
    const metadataView = useRef();

    const getMetadata = () => {
        return metadataView.current.getMetadata();
    }

    const getMetadataRealms = () => {
        return metadataView.current.getMetadataRealms();
    }

    return (
        <Container className="px-0">
            <Header />
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
                <Col key={1} xs={{ order: 1 }} md={{ size: 3, order: 1 }} tag="aside"
                    className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
                    <MetadataForm ref={metadataView} />
                </Col>
                <Col key={2} xs={{ order: 2 }} md={{ size: 7, order: 2, offset: 1 }} tag="section"
                    className="py-5 mb-5 py-md-0 mb-md-0">
                    <Filelist metadata={getMetadata} metadataRealms={getMetadataRealms}/>
                </Col>
            </Row>
        </Container>
    )
}

export default WriteTab;