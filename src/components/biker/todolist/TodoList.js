import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Overview from '../../list-overview/Overview'
import Header from '../../Header'
import {fetchShipments, updateAllShipments} from '../../../redux/actions/shipment-actions'
import { isLoggedIn } from '../../../redux/actions/user-actions'
import {PageTitle} from '../../stylus'
import Table from '../../list-table/Table'

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
        const summary = [
            {title: 'ORDERS', nbr:filteredShipments.length, primaryColor:'#673AB7', secondaryColor: '#7E57C2'},
            {title: 'ASSIGNED', nbr:0, primaryColor:'#2196F3', secondaryColor: '#42A5F5'},
            {title: 'PICKED_UP', nbr:0, primaryColor:'#009688', secondaryColor: '#26A69A'},
            {title: 'DELIVERED', nbr:0, primaryColor:'#4CAF50', secondaryColor: '#66BB6A'},
        ];
    
        filteredShipments.forEach((shp,i) => {
            
            switch(shp.status){
                case 'ASSIGNED':
                    summary[1].nbr++;
                break;
                
                case 'PICKED_UP':
                    summary[2].nbr++;
                break;
                
                case 'DELIVERED':
                    summary[3].nbr++;
                break;
                default:
                    //
                    break;
    
            }
           
        })
        

        const table_header = ['#', 'ID', 'Origin', 'Destination', 'Pick Up', 'Delivery'];
        
        //Filter the list according to what has been clicked on the Overview list
        //It Can be ORDERS, ASSIGNED,...
        const table_body = this.props.filter === '' || this.props.filter === 'ORDERS' ?
                    filteredShipments:
                    filteredShipments.filter(shp =>(shp.status === this.props.filter));
    
        return (
            <React.Fragment>
                <Header />
                <PageTitle>Orders TodoList</PageTitle>
                
                <Overview items={summary}/>
    
                <Table body={table_body} user_role={user.role} header={table_header}/>
                
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