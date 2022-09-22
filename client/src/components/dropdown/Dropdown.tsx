import React, {FC, SyntheticEvent} from 'react';
import "./style.scss"

interface Props{
    isOpen: boolean
    children: React.ReactNode
    onClose: ()=> void
}

const Dropdown: FC<Props> = ({isOpen, onClose, children}) => {
    function handleClose(e: SyntheticEvent){
        // prevent parent click
        e.stopPropagation();
        const el = e.target as HTMLDivElement;
        if(el.classList.contains("dropdown-backdrop")) {
            onClose()
        }
    }
    
    return (<>
            {isOpen && <div className="dropdown-backdrop" onTouchStart={handleClose} onClick={handleClose}></div> }
            <div className={`dropdown ${isOpen ? "open-dropdown" : ''} `}>
                {children}
            </div>
        </>
    );
};

export default Dropdown;