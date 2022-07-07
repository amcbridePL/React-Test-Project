import React, {useState} from 'react';
import './Observation.scss'

export default function Observation() {

    const [dropdownContent, setDropdownContent] = useState({})
    return(
        <div> 
            <a className='clickable-card red dropdown-icon'>
                <span>
                    <small>Required Rule</small>
                    Observation Name Goes Here
                    <button className='dropdown-btn'>^</button>
                </span>
            </a>
            { !dropdownContent.isOpen ? 
                <ul className='dropdown-content no-list-style'>
                    <small>These required terms were not found</small>
                    <li className='observation-term required'>Dogs</li>
                    <li className='observation-term required'>Cats</li>
                </ul>
                    
            : null
            }
        </div>
    )
}