import React, { useEffect }  from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null ) {

    /**
     * option
     * null => 아무나 출입이 가능
     * true => 로그인 한 유저만 접근 가능
     * false => 로그인 한 유저는 접근 불가
     */

    function AuthenticationCheck(props) {

        const dispatch = useDispatch()

        useEffect(() => {
           dispatch(auth())
            .then(res => {
                if (!res.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    if (adminRoute && !res.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (!option) {
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}