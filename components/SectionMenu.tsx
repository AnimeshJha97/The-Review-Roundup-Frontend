import React, { useState, useEffect } from 'react'
import { FunctionExpression } from 'typescript'

interface propType {
    menu: string[],
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
    selectedItem: string
}

const SectionMenu = ({ menu, setSelectedItem, selectedItem }: propType) => {

    return (
        <div className="flex items-center gap-8 text-textWhite">
            {menu.map((menuItem: string, i: number) => (
                <div key={i} className='flex items-center'>
                    <p
                        className={menuItem === selectedItem ? "text-primary cursor-pointer text-md border-b-primary border-b-2" : "hover:text-primary cursor-pointer text-md"}
                        onClick={() => setSelectedItem(menuItem)}
                    >{menuItem}</p>
                    {i < menu.length - 1 && (
                        <svg width="3" height="28" className='ml-8' viewBox="0 0 3 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2.73628L3 0V28L0 25.5823V2.73628Z" fill="#02DAC5" />
                        </svg>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SectionMenu