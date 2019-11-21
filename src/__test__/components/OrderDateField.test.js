import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {OrderDateField} from '../../components/biker/order/OrderDateField'


describe('OrderDateField', () => {

    it('renders without crashing', ()=> {
        const props = {
            updateShipment: jest.fn(),
            type: 'delivery',
            date: null,
            order: {
                id:`shpID_10`,
                origin: `origin_address_shp10`,
                destination: `destination_address_shp10`,
                status: 'WAITING',
                assignee: {},
                pickup: null,
                delivery: null
            },
            shipments: []
        }
        const wrapper = shallow(<OrderDateField  {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot() 
    })
    
    it('renders without crushing: IN PICK UP column', ()=>{
        let d = new Date('2019-11-21 6:16:11')
        const props = {
            updateShipment: jest.fn(),
            type: 'pick_up',
            date: d,
            shipments: [],
            order: {
                id:`shpID_10`,
                origin: `origin_address_shp10`,
                destination: `destination_address_shp10`,
                status: 'PICKED_UP',
                assignee: {},
                pickup: d,
                delivery: null
            }
        }

        const wrapper = shallow(<OrderDateField { ...props} />)
        
        expect(wrapper.find('button.edt').text()).toEqual('-'); 
        expect(wrapper.find('span').text()).toEqual('21/11/2019 6:16'); 
        
    }) 
    it('renders without crushing: IN DELIVERY column', ()=>{
        let d = new Date('2019-11-21 6:16:11')
        const props = {
            updateShipment: jest.fn(),
            type: 'delivery',
            date: null,
            shipments: [],
            order: {
                id:`shpID_10`,
                origin: `origin_address_shp10`,
                destination: `destination_address_shp10`,
                status: 'PICKED_UP',
                assignee: {},
                pickup: d,
                delivery: null
            }
        }

        const wrapper = shallow(<OrderDateField { ...props} />)
        
        expect(wrapper.find('button.add').text()).toEqual('+'); 
        expect(wrapper.find('span').text()).toEqual('[Not Set]'); 
        
    }) 

    it(`renders without crushing: Clicking on the "+" button and 
        display the current date on the inputs`, ()=>{

        const props = {
            updateShipment: jest.fn(),
            type: 'pick_up',
            date: null,
            shipments: [],
            order: {
                id:`shpID_10`,
                origin: `origin_address_shp10`,
                destination: `destination_address_shp10`,
                status: 'ASSIGNED',
                assignee: {
                    id: 'biker_0', uname: 'Biker_0', 
                    pwd: '***', role: 'Biker'
                },
                pickup: null,
                delivery: null
            }
        }

        const wrapper = shallow(<OrderDateField { ...props} />)
        const btn = wrapper.find('button.add');
        expect(btn.text()).toEqual('+'); 
        btn.simulate('click');
        
        expect(wrapper.find('button.save').text()).toEqual('Save');
        expect(wrapper.find('button.cnc').text()).toEqual('Cancel');
        
    }) 


})
