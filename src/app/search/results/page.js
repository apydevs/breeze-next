'use client'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/ssr/Header'
import { useSearch } from '@/hooks/search'
import { useEffect, useState } from 'react'
import SelectBoxRadius from '@/components/csr/SelectBoxRadius'
import SelectBoxType from '@/components/csr/SelectBoxType'
import SelectBoxValue from '@/components/csr/SelectBoxValue'
import { MaxOfferFilter,NumberBox } from '@/static/MaxOfferFilter'
import SelectBoxNumber from '@/components/csr/SelectBoxNumber'
import PropertyCardListStd from '@/components/csr/PropertyCardListStd'

const Results = () => {
    const [max, setMax] = useState('')
    const [minBedrooms, setMinBedrooms] = useState('')
    const [maxBedrooms, setMaxBedrooms] = useState('')
    const [maxBathrooms, setMaxBathrooms] = useState('')
    const [minBathrooms, setMinBathrooms] = useState('')
    const [errors, setErrors] = useState([])
    const [selectedType, setSelectedType] = useState({ id: 1, name: 'All' }) // Default selection
    const [selectedRadius, setSelectedRadius] = useState({
        id: 1,
        value: 0.0,
        text: 'This area only',
    })
    const [searchResults, setSearchResults] = useState([]); // To store current page data
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });
    const [loading, setLoading] = useState(false)
    const { search } = useSearch()
    const searchParams = useSearchParams()

    useEffect(() => {
        async function searchProperties() {
            // Access each parameter individually
            const radius = searchParams.get('radius')
            const type = searchParams.get('type')
            const maxOffer = searchParams.get('maxOffer')
            const minBedrooms = searchParams.get('minBedrooms')
            const maxBathrooms = searchParams.get('maxBathrooms')
            const minBathrooms = searchParams.get('minBathrooms')
            const maxBedrooms = searchParams.get('maxBedrooms')
            const order = searchParams.get('order')

            // Update state based on URL parameters
            setSelectedType({ ...selectedType, name: type }) // Update type based on URL

            if (maxOffer) {
                const index = MaxOfferFilter.findIndex(
                    item => item.value === parseInt(maxOffer, 10),
                ) // Ensure maxOffer is a number
                if (index !== -1) {
                    console.log(index, maxOffer, MaxOfferFilter[index])
                    setMax(MaxOfferFilter[index])
                } else {
                    setMax(MaxOfferFilter[0])
                    console.log('No matching offer found')
                }
            }

            if (minBedrooms) {
                const index = NumberBox.findIndex(
                    item => item.value == parseInt(minBedrooms,10),
                ) // Ensure min Beds is a number

                if (index !== -1) {
                    console.log(index,'asdasd', minBedrooms, NumberBox[index])
                    setMinBedrooms(NumberBox[index])
                } else {
                    setMinBedrooms(NumberBox[0])
                    console.log('No matching offer found')
                }
            }

            setSelectedRadius(prev => ({
                ...prev,
                value: parseFloat(radius),
                text: `Radius: ${radius} km`, // Adjust to match SelectBox UI
            }))

            setSelectedType(prev => ({
                ...prev,
                name: type,
            }))

            // Create an object with all the parameters
            const params = {
                radius,
                type,
                maxOffer,
                minBedrooms,
                maxBathrooms,
                minBathrooms,
                maxBedrooms,
                order,
            }
            setLoading(true)
            const result = await search(setErrors, params)// Capture the result from search
            setLoading(false)
            if (result) {
                setSearchResults(result.data); // Set current page data
                setPagination({
                    current_page: result.current_page,
                    last_page: result.last_page,
                    per_page: result.per_page,
                    total: result.total,
                })
            }
        }

        searchProperties()
    }, [searchParams])

 

    const handleRadiusChange = newRadius => {
        setSelectedRadius(newRadius)
        console.log('Selected radius:', newRadius)
        // Additional logic can go here
    }
    const handleTypeChange = newValue => {
        setSelectedType(newValue)
        // You can also do other things here, like logging or calling other functions
        console.log('Selected type:', newValue)
    }
    const handleMaxOfferChange = newValue => {
        setMax(newValue)
        // You can also do other things here, like logging or calling other functions
        console.log('Selected type:', newValue)
    }

    const handleMinBedroomsChange = newValue => {
        setMinBedrooms(newValue)
        // You can also do other things here, like logging or calling other functions
        console.log('Selected type:', newValue)
    }

    return (
        <>
            <Header bgColor={'bg-white'} />
            <div className="container pt-6 mx-auto  max-w-7xl">
                <div className="flex flex-wrap ">
                    <div className="md:w-1/4 w-full pb-6 md:pb-0 md:pr-6">
                        {/* Remove class [ h-24 ] when adding a card block */}
                        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
                        <div className="rounded   space-y-10 ">
                            <div className="flex items-center justify-center ">
                                <div>
                                    <div className="rounded max-w-sm shadow p-6 relative bg-white">
                                        <div className="flex flex-col items-start">
                                            <div>
                                                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="50"
                                                        height="50"
                                                        viewBox="0 0 113 76"
                                                        fill="none">
                                                        <path
                                                            d="M55.8038 5.90554H62.7954V0H55.8038V5.90554Z"
                                                            fill="#475293"
                                                        />
                                                        <path
                                                            d="M62.7954 5.90554H69.787V0H62.7954V5.90554Z"
                                                            fill="#FF3565"
                                                        />
                                                        <path
                                                            d="M55.8038 11.8111H62.7954V5.90558H55.8038V11.8111Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            d="M62.7954 11.8111H69.787V5.90558H62.7954V11.8111Z"
                                                            fill="#DCE7E6"
                                                        />
                                                        <path
                                                            d="M98.672 31.1567L113 11.8111H96.2655L86.1787 27.4542V0H72.2974V51.4384H86.1787V43.0321L88.8777 39.4078L95.2791 51.4384H112.323L98.672 31.1567Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            d="M55.9056 37.1715C55.8981 37.179 55.8896 37.1876 55.8831 37.1961C55.8242 40.2764 53.3191 42.759 50.2239 42.759C47.0923 42.759 44.554 40.2207 44.554 37.089V0H30.7648V38.3186C30.7648 47.556 39.275 51.432 45.7011 51.432C52.2567 51.432 54.0207 49.8994 55.9056 48.2254V51.4384H69.787V14.1898H55.9056V37.1715Z"
                                                            fill="#D81767"
                                                        />
                                                        <path
                                                            d="M55.8039 37.8591C55.4258 40.6212 53.091 42.759 50.2239 42.759C47.0923 42.759 44.554 40.2207 44.554 37.089V0H30.7648V38.3186C30.7648 47.556 39.275 51.432 45.7011 51.432C52.1389 51.432 53.9564 49.9529 55.8039 48.3143V37.8591Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            d="M55.9055 51.4384H69.7869V49.9658H55.9055V51.4384Z"
                                                            fill="#D81767"
                                                        />
                                                        <path
                                                            d="M55.8038 51.4384H69.7869V14.1898H55.8038V51.4384Z"
                                                            fill="#FF3565"
                                                        />
                                                        <path
                                                            d="M0 0V12.8371H13.8042V51.4384H28.4931V12.8553H30.7647V13.5729H44.554V0H0Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M21.8261 64.5004C21.8261 65.2201 21.2435 65.8028 20.5237 65.8028C19.8212 65.8028 19.2385 65.2201 19.2385 64.5004C19.2385 63.7807 19.8212 63.2152 20.5237 63.2152C21.2435 63.2152 21.8261 63.7807 21.8261 64.5004ZM6.22048 65.6828V74.9706H3.77001V65.6828H0.428467V63.5408H9.54489V65.6828H6.22048ZM15.0772 73.9081C14.426 74.7307 13.5349 75.1762 12.5239 75.1762C10.4504 75.1762 8.85675 73.5997 8.85675 70.8236C8.85675 68.1333 10.4161 66.4882 12.5239 66.4882C13.5006 66.4882 14.4089 66.8995 15.0772 67.7563V66.6938H17.2706V74.9706H15.0772V73.9081ZM13.2093 73.2398C11.9584 73.2398 11.1016 72.2631 11.1016 70.8236C11.1016 69.4013 11.9584 68.4246 13.2093 68.4246C13.929 68.4246 14.7173 68.8359 15.0772 69.3842V72.2974C14.7173 72.8457 13.929 73.2398 13.2093 73.2398ZM21.6204 74.9706V66.6939H19.4441V74.9706H21.6204ZM27.9409 74.645C27.6153 74.9363 27.0155 75.1762 26.1245 75.1762C24.5993 75.1762 23.7939 74.388 23.7939 72.8971V63.5408H25.9702V72.3145C25.9702 72.8457 26.2444 73.2399 26.7242 73.2399C27.0498 73.2399 27.3583 73.1199 27.4782 72.9828L27.9409 74.645ZM32.6849 74.9706L34.4328 69.3328L36.1807 74.9706H38.5112L41.0302 66.6939H38.7511L37.2089 72.2631L35.3924 66.6939H33.456L31.6396 72.2631L30.0974 66.6939H27.8354L30.3544 74.9706H32.6849ZM44.5061 64.5004C44.5061 65.2201 43.9235 65.8028 43.2038 65.8028C42.5012 65.8028 41.9185 65.2201 41.9185 64.5004C41.9185 63.7807 42.5012 63.2152 43.2038 63.2152C43.9235 63.2152 44.5061 63.7807 44.5061 64.5004ZM44.3004 74.9706V66.6939H42.1242V74.9706H44.3004ZM48.6503 69.3842V74.9706H46.474V66.6938H48.6503V67.7563C49.1815 67.1394 50.2097 66.4882 51.5463 66.4882C53.3799 66.4882 54.2538 67.5164 54.2538 69.1272V74.9706H52.0604V69.9668C52.0604 68.8187 51.4607 68.4246 50.5353 68.4246C49.6785 68.4246 49.0273 68.9044 48.6503 69.3842ZM59.5462 75.1762C60.5572 75.1762 61.4483 74.7307 62.0994 73.9082V74.9706H64.2929V63.5408H62.0994V67.7563C61.4483 66.8995 60.5229 66.4882 59.5462 66.4882C57.4384 66.4882 55.879 68.1333 55.879 70.8237C55.879 73.5997 57.4727 75.1762 59.5462 75.1762ZM58.1239 70.8236C58.1239 72.2631 58.9807 73.2398 60.2316 73.2398C60.9513 73.2398 61.7396 72.8457 62.0994 72.2974V69.3671C61.7396 68.8187 60.9513 68.4246 60.2316 68.4246C58.9807 68.4246 58.1239 69.4013 58.1239 70.8236ZM76.0942 75.1762C79.5728 75.1762 81.2522 73.2227 81.2522 70.3953V63.5408H78.7674V70.3267C78.7674 71.9204 77.8592 73.0171 76.0942 73.0171C74.3292 73.0171 73.4038 71.9204 73.4038 70.3267V63.5408H70.9362V70.3953C70.9362 73.2227 72.6156 75.1762 76.0942 75.1762ZM85.9619 63.5408V74.9706H83.5285V63.5408H85.9619ZM94.7815 74.9706V72.8457L95.7754 71.7833L97.9688 74.9706H100.693L97.3177 70.4467L100.591 66.6938H97.9174L94.7815 70.3781V63.5408H92.6052V74.9706H94.7815ZM104.187 64.5004C104.187 65.2201 103.604 65.8028 102.884 65.8028C102.182 65.8028 101.599 65.2201 101.599 64.5004C101.599 63.7807 102.182 63.2152 102.884 63.2152C103.604 63.2152 104.187 63.7807 104.187 64.5004ZM103.981 74.9706V66.6939H101.805V74.9706H103.981ZM110.747 74.645C110.421 74.9363 109.839 75.1762 108.93 75.1762C107.405 75.1762 106.6 74.388 106.6 72.8971V68.596H105.229V66.6939H106.6V64.4319H108.776V66.6939H110.456V68.596H108.776V72.3145C108.776 72.8457 109.05 73.2399 109.53 73.2399C109.856 73.2399 110.164 73.1199 110.284 72.9828L110.747 74.645Z"
                                                            fill="#5C5C68"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="py-2 px-4  top-12 absolute right-0 bg-yellow-300 flex items-center justify-center rounded-tl-3xl rounded-bl-3xl">
                                                    <p className="text-xs font-semibold text-center text-gray-900">
                                                        SPONSORED
                                                    </p>
                                                </div>
                                                <div className=" pt-4">
                                                    <p className="text-xl font-semibold leading-5 pt-1 text-gray-800 ">
                                                        Product Designer
                                                    </p>
                                                    <p className="text-sm leading-4 pt-2 text-gray-500 ">
                                                        <span className="text-indigo-700 font-semibold">
                                                            Invision App
                                                        </span>
                                                        , Singapore
                                                    </p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-500">
                                                        We are looking to hire a
                                                        freelance UI/UX designer
                                                        fluent in the use of
                                                        Figma with at least 2
                                                        years of experience in
                                                        delivering top quality
                                                        web application and
                                                        mobile application
                                                        designs.
                                                    </p>
                                                    <div className="flex flex-col items-center  mt-4 space-y-4 w-full">
                                                        <div className="flex items-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 36 36"
                                                                fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M25.2 19.8H18C17.0064 19.8 16.2 18.9954 16.2 18V10.8C16.2 9.8046 17.0064 9 18 9C18.9936 9 19.8 9.8046 19.8 10.8V16.2H25.2C26.1954 16.2 27 17.0046 27 18C27 18.9954 26.1954 19.8 25.2 19.8ZM18 0C8.0748 0 0 8.0748 0 18C0 27.9252 8.0748 36 18 36C27.9252 36 36 27.9252 36 18C36 8.0748 27.9252 0 18 0Z"
                                                                    fill="#6B7280"
                                                                />
                                                            </svg>
                                                            <p className="text-sm leading-4 text-gray-500 ml-2 dark:text-gray-400">
                                                                info@theagencyondemand.co.uk
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center ">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 40 36"
                                                                fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M19.9998 19C18.3458 19 16.9998 20.346 16.9998 22C16.9998 23.654 18.3458 25 19.9998 25C21.6538 25 22.9998 23.654 22.9998 22C22.9998 20.346 21.6538 19 19.9998 19ZM19.9999 29C16.1399 29 12.9999 25.86 12.9999 22C12.9999 18.14 16.1399 15 19.9999 15C23.8599 15 26.9999 18.14 26.9999 22C26.9999 25.86 23.8599 29 19.9999 29ZM15.9996 5.00001C15.9996 4.44801 16.4496 4.00001 16.9996 4.00001H22.9996C23.5496 4.00001 23.9996 4.44801 23.9996 5.00001V8.00001H15.9996V5.00001ZM34 8H28V5C28 2.244 25.758 0 23 0H17C14.242 0 12 2.244 12 5V8H6C2.692 8 0 10.692 0 14V30C0 33.308 2.692 36 6 36H34C37.308 36 40 33.308 40 30V14C40 10.692 37.308 8 34 8Z"
                                                                    fill="#6B7280"
                                                                />
                                                            </svg>
                                                            <p className="text-sm leading-4 text-gray-500 ml-2 dark:text-gray-400">
                                                                01952 000 000
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div>
                                    <div className="rounded max-w-sm shadow p-6 relative bg-white">
                                        <div className="flex flex-col items-start">
                                            <div>
                                                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="50"
                                                        height="50"
                                                        viewBox="0 0 113 76"
                                                        fill="none">
                                                        <path
                                                            d="M55.8038 5.90554H62.7954V0H55.8038V5.90554Z"
                                                            fill="#475293"
                                                        />
                                                        <path
                                                            d="M62.7954 5.90554H69.787V0H62.7954V5.90554Z"
                                                            fill="#FF3565"
                                                        />
                                                        <path
                                                            d="M55.8038 11.8111H62.7954V5.90558H55.8038V11.8111Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            d="M62.7954 11.8111H69.787V5.90558H62.7954V11.8111Z"
                                                            fill="#DCE7E6"
                                                        />
                                                        <path
                                                            d="M98.672 31.1567L113 11.8111H96.2655L86.1787 27.4542V0H72.2974V51.4384H86.1787V43.0321L88.8777 39.4078L95.2791 51.4384H112.323L98.672 31.1567Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            d="M55.9056 37.1715C55.8981 37.179 55.8896 37.1876 55.8831 37.1961C55.8242 40.2764 53.3191 42.759 50.2239 42.759C47.0923 42.759 44.554 40.2207 44.554 37.089V0H30.7648V38.3186C30.7648 47.556 39.275 51.432 45.7011 51.432C52.2567 51.432 54.0207 49.8994 55.9056 48.2254V51.4384H69.787V14.1898H55.9056V37.1715Z"
                                                            fill="#D81767"
                                                        />
                                                        <path
                                                            d="M55.8039 37.8591C55.4258 40.6212 53.091 42.759 50.2239 42.759C47.0923 42.759 44.554 40.2207 44.554 37.089V0H30.7648V38.3186C30.7648 47.556 39.275 51.432 45.7011 51.432C52.1389 51.432 53.9564 49.9529 55.8039 48.3143V37.8591Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            d="M55.9055 51.4384H69.7869V49.9658H55.9055V51.4384Z"
                                                            fill="#D81767"
                                                        />
                                                        <path
                                                            d="M55.8038 51.4384H69.7869V14.1898H55.8038V51.4384Z"
                                                            fill="#FF3565"
                                                        />
                                                        <path
                                                            d="M0 0V12.8371H13.8042V51.4384H28.4931V12.8553H30.7647V13.5729H44.554V0H0Z"
                                                            fill="#5C5C68"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M21.8261 64.5004C21.8261 65.2201 21.2435 65.8028 20.5237 65.8028C19.8212 65.8028 19.2385 65.2201 19.2385 64.5004C19.2385 63.7807 19.8212 63.2152 20.5237 63.2152C21.2435 63.2152 21.8261 63.7807 21.8261 64.5004ZM6.22048 65.6828V74.9706H3.77001V65.6828H0.428467V63.5408H9.54489V65.6828H6.22048ZM15.0772 73.9081C14.426 74.7307 13.5349 75.1762 12.5239 75.1762C10.4504 75.1762 8.85675 73.5997 8.85675 70.8236C8.85675 68.1333 10.4161 66.4882 12.5239 66.4882C13.5006 66.4882 14.4089 66.8995 15.0772 67.7563V66.6938H17.2706V74.9706H15.0772V73.9081ZM13.2093 73.2398C11.9584 73.2398 11.1016 72.2631 11.1016 70.8236C11.1016 69.4013 11.9584 68.4246 13.2093 68.4246C13.929 68.4246 14.7173 68.8359 15.0772 69.3842V72.2974C14.7173 72.8457 13.929 73.2398 13.2093 73.2398ZM21.6204 74.9706V66.6939H19.4441V74.9706H21.6204ZM27.9409 74.645C27.6153 74.9363 27.0155 75.1762 26.1245 75.1762C24.5993 75.1762 23.7939 74.388 23.7939 72.8971V63.5408H25.9702V72.3145C25.9702 72.8457 26.2444 73.2399 26.7242 73.2399C27.0498 73.2399 27.3583 73.1199 27.4782 72.9828L27.9409 74.645ZM32.6849 74.9706L34.4328 69.3328L36.1807 74.9706H38.5112L41.0302 66.6939H38.7511L37.2089 72.2631L35.3924 66.6939H33.456L31.6396 72.2631L30.0974 66.6939H27.8354L30.3544 74.9706H32.6849ZM44.5061 64.5004C44.5061 65.2201 43.9235 65.8028 43.2038 65.8028C42.5012 65.8028 41.9185 65.2201 41.9185 64.5004C41.9185 63.7807 42.5012 63.2152 43.2038 63.2152C43.9235 63.2152 44.5061 63.7807 44.5061 64.5004ZM44.3004 74.9706V66.6939H42.1242V74.9706H44.3004ZM48.6503 69.3842V74.9706H46.474V66.6938H48.6503V67.7563C49.1815 67.1394 50.2097 66.4882 51.5463 66.4882C53.3799 66.4882 54.2538 67.5164 54.2538 69.1272V74.9706H52.0604V69.9668C52.0604 68.8187 51.4607 68.4246 50.5353 68.4246C49.6785 68.4246 49.0273 68.9044 48.6503 69.3842ZM59.5462 75.1762C60.5572 75.1762 61.4483 74.7307 62.0994 73.9082V74.9706H64.2929V63.5408H62.0994V67.7563C61.4483 66.8995 60.5229 66.4882 59.5462 66.4882C57.4384 66.4882 55.879 68.1333 55.879 70.8237C55.879 73.5997 57.4727 75.1762 59.5462 75.1762ZM58.1239 70.8236C58.1239 72.2631 58.9807 73.2398 60.2316 73.2398C60.9513 73.2398 61.7396 72.8457 62.0994 72.2974V69.3671C61.7396 68.8187 60.9513 68.4246 60.2316 68.4246C58.9807 68.4246 58.1239 69.4013 58.1239 70.8236ZM76.0942 75.1762C79.5728 75.1762 81.2522 73.2227 81.2522 70.3953V63.5408H78.7674V70.3267C78.7674 71.9204 77.8592 73.0171 76.0942 73.0171C74.3292 73.0171 73.4038 71.9204 73.4038 70.3267V63.5408H70.9362V70.3953C70.9362 73.2227 72.6156 75.1762 76.0942 75.1762ZM85.9619 63.5408V74.9706H83.5285V63.5408H85.9619ZM94.7815 74.9706V72.8457L95.7754 71.7833L97.9688 74.9706H100.693L97.3177 70.4467L100.591 66.6938H97.9174L94.7815 70.3781V63.5408H92.6052V74.9706H94.7815ZM104.187 64.5004C104.187 65.2201 103.604 65.8028 102.884 65.8028C102.182 65.8028 101.599 65.2201 101.599 64.5004C101.599 63.7807 102.182 63.2152 102.884 63.2152C103.604 63.2152 104.187 63.7807 104.187 64.5004ZM103.981 74.9706V66.6939H101.805V74.9706H103.981ZM110.747 74.645C110.421 74.9363 109.839 75.1762 108.93 75.1762C107.405 75.1762 106.6 74.388 106.6 72.8971V68.596H105.229V66.6939H106.6V64.4319H108.776V66.6939H110.456V68.596H108.776V72.3145C108.776 72.8457 109.05 73.2399 109.53 73.2399C109.856 73.2399 110.164 73.1199 110.284 72.9828L110.747 74.645Z"
                                                            fill="#5C5C68"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="py-2 px-4  top-12 absolute right-0 bg-yellow-300 flex items-center justify-center rounded-tl-3xl rounded-bl-3xl">
                                                    <p className="text-xs font-semibold text-center text-gray-900">
                                                        SPONSORED
                                                    </p>
                                                </div>
                                                <div className=" pt-4">
                                                    <p className="text-xl font-semibold leading-5 pt-1 text-gray-800 ">
                                                        Product Designer
                                                    </p>
                                                    <p className="text-sm leading-4 pt-2 text-gray-500 ">
                                                        <span className="text-indigo-700 font-semibold">
                                                            Invision App
                                                        </span>
                                                        , Singapore
                                                    </p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-500">
                                                        We are looking to hire a
                                                        freelance UI/UX designer
                                                        fluent in the use of
                                                        Figma with at least 2
                                                        years of experience in
                                                        delivering top quality
                                                        web application and
                                                        mobile application
                                                        designs.
                                                    </p>
                                                    <div className="flex flex-col items-center  mt-4 space-y-4 w-full">
                                                        <div className="flex items-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 36 36"
                                                                fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M25.2 19.8H18C17.0064 19.8 16.2 18.9954 16.2 18V10.8C16.2 9.8046 17.0064 9 18 9C18.9936 9 19.8 9.8046 19.8 10.8V16.2H25.2C26.1954 16.2 27 17.0046 27 18C27 18.9954 26.1954 19.8 25.2 19.8ZM18 0C8.0748 0 0 8.0748 0 18C0 27.9252 8.0748 36 18 36C27.9252 36 36 27.9252 36 18C36 8.0748 27.9252 0 18 0Z"
                                                                    fill="#6B7280"
                                                                />
                                                            </svg>
                                                            <p className="text-sm leading-4 text-gray-500 ml-2 dark:text-gray-400">
                                                                info@theagencyondemand.co.uk
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center ">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 40 36"
                                                                fill="none">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M19.9998 19C18.3458 19 16.9998 20.346 16.9998 22C16.9998 23.654 18.3458 25 19.9998 25C21.6538 25 22.9998 23.654 22.9998 22C22.9998 20.346 21.6538 19 19.9998 19ZM19.9999 29C16.1399 29 12.9999 25.86 12.9999 22C12.9999 18.14 16.1399 15 19.9999 15C23.8599 15 26.9999 18.14 26.9999 22C26.9999 25.86 23.8599 29 19.9999 29ZM15.9996 5.00001C15.9996 4.44801 16.4496 4.00001 16.9996 4.00001H22.9996C23.5496 4.00001 23.9996 4.44801 23.9996 5.00001V8.00001H15.9996V5.00001ZM34 8H28V5C28 2.244 25.758 0 23 0H17C14.242 0 12 2.244 12 5V8H6C2.692 8 0 10.692 0 14V30C0 33.308 2.692 36 6 36H34C37.308 36 40 33.308 40 30V14C40 10.692 37.308 8 34 8Z"
                                                                    fill="#6B7280"
                                                                />
                                                            </svg>
                                                            <p className="text-sm leading-4 text-gray-500 ml-2 dark:text-gray-400">
                                                                01952 000 000
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-3/4 w-full">
                        {/* Remove class [ h-24 ] when adding a card block */}
                        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
                        <div className="rounded border-gray-300  dark:border-gray-700  min-h-screen">
                            <div className="sticky top-0 z-20 bg-white rounded-2xl w-full  flex flex-row items-center  space-x-3 pb-1 px-5 ">
                                <SelectBoxRadius
                                    label={'Radius'}
                                    selected={selectedRadius}
                                    onChange={handleRadiusChange}
                                    name="radius"
                                    props={
                                        'relative mt-0  w-full cursor-default rounded-xl bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6'
                                    }
                                />
                                <SelectBoxType
                                    label={'Property Type'}
                                    selected={selectedType}
                                    onChange={handleTypeChange}
                                    props={
                                        'relative mt-4 w-36 cursor-default rounded-xl bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6'
                                    }
                                />

                                <SelectBoxValue
                                    selected={max}
                                    label={'Max Offer'}
                                    props={
                                        'relative mt-4 w-36 cursor-default rounded-xl bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6'
                                    }
                                    name={'maxOffer'}
                                    onChange={handleMaxOfferChange}
                                />

                                <SelectBoxNumber
                                    label={'Min Bedrooms'}
                                    props={
                                        'relative mt-4 w-36 cursor-default rounded-xl bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6'
                                    }
                                    selected={minBedrooms}
                                    name={'minBedrooms'}
                                    onChange={handleMinBedroomsChange}
                                />
                            </div>
                            <div>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div>
                                        {searchResults.length > 0 ? (
                                            searchResults.map(result => (
                                                <div key={result.id}>
                                                    <PropertyCardListStd property={result}/>
                                                    <p>{result.propertyName}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No results found.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="pagination-controls">
                                <button
                                    disabled={pagination.current_page === 1}
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.current_page - 1,
                                        )
                                    }>
                                    Previous
                                </button>
                                <span>
                                    Page {pagination.current_page} of{' '}
                                    {pagination.last_page}
                                </span>
                                <button
                                    disabled={
                                        pagination.current_page ===
                                        pagination.last_page
                                    }
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.current_page + 1,
                                        )
                                    }>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Results
