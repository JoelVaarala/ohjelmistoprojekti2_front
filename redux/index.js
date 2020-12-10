import { combineReducers ,createStore} from 'redux';

// Actions
// delivers data by using dispatch within components for the reducers and ultimately store

// stores user id
export const userData = (value) => {
    return {
        type: "addUid",
        item: value
    }
}

// Takes token as input 
export const addToken = (value) => {
    return {
        type: "addToken",
        item: value
    }
}


// Reducers
// includes logic and updates states

const UserReducer = (state, action) => {
    if(state === undefined){
        state = [];
    }
    switch(action.type){
        case "addUid":
            return state.concat(action.item);
        default:
            return state;
    }
}

const TokenReducer = (state, action) => {
    if(state === undefined){
        state = [];
    }
    switch(action.type){
        case "addToken":
            return state.concat(action.item);
        default:
            return state;
    }
}


// root reducer that has all individual reducers wrapped is easier to use with multiple classes
export const rootReducer = combineReducers({
    UserReducer,
    TokenReducer
})

// store, that has all the data is "wrapped around" main component of the app via <Provider> so all files have access to the store
export const store = createStore(rootReducer)