import React from 'react'
import axios from 'axios'

function LandingPage(props) {

    const onLogoutHandler = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if (res.data.success) {
                    props.history.push('/login')
                } else {
                    alert('로그아웃에 실패 했습니다.')
                }    
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh', fontSize: '30px'
          }}>
            <h2>시작 페이지</h2>
            <button onClick={onLogoutHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage