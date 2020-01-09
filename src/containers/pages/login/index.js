import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/atoms/button'
import { loginUserAPI } from '../../../config/redux/action'


class Login extends Component {

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

    handleLoginSubmit = async () =>{
       
        const {email,password}=this.state;
        const {history}=this.props;
        const res= await this.props.loginAPI({email,password}).catch(err=>err);
        if (res) {
            console.log('success login',res)
            localStorage.setItem('userData',JSON.stringify(res))
            this.setState({
                email:'',
                password:''
            })
            history.push('/')
        }else{
            console.log('error login')
            history.push('/login')
            this.setState({
                email:'',
                password:''
            })
        }

        
    }

    render() {
        return (
            <div>
                <p>Login page</p>
                <input placeholder="input email" id="email" type="email" onChange={this.handleChangeText} value={this.state.email} />
                <input placeholder="input Password" id="password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                <button>Go to Register</button>                
                <button>Go to Dashboard</button>
            </div>
        )
    }
}



const reduxState=(state)=>({
    isLoading:state.isLoading
})

const reduxDispatch=(dispatch)=>({
    loginAPI:(data)=>dispatch(loginUserAPI(data))
})

export default connect(reduxState,reduxDispatch) (Login);

