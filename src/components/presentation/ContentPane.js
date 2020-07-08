import React, { Component, Fragment } from 'react';
import { SEARCH_TAB, WRITE_TAB, VIEW_TAB } from '../../constants';
import SearchTab from './SearchTab';
import WriteTab from './WriteTab';
import ViewTab from './ViewTab';

const ContentPane = ({ activeTab }) => {
    console.log("--ACTIVE TAB RECEIVED...:" + activeTab);
    if ( activeTab  === WRITE_TAB) {
        return <WriteTab/>
    }
    else if ( activeTab  === VIEW_TAB) {
        return <ViewTab/>
    }
    else  { // activeTab  === SEARCH_TAB) {
        return (<SearchTab/>)
    }
}

export default ContentPane;

