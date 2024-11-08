'use client'

import { useCallback, useState } from 'react'
import { fetchSearchResults } from '@/api/tomTomApi.tsx'
import debounce from 'lodash.debounce'
import SelectBoxRadius from '@/components/csr/SelectBoxRadius'
import { useLocations } from '@/hooks/locations'
import { useAuth } from '@/hooks/auth'

export default function SearchInput() {
    const [inputValue, setInputValue] = useState('')
    const [resultsList, setResultsList] = useState([])
    const [errors, setErrors] = useState([])

    const {saveLocations} = useLocations();
    const { user } = useAuth(); // Call useAuth() to get the user object

    const getSearchResults = useCallback(async query => {
        if (query.length >= 3) {
            const response = await fetchSearchResults({ query })
            const formatted = response.results.map(result => ({
                id: result.id,
                locationId: result.id,
                name: result.address?.freeformAddress,
                longitude: result.position.lon,
                latitude: result.position.lat,
            }))
            setResultsList(formatted)
        }
    }, [])


    const debouncedFetchResults = useCallback(
        debounce(nextValue => getSearchResults(nextValue), 500),
        [],
    )

    const handleInputChange = event => {
        setInputValue(event.target.value)
        debouncedFetchResults(event.target.value)
    }

    const handleSelectLocation = async (location) => {


        if (user) {
            console.log('is logged in');
            console.log(user, location);
            await saveLocations(setErrors,location).then(() => user);
            setInputValue('')
        } else {
            // Retrieve the current locations array from sessionStorage
            const storedLocations = JSON.parse(sessionStorage.getItem('location')) || [];

            // Add the new location to the array
            const updatedLocations = [...storedLocations, location];

            // Save the updated array back to sessionStorage
            sessionStorage.setItem('location', JSON.stringify(updatedLocations));

            console.log(user, location);
            setInputValue('');
        }


    }

    return (
        <>
            <div className="relative w-full mt-4 flex flex-col justify-center  text-sm text-gray-700 tracking-tight   text-center">
                <div className="flex flex-row items-center justify-between   rounded-xl border-2 border-yellow-300 bg-white">
                    <input
                        className="m-1 px-4 py-4  w-2/3 max-w-xl border-y-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0"
                        placeholder="Search by location"
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                </div>
                {resultsList.length > 0 && inputValue.length > 2 ? (
                    <div
                        className="absolute top-14 w-full mt-0.5 z-50  bg-white rounded-b-xl border-b-2 border-x-2 border-yellow-300 text-left divider-x divider ">
                        <ul className="max-h-72 overflow-y-scroll ">
                            {
                                resultsList.map((location) => (
                                    <li
                                        key={location.id}
                                        onClick={() => handleSelectLocation(location)}  // Wrap in an arrow function

                                        className="w-full text-lg font-bold border-t border-gray-300 py-2 hover:bg-yellow-50 hover:rounded-b-lg cursor-pointer">
                                           <span className="px-3">
                                               {location.name}
                                           </span>
                                    </li>
                                ))
                            }

                        </ul>

                    </div>
                ) : <div />
                }
            </div>
        </>
    )
}
