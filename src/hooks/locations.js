import axios from '@/lib/axios'
import { mutate } from 'swr'
export const useLocations = () => {
    const saveLocations = async (setErrors,encodedParams) => {
        // Here, encodedParams is assumed to be pre-encoded
        try {
            await  axios.post('api/locations',  encodedParams );
            await mutate('/api/user');
        } catch (error) {
            if (error.response && error.response.status !== 422) throw error;
            setErrors(error.response.data.errors);
        }
    };


    const removeLocations = async (setErrors, locationId) => {
        try {
            await axios.delete(`api/locations/${locationId}`);
            await mutate('/api/user'); // Re-fetch the user data after deletion
        } catch (error) {
            if (error.response && error.response.status !== 422) throw error;
            setErrors(error.response.data.errors);
        }
    };

    return {
        saveLocations,
        removeLocations,

    }
}
