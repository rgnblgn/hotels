export const getItemFromStorage = (item) =>{
    return localStorage.getItem(item)
}

export const getJsonItemFromStorage = (item) =>{
    return JSON.parse(getItemFromStorage(item))
}

export const getAllHotelInfosFromStorage = () =>{
    const hotelDetail = getJsonItemFromStorage('selectedHotelDetail');
    const hotelName = getItemFromStorage("selectedHotelName");
    const inDate = (new Date(getItemFromStorage('in-date')));
    const outDate = (new Date(getItemFromStorage('out-date')));
    const selectedRoom = getJsonItemFromStorage('selectedRoom');
    const selectedView = getJsonItemFromStorage('selectedView');
    const adult = getItemFromStorage('adult');
    const child = getItemFromStorage('child') ? getItemFromStorage('child') : "0";
    const diffTime = Math.abs(outDate-inDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const hotelInfo = {
        hotelDetail,
        hotelName,
        inDate,
        outDate,
        selectedRoom,
        selectedView,
        adult,
        child,
        diffDays
    }
    return hotelInfo
}

export const setItemToStorage = (id,item) =>{
    localStorage.setItem(id,item)
}