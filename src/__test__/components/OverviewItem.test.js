import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {OverviewItem} from '../../components/list-overview/OverviewItem'

describe('Overviewitem', () => {

    it('renders without crashing', ()=> {
        const props = {
            item:{
                title: 'ASSIGNED',
                nbr: 18,
                primaryColor: '#2196F3',
                secondaryColor: '#42A5F5'
            }
        }
        const wrapper = shallow(<OverviewItem  {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot() 
    })

    
    it('renders without crushing', ()=>{
        const props = {
            item:{
                title: 'ASSIGNED',
                nbr: 18,
                primaryColor: '#2196F3',
                secondaryColor: '#42A5F5'
            }
        }

        const wrapper = shallow(<OverviewItem { ...props} />)
        expect(wrapper.find('h4').text()).toEqual('ASSIGNED'); 
        expect(wrapper.find('p').text()).toEqual('18'); 
    }) 
})