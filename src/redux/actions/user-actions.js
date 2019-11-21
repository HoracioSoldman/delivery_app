import {FETCH_BIKERS, UPDATE_BIKERS, BASE_API_URL, SAVE_TOKEN} from './action-types'
import axios from 'axios'



export const fetchBikers = () => (dispatch) => {
  let axs = axios.create();
  axs.defaults.baseURL = BASE_API_URL;
  axs.defaults.headers.post['Content-Type'] = 'application/json';
  axs.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;
    return axs.get(`${BASE_API_URL}/bikers`)
    .then(function (response) {
        dispatch({
            type: FETCH_BIKERS,
            payload: response.data.data
        })
      })
      .catch(function (error) {
        
        console.log(error);
      });
    
}

export const updateAllBikers = (bikers) =>({

      type: UPDATE_BIKERS,
      payload: bikers
  })


export const saveToken = tkn => (dispatch) => {
  tkn === '' ?  localStorage.removeItem('token') :localStorage.setItem('token', tkn)
  dispatch({
    type: SAVE_TOKEN,
    payload: tkn
  })
}

export const isLoggedIn = () => {
  let tkn = localStorage.getItem('token');
  let result = {status: false, user: {}}
  
  if(tkn !== null){
    let data = JSON.parse(atob(tkn.split('.')[1]));
    let usr = data.user;
    
    if(usr.role !== undefined){
      result.status = true;
      result.user = usr;
      
    }
  }
  return result;
}


