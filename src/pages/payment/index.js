import React,{useState} from 'react'
import { connect } from 'react-redux';
import {postPayment,deletePayment} from '../../services/payment/action'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './index.scss'
import {getAllHotelInfosFromStorage} from '../../common/common.js'

function Payment(props){

    const [cardName,setCardName] = useState('')
    const [cardNumber,setCardNumber] = useState('')
    const [month,setMonth] = useState(0)
    const [year,setYear] = useState(0)
    const [cardCcv,setCardCcv] = useState(0)

    
    const hotelInfo = getAllHotelInfosFromStorage()
    const calculatedPrice = (hotelInfo.selectedRoom.price * hotelInfo.diffDays) + ((hotelInfo.selectedRoom.price * hotelInfo.diffDays) * hotelInfo.selectedView.price_rate * 0.01)
    const payment ={
        "hotel_id": hotelInfo.hotelDetail.id,
        "start_date": hotelInfo.inDate.toLocaleDateString(),
        "end_date": hotelInfo.outDate.toLocaleDateString(),
        "adult": hotelInfo.adult,
        "child": hotelInfo.child,
        "room_type": hotelInfo.selectedRoom.id,
        "room_scenic": hotelInfo.selectedView.id,
        "price": calculatedPrice,
        "coupon_code": "CODE100",
        "card_name": cardName,
        "card_number": cardNumber,
        "card_date_month": month,
        "card_date_year": year,
        "card_cvv": cardCcv,
        "id":hotelInfo.hotelDetail.id
    }

    const handlePayment = () =>{
        props.postPayment(JSON.stringify(payment))
    }
    
    const getNumbers = (start) =>{
        let arr = new Array(12).fill(0)
        return arr.map((item,index)=>{
            return <option key={index+start}>{index+start}</option>
        })
    }

    return <div className='payment-container'>
            <Header title="Önizleme ve Ödeme İşlemleri" page={3} />
            <div className='order-summary'>
                <h3>{hotelInfo.hotelName}</h3>
                <p>Otele Giriş : {hotelInfo.inDate.toLocaleDateString()}</p>
                <p>Otelden Çıkış : {hotelInfo.outDate.toLocaleDateString()}</p>
                <p>Yetişkin Sayısı : {hotelInfo.adult}</p>
                <p>Çocuk Sayısı : {hotelInfo.child}</p>
                <p>Oda Tipi : {hotelInfo.selectedRoom.title}</p>
                <p>Manzara : {hotelInfo.selectedView.title}</p>

                <p>Oda Fiyatı : {hotelInfo.selectedRoom.price}</p>
                <p>Fiyata etki oranı : %{hotelInfo.selectedView.price_rate}</p>
                <p>Konaklama : {calculatedPrice}</p>
                <p>İndirim : 0</p>
            </div>
            <div className='card-info'>
                <label>Kart Sahibi</label>
                <input className='card-name' type="text" value={cardName} onChange={(e)=>setCardName(e.target.value)} required placeholder='Kartın üstünde yazan ismi giriniz'></input>
                <input className='card-number' type="number" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} required placeholder='Kart numarasını giriniz'></input>
                <input className='card-ccv' type="password" value={cardCcv} onChange={(e)=>setCardCcv(e.target.value)} maxLength="3" required placeholder='Kartın arkasında yazan 3 haneli numarayı giriniz'></input>
                <select value={month} onChange={(e)=>setMonth(e.target.value)}>
                    {getNumbers(1)}
                </select>
                <select value={year} onChange={(e)=>setYear(e.target.value)}>
                    {getNumbers(2022)}
                </select>
            </div>
            <Footer backLink="/room" backText="Geri" forwardCondition={[true,true]} forwardLink="success" forwardText="Ödeme Yap ve Bitir" onClick={handlePayment}/>
        </div>
}

function mapStateToProps(state){
    return {
        bookings: state
    }
}

export default connect(mapStateToProps,{postPayment,deletePayment})(Payment)