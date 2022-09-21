import React, {FC, useEffect, useState} from "react";
import "./style.scss"


interface Props {
    name: string,
    type?: string
    value?: any[]
    label: string,
    multiple?: boolean
    placeholder: string,
    handleChange: any
    dataLabel: string
    dataIndex: string
    renderOptions: (click: any) => React.ReactNode
}


const SelectGroup:FC<Props> = (props)=>{
    
    const {
        name,
        value,
        dataLabel,
        multiple,
        dataIndex,
        renderOptions,
        label,
        placeholder,
        handleChange
    } =  props
    
    const [open, setOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<any>([])
    
    useEffect(()=>{
        if(value?.length) {
            setSelectedOptions(value)
        }
    }, [value?.length !== selectedOptions.length])
    
    // toggle items
    function onClick(item: any){
        let updateState = [...selectedOptions]
        const index = updateState.findIndex((i: any) =>i [dataIndex] === item[dataIndex])
        
        if(index === -1) {
            if(multiple) {
                updateState.push(item)
            } else {
                updateState = [item]
                setOpen(false)
            }
        } else {
            updateState.splice(index, 1);
        }
        setSelectedOptions(updateState)
        handleChange({target: { name, value: updateState }})
    }
    
    // remove selected item from local state and fire change event
    function handleRemove(item: any){
        let remain = selectedOptions.filter((i: any)=>i[dataIndex] !== item[dataIndex])
        setSelectedOptions(remain)
        handleChange({target: { name, value: remain }})
    }
    
    const icon = <div>
        { open
            ? <svg onClick={()=>setOpen(!open)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"/></svg>
            : <svg onClick={()=>setOpen(!open)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z"/></svg>
        }
    </div>
    
    const closeIcon = (item: any) => <svg onClick={()=>handleRemove(item)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>
    
    return (
      <div className="input-group select-group">
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
        <div
          className="my-input"
          id={name}
          placeholder={placeholder}
          onChange={handleChange}
        >
          <div className="custom-placeholder">
            {selectedOptions.length ? (
              <div className="selected-list-root">
                <div className="selected-list">
                  {selectedOptions.map((selected: any) => (
                    <div className="selected">
                      <span>{selected[dataLabel]}</span>
                      {closeIcon(selected)}
                    </div>
                  ))}
                </div>
                {icon}
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span
                  onClick={() => setOpen(!open)}
                  className="custom-placeholder-text"
                >
                  {placeholder}
                </span>
                {icon}
              </div>
            )}
          </div>

          {/* options jsx render */}
          {open && (
            <div className="select-options">{renderOptions(onClick)}</div>
          )}
          
        </div>
      </div>
    );
}

export default SelectGroup