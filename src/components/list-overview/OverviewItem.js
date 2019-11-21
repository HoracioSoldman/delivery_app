import React from 'react'
import {OverviewItemStyle} from '../stylus'
import { connect } from 'react-redux';
import {filterTable} from '../../redux/actions/shipment-actions'
import PropTypes from 'prop-types'

 function OverviewItem(props) {
    const {title, nbr, primaryColor, secondaryColor} = props.item;

    const onOverviewClicked = () =>{
        props.filterTable(title);
    }
    return (
        <OverviewItemStyle onClick={onOverviewClicked}  
            primaryColor={primaryColor} secondaryColor={secondaryColor}>
            <h4>{title}</h4>
            <p>{nbr}</p>
        </OverviewItemStyle>
    )
}

OverviewItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        nbr: PropTypes.number.isRequired,
        primaryColor: PropTypes.string.isRequired,
        secondaryColor: PropTypes.string.isRequired,
    })
}

export default connect(null, {filterTable})(OverviewItem);

export {OverviewItem};