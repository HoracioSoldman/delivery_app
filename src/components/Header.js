import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import socketIOclient from 'socket.io-client'
import { BASE_URL } from '../redux/actions/action-types';
import { updateAllShipments } from '../redux/actions/shipment-actions'
import { saveToken, isLoggedIn } from '../redux/actions/user-actions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Hdr = styled.header`
    padding: 5px;
    background-color: #325ff8;
    text-align: center;
    color: #fff;
    ${props => props.status && 
        'position: fixed; width: 100%;top: 0;'
    }

    h1 {
        font-weight: 400;
        margin-bottom: 0;
        margin-top: 5px;
    }

    p {
        min-height: 20px;
        margin: 0;
    }
    @media (max-width: 425px) {
        h1 {
            font-size: 1.8rem;
            text-align:left;
        }
    }

`
const Profile = styled.div`
    float: right;
    color: #fff;
    text-align: right;
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 0.9em;
`

const LogoutBtn = styled.button`
    border: none;
    background-color: rgba(0,0,0,0);
    padding: 3px 10px;
    cursor: pointer;
    color: #fff;
    border-bottom: 1px solid #fff;
    :hover {
        color: #f00;
        border-bottom: 1px solid #f00;
    }
`

class Header extends Component {

    timeout = null;
    constructor(){
        super();
        
        this.state = {
          serverMsg: ''
        }
        
      }
    
    componentDidMount(){
        
        const {status, user} = isLoggedIn();
        if(status){
        
            let socket = socketIOclient(BASE_URL)
            socket.emit("connct", {username: user.uname});
            socket.on("updated", data=>{
                console.log('RECEIVED:',data)

                //update local state if the current user is concerned about the new updated item
                if(user.role === 'Manager'|| data.updated.assignee.id === user.id){

                    this.setState({serverMsg: data.msg});
                    this.props.updateAllShipments(data.shps);
                    
                    if(this.timeout !== null) clearTimeout(this.timeout);
                    
                    this.timeout = setTimeout(()=>{
                        this.setState({serverMsg: ''});
                    }, 5000);
                }
            });
        
        }
        
    }

    onLogout = () => {
        if(window.confirm('Leave this session ?')){
            
            this.props.saveToken('');
            this.props.history.push('/');
        }
    }

    render(){
        const {status, user} = isLoggedIn();
        return (
            <Hdr status={status}>
                <h1>Delivery App</h1>
                {
                    (this.props.token || status) &&  
                    <Profile>
                        <p>{user.uname} ({user.role})</p>
                        <LogoutBtn onClick={this.onLogout}>Logout</LogoutBtn>
                    </Profile>
                }
                <p >{this.state.serverMsg}</p>
            </Hdr>
            
        )
    }
}
const mapStateToProps = state => ({
    token: state.token
})

Header.propTypes = {
    updateAllShipments: PropTypes.func.isRequired,
    saveToken: PropTypes.func.isRequired,
    token: PropTypes.string,

}

export default connect(mapStateToProps, {updateAllShipments, saveToken})(withRouter(Header));

export {Header};