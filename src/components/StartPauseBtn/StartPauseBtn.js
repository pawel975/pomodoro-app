import './StartPauseBtn.scss';
import {BsFillPlayFill as PlayIcon} from 'react-icons/bs';
import {BsFillPauseFill as PauseIcon} from 'react-icons/bs';

const StartPauseBtn = ({handleStartPauseBtnClick, globalState}) => {

    const {isTimerRun, isLearningBlockActive} = globalState;

    let startPauseBtnIcon;

    if (!isLearningBlockActive) {
        startPauseBtnIcon = "Start"
    } else {
        if (isTimerRun) {
            startPauseBtnIcon = <PauseIcon className='start-pause-icon' data-testid="pause-icon"/>
        } else {
            startPauseBtnIcon = <PlayIcon className='start-pause-icon' data-testid="play-icon"/>
        }
    }

    return (
        <button 
            onClick={handleStartPauseBtnClick}
            className="start-pause-btn" 
            data-testid="start-pause-btn"
        >
            {startPauseBtnIcon}
        </button>
    )
}

export default StartPauseBtn;
