
//Action Creators
export const updateUser=User=>{
    return {
        type: 'Update User',
        payload: User
    }
}

export const updateUsers=Users=>{
    return {
        type: 'Update Users',
        payload: Users
    }
}

export const savePosts=posts=>{
    return {
        type: 'Posts',
        payload: posts
    }
}

export const logout=()=>{
    return {
        type: 'Logout',
        payload: null
    }
}

export const logoutAdmin=()=>{
    return {
        type: 'Logout Admin',
        payload: null
    }
}

export const logoutAdvertiser=()=>{
    return {
        type: 'Logout Advertiser',
        payload: null
    }
}

authenticateAdmin= async (email,password)=>{
    let res
    await fetch('http://10.113.60.188:5000/adminSignin',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(
        res=>res.json()
    ).then(data=>{
        res= data
    }).catch(err=>{
        throw new Error("Invalid Username or Password!")})
    return res
}

authenticateAdvertiser= async (email,password)=>{
    let res
    await fetch('http://10.113.60.188:5000/signinAdvertiser',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(
        res=>res.json()
    ).then(data=>{
        res= data
    }).catch(err=>{
        throw new Error("Invalid Username or Password!")})
    return res
}

authenticate= async (email,password)=>{
    let res
    await fetch('http://10.113.60.188:5000/signin',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(
        res=>res.json()
    ).then(data=>{
        res= data
    }).catch(err=>{
        throw new Error("Invalid Username or Password!")})
    return res
}

//Async Action Creator
export const login=(username,password)=>dispatch=>{
    authenticate(username,password).then(res=>{
        dispatch({type: 'Login_Success',payload: res})
    }).catch((err)=>{
        dispatch({type: 'Login_Failed',payload: err})
    })
}

export const adminLogin=(username,password)=>dispatch=>{
    authenticateAdmin(username,password).then(res=>{
        dispatch({type: 'Admin_Login_Success',payload: res})
    }).catch((err)=>{
        dispatch({type: 'Login_Failed',payload: err})
    })
}

export const advertiserLogin=(username,password)=>dispatch=>{
    authenticateAdvertiser(username,password).then(res=>{
        dispatch({type: 'Advertiser_Login_Success',payload: res})
    }).catch((err)=>{
        dispatch({type: 'Login_Failed',payload: err})
    })
}

