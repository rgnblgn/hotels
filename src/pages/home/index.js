import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { fetchHotels } from '../../services/hotels/action';
import { fetchHotelDetails } from '../../services/hotel_detail/action';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import Header from '../../components/header'
import {setItemToStorage,getItemFromStorage} from '../../common/common.js'

import "react-datepicker/dist/react-datepicker.css";

import './index.scss'

function Home(props){

    useEffect(()=>{
        props.fetchHotels();
        props.fetchHotelDetails();
    },[])

    const [startDate, setStartDate] = useState(new Date());
    const tomorrow = new Date(startDate)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [endDate, setEndDate] = useState(tomorrow);
    const [selectedHotel, setselectedHotel] = useState({});

    const getAllHotels = () =>{
        return (
            props.hotels && props.hotels.map((item,index)=>{
                return <option id={item.id} key={item.id}>{item.hotel_name}</option>
        }))
    }

    const change = (e) =>{
        const selectedIndex =e.target.options.selectedIndex
        let selectedHotelDetail;
        selectedIndex === 0 ? localStorage.removeItem("selectedHotelDetail")
        :selectedHotelDetail = props.hotel_detail.find((item)=>item.id && item.id == props.hotels[selectedIndex-1].id)
        setselectedHotel(selectedHotelDetail)
        setItemToStorage("selectedHotelDetail", JSON.stringify(selectedHotelDetail));
        setItemToStorage("selectedHotelName", e.target.value);
    }

    const setValues = (e)=>{
        setItemToStorage('adult',document.getElementById('adult-number').value)
        setItemToStorage('child',document.getElementById('child-number').value)
    }

    const checkParamIsExisted = (item) => {
        if((item === 'in-date' || item==='out-date') && localStorage[item]){
            return (new Date(getItemFromStorage(item))).toLocaleDateString()
        }
        if(localStorage[item]){
            return getItemFromStorage(item)
        }
        return false
    }

    const setOneDayAfter = (date) =>{
        const oneDayAfter = new Date(date)
        return oneDayAfter.setDate(oneDayAfter.getDate()+1)
    }

    return <div className='home-page-container'>
                <Header title="Otel ve Tarih Seçimi" page={1}/>
                <select onChange={change} value={checkParamIsExisted("selectedHotelName")}>
                    <option>Otel Seçiniz</option>
                    {getAllHotels()}
                </select>
                <div className='date-person'>
                    <div className='date'>
                        <span>Giriş Tarihi Seçiniz</span>
                        <DatePicker 
                        defaultValue={checkParamIsExisted("in-date")} 
                        minDate={new Date()} 
                        selected={startDate} 
                        onChange={(date) => {setItemToStorage('in-date',date);setStartDate(date);setEndDate(setOneDayAfter(date));}} 
                        className="in-date"/>
                    </div>
                    <div className='date'>
                        <span>Çıkış Tarihi Seçiniz</span>
                        <DatePicker 
                        defaultValue={checkParamIsExisted("out-date")} 
                        minDate={startDate} 
                        selected={endDate} 
                        onChange={(date) => {setItemToStorage('out-date',date);setEndDate(date);}} 
                        className="out-date"/>
                    </div>
                    <div className='date'>
                        <span>Yetişkin Sayısı</span>
                        <input 
                            defaultValue={checkParamIsExisted("adult")} 
                            id="adult-number" 
                            type="number" 
                            max={selectedHotel.max_adult_size ? selectedHotel.max_adult_size : 5} 
                            min={0} 
                            placeholder='Yetişkin Sayısı'/>
                    </div>
                    <div className='date'>
                        <span>Çocuk Sayısı</span>
                        <input 
                            defaultValue={!selectedHotel.child_status ? 0 : checkParamIsExisted("child")} 
                            id="child-number" 
                            type="number" 
                            max={3} 
                            min={0} 
                            placeholder='Çocuk Sayısı' 
                            disabled={!selectedHotel.child_status}/>
                    </div>
                </div>
                <Link onClick={setValues} to={selectedHotel && selectedHotel.id ? "/room" :"#"}>Kaydet ve Devam Et</Link>
            </div>
}

function mapStateToProps(state) {
    return {
      hotels: state.hotelsReducer.hotels,
      hotel_detail : state.hotelDetailReducer.hotel_detail
    }
  } 

export default connect(mapStateToProps,{fetchHotels,fetchHotelDetails})(Home);