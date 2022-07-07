import React, { useState } from 'react';
import './PageSearch.scss';

export default function PageSearch(props) {

    const [searchInfo, setSearchInfo] = useState({searchType: 'title', searchText: '', cleanSearch: false});

    function searchIndex(){
        props.search(searchInfo);
    }

    function updateSearch(e) {
        setSearchInfo({
            ...searchInfo, [e.target.name]: e.target.value, cleanSearch: e.target.value == 'id' ? true : false
        })
    }



    return (
        <div className='grid-5 search-bar-wrapper'>
            <div className='search-bar'>
                <input type='text' onChange={updateSearch} name='searchText' placeholder='Search documents' autoComplete='off'/>
                <button className='button button--solid' onClick={searchIndex}>Search</button>
                <div className='search-options'>
                    <label className='block-label'>
                        <input type='radio' onChange={updateSearch} name='searchType' value='title' defaultChecked/> Search document titles
                    </label>
                    <label className='block-label'>
                        <input type='radio' onChange={updateSearch} name='searchType' value='keyword'/> Search document content
                    </label>
                    <label className='block-label'>
                        <input className='clean-search' onChange={updateSearch} type='radio' name='searchType' value='id'/> Search document ID
                    </label>
                    <small>Cannot search characters <strong>:</strong> or <strong>/</strong>.<br/><strong>Hint:</strong> <strong>|</strong> means 'or.' Ex: 'test|testing'. </small>
                </div>
            </div>
        </div>
    
    )
}