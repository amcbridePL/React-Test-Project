import React, { useState } from 'react';
import './Modal.scss';

export default function Modal(props) {

    const [ modalContent, setModalContent ] = useState({ 
        title: props.title,
        mainContent: props.children
    });

    return(
        <div className='overlay showing'>
            <div className='modal-container'>
                <a className='modal-close' role='button' tabIndex='0' aria-label='Close Overlay' onClick={props.emitClose}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
                        <title>Close overlay</title>
                        <path d='M42.6 35.9L31.7 25.1l10.9-10.9c1.9-1.9 1.9-4.9 0-6.7s-4.9-1.9-6.7 0L25 18.4 14.1 7.5c-1.9-1.9-4.9-1.9-6.7 0s-1.9 4.9 0 6.7l10.9 10.9L7.4 35.9c-1.9 1.9-1.9 4.9 0 6.7 1.9 1.9 4.9 1.9 6.7 0L25 31.8l10.9 10.9c1.9 1.9 4.9 1.9 6.7 0s1.9-4.9 0-6.8z'/>
                    </svg>
                </a>
                <div className='modal-content'>
                    <div className='modal-header'>
                        { modalContent.title }
                    </div>
                    <div className='modal-body'>
                        <form>
                            { modalContent.mainContent}
                        </form>
                    </div>
                    <div className='modal-footer'>
                    </div>
                </div>
            </div>
        </div>
    )
}