import {combineReducers} from 'redux'

const userReducer=(state={},action)=>{
    if(action.type==='Update User')
    return Object.assign({},
        state,{user: action.payload}
    )
    if(action.type==='Update Users')
    return Object.assign({},
        state,{users: action.payload}
    )
    if(action.type==='Logout')
    return Object.assign({},
        state,{token: action.payload}
    )
    if(action.type==='Logout Admin')
    return Object.assign({},
        state,{adminToken: action.payload}
    )
    if(action.type==='Logout Advertiser')
    return Object.assign({},
        state,{advertiserToken: action.payload}
    )
    if(action.type==='Admin_Login_Success')
    return Object.assign({},
        state,{adminToken: action.payload.token,users: action.payload.users,error: null}
    )
    if(action.type==='Advertiser_Login_Success')
    return Object.assign({},
        state,{advertiserToken: action.payload.token,advertiser: action.payload.advertiser,error: null}
    )
    if(action.type==='Login_Success')
    return Object.assign({},
        state,{token: action.payload.token,user: action.payload.user,users: action.payload.users,error: null}
    )
    if(action.type==='Login_Failed')
    return Object.assign({},
        state,{error: action.payload}
    )
    return state 
}
const postReducer=(state=null,action)=>{
    if(action.type==='Posts')
    return  [...action.payload]
}

export const reducer=combineReducers({
    user: userReducer
})
