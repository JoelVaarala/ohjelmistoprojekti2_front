import { combineReducers ,createStore} from 'redux';

// actions, näitä actioneita kutsutaan komponenteissa
// välittävät dispatchin avulla arvot alla oleviin reducer functioihin -> stateen

export const addItem = (value) => {
    return{
        type: "ADD",
        item: value
    }
}
 export const addName = (value) => {
    return {
        type: "ADD1",
        item: value
    }
}
export const addBio = (value) => {
    return {
        type: "ADD2",
        item: value
    }
}
export const addTime = (value) => {
    return {
        type: "ADD3",
        item: value
    }
}
export const addTags = (value) => {
    return {
        type: "ADD4",
        item: value
    }
}


// reducer, or multiple reducers 
const EventReducer = (state, action) => {
    if(state === undefined){
        state = []
    }
    
    switch(action.type) {
        case "ADD1":
            return state.concat(action.item)
            //return state.splice(1,0,action.item);
            
        case "ADD2":
            return state.concat(action.item);
        case "ADD3":
            return state.concat(action.item);
        case "ADD4":
            return state.concat(action.item);
        default:
            return state;
    } 
}

// root reducer
// if need more than 1 reducer add here
export const rootReducer = combineReducers({
    EventReducer,
})

// store, wrapattu koko Appin ympärille <Provider> avulla -> mahdollistaa storen olevan saatavilla kaikista komponenteista käsin
export const store = createStore(rootReducer)