import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../Redux/reducers/conterSlice';
import { useNavigate } from 'react-router-dom';
import './Counter.scss'; 

export default function Counter(props) {    // declarte Functional Component and Export 
    
    const countGlobal = useSelector((state) => state.count.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ count, setCounter] = useState(0)    // useState hook for component-wide state
    //when state changes, component re-renders

    console.log("Rendered")
    useEffect( () => {                          // hook that acts like   lifecycle methods
        console.log('Execute side effects');
        document.title = `Times Clicked: ${count}`;
    })
    
    // *nothing* => Every re-render of the component ( componentDidUpdate ) Ex: when state changes 
    // [] => Executes once, when component mounts ( componentDidMount )
    // [count] => The side effect will occur every time the dependency(count) changes ( componentDidUpdate )

        // if we change props the component will rerender but the useEffect will not run again
    // return statement for componetWillUnmount 
    
    const myJSX = <marquee>The System is Down</marquee>;
    
    function changeSharedState(){
        dispatch(increment())
    }
    
    function goToDocs() {
       navigate('/documents');
    }

    return(                                         // return statement for HTML, note the state variable 'count'
        <div className='wrapper'>            
            <div className='use-effect-example'>
                { myJSX }
                <h1 className='click-text'>
                    I have been clicked { count } times     {/* <= JSX */}
                </h1>     
                { count > 5 ?                              /* JSX Expression */
                    <h2>I AM greater than 5 </h2>
                :
                    <h3>I am NOT greater than 5</h3>
                }
                <button onClick={() => setCounter(count+1)}>
                    Increment
                </button>
            </div>
            <button onClick={changeSharedState}>Change Shared State</button>
            <button onClick={goToDocs}>Go To Docs</button>
        </div>
    )
}