'use client'

import React, {useState} from 'react'
import {  Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const data = [
    { id: 0, name: "Any" ,value: 0},
    { id: 1, name: 1 ,value: 1},
    { id: 2, name: 2 ,value: 2},
    { id: 3, name: 3 ,value: 3},
    { id: 4, name: 4 ,value: 4},
    { id: 5, name: 5 ,value: 5},
    { id: 6, name: 6 ,value: 6},
    { id: 7, name: 7,value: 7},
    { id: 8, name: 8 ,value: 8},
    { id: 9, name: 9 ,value: 9},
    { id: 10, name: 10 ,value: 10},
    { id: 11, name: "11+" ,value: 11},
]

const SelectBoxNumber = ({ onChange, name }) => {
    const [selected, setSelected] = useState({ id: 0, name: "Any", value: 0 })

    const handleChange = (value) => {
        setSelected(value)
        onChange(value)
    }
    return (
        <Listbox value={selected} onChange={handleChange}>
           <div className="relative">
                <ListboxButton className="relative w-full cursor-default rounded-xl bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {data.map((person) => (
                        <ListboxOption
                            key={`${name}-${person.id}`}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-yellow-300 data-[focus]:text-white"
                        >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.name}</span>

                            <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
export default SelectBoxNumber
