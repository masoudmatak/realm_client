import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../container/Header';
import SearchForm from '../container/SearchForm';
import Paging from '../container/Paging';

const SearchTab = () => (
    <Container className="px-0">
        <Header/>
        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
            <Col key={1} xs={{ order: 1 }} md={{ size: 2, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
                <SearchForm/>
            </Col>
            <Col key={2} xs={{ order: 2 }} md={{ size: 9, offset: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
                <Paging/>
            </Col>
        </Row>
    </Container>
)

export default SearchTab;