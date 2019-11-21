import {FETCH_SHIPMENTS, ASSIGN_SHIPMENT, BASE_API_URL, UPDATE_ORDER, FILTER_TABLE} from './action-types'
import axios from 'axios';


export const fetchShipments = () => (dispatch) =>{
    
    let axs = axios.create();
    axs.defaults.baseURL = BASE_API_URL;
    axs.defaults.headers.post['Content-Type'] = 'application/json';

    axs.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;
    return axs.get(`${BASE_API_URL}/shipments`)
    .then(function (response) {
        
        dispatch({
                type: FETCH_SHIPMENTS,
                payload: response.data.data 
            })
        })
        .catch(function (error) {
        
        console.log(error);
        })


}

export const updateShipment = (shipment) => (dispatch) =>{
    
    let axs = axios.create();
    axs.defaults.baseURL = BASE_API_URL;
    axs.defaults.headers.post['Content-Type'] = 'application/json';

    axs.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;
    return axs.post(`${BASE_API_URL}/update-shipment`, 
        {updatedShipment: shipment})
        .then(function (response) {
            dispatch({
                    type: ASSIGN_SHIPMENT,
                    payload: response.data.data
                })
        })
        .catch(function (error) {
            
            console.log(error);
        });
    
}

export const updateAllShipments = (shipments) =>({
  
        type: UPDATE_ORDER,
        payload: shipments
    })

export const filterTable = (title) =>({
  
    type: FILTER_TABLE,
    payload: title

})


export const formatDate = (date) =>{
    let dt = new Date(date);
    return `${dt.getDate()}/${+dt.getMonth()+1}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}` 
} 
    