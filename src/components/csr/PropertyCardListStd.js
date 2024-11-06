'use client'
import React from 'react'
import Link from 'next/link'

const PropertyCardListStd = ({ property }) => {

    return (
        <div
            key={`property-list-${property.id}`}
            className='my-6 bg-white rounded-2xl'
        >
            <Link href={`/search/properties/${property.slug}`}>
                <div className={`group relative cursor-pointer border-[0.5rem] ${property.is_featured ? "border-yellow-300" : "border-grey-200"}  
                rounded-[0.5rem] shadow grid grid-cols-1 md:grid-cols-2 mr-4 md:mr-0 `}>

                    <div className="flex flex-col col-span-1">
                        <div className="relative flex flex-row space-x-1">
                            <div className="absolute left-0  w-[158px] h-[94px] cardTop-img flex flex-col items-start pl-5 justify-start">
                                <div className="text-sm">Max Offer</div>
                                <div className="font-semibold">
                                    {property ? `£${new Intl.NumberFormat('en-GB').format(property.max_cap ?? 0)}` : ''}
                                </div>
                            </div>
                            <img
                                alt={`property-card-img-${property.title}`}
                                src={property.imageSrc ?? 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_18_0000.jpeg'}
                                className="object-cover object-center
                                max-w-full
                                xl:max-w-[218px]
                                h-96
                                xl:h-72
                                lg:w-full
                                cursor-pointer
                                rounded-2xl
                                xl:p-0.0

                                xl:rounded-[0rem]"
                            />
                            <img
                                alt={`property-card-img-${property.title}`}
                                src={property.imageSrc ?? 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_18_0000.jpeg'}
                                className="object-cover object-center max-w-[218px]
                               xl:h-72 lg:w-full cursor-pointer hidden xl:block"
                            />
                        </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between">
                        <div className="px-5">
                            <span >{property.title} </span>
                            <div className=" mt-2 text-xs flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="cursor-pointer text-xs  font-medium leading-none text-black underline hover:no-underline  ">34.5k views</span>
                                </div>

                                <div className="flex items-center gap-1.5 align-middle">
                                    <p className="text-xs  font-medium text-primary-700 dark:text-primary-500">Condition:</p>
                                    <span className=" text-xs font-bold text-base underline"> A </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <svg className="h-3 w-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
                                    </svg>
                                    <p className="text-xs  font-normal text-gray-500 dark:text-gray-400">{property.address2} {property.county}</p>
                                </div>
                            </div>
                            <p className=" my-2 text-sm text-gray-700 whitespace-pre-line mb-2">{property.excerpt}</p>

                        </div>

                        <div className="flex flex-row justify-between items-center">
                            <div className=" flex flex-col items-start pl-5 justify-start">
                                <div className="text-sm">Valuation</div>
                                <div className="font-semibold">
                                    {property ? `£${new Intl.NumberFormat('en-GB').format(property.price ?? 0)}` : ''}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mr-4 flex-shrink-0 self-center">
                                    <img src="https://media.rightmove.co.uk/company/clogo_14060_0001.jpeg"  className="max-h-10   bg-white"/>

                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Yeoley Direct</h4>
                                    <p className="mt-1 text-xs">
                                        0800 000 000 .
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </Link>
        </div>
    );
}

export default PropertyCardListStd
