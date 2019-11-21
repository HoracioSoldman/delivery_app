import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import * as actions from '../../redux/actions/shipment-actions'
import * as types from '../../redux/actions/action-types'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Shipments actions', ()=>{

    
    let generatedShipments = [];
    for(let i = 0; i < 200; i++){
        let status = i < 50 ? 'WAITING' : i < 90 ? 'ASSIGNED':
                        i < 150 ? 'PICKED_UP' : 'DELIVERED';

        generatedShipments.push({
            id:`shpID_${i}`,
            origin: `origin_address_shp${i}`,
            destination: `destination_address_shp${i}`,
            status: status,
            assignee: {},
            pickup: null,
            delivery: null
        })
    }

    //fetchShipments
    it('should match fetch shipments ', ()=>{
        
        let mock = new MockAdapter(axios);
        mock.onGet(`${types.BASE_API_URL}/shipments`).reply(200, {data:generatedShipments});

        let store = mockStore({ shipments: [] });

        const expectedAction = [{ 
            type: types.FETCH_SHIPMENTS , 
            payload: generatedShipments
        }]

        return store.dispatch(actions.fetchShipments()).then(() => {
            expect(store.getActions()).toMatchObject(expectedAction)
          })

    })
    

    //updateShipment
    it('should match fetch shipments ', ()=>{
        
        
        let mock = new MockAdapter(axios);
        mock.onPost(`${types.BASE_API_URL}/update-shipment`, {updatedShipment: generatedShipments[0]}).reply(200, {data:generatedShipments});

        let store = mockStore({ shipments: [] });

        const expectedAction = [{ 
            type: types.ASSIGN_SHIPMENT , 
            payload: generatedShipments
        }]

        return store.dispatch(actions.updateShipment(generatedShipments[0])).then(() => {
            expect(store.getActions()).toMatchObject(expectedAction)
          })

    })
    

      //updateAllShipments
      it('should match the action of updateAllShipments', ()=>{
        
        const expected = {
            type: types.UPDATE_ORDER,
            payload: generatedShipments
        }
        expect(actions.updateAllShipments(generatedShipments)).toMatchObject(expected);
        
    }) 

      //filterTable
      it('should match the action of filterTable', ()=>{
        const title = 'WAITING';
        const expected = {
            type: types.FILTER_TABLE,
            payload: title
        }
        expect(actions.filterTable(title)).toMatchObject(expected);      
    }) 

})
