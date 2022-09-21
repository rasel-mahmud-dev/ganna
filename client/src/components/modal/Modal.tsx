import React, {FC, SyntheticEvent} from 'react';
import "./style.scss"

type Props = {
    isOpen: boolean,
    onCloseModal: () => void
    children: React.ReactNode
    modalClass?: string
    backdropClass?: string
}

const Modal: FC<Props> = (props) => {
    const {isOpen, backdropClass,  modalClass, onCloseModal} = props;
    
    function handleCloseModal(e: SyntheticEvent){
        let el = e.target as HTMLDivElement
        if(el.classList.contains("modal-backdrop")){
            onCloseModal()
        }
    }
    
    return (
        <div className={`modal-backdrop ${backdropClass} ${isOpen ? "" :  "modal-backdrop__close"}  `} onClick={handleCloseModal}>
            <div className={`${modalClass} modal`}>
                 {props.children}
            </div>
        </div>
    );
};

export default Modal;