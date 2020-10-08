import { combineReducers ,createStore} from 'redux';

// actions, näitä actioneita kutsutaan komponenteissa
// välittävät dispatchin avulla arvot storeen ja alla oleviin reducer functioihin -> stateen 

export const addItem = (value) => {
    return{
        type: "ADD",
        item: value
    }
}
// Tämä käytössä, vastaan ottaa olion joka sisältää käyttäjän syöttämät tiedot
export const addEvent = (value) => {
    return {
        type: "eventti",
        payload: value 
    }
}


// reducer, or multiple reducers 
const EventReducer = (state, action) => {
    //if(state === undefined){
     //   state = []
    //}
    // for now empty state for every new event is fine
    // possibly we can make different reducer for updates if needed / wanted
    state=[]    
    switch(action.type) {
        case "ADD1":
            return state.concat(action.item)
            //return state.splice(1,0,action.item);
        case "eventti":
            return state.concat(action.payload);
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