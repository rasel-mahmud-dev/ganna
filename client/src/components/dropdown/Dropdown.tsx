import React, {FC} from 'react';
import "./style.scss"

interface Props{
    isOpen: boolean
    children: React.ReactNode
}

const Dropdown: FC<Props> = ({isOpen, children}) => {
    return (
        <div className="dropdown">
            {children}
        </div>
    );
};

export default Dropdown;