'use client'
import Header from '@/components/ssr/Header'
import SearchInput from '@/components/csr/SearchInput'
import { useState } from 'react'
import { useSearch } from '@/hooks/search'
import SelectBoxType from '@/components/csr/SelectBoxType'
import SelectBoxNumber from '@/components/csr/SelectBoxNumber'
import SelectBoxValue from '@/components/csr/SelectBoxValue'

const Search = () => {
    const [radius, setRadius] = useState('')
    const [max, setMax] = useState('')
    const [minBedrooms, setMinBedrooms] = useState('')
    const [maxBedrooms, setMaxBedrooms] = useState('')
    const [maxBathrooms, setMaxBathrooms] = useState('')
    const [minBathrooms, setMinBathrooms] = useState('')

    const { search } = useSearch()
    const submitForm = async event => {
        event.preventDefault()

        search({
            radius,
            max,
            minBedrooms,
            maxBathrooms,
            minBathrooms,
            maxBedrooms,
        })
    }
    return (
        <>
            <Header bgColor={'bg-blue-50'} />
            <form onSubmit={submitForm}>
                <div className="bg-white h-full">
                    <div className="bg-blue-50 w-screen  ">
                        <div className="flex flex-col max-w-7xl mx-auto px-10">
                            <div className="w-full lg:w-1/2 mx-auto mt-10 pb-24">
                                <h1 className="text-md md:text-3xl font-bold tracking-tight text-gray-900  text-left md:text-center">
                                    Search for properties
                                </h1>
                                <SearchInput />
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
                                <SelectBoxType />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="maxOffer"
                                className="block text-sm/6 font-medium text-gray-900">
                                Max Offer
                            </label>
                            <div className="mt-2">
                                <SelectBoxValue />
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
                                <SelectBoxNumber />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="max-bedroom"
                                className="block text-sm/6 font-medium text-gray-900">
                                Max Bedrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="min-bathrooms"
                                className="block text-sm/6 font-medium text-gray-900">
                                Min Bathrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="max-bathrooms"
                                className="block text-sm/6 font-medium text-gray-900">
                                Max Bathrooms
                            </label>
                            <div className="mt-2">
                                <SelectBoxNumber />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}

export default Search
