import { LOGIN_USER } from '../_actions/types'

export default function(prevState = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            console.log("# prevStete", prevState)
            console.log("# action.payload", action.payload)
            return {...prevState, loginSuccess: action.payload }
    
        default:
            return prevState;
    }
}