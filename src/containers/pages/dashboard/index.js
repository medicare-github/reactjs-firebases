import React, { Component, Fragment } from 'react'
import'./dashboard.scss';
import { addDataApi, getDataFromApi } from '../../../config/redux/action';
import { connect } from 'react-redux';

 class Dashboard extends Component {

    state={
        title:'',
        content:'',
        date:'',
    }
    
    UNSAFE_componentWillMount(){
        const userData=JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

    handleSaveNote=()=>{
        const {title,content}=this.state;
        const {saveNote}=this.props;
        const userData=JSON.parse(localStorage.getItem('userData'))
        const data = {
            title:title,
            content:content,
            date: new Date().getTime(),
            userId:userData.uid
        }
        saveNote(data)
        console.log(data)
    }

    onInputChange=(e,type)=>{
        this.setState({
            [type]:e.target.value
        })
    }

    render() {
        const {title,content,date}=this.state;
        const {notes}=this.props;
        console.log(notes)
        return (
            <div className="container">
                <p>Dashboard page</p>
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e)=>this.onInputChange(e, 'title')} />
                    <textarea placeholder="content" className="input-content" value={content} onChange={(e)=>this.onInputChange(e, 'content')} ></textarea>  
                    <button className="save-btn" onClick={this.handleSaveNote} >simpan</button>                
                </div>
                <hr/>
                {
                    notes.length > 0 ?(
                        <Fragment>
                            {
                                notes.map(note=>{
                                    return(
                                        <div className="card-content" key={note.id}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
                <br/>
                {/* <button>Go to Login</button>                
                <button>Go to Register</button> */}
            </div>
        )
    }
}

const reduxState=(state)=>({
    userData:state.user,
    notes:state.notes
})

const reduxDispatch=(dispatch)=>({
    saveNote:(data)=>dispatch(addDataApi(data)),
    getNotes:(data)=>dispatch(getDataFromApi(data))
})

export default connect(reduxState, reduxDispatch) (Dashboard)