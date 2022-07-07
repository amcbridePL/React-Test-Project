import React, {useEffect, useState} from 'react';
import './ProcessedDocuments.scss';

export default function ProcessedDocuments(props) {

    const [state, setState] = useState(props)

    useEffect( () => {
        setState(props)
    }, [props]) // rerender when new props are sent, from asynchronous parent method 

    function toggleDropdownView(){
        setState({
            ...state,
            isDropdownOpen: !state.isDropdownOpen 
        })
    }

    return(
        <div className={'wrapper' + (state.failed ? ' failed' : ' in-progress')}>
            {state.failed ?
                <span> The following documents are currently processing: <span className='processing-docs'>({state.documentsFailed?.length})</span> </span>
                : <span> The following documents have failed to process: <span className='failed-docs'>({state.documentsProcessing?.length}) </span> </span>
            }
        <button className='toggle-btn' onClick={toggleDropdownView}> Show/Hide (only visible to superusers)</button>
            <div className={'documents' + (state.isDropdownOpen ? ' active' : ' hidden')}>
                { state.failed ? 
                <div className='failed-documents-content'>
                    All Failed Docs
                </div>
                :
                <div className='processing-documents-content'>
                    All Processing Docs
                </div>
                }
            </div>       
        </div>
    )
}