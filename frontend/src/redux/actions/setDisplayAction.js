import * as actionTypes from '../actionTypes/actionTypes'

export const setDisplay = (display) => {
    return {
        type: actionTypes.SET_DISPLAY,
        payload: display
    }
}