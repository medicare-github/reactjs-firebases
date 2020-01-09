import React, { Component } from 'react'
import Button from '../../../components/atoms/button'
import { connect } from 'react-redux'
import { registerUserAPI } from '../../../config/redux/action'

class Register extends Component {

    state = {
        email:'',
        password:'',
        isLoading:false,
    }

    handleChangeText=(e)=>{
        this.setState({
            [e.target.id]:e.target.value,
        })
    }

    handleRegisterSubmit = async () =>{
       
        const {email,password}=this.state;
        const res=await this.props.registerAPI({email,password}).catch(err=>err);
        if (res) {
            console.log('berhasillll')
            this.setState({
                email:'',
                password:''
            })            
        }else{
            
        }
        
    }

    render() {     
        return (
            <div>
                <p>Register page</p>
                <input placeholder="input email" id="email" type="email" onChange={this.handleChangeText} value={this.state.email} />
                <input placeholder="input Password" id="password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                <Button onClick={this.handleRegisterSubmit} title="Go Register" loading={this.props.isLoading} />
                <button>Go to Login</button>                
                <button>Go to Dashboard</button>
            </div>
        )
    }
}

const reduxState=(state)=>({
    isLoading:state.isLoading
})

const reduxDispatch=(dispatch)=>({
    registerAPI:(data)=>dispatch(registerUserAPI(data))
})
export default connect(reduxState,reduxDispatch) (Register);
