import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

export default function Success(){


    const clearStorage =()=>{
        let items = ["selectedHotelDetail","selectedHotelName","selectedRoom","selectedView","in-date","out-date","adult","child"]
        items.forEach((item)=>{
            localStorage.removeItem(item)
        })
    }

    return (
        <div className='payment-container'>
            <h5>Rezervasyon kaydınız alınmıştır. Rezervasyon
                özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için
                aşağıdaki linkleri kullanabilirsiniz.
            </h5>
            <div className='order-detail'>

            </div>
            <div className='footer'>
                <Link onClick={clearStorage} to="/">Yeni Rezervasyon Yap</Link>
                <Link to="/">Rezervasyon'u güncelle</Link>
                <Link to="/">Rezervasyon'u İptal Et</Link>
            </div>
        </div>
    )
}