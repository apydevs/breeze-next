import axios from '@/lib/axios'
import { mutate } from 'swr'
export const useSearch = () => {
    const search = async (setErrors,encodedParams) => {
        // Here, encodedParams is assumed to be pre-encoded
        try {
            const response = await axios .post('api/search',  encodedParams );
            await mutate('/api/user'); // Re-fetch the user data after deletion
            return response.data // Return data to be used in calling component
        } catch (error) {
            if (error.response && error.response.status !== 422) throw error;
            setErrors(error.response.data.errors);
        }
    };

    return {
        search,

    }
}
