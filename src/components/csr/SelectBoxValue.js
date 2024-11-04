'use client'

import React, {useEffect, useState} from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const data = [
    { id: 1, value: 0, text: "Any" }, // Assuming empty string represents "Any", converting to 0
    { id: 2, value: 50000, text: "50,000" },
    { id: 3, value: 60000, text: "60,000" },
    { id: 4, value: 70000, text: "70,000" },
    { id: 5, value: 80000, text: "80,000" },
    { id: 6, value: 90000, text: "90,000" },
    { id: 7, value: 100000, text: "100,000" },
    { id: 8, value: 110000, text: "110,000" },
    { id: 9, value: 120000, text: "120,000" },
    { id: 10, value: 125000, text: "125,000" },
    { id: 11, value: 130000, text: "130,000" },
    { id: 12, value: 140000, text: "140,000" },
    { id: 13, value: 150000, text: "150,000" },
    { id: 14, value: 160000, text: "160,000" },
    { id: 15, value: 170000, text: "170,000" },
    { id: 16, value: 175000, text: "175,000" },
    { id: 17, value: 180000, text: "180,000" },
    { id: 18, value: 190000, text: "190,000" },
    { id: 19, value: 200000, text: "200,000" },
    { id: 20, value: 210000, text: "210,000" },
    { id: 21, value: 220000, text: "220,000" },
    { id: 22, value: 230000, text: "230,000" },
    { id: 23, value: 240000, text: "240,000" },
    { id: 24, value: 250000, text: "250,000" },
    { id: 25, value: 260000, text: "260,000" },
    { id: 26, value: 270000, text: "270,000" },
    { id: 27, value: 280000, text: "280,000" },
    { id: 28, value: 290000, text: "290,000" },
    { id: 29, value: 300000, text: "300,000" },
    { id: 30, value: 325000, text: "325,000" },
    { id: 31, value: 350000, text: "350,000" },
    { id: 32, value: 375000, text: "375,000" },
    { id: 33, value: 400000, text: "400,000" },
    { id: 34, value: 425000, text: "425,000" },
    { id: 35, value: 450000, text: "450,000" },
    { id: 36, value: 475000, text: "475,000" },
    { id: 37, value: 500000, text: "500,000" },
    { id: 38, value: 550000, text: "550,000" },
    { id: 39, value: 600000, text: "600,000" },
    { id: 40, value: 650000, text: "650,000" },
    { id: 41, value: 700000, text: "700,000" },
    { id: 42, value: 800000, text: "800,000" },
    { id: 43, value: 900000, text: "900,000" },
    { id: 44, value: 1000000, text: "1,000,000" },
    { id: 45, value: 1250000, text: "1,250,000" },
    { id: 46, value: 1500000, text: "1,500,000" },
    { id: 47, value: 1750000, text: "1,750,000" },
    { id: 48, value: 2000000, text: "2,000,000" },
    { id: 49, value: 2500000, text: "2,500,000" },
    { id: 50, value: 3000000, text: "3,000,000" },
    {id: 51, value: 4000000,text: "4,000,000" },
    {id: 52,  value: 5000000, text: "5,000,000" },
    {id: 53,  value: 7500000, text: "7,500,000" },
    {id: 54,  value: 10000000,text: "10,000,000" },
    {id: 55,  value: 15000000,text: "15,000,000" },
    {id: 56,  value: 20000000,text: "20,000,000" },

]

const SelectBoxValue = ({ onChange, name }) => {
    const [selected, setSelected] = useState({ id: 1, "value": 0,text: "Any" })
    const handleChange = (item) => {
        setSelected(item)
        onChange(item)
        console.log(item)
    }
        return (
        <Listbox value={selected} onChange={handleChange}>
           <div className="relative">
                <ListboxButton className="relative w-full cursor-default rounded-xl bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6">
                    <span className="block truncate">£{selected.text}</span>
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
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">£{person.text}</span>

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
export default SelectBoxValue
