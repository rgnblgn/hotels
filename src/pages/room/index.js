import React, {useState} from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './index.scss'
import {getAllHotelInfosFromStorage} from '../../common/common.js'


export default function Room(){

    const [selectedRoom,setSelectedRoom] = useState('')
    const [selectedView,setSelectedView] = useState('')

    const hotelInfo = getAllHotelInfosFromStorage()

    const setRoom = (e)=>{
        setSelectedRoom(e.target.id)
        localStorage.setItem('selectedRoom',JSON.stringify(hotelInfo.hotelDetail.room_type[parseInt((e.target.id).charAt(4))]))
    }

    const getRooms = () =>{
        return hotelInfo.hotelDetail.room_type.map((item,index)=>{
            return <label className={selectedRoom === `room${index}`? "selected" : ""} id={`room${index}`} key={item.id}>
                <h5>{item.title}</h5>
                <img src={item.photo} alt={item.title} ></img>
                <span>{item.price * hotelInfo.diffDays} TL</span>
                <input type="radio" 
                id={`room${index}`} 
                value={`room${index}`}
                onChange={setRoom}
                checked={selectedRoom === `room${index}`}
                ></input>
            </label>
        })
    }

    const setView = (e)=>{
        setSelectedView(e.target.id)
        localStorage.setItem('selectedView',JSON.stringify(hotelInfo.hotelDetail.room_scenic[parseInt((e.target.id).charAt(4))]))
    }

    const getViews = () =>{
        return hotelInfo.hotelDetail.room_scenic.map((item,index)=>{
            return <label className={selectedView === `view${index}`? "selected" : ""} id={`view${index}`} key={item.id}>
                <h5>{item.title}</h5>
                <img src={item.photo} alt={item.title} ></img>
                <span>+%{item.price_rate}</span>
                <input type="radio" 
                id={`view${index}`} 
                value={`view${index}`}
                onChange={setView}
                checked={selectedView === `view${index}`}
                ></input>
            </label>
        })
    }

    return <div className='room-container'>
        <Header title="Oda ve Manzara Seçimi" page={2}/>
        <h4>{hotelInfo.hotelName}</h4>
        <span>{hotelInfo.hotelDetail.city}</span>
        <div className='user-detail'>
            <p>{hotelInfo.inDate.toLocaleDateString()}-{hotelInfo.outDate.toLocaleDateString()}</p>
            <span>Yetişkin Sayısı : {hotelInfo.adult} </span>
            <span>Çocuk Sayısı : {hotelInfo.child}</span>
        </div>
        <div className='room-select'>
                {getRooms()}
        </div>
        <div className='view-select'>
                {getViews()}
        </div>
        <Footer backLink="/" backText="Geri" forwardCondition={[selectedRoom,selectedView]} forwardLink="payment" forwardText="Ödemeye Geç" />  
        </div>
}