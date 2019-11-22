import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchShipments, updateAllShipments} from '../../../redux/actions/shipment-actions'
import {fetchBikers, updateAllBikers, isLoggedIn} from '../../../redux/actions/user-actions'
import Overview from '../../list-overview/Overview'
import Header from '../../Header'
import {PageTitle} from '../../stylus'
import Table from '../../list-table/Table'

class Dashboard extends Component {

    componentDidMount(){
        this.props.fetchShipments();
        this.props.fetchBikers();
    }

    componentWillUnmount(){
        this.props.updateAllShipments([]);
        this.props.updateAllBikers([]);
    }
    
    render(){
        const {user} = isLoggedIn();
        const summary = [
            {title: 'SHIPMENTS', nbr:this.props.shipments.length, primaryColor:'#607D8B', secondaryColor: '#78909C'},
            {title: 'WAITING', nbr:0, primaryColor:'#673AB7', secondaryColor: '#7E57C2'},
            {title: 'ASSIGNED', nbr:0, primaryColor:'#2196F3', secondaryColor: '#42A5F5'},
            {title: 'PICKED_UP', nbr:0, primaryColor:'#009688', secondaryColor: '#26A69A'},
            {title: 'DELIVERED', nbr:0, primaryColor:'#4CAF50', secondaryColor: '#66BB6A'},
        ];
    

        this.props.shipments.forEach((shp, i)=>{
            switch(shp.status){
                case 'WAITING':
                    summary[1].nbr++;
                break;
                
                case 'ASSIGNED':
                    summary[2].nbr++;
                break;
                
                case 'PICKED_UP':
                    summary[3].nbr++;
                break;
                
                case 'DELIVERED':
                    summary[4].nbr++;
                break;
    
                default:
                    summary[0].nbr = this.props.shipments.length; 
                    break;
    
            }
            
        })

        const table_header = ['#', 'ID', 'Origin', 'Destination', 'Status', 'Assignee', 'Pick Up', 'Delivery'];
        //Filter the list according to what has been clicked on the Overview list
        //It Can be SHIPMENTS, WAITING,...
        const table_body = this.props.filter === '' || this.props.filter === 'SHIPMENTS' ?
                    this.props.shipments:
                    this.props.shipments.filter(shp =>(shp.status === this.props.filter));
    
        return (
            <>
                <Header />
                <PageTitle>Shipments Dashboard</PageTitle>
                
                <Overview items={summary}/>
                
                <Table body={table_body} header={table_header} user_role={user.role}/>
                
            </>
        )
    }
}

Dashboard.propTypes = {
    fetchShipments: PropTypes.func.isRequired,
    fetchBikers: PropTypes.func.isRequired,
    updateAllShipments: PropTypes.func.isRequired,
    updateAllBikers: PropTypes.func.isRequired,
    shipments: PropTypes.array.isRequired,
    filter: PropTypes.string
}

const mapStateToProps = state => ({
    shipments: state.shipments,
    filter: state.filter
})

export default connect(mapStateToProps, 
    {fetchShipments, fetchBikers, updateAllShipments, updateAllBikers}
    )(Dashboard);

export {Dashboard};