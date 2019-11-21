import React from 'react'
import {shallow} from 'enzyme'
import {Header} from '../../components/Header'

describe('Header', () => {
    it('renders without crashing, indeed', ()=>{
        const props = {
            updateAllShipments: jest.fn(),
            saveToken: jest.fn(),
            token: ''
        }
        const wrapper = shallow(<Header {...props}/>)
        wrapper.setState({serverMsg: 'A shipment has been updated!'});
        expect(wrapper.find('p').text()).toEqual('A shipment has been updated!'); 
    })
})