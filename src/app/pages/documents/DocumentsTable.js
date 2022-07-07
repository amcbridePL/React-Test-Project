import React, {useEffect, useState} from 'react';
import './DocumentsTable.scss'
import DocumentDetails from './DocumentDetails';
import ScoreBar from '../../components/ScoreBar';

export default function DocumentsTable(props) {

    const [documentsData, setDocumentsData] = useState([]);
    const [selectedDocument, openDocument] = useState({document: {}, isOpen: false});

    useEffect( () => {
        if(props.documents) {
            setDocumentsData([...props.documents]);
        }
    }, [props?.documents])

    function toggleDropdown(document) {
        openDocument({
            isOpen: !selectedDocument.isOpen,
            document: document
        })
    }

    function sortBy(val){
        if(val == 'campaign'){
            let sortedDocs = documentsData.sort( (a,b) => a[val].localeCompare(b[val]));
            setDocumentsData([...sortedDocs]);
        }else if (val == 'page_score'){
            let sortedDocs = documentsData.sort( (a,b) => a.page_score - b.page_score);
            setDocumentsData([...sortedDocs]);
        }else{
            let sortedDocs = documentsData.sort( (a,b) => a.documents[val].localeCompare(b.documents[val]));
            setDocumentsData([...sortedDocs]);
        }   
    }

    return(
        <div className='documents-table'>
            <div className='documents-table-header'>
                <span className='column-header title' onClick={() => sortBy('title')}> Title </span>
                <span className='column-header type' onClick={() => sortBy('type')}> Type </span>
                <span className='column-header score' onClick={() => sortBy('page_score')}> Score </span>
                <span className='column-header date-uploaded' onClick={() => sortBy('upload_date')}> Date Uploaded </span>
                <span className='column-header submitter' onClick={() => sortBy('uploaded_by')}> Submitter</span>
                <span className='column-header campaign' onClick={() => sortBy('campaign')}> Campaign</span>
            </div>

            <div className='documents-table-body'>
                { documentsData?.length > 1 ? documentsData.map( (documentData, index)  => {
            return <div key={index} className='documents-table-row'>
                        <div className='column title-column'>
                            {documentData?.documents?.title}
                        </div>
                        <div className='column type-column'>
                            x
                        </div>
                        <div className='column score-column'>
                            <ScoreBar score={documentData?.page_score.toFixed(2)}></ScoreBar>
                        </div>
                        <div className='column date-uploaded-column'>
                            {documentData?.documents?.upload_date}
                        </div>
                        <div className='column submitter-column'>
                            {documentData?.documents?.uploaded_by}
                        </div>
                        <div className='column campaign-column'>
                            <span>{documentData?.campaign}</span>
                            <span>
                                <button className='expand-icon' aria-label='Expand details' onClick={() => toggleDropdown(documentData)}> 
                                    <svg style={{ width:'10px'}} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25'>
                                        <title>Expand details</title>
                                        <path d='M11.3 19.2L.6 8.3c-.7-.7-.7-1.8 0-2.5s1.8-.7 2.5 0l9.5 9.7 9.3-9.7c.7-.7 1.8-.7 2.5 0s.7 1.8 0 2.5L13.7 19.2c-.3.3-.8.5-1.2.5-.5.1-.9-.1-1.2-.5z'/>
                                    </svg>
                                </button>
                            </span>
                        </div>
                        { selectedDocument.document == documentData && selectedDocument.isOpen ?
                            <DocumentDetails key={index} document={selectedDocument.document}></DocumentDetails> : null
                        }
                    </div> 
                    })
                    : 
                    <div>
                        {/* or loading */}
                        <h1>Your filters returned no results, Clear Them to see all documents</h1> 
                    </div>
                }
            </div>
        </div>
    )
}