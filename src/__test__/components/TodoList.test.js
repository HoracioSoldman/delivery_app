import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {TodoList} from '../../components/biker/todolist/TodoList'

describe('TodoList', () => {
    it('renders without crashing', ()=> {
        const props = {
            fetchShipments: jest.fn(),
            updateAllShipments: jest.fn(),
            shipments: [],
            filter: ''
            
        }
        const wrapper = shallow(<TodoList  {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot() 
    })
})