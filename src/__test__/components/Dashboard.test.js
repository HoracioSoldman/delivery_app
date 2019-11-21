import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {Dashboard} from '../../components/manager/dashboard/Dashboard'


describe('Dashboard', () => {
    it('renders without crashing', ()=> {
        const props = {
            fetchShipments: jest.fn(),
            fetchBikers: jest.fn(),
            updateAllShipments: jest.fn(),
            updateAllBikers: jest.fn(),
            shipments: [],
            filter: ''
            
        }
        const wrapper = shallow(<Dashboard  {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot() 
    })
    
})
