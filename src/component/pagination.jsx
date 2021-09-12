import React from 'react';
import _ from "lodash";
import PropTypes from 'prop-types'
import { paginate } from './../utils/paginate';

const Pagination = props => {
    const {pageSize, itemsCount, currentPage, onPageChange} = props;
    console.log(currentPage)
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1,pageCount+1);

    return ( <nav >
    <ul className="pagination" >
        {pages.map(page => 
        <li key={page} className={page === currentPage ? "page-item active" :"page-item"}>
            <a className="page-link" key={page._id} onClick={()=>onPageChange(page)}>{page}</a>
            </li>)}
      
      
    </ul>
  </nav> );
}
 paginate.PropTypes={
    pageSize: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
 }
export default Pagination;