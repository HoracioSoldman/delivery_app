import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Overview from '../../list-overview/Overview'
import Orders from '../order/Orders'
import Header from '../../Header'
import {fetchShipments, updateAllShipments} from '../../../redux/actions/shipment-actions'
import { isLoggedIn } from '../../../redux/actions/user-actions'
import {PageTitle} from '../../stylus'

class TodoList extends Component{

    componentDidMount(){
        this.props.fetchShipments();
    }

    componentWillUnmount(){
        this.props.updateAllShipments([])
    }

    render(){
        const {user} = isLoggedIn();
        const filteredShipments = this.props.shipments.filter(shp =>(
            (shp.status === 'ASSIGNED' || shp.status === 'PICKED_UP' || shp.status === 'DELIVERED')  
            && shp.assignee.id === user.id
        ))
        const summaries = [
            {title: 'ORDERS', nbr:filteredShipments.length, primaryColor:'#673AB7', secondaryColor: '#7E57C2'},
            {title: 'ASSIGNED', nbr:0, primaryColor:'#2196F3', secondaryColor: '#42A5F5'},
            {title: 'PICKED_UP', nbr:0, primaryColor:'#009688', secondaryColor: '#26A69A'},
            {title: 'DELIVERED', nbr:0, primaryColor:'#4CAF50', secondaryColor: '#66BB6A'},
        ];
    
        filteredShipments.forEach((shp,i) => {
            
            switch(shp.status){
                case 'ASSIGNED':
                    summaries[1].nbr++;
                break;
                
                case 'PICKED_UP':
                    summaries[2].nbr++;
                break;
                
                case 'DELIVERED':
                    summaries[3].nbr++;
                break;
                default:
                    //
                    break;
    
            }
           
        })
        

        //Filter the list according to what has been clicked on the Overview list
        //It Can be ORDERS, ASSIGNED,...
        const list = this.props.filter === '' || this.props.filter === 'ORDERS' ?
                    filteredShipments:
                    filteredShipments.filter(shp =>(shp.status === this.props.filter));
    
        return (
            <React.Fragment>
                <Header />
                <PageTitle>Orders TodoList</PageTitle>
                
                <Overview items={summaries}/>
    
                <Orders orders={list}/>
                
            </React.Fragment>
        )
        
    }
}

TodoList.propTypes = {
    fetchShipments: PropTypes.func.isRequired,
    updateAllShipments: PropTypes.func.isRequired,
    shipments: PropTypes.array.isRequired,
    filter: PropTypes.string
}

const mapStateToProps = state =>({
        shipments: state.shipments,
        filter: state.filter
    }
)

export default connect(mapStateToProps, {fetchShipments, updateAllShipments})(TodoList);

export {TodoList};