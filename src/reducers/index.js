import { GET_ALL, YEAR_FILTER, SUCCESS_LAND, SUCCESS_LAUNCH, MULTIPLE_FILTER } from '../actions/index'

const initialState = {
    getAllDetails: {},
    getYearWiseDetails: {},
    getLaunchWiseDetails: {},
    getLandWiseDetails: {},
    getMultipleFilterWiseDetails: {},
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            return { ...state, getAllDetails: action.payload };
        case YEAR_FILTER:
            return { ...state, getYearWiseDetails: action.payload }
        case SUCCESS_LAUNCH:
            return { ...state, getLaunchWiseDetails: action.payload }
        case SUCCESS_LAND:
            return { ...state, getLandWiseDetails: action.payload }
        case MULTIPLE_FILTER:
            return { ...state, getMultipleFilterWiseDetails: action.payload }
        default:
            return state
    }
}
