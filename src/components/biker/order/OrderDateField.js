import React, {useState} from 'react'
import {connect} from 'react-redux'
import {formatDate, updateShipment} from '../../../redux/actions/shipment-actions'
import {OrderDateFieldStyle} from '../../stylus'
import {PropTypes} from 'prop-types'

const OrderDateField = (props) =>{
    const [editMode, setEditMode] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2019);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const {status} = props.order;
    const {type, date} = props;

    const edit = (date) => ev => {
        
        setDeleteBtn(date != null);
        
        date = date === undefined ? new Date() : new Date(date);
        
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setHour(date.getHours());
        setMinute(date.getMinutes());
        
        setEditMode(true);
    }

    const cancel = () => {
        setEditMode(false);
    }

    const save = () => {
        let newDate = new Date(`${year}-${month+1}-${day} ${hour}:${minute}`);
        if(newDate > new Date()){
            window.alert('Invalid Time! Please select current or any previous time.');
            return;
        }else if(type === 'delivery' && newDate < props.order.pickup){
            window.alert('Invalid Time! Please select a Time after the PICKUP one.');
            return;
        }

        sendUpdate(newDate);
    }

    const remove = () => {
        
        let msg = status === 'DELIVERED' && type === 'pick_up' ?
            `Unset this PICK_UP TIME ? This operation will also 
            unset the DELIVERY TIME and change the order's STATUS`:
            `Unset this time ? This operation will also change the order's STATUS.`;

        if(window.confirm(msg)) sendUpdate(null);
            
    }

    const sendUpdate = (date) =>{
        let updatedOrder = props.order;

        switch(type){
            case 'pick_up':
                updatedOrder.pickup = date;
                if(date !== null){
                    updatedOrder.status = updatedOrder.status === 'ASSIGNED' ? 'PICKED_UP' : updatedOrder.status;
                }else {
                    updatedOrder.status = 'ASSIGNED'
                    updatedOrder.delivery = date;
                }
                break;
                
            case 'delivery':
                
                updatedOrder.delivery = date;
                if(date !== null){
                    updatedOrder.status = updatedOrder.status === 'PICKED_UP' ? 'DELIVERED' : updatedOrder.status;
                }else{
                    updatedOrder.status = 'PICKED_UP'
                }
                break;
            default:
                //        
        }
        props.updateShipment(updatedOrder);
        setEditMode(false);
    }

    const onDateChange = (indx) => ev => {
        switch(indx){
            case 0:
                setDay(+ev.target.value);
                break;
            case 1:
                setMonth(+ev.target.value);
                break;
            case 2:
                setYear(+ev.target.value);
                break;
            case 3:
                setHour(+ev.target.value);
                break;
            case 4:
                setMinute(+ev.target.value);
                break;
            default:

        }
    }


    const crossbrowserDateInputSelectOptions = () =>{
        let d = []; let m = []; let y = []; let h = []; let mn = [];
        for(let i = 0; i < 60; i++){
            if(d.length <= 31){
                d.push(<option value={i+1} key={i}>{i+1}</option>);
            }
            
            if(m.length < 12){
                m.push(<option value={i} key={i}>{months[i]}</option>);
            }
            
            if(y.length <= 5){
                y.push(<option value={2019 + i} key={i}>{2019 + i}</option>);
            }
          
            if(h.length <= 23){
                h.push(<option value={i} key={i}>{i < 10 ? `0${i}`: i}</option>);
            }
            
            mn.push(<option value={i} key={i}>{i < 10 ? `0${i}`: i}</option>);         
        }

        return {day: d, month: m, year: y, hour: h, minute: mn};
    }
    
    const content = () => {
        if(editMode){
            let dateval = crossbrowserDateInputSelectOptions();
            
            return (
                <OrderDateFieldStyle>
                    <div >
                        <select value={day} onChange={onDateChange(0)} className="dd">{dateval.day}</select>
                        <select value={month} onChange={onDateChange(1)} className="mm">{dateval.month}</select>
                        <select value={year} onChange={onDateChange(2)}  className="yy">{dateval.year}</select>
                    </div>
                    <div >
                        <select value={hour} onChange={onDateChange(3)} className="hh">{dateval.hour}</select>
                        {':'}
                        <select value={minute} onChange={onDateChange(4)}  className="mn">{dateval.minute}</select>
                    </div>
                    <div >
                        {deleteBtn && <button className='rm' onClick={remove}>Delete</button>}
                        <button className='cnc' onClick={cancel}>Cancel</button>
                        <button className='save'onClick={save}>Save</button>  
                    </div>
                </OrderDateFieldStyle>
            )
        }else {
            return (
                <OrderDateFieldStyle>
                    <span>{date !== null ? formatDate(date) : '[Not Set]'}</span>
                    {type === 'pick_up' && 
                        (
                            status === 'ASSIGNED' ?
                            <button className='add ' onClick={edit()}>+</button> :
                            <button className='edt ' onClick={edit(date)}>-</button>    
                        )
                    }
                    {type === 'delivery' && 
                        (
                            status === 'PICKED_UP' ?
                            <button className='add' onClick={edit()}>+</button> :
                            status === 'DELIVERED' ?
                            <button className='edt' onClick={edit(date)}>-</button> :''
                        )
                    }  
                </OrderDateFieldStyle>
                )
            
        }

    }

    return content();
    
}

OrderDateField.proptypes = {
    shipments: PropTypes.array.isRequired,
    updateShipment: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.date,
    status: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    shipments: state.shipments
})

export default connect(mapStateToProps, {updateShipment})(OrderDateField);

export {OrderDateField};