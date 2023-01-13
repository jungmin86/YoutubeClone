import React, { useEffect, useState } from "react";
import Axios from "axios";
// import e, { response } from "express";


function Subscirbe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = {userTo: props.userTo};

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.SubscribeNumber)
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })

        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')};

        Axios.post('/api/subscirbe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('정보를 받아오지 못했습니다.')
                }
            })
    }, [])
    
    return (
    <div>
        <button style={{ 
            backgroundColor: `${Subscribed ? '#AAAAA' : '#CC0000'}`, borderRadius: '4px',
            color: 'white', padding: '10px 16px',
            fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
     }}
        onClick
        >
            {SubscribeNumber} {Subscribed ? 'Subscribed': 'Subscribe'}
        </button>
    </div>
    )
}

export default Subscirbe;



