import firebase, {database}  from '../../firebase'


export const actionUserName=()=>(dispatch)=>{
    setTimeout(()=>{
        return dispatch({
            type:'CHANGE_USER', value:'MEDICARE'
        })
    },2000)
}

export const registerUserAPI=(data)=>(dispatch)=>{
    return new Promise((resolve,reject)=>{
        dispatch({type:'CHANGE_LOADING', value:true})
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res=>{
            dispatch({type:'CHANGE_LOADING', value:false})
            resolve(true)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
            dispatch({type:'CHANGE_LOADING', value:false})
            reject(false)
        })
    })

}
export const loginUserAPI=(data)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({type:'CHANGE_LOADING', value:true})
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res=>{

            // console.log(res)
            const dataUser={
                email:res.user.email,
                uid:res.user.uid,
                emailVerified:res.user.emailVerified,
                refreshToken:res.user.refreshToken,

            }

            // console.log('success',res)
            dispatch({type:'CHANGE_LOADING', value:false})
            dispatch({type:'CHANGE_ISLOGIN', value:true})
            dispatch({type:'CHANGE_USER', value:dataUser})
            resolve(dataUser)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
            dispatch({type:'CHANGE_LOADING', value:false})
            dispatch({type:'CHANGE_ISLOGIN', value:false})
            reject(false)
        })
        
    })
    
}
export const addDataApi=(data)=>(dispatch)=>{
    database.ref('CulinaryTour/'+data.userId).push({
        title:data.title,
        content:data.content,
        date:data.date
    })
}

export const getDataFromApi=(userId)=>(dispatch)=>{
    const urlNotes=database.ref('CulinaryTour/' + userId);
    
    return new Promise((resolve,reject)=>{
        urlNotes.on('value', function(snapshot){
        //    console.log('get data api :', snapshot.val()) 

            const data=[];
            if (snapshot.val()) {
                Object.keys(    snapshot.val()).map(key=>{
                    data.push({
                        id:key,
                        data:snapshot.val()[key]
                    })
                })
                
            }
           dispatch({
               type:'SET_NOTES', value:data
           })
           resolve(snapshot.val())
        });
        
    })
}