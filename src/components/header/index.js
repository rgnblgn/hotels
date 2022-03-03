import React from 'react'
import hotel from '../../assets/hotel.png'
import payment from '../../assets/payment.png'
import bed from '../../assets/bed.png'
import './index.scss'

export default function Header(props){
    return (
        <div className='header'>
        <h4>{props.title}</h4>
        <div className='icons'>
            <div className={props.page === 1 ? "selected" : ""}>
                <img src={hotel} alt="hotel"  ></img>
            </div>
            <div className={props.page === 2 ? "selected" : ""}>
                <img src={bed} alt="bed" ></img>
            </div>
            <div className={props.page === 3 ? "selected" : ""}>
                <img src={payment} alt="payment"></img>
            </div>
        </div>
    </div>
    )
}