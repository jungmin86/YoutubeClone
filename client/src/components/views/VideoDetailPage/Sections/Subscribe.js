import React, { useEffect, useState } from "react";
import Axios from "axios";



function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = {userTo: props.userTo};

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.subscribeNumber) //2
                    setSubscribeNumber(response.data.subscribeNumber)
                    console.log(SubscribeNumber) //0
                } else {
                    
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })

        let subscribedVariable = {userTo: props.userTo, userFrom: props.userFrom};

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.subscribed) //true
                    setSubscribed(response.data.subscribed)
                    console.log(Subscribed) //false
                } else {
                    alert('정보를 받아오지 못했습니다.')
                }
            })
    }, [])

    const onSubscribe = () => {
        
        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if (Subscribed) {
    
            Axios.post('/api/subscribe/unSubscribe',subscribedVariable )
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독취소 실패')
                    }
                })
        } else {
            Axios.post('/api/subscribe/subscribe',subscribedVariable )
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1);
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 실패')
                    }
                })
        }
    }
    
    
    return (
    <div>
        <button 
        style={{ 
            backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
            color: 'white', padding: '10px 16px',
            fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
     }} 
     onClick={onSubscribe} >
            {SubscribeNumber}{Subscribed ? 'Subscribed': 'Subscribe'}
        </button>
    </div>
    )
}

export default Subscribe;



