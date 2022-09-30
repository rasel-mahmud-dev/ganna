import React, { FC } from 'react'
import './style.scss'

interface Props {
    data: any
    name: string
    type?: string
    label: string
    placeholder: string
    handleChange: any
}

const InputGroup: FC<Props> = (props) => {
    const { data, name, type = 'text', label, placeholder, handleChange } = props

    return (
        <div className="input-group">
            <label className="input-label" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                className="my-input"
                id={name}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                value={data[name]}
            />
        </div>
    )
}

export default InputGroup
