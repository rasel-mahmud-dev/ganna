import React, { FC } from 'react'
import '../selectGroup/style.scss'

interface Props {
    data: any
    name: string
    type?: string
    label: string
    placeholder: string
    handleChange: any
}

const TextareaGroup: FC<Props> = (props) => {
    const { data, name, type = 'text', label, placeholder, handleChange } = props

    return (
        <div className="input-group">
            <label className="input-label" htmlFor={name}>
                {label}
            </label>
            <textarea
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

export default TextareaGroup
