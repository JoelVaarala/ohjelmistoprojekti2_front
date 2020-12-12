import { combineReducers ,createStore} from 'redux';

// Actions
// delivers data by using dispatch within components for the reducers and ultimately store


export const addUid = (value) => {
    return {
        type: "addUid",
        item: value
    }
}

export const addToken = (value) => {
    return {
        type: "addToken",
        item: value
    }
}

export const addName = (value) => {
    return {
        type: "addName",
        item: value
    }
}

export const addLatitude = (value) => {
    return {
        type: "addLat",
        item: value
    }
}

export const addLongitude = (value) => {
    return {
        type: "addLon",
        item: value
    }
}


// Reducers
// includes logic and updates states

const UserDataReducer = (state, action) => {
    if(state === undefined){
        state = [{
            name: "",
            id: "",
            token: "",
            latitude: "",
            longitude: "",
        }];
    }
    switch(action.type){
        case "addUid":
            state[0].id = action.item
            return state;
            //return state.concat(state[0].id = action.item);
        case "addToken":
            state[0].token = action.item
            return state;
        case "addName":
            state[0].name = action.item
            return state;
        case "addLat":
            state[0].latitude = action.item
            return state;
        case "addLon":
            state[0].longitude = action.item
            return state;
        default:
            return state;
    }
}


const DefaultReducer = (state, action) => {
    if(state === undefined){
        state = [{
            url: "https://ohpro2.herokuapp.com/",
            key: "GevdYMR6HG0TuzaUo55m0XVFtEXH9PAI",
        }];
    }
    return state;
}



// root reducer that has all individual reducers wrapped is easier to use with multiple classes
export const rootReducer = combineReducers({
    UserDataReducer,
    DefaultReducer
})

// store, that has all the data is "wrapped around" main component of the app via <Provider> so all files have access to the store
export const store = createStore(rootReducer)