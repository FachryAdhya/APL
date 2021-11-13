import {GET_INDONESIA, INDONESIA_ERROR, GET_PROVINSI, PROVINSI_ERROR} from '../types'
import axios from 'axios'

export const getIndonesia = () => async dispatch => {
    try{
        const res = await axios.get(`https://data.covid19.go.id/public/api/update.json`)
        dispatch( {
            type: GET_INDONESIA,
            payload: res.data.update.total
        })
    }
    catch(e){
        dispatch( {
            type: INDONESIA_ERROR,
            payload: console.log(e),
        })
    }
}

export const getProvinsi = () => async dispatch => {
    try{
        const res = await axios.get(`https://data.covid19.go.id/public/api/prov.json`)
        dispatch( {
            type: GET_PROVINSI,
            payload: res.data.list_data
        })
    }
    catch(e){
        dispatch( {
            type: PROVINSI_ERROR,
            payload: console.log(e),
        })
    }
}