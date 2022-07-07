import React, { useEffect, useState } from 'react';
import './ScoreBar.scss';

export default function ScoreBar({ score }) {

    const [ scoreStatus, setScoreStatus ] = useState()

    useEffect(() => {
        gradeScore();
    }, [])

    function gradeScore(){
        score = roundScore()
        if (score >= 90){
            setScoreStatus('score-good');
        }else if(score >= 80 && score < 90){
            setScoreStatus('score-fair');
        }else if(score < 80){
            setScoreStatus('score-bad');
        }
    }

    function roundScore() {
        if(score < 0) score *= -1;
        return Math.round(score);
    }

    return (
        <div className='index-row-item' style={{whiteSpace: 'nowrap'}}>
            <div className={'score-wrapper ' + scoreStatus}>
                <strong className={'score-number' + scoreStatus}>
                    { roundScore(score)}
                </strong>
                <span className={'score-container '+ scoreStatus}>
                    <span className='score-bar'style={{width: '20px'}}
                    ></span>
                </span>
            </div>
        </div>
    )
}