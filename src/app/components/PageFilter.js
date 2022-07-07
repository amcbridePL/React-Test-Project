import React, { useState } from 'react';
import './PageFilter.scss'; 

export default function PageFilter(props) {
    const [filter, setFilterState] = useState(props.data);
    const [filterInfo, setFilerInfo] = useState({ filterType: '', value: ''})
    const [isDropdownOpen, toggleDropdown] = useState(false)
      
    function handleDropdownClick() {
        toggleDropdown(!isDropdownOpen);
    }
     
    function closeDropdown(){
        // toggleDropdown(false);
    }

    function radioButtonChange(e) {
        props.filter({ filterType: 'reviewed', value: e.target.value})
    }

    function checkboxSelect(e){
        props.filter({ filterType: 'fileType', value: e.target.value})
    }

    return(
        // filter title, filter status, dropdown below
        <div className='page-filter'>
            <span>Filters:</span>
            <div className='reviewed-filter'>
                <button onClick={handleDropdownClick}>
                    <span> { filter.filterName } </span>
                </button>
            </div>
            <div className={'filter-options' + (isDropdownOpen ? ' active' : '')}>
                <ul className='no-list-style'>
                    { filter.isRadioButtons && !filter.isCheckboxes ? 
                        filter.filterOptions.map( (option, index) => (
                            <li key={index}>
                                <label>
                                    <input type='radio' name={filter.filterName} onChange={radioButtonChange} value={option.value} />
                                        { option.label }
                                </label>
                            </li>
                        ))
                    :
                        filter.filterOptions.map( (option, index) => (
                            <li key={index}>
                                <label>
                                    <input type='checkbox' name={filter.filterName} onChange={checkboxSelect} value={option.value} />
                                        { option.label }
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}