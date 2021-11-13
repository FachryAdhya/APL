import {GET_INDONESIA, GET_PROVINSI} from '../types'

const initialState = {
    indonesia:[],
    provinsi:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_INDONESIA:
        return {
            ...state,
            indonesia:action.payload,
            loading:false

        }
        case GET_PROVINSI:
        return {
            ...state,
            provinsi:action.payload,
            loading:false

        }
        default: return state
    }

}