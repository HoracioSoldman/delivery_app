import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchShipments, updateAllShipments} from '../../../redux/actions/shipment-actions'
import {fetchBikers, updateAllBikers} from '../../../redux/actions/user-actions'
import Overview from '../../list-overview/Overview'
import Shipments from '../shipment/Shipments'
import Header from '../../Header'
import {PageTitle} from '../../stylus'

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
        const summaries = [
            {title: 'SHIPMENTS', nbr:this.props.shipments.length, primaryColor:'#607D8B', secondaryColor: '#78909C'},
            {title: 'WAITING', nbr:0, primaryColor:'#673AB7', secondaryColor: '#7E57C2'},
            {title: 'ASSIGNED', nbr:0, primaryColor:'#2196F3', secondaryColor: '#42A5F5'},
            {title: 'PICKED_UP', nbr:0, primaryColor:'#009688', secondaryColor: '#26A69A'},
            {title: 'DELIVERED', nbr:0, primaryColor:'#4CAF50', secondaryColor: '#66BB6A'},
        ];
    

        this.props.shipments.forEach((shp, i)=>{
            switch(shp.status){
                case 'WAITING':
                    summaries[1].nbr++;
                break;
                
                case 'ASSIGNED':
                    summaries[2].nbr++;
                break;
                
                case 'PICKED_UP':
                    summaries[3].nbr++;
                break;
                
                case 'DELIVERED':
                    summaries[4].nbr++;
                break;
    
                default:
                    summaries[0].nbr = this.props.shipments.length; 
                    break;
    
            }
            
        })

        //Filter the list according to what has been clicked on the Overview list
        //It Can be SHIPMENTS, WAITING,...
        const list = this.props.filter === '' || this.props.filter === 'SHIPMENTS' ?
                    this.props.shipments:
                    this.props.shipments.filter(shp =>(shp.status === this.props.filter));
    
        return (
            <>
                <Header />
                <PageTitle>Shipments Dashboard</PageTitle>
                
                <Overview items={summaries}/>
                
                <Shipments shipments={list}/>
                
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