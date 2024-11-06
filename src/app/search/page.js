'use client'
import { useRouter } from 'next/navigation'
import Header from '@/components/ssr/Header'
import SearchInput from '@/components/csr/SearchInput'
import { useEffect, useState } from 'react'
import { useSearch } from '@/hooks/search'
import SelectBoxType from '@/components/csr/SelectBoxType'
import SelectBoxNumber from '@/components/csr/SelectBoxNumber'
import SelectBoxValue from '@/components/csr/SelectBoxValue'
import SelectBoxRadius from '@/components/csr/SelectBoxRadius'
import { encodePayload,getSessionStore } from '@/lib/utils'
import { useAuth } from '@/hooks/auth'
import { useLocations } from '@/hooks/locations'
import { MaxOfferFilter, NumberBox } from '@/static/MaxOfferFilter'


const Search = () => {
    const router = useRouter()
    const { user, loading } = useAuth()
    const [errors, setErrors] = useState([])
    const { removeLocations } = useLocations()

    const [max, setMax] = useState()
    const [maxUrl, setMaxUrl] = useState()
    const [minBedrooms, setMinBedrooms] = useState()
    const [maxBedrooms, setMaxBedrooms] = useState()
    const [maxBathrooms, setMaxBathrooms] = useState()
    const [minBathrooms, setMinBathrooms] = useState()
    const [locations, setLocations] = useState([])

    const [selectedType, setSelectedType] = useState({ id: 1, name: 'All' }) // Default selection
    const [selectedRadius, setSelectedRadius] = useState({ id: 1,value: 0.0, text: "This area only"})

    // Effect for setting locations
    useEffect(() => {
        const fetchLocations = async () => {
            if (user) {
                setLocations(user.locations || [])
            } else {
                const storedData = getSessionStore('location')
                setLocations(Array.isArray(storedData) ? storedData : [])
            }
        }

        fetchLocations()
    }, [user, loading])
    // Log locations when they change
    useEffect(() => {
        console.log('Updated locations:', locations)
    }, [locations]) // Track state changes

    const handleRadiusChange = (newRadius) => {
        setSelectedRadius(newRadius)
        console.log('Selected radius:', newRadius)
        // Additional logic can go here
    }
    const handleTypeChange = (newValue) => {
        setSelectedType(newValue)
        // You can also do other things here, like logging or calling other functions
        console.log('Selected type:', newValue)
    }

    const handleMaxOffer = (newValue) => {
        setMaxUrl(newValue.value)
        setMax(newValue)
    }
    const handleMaxBedroomChange = (newValue) => {
        setMaxBedrooms(newValue.value)
    }

    const handleMinBedroomChange = (newValue) => {
        setMinBedrooms(newValue.value)
    }
    const handleMaxBathroomChange = (newValue) => {
        setMaxBathrooms(newValue.value)
    }

    const handleMinBathroomChange = (newValue) => {
        setMinBathrooms(newValue.value)
    }

    const handleRemoverLocation = async (location) => {
      await removeLocations(setErrors,location.locationId)
    }



    const { search } = useSearch()
    const submitForm = async event => {
        event.preventDefault()
        const searchParams ={
            'radius':selectedRadius.value,
            'type': selectedType.name,
            'maxOffer': maxUrl,
            'minBedrooms':  minBedrooms,
            'maxBathrooms':  maxBathrooms,
            'minBathrooms':  minBathrooms,
            'maxBedrooms':  maxBedrooms,
            'order':'distance'
        }
        const queryString = new URLSearchParams(searchParams).toString()
        router.push(`/search/results?${queryString}`)
    }


    return (
        <>
            <Header bgColor={'bg-blue-50'} />
            <form onSubmit={submitForm} >
                <div className="bg-white h-full">
                    <div className="bg-blue-50 w-screen  ">
                        <div className="flex flex-col max-w-7xl mx-auto px-10">
                            <div className="w-full lg:w-8/12 mx-auto mt-10 pb-24">
                                <h1 className="text-md md:text-3xl font-bold tracking-tight text-gray-900  text-left md:text-center">
                                    Search for properties
                                </h1>
                                <div className="flex flex-row items-center">
                                    <SearchInput />
                                    <div className="m-0.5 px-1 py-1 w-1/3">
                                        <SelectBoxRadius selected={selectedRadius} onChange={handleRadiusChange}
                                                         name="radius" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center  justify-start my-1 gap-2">

                                    {locations.length > 0 ? (

                                        locations.map((location) => (

                                            <span key={location.name + '-location'}
                                                  className="inline-flex justify-between items-center gap-x-0.5 rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-black">
                                           <span className="max-w-[180px] truncate hover:truncate-0">
                                                {location.name}
                                           </span>

                                            <button type="button" onClick={()=>handleRemoverLocation(location)}
                                                    className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-yellow-600/20">
                                                <span className="sr-only">Remove</span>
                                                <svg viewBox="0 0 14 14"
                                                     className="h-3.5 w-3.5 stroke-yellow-800/50 group-hover:stroke-yellow-800/75">
                                                  <path d="M4 4l6 6m0-6l-6 6" />
                                                </svg>
                                                <span className="absolute -inset-1" />
                                              </button>
                                            </span>
                                        ))
                                    ) : (
                                        <span className=" col-span-4 text-sm text-gray-900 w-full text-center">Please select locations</span>
                                    )}


                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto px-10">
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm/6 font-medium text-gray-900">
                                Property Type
                            </label>
                            <div className="mt-2">
                                <SelectBoxType selected={selectedType} onChange={handleTypeChange} />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="maxOffer"
                                className="block text-sm/6 font-medium text-gray-900">
                                Max Offer
                            </label>
                            <div className="mt-2">
                                <SelectBoxValue
                                    selected={max ?? MaxOfferFilter[0]}
                                    name={'maxOffer'}
                                    onChange={handleMaxOffer}/>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-4 sm:grid-cols-4 gap-4 max-w-4xl mx-auto px-10">

                        <div>
                            <label
                                htmlFor="min-bedroom"
                                className="block text-sm/6 font-medium text-gray-900">
                                Min Bedrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber selected={minBedrooms ?? NumberBox[0]} name={'minBedrooms'} onChange={handleMinBedroomChange} />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="max-bedroom"
                                className="block text-sm/6 font-medium text-gray-900">
                                Max Bedrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber selected={maxBedrooms ?? NumberBox[0]} name={'maxBedrooms'} onChange={handleMaxBedroomChange}/>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="min-bathrooms"
                                className="block text-sm/6 font-medium text-gray-900">
                                Min Bathrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber selected={minBathrooms ?? NumberBox[0]} name={'minBathrooms'} onChange={handleMinBathroomChange} />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="max-bathrooms"
                                className="block text-sm/6 font-medium text-gray-900">
                                Max Bathrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber selected={maxBathrooms ?? NumberBox[0]} name={'maxBathrooms'} onChange={handleMaxBathroomChange}/>
                            </div>
                        </div>

                    </div>
                    <div className="mx-auto text-center m-10">
                        <button className="bg-yellow-300 p-4 rounded-full hover:bg-black hover:text-white"  type={'submit'}>GO</button>
                    </div>

                </div>


            </form>
        </>
    )
}

export default Search
