import React, {useEffect, useState} from 'react';
import './DocumentDetails.scss';
import DocumentsService from '../../services/DocumentsService';
import Observation from '../../components/Observation';

export default function DocumentDetails (props) {

    const [detailState, setState] = useState({
        selectedDocument: props.document,
        details: {},
    })

    useEffect( () => {
        setState({ ...detailState, selectedDocument: props.document })
        getDetails()
    }, [props.document])

    async function getDetails() {
        let detailInfo = await DocumentsService.documentDetails(detailState.selectedDocument.entity_id);
        setState({ ...detailState, details: detailInfo.Results[0]})
    }

    // Wait to show until data is loaded, loading circle etc
    return(
        <div className='detail-wrapper index-detail grid-wrapper-12'>
            <div className='document-data grid-3 grid--paddded'>
                <h2>Details</h2>
                <button onClick={getDetails}>Details</button>
                <p>
                    <small>
                        <strong>ID:</strong>
                            { detailState.details.entity_id }
                    </small>
                </p>
                <div style={{ overflow:'hiden' }}>
                    <div className='detail-preview'>
                        <span className='detail-preview--options flex-grid'>
                        </span>
                        {/* detailState.details?.documents?.thumbnail */}
                        <img src={require('../../../assets/images/bagota-test-img.jpeg')} alt={'Thumbnail of '}></img>
                    </div>
                    <div className='detail-info'>
                        {detailState.details.documents?.uploaded_by ? 
                            <p>Uploaded by: <strong>{detailState.details?.documents?.uploaded_by} </strong> </p> : null }
                        {detailState.details.author ? 
                            <p> Author: {detailState.details.author} </p> : null }
                        {detailState.details.modification_date ? 
                            <p>Last modified: {detailState.details.modification_date} </p> : null }
                        {detailState.details?.storage_files?.images.length > 0 ? 
                            <p>{detailState.details?.storage_files?.images.length} pages </p> :
                            <p>{detailState.details?.storage_files?.images.length} page</p>}
                    </div>

                </div>
                <div className='flex-grid space-between'>
                    <h2 style={{ margin:'0px' }}> Cases</h2>
                    <div>
                    <a
                        className='inline-edit'
                        tabIndex='0'
                        title='Create new case with this document assigned'
                        aria-label='Create new case with this document assigned'
                        data-overlay='create'
                        data-js-trigger='click'
                        data-js-func='createCaseOverlay'
                        data-js-args='{{ param 1 }}'
                        style={{ marginRight:'10px'}} 
                    >
                        <svg role='presentation' xmlns='http://www.w3.org/2000/svg' style={{ height: '9px', marginBottom: '0'}} viewBox='0 0 50 50'><path d='M45.1 20.3H29.8V5c0-2.6-2.1-4.7-4.7-4.7s-4.8 2-4.8 4.7v15.4H4.9c-2.6 0-4.7 2.1-4.7 4.7s2.1 4.7 4.7 4.7h15.4v15.4c0 2.6 2.1 4.7 4.7 4.7s4.7-2.1 4.7-4.7V29.8h15.4c2.6 0 4.7-2.1 4.7-4.7s-2-4.8-4.7-4.8z'></path></svg>Create
                    </a>
                    <a
                        className='inline-edit'
                        tabIndex='0'
                        title='Assign this document to a case'
                        aria-label='Assign this document to a case'
                        data-overlay='assign'
                        data-js-trigger='click'
                        data-js-func='assignDocumentsOverlay'
                        data-js-args='{{ param 1 }}'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' style={{ height: '11px', marginBottom: '0'}} viewBox='0 0 50 50'><path d='M4 49.8c-1 0-1.9-.4-2.6-1.1-.9-.9-1.2-2.1-1-3.4l.4-2c.7-3.5 1.5-7.1 2.2-10.6.1-.9.6-1.7 1.2-2.4l5.1-5.1 7.2-7.2c5.6-5.6 11-11 16.5-16.6C34.1.3 35.4-.1 36.7 0h.3c.7.1 1.7.2 2.7.6C44 2.3 47.1 5.4 49 9.8c.4.7.5 1.5.6 2.1l.1.7c0 .2.1.5 0 .7-.1 1.2-.6 2.4-1.5 3.2-9.2 10-18.8 19.6-28.5 29.2-.7.7-1.5 1.1-2.5 1.4l-7.1 1.5-5.3 1.1c-.2.1-.5.1-.8.1zM36.6 5L20.8 20.8l-6.6 6.6c-2.1 2.1-4.2 4.2-6.3 6.5L6 42.8l-.4 1.7 10.7-2.2 7.1-7.1 21.9-21.9v-.2c-.1-.5-.2-.9-.4-1.2-1.4-3.1-3.6-5.3-6.7-6.6-.5-.2-1.1-.2-1.6-.3zm-.2 0'/></svg>Assign
                    </a>
                    </div>
                </div>
                <ul className='no-list-style cases_attached_list'>
                    <li>
                        <a className='clickable-card'>
                            BagotaCase3 <br/>
                            <small>Escalated</small>
                        </a>
                    </li>
                </ul>
            </div>

            <div className='grid-9 entity-details'>
                <div className='grid-wrapper-12'>

                    <div className='grid-8 grid--padded detail-content'>
                        <h2>Document Content</h2>
                        <ul className='detail-content-text'>
                            {/* <p className='centered'><img width='150' src={require('../../assets/images/loader.gif')} alt='Loading'/></p> */}
                            <li>10 BEST THINGS TO DO</li>
                            <li>IN BOGOTA, COLUMBIA</li>
                        </ul>

                    </div>

                    <div className='grid-4 grid--padded detail-observations'>
                        <h2>
                            Observations
                            <form className='float-right' action='/media/v1/score/?next=/documents?id={{ param 1 }}' method='POST' id='rescore_{{ param 1 }}'>
                                <input type='hidden' name='entity_id' value='{{ param 1 }}'/>
                                <button
                                    className='inline-edit rescore-btn'
                                    form='rescore_{{ param 1 }}'
                                    title='Rescore this document if rules have changed'
                                    aria-label='Rescore this document if rules have changed'
                                    style={{margin: 0}}
                                    >
                                    <svg style={{marginBottom: '-0.05em'}} role='presentation' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path d='M27.4 49.5c9.9-1.1 17.8-9 19-18.9 1.5-12.9-8.6-24-21.2-24.1V.7c0-.3-.4-.5-.7-.3l-12 8.8c-.2.2-.2.4 0 .6l12 8.8c.3.2.7 0 .7-.3v-5.8c8.9.1 16 7.7 15.4 16.7-.5 7.8-6.8 14-14.6 14.5-8.2.5-15.2-5.3-16.5-13.1-.2-1.4-1.5-2.5-2.9-2.5-1.8 0-3.2 1.6-2.9 3.4 1.6 11.1 11.8 19.4 23.7 18z'/></svg>
                                    Rescore
                                </button>
                            </form>
                        </h2>
                        <ul className='no-list-style observations--rules-list'>
                                <Observation></Observation>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}