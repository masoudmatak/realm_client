import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import Documentlist from '../container/Documentlist';

const LOGO = '/images/mmdok_vit_svart.png';

const Paging = ({ currentPageNo, pageCount, changePage }) => {

  return (
    <Fragment>
      <Documentlist />
      <div className="pagination-wrapper">
        <Pagination>
          <PaginationItem disabled={currentPageNo <= 0}>
            <PaginationLink
              onClick={e => changePage(e, currentPageNo - 1)}
              previous
              href="#"
            />
          </PaginationItem>
          {[...Array(pageCount)].map((page, i) =>
            <PaginationItem active={i === currentPageNo} key={i}>
              <PaginationLink onClick={e => changePage(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem disabled={currentPageNo >= pageCount - 1}>
            <PaginationLink
              onClick={e => changePage(e, currentPageNo + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </div>
    </Fragment>
  );
}


export default Paging;