import {useSelector} from 'react-redux';

const AppearanceSectionThemeOption = ({themeId, themeName, handleThemeChange}) => {
    
    const globalStateReducer = useSelector(state => state.globalState);

    return (
        <label 
            onClick={(e) => handleThemeChange(e)}
            htmlFor={themeId}
            tabIndex="0"
            data-testid="theme-option"
        >
            <input 
                type="radio" 
                name='choose-theme'
                data-testid={themeId}
                checked={themeId === globalStateReducer.themeId}
                id={themeId}
                readOnly
            ></input>
            <span className='checkmark'>{themeName}</span>
        </label>
    )
}

export default AppearanceSectionThemeOption;