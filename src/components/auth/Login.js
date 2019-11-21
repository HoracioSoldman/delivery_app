import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { BASE_API_URL } from '../../redux/actions/action-types';
import {saveToken, isLoggedIn} from '../../redux/actions/user-actions'
import {connect} from 'react-redux'


function Login(props) {

    // const [uname, setUname] = useState('');
    // const [pwd, setPwd] = useState('');
    const username_input = React.createRef();
    const password_input = React.createRef();

    const [authError, setAuthError] = useState(null);
    
    const Wrapper = styled.div`
        justify-content: center;
        text-align: center;
    `
    const LoginContent = styled.div`
        margin: 80px 10px;
        width: auto;
        text-align: -webkit-center;
        background-color: #ddd;
        border-radius: 5px;
        display:inline-grid;
        width: 80%;
        @media (min-width: 768px) {
            width: 50%;
        }
        @media (min-width: 1024px) {
            width: 30%;
        }

    `
    const Form = styled.form `
        margin: 10px;
    `

    const Title = styled.h1`
        text-align: center;
        font-weight: 500;
        padding: 10px;
    `
    const Input = styled.input`
        background-color: #fff;
        text-align: center;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 3px;
        border: 1px solid #fff;
        width: 90%;
    `
    const ErrorMsg = styled.div `
        background: rgba(255, 0, 0, 0.2);
        color: #f00;
        padding: 10px;
        margin: 10px;
        border-radius: 3px;
    `

    const Button = styled.button`
        margin-top: 10px;
        background-color: #325ff8;
        border-radius: 3px;
        border: 1px solid #fff;
        width: 50%;
        padding: 10px;
        margin: 10px 10px 20px;
        color: #fff;
        cursor: pointer;
        :hover {
            background-color: #214eff;
        }
    `

    const {status, user} = isLoggedIn();
    if(status){
        props.history.push(user.role === 'Manager' ? '/dashboard' : '/todo-list');
    }

    const submitLogin = ev => {
        ev.preventDefault();
        let uname = username_input.current.value;
        let pwd = password_input.current.value;
        if(uname === '' || pwd === ''){
            setAuthError('Please fill up the form first.')
            return;
        }
        axios.post(`${BASE_API_URL}/login`, {username: uname, password: pwd})
            .then(function(response){
                
                const {data} = response;
                
                switch(data.status){
                    case 'SUCCESS':
                        //Ssaving the token to the store & localStorage
                        props.saveToken(data.token);
                        props.history.push(data.user.role === 'Manager' ? '/dashboard' : '/todo-list');
                        
                        break;
                    case 'FAILURE':
                        setAuthError(data.msg);
                    break;

                    default: 
                        //
                }
            })
            .catch(function(err){
                console.log(err);
            })
    }
    
    return (
        <Wrapper>
            <LoginContent>
                {props.children}
                <Title>Login</Title>
                <Form onSubmit={submitLogin}>
                    <Input type="text" placeholder="Username" ref={username_input}/>
                    <Input type="password" placeholder="Password" ref={password_input}/>
                    {authError && <ErrorMsg > {authError}</ErrorMsg>}
                    <Button >Login</Button>
                </Form>
                
            </LoginContent>
        </Wrapper>
    )
}

export default connect(null, {saveToken})(withRouter(Login));