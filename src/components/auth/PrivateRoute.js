import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveToken, isLoggedIn} from '../../redux/actions/user-actions'

function PrivateRoute({component: Component,...rest}) {

    return (
        <Route {...rest} render={(props)=>{
            const {status, user} = isLoggedIn();
            
            if(status){
                if((user.role === 'Biker' && props.match.url ==='/todo-list')
                ||(user.role === 'Manager' && props.match.url ==='/dashboard')){
                    return <Component {...props} />
                }else {
                    props.history.go(-1);
                }
                
            }else return <Redirect to='/' />
            
        }}/>
            
    )
}

const mapStateToProps = state =>({
    token: state.token
})

export default connect(mapStateToProps, {saveToken})(PrivateRoute);
