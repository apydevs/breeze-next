import axios from '@/lib/axios'
import { mutate } from 'swr'
export const useSearch = () => {

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const search = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .get('/search', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }

    return {
        search,

    }
}
