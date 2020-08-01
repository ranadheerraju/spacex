import axios from 'axios';

export const GET_ALL = 'GET_ALL'
export const YEAR_FILTER = 'YEAR_FILTER'
export const SUCCESS_LAUNCH = 'SUCCESS_LAUNCH'
export const SUCCESS_LAND = 'SUCCESS_LAND'
export const MULTIPLE_FILTER = 'MULTIPLE_FILTER'

export const getAll = () => async dispatch => {
    await axios.get('https://api.spaceXdata.com/v3/launches?limit=100')
        .then((response) => {
            dispatch({
                type: GET_ALL,
                payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: GET_ALL,
                payload: error.response
            })
        })
}

export const getYearWiseData = (year) => async dispatch => {
    await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${year}`)
        .then((response) => {
            dispatch({
                type: YEAR_FILTER,
                payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: YEAR_FILTER,
                payload: error.response
            })
        })
}

export const getLaunchWiseData = (launch) => async dispatch => {
    await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch}`)
        .then((response) => {

            dispatch({
                type: SUCCESS_LAUNCH,
                payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: SUCCESS_LAUNCH,
                payload: error.response
            })
        })
}

export const getLandWiseData = (land) => async dispatch => {
    await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&land_success=${land}`)
        .then((response) => {
            dispatch({
                type: SUCCESS_LAND,
                payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: SUCCESS_LAND,
                payload: error.response
            })
        })
}

export const getMultipleFilterWiseData = (year, launch, land) => async dispatch => {
    let uri = '';
    if (year !== null && launch !== null && land !== null) {
        uri = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch}&land_success=${land}&launch_year=${year}`;
    } else if (launch !== null && land !== null) {
        uri = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch}&land_success=${land}`;
    } else if (year !== null && launch !== null) {
        uri = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch}&launch_year=${year}`;
    } else if (year !== null && land !== null) {
        uri = `https://api.spaceXdata.com/v3/launches?limit=100&land_success=${land}&launch_year=${year}`;
    }

    axios.get(uri)
        .then((response) => {
            dispatch({
                type: MULTIPLE_FILTER,
                payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: MULTIPLE_FILTER,
                payload: error.response
            })
        })
}
