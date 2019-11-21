import React from 'react'
import {shallow} from 'enzyme'
import {ShipmentItem} from '../../components/manager/shipment/ShipmentItem'

describe('ShipmentItem', () => {
    it('renders without crashing, indeed', ()=>{
        const date = new Date();
        const date_text = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        const props = {
            shipment: {
                id:`shpID_10`,
                origin: `origin_address_shp10`,
                destination: `destination_address_shp10`,
                status: 'WAITING',
                assignee: {},
                pickup: date,
                delivery: null
            },
            indx: 3,
            updateShipment: jest.fn(),
            bikers: [] 
            
        }
        const wrapper = shallow(<ShipmentItem {...props}/>)
        
        const td = wrapper.find('tr').children().map(child =>child.text()); 
        
        expect(td[0]).toEqual('3');
        expect(td[1]).toEqual('shpID_10');
        expect(td[2]).toEqual('origin_address_shp10');
        expect(td[3]).toEqual('destination_address_shp10');
        expect(td[4]).toEqual('WAITING');
        expect(td[6]).toEqual(date_text);
        expect(td[7]).toEqual('[Not Set]');
        
        const td5 = wrapper.find('tr').children().map(child =>child)[5]; 
        expect(td5.find('button').text()).toEqual('Assign to');
        
    })
})