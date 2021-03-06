import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './RemainTimeBar.scss';

const RemainTimeBar = () => {
 
    const globalStateReducer = useSelector(state => state.globalState);
    const remainLearnTimeReducer = useSelector(state => state.remainLearnTime);
    const remainBreakTimeReducer = useSelector(state => state.remainBreakTime);
    
    const {initBreakTime, initLongBreakTime, initLearnTime, isLearnPhaseActive, currentSession, maxSession} = globalStateReducer;

    // Gets default font size for current resolution without 'px'
    const htmlFontSize = window.getComputedStyle(document.documentElement).getPropertyValue("font-size").slice(0,-2)

    const circleRef = useRef(null);
    const defaultStrokeArray = 1458 * (htmlFontSize / 16);
    
    const [strokeOffset, setStrokeOffset] = useState(defaultStrokeArray)

    const refreshRemainTime = useCallback(() => {
        
        if (isLearnPhaseActive) {

            const offset = defaultStrokeArray - (defaultStrokeArray * (remainLearnTimeReducer / initLearnTime))

            if (offset > 0) {
                setStrokeOffset(offset)
            } else {
                setStrokeOffset(1);
            }

        } else {
            
            const currentBreakType = currentSession === maxSession ? initLongBreakTime : initBreakTime;

            const offset = defaultStrokeArray - (defaultStrokeArray * (remainBreakTimeReducer / currentBreakType))
            
            if (offset > 0) {
                setStrokeOffset(offset)
            } else {
                setStrokeOffset(1);
            }
        }

    },[currentSession, defaultStrokeArray, initBreakTime, initLearnTime, initLongBreakTime, isLearnPhaseActive, maxSession, remainBreakTimeReducer, remainLearnTimeReducer])
    
    useEffect(() => {
        refreshRemainTime();
        // Sets svg progress bar to being reponsive on window size change
        circleRef.current.style.strokeDashoffset = 0;
        circleRef.current.style.strokeDasharray = defaultStrokeArray;
    },[defaultStrokeArray, refreshRemainTime])
    
    return (
        <div className='remain-time-bar__container' data-testid="remain-time-bar">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30rem" height="30rem">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stopColor="#ff52c2" />
                        <stop offset="100%" stopColor="#673ab7" />
                    </linearGradient>
                </defs>
                <circle
                    ref={circleRef}
                    style={{strokeDashoffset: strokeOffset > 0 ? strokeOffset : 1}} className='remain-time-bar__stroke' data-testid='remain-time-bar__stroke' cx="50%" cy="50%" r="14.5rem"  />
            </svg>
        </div>
    )
}

export default RemainTimeBar;