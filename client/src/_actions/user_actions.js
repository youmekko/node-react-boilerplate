import axios from 'axios'
import { LOGIN_USER } from './types'

export function loginUser(dataToSumbit) {
    const request = axios.post('/api/users/login', dataToSumbit)
        .then(res => res.data)
    
    return {
        type: LOGIN_USER,
        payload: request
    }    
}