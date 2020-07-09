import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Badge, Container, Row, Col, Form, Input, Navbar, Nav,
  NavLink, NavItem,
} from 'reactstrap';
import { SEARCH_TAB, WRITE_TAB, VIEW_TAB } from '../../constants';
import WebSocket from '../../utils/WebSocket';
import HttpClient from '../../utils/HttpClient';

const LOGO = '/images/mmdok_vit_svart.png';

const Header = ({ activeTab, changeTab, filter }) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("In Use Effect");
    new HttpClient().count((i) => {setCount(i)});
    WebSocket(handleNewDocument);
    console.log("WebSocket set up");
  });

  const handleKeyUp = (e) => {
    filter(e.target.value);
    console.log("filter:" + e.target.value);
  }

  const handleNewDocument = (i) => {
    console.log("New document!!");
    setCount(count + i);
  }



  return (
    <header>
      <Navbar fixed="top" color="light" light expand="xs" className="d-flex border-bottom border-gray bg-white" style={{ height: 80 }}>
        <Container>
          <Row noGutters className="position-relative w-100 align-items-center">

            <Col className="d-flex d-lg-flex justify-content-start">
              <Nav className="mrx-auto" navbar tabs>

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">
                    <img src={LOGO} alt="avatar" className="img-fluid rounded-circle" style={{ height: 44, width: 64 }} />
                  </NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className={activeTab == SEARCH_TAB ? "font-weight-bold" : ""}
                    onClick={() => { changeTab(SEARCH_TAB); }}>Sökning</NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className={activeTab == WRITE_TAB ? "font-weight-bold" : ""}
                    onClick={() => { changeTab(WRITE_TAB); }}>Inläsning</NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className={activeTab == VIEW_TAB ? "font-weight-bold" : ""}
                    onClick={() => { changeTab(VIEW_TAB); }}>Document</NavLink>
                </NavItem>
              </Nav>
            </Col>

            <Col className="d-flex justify-content-xs-start justify-content-lg-center">
  <Badge color="success">{count}</Badge>
            </Col>

            <Col className="d-flex d-lg-flex justify-content-end">
              <Form inline>
                <Input type="text" className="mr-3" placeholder="Filtrera" onKeyUp={(v) => handleKeyUp(v)} />
              </Form>
            </Col>

          </Row>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header