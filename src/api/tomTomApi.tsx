// src/api/todoApi.ts
// API to get all locations from TOMTOM
export const fetchSearchResults = async (query) => {
    const apiKey = '5XtQljyBGnl8QqwlwqkXhqYnzL2eYZnS' // Replace 'YOUR_API_KEY' with your actual API key
    const baseUrl = `https://api.tomtom.com/search/2/search/${query.query}.json`
    const queryParams = new URLSearchParams({
        typeahead: true.toString(), // Convert boolean to string explicitly at the point of assignment
        limit: '30',
        countrySet: 'GB',
        extendedPostalCodesFor: 'Geo',
        minFuzzyLevel: '1',
        maxFuzzyLevel: '2',
        idxSet: 'Geo',
        view: 'Unified',
        relatedPois: 'off',
        key: apiKey
    })

    const url = `${baseUrl}?${queryParams.toString()}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*'
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return  await response.json()




    } catch (error) {
        console.error('Failed to fetch data:', error)
        return {
            summary: {
                query: query.query,
                queryType: 'GEO',
                queryTime: 0,
                numResults:0,
                offset:0,
                totalResults:0,
                fuzzyLevel: 3,
            },
            results: []
        }


    }
}


