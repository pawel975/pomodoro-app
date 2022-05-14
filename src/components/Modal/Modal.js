import './Modal.scss';
import {IoMdClose as CloseIcon} from 'react-icons/io' 

const Modal = ({setIsModalOpen, content}) => {

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="modal" data-testid="modal">
            <div onClick={handleModalClose} className='modal__background'></div>
            <div className='modal__container'>
                <header>
                    <div className='modal__choose-tab-list' role='tablist'>
                        <button aria-pressed='true'>Settings</button>
                        <button aria-pressed='false'>Statistics</button>
                    </div>
                    <button onClick={handleModalClose} className='modal__close-btn'>
                        <span className='sr-only'>close modal</span>
                        <CloseIcon className='modal__close-btn-icon'/>
                    </button>
                </header>
                <div className='modal__content'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Modal;