import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import * as actions from '../../redux/actions/user-actions'
import * as types from '../../redux/actions/action-types'


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User actions', ()=>{

    let users = [];
    for(let i = 0; i < 10; i++){
        users.push({
            id: `userID_${i}`,
            username: `Biker_${i}`,
            password: `biker_${i}`,
            role: 'Biker'
        })
    }
    users.push({
        id: 'userID_10',
        username: `Manager`,
        password: `manager`,
        role: 'Manager'
    })

    //fetchBikers
    it('should match fetch bikers ', ()=>{
        
        var mock = new MockAdapter(axios);
        mock.onGet(`${types.BASE_API_URL}/bikers`).reply(200, {data:users});

        var store = mockStore({ bikers: [] });

        const expectedAction = [{ 
            type: types.FETCH_BIKERS , 
            payload: users
        }]

        return store.dispatch(actions.fetchBikers()).then(() => {
            expect(store.getActions()).toMatchObject(expectedAction)
          })

    })

    //updateAllBikers
    it('should match the action of updateAllBikers', ()=>{
        
        const expected = {
            type: types.UPDATE_BIKERS,
            payload: users
        }

        expect(actions.updateAllBikers(users)).toMatchObject(expected);
        
    }) 

    //isLoggedIn
    it('should return {status: false, user:{}}', ()=>{
        
        const expected = {
            status: false,
            user: {}
        }
        expect(actions.isLoggedIn()).toEqual(expected);
    }) 
  
})