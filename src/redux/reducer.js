import {
    SET_TIMER_STATE,
    SET_START_TIME,
    SET_START_LAP_TIME,
    SET_MAIN_TIMER,
    SET_CALCULATED_TIME,
    SET_AMOUNT_OF_CALCULATED_TIME,
    SET_BUTTON_BLOCK,
    SET_INTERVAL_HISTORY
} from "./actionTypes.js"

const currentTime = new Date();

const initialState = {
    timerState: 'clean',
    startTime: currentTime,
    startLapTime: currentTime,
    mainTimer: new Date(0),
    calculatedTime: 0,
    amountOfCalculatedTime: 0,
    buttonBlock: 'start',
    intervalHistory: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIMER_STATE:
            return { ...state, timerState: action.payload };
        case SET_START_TIME:
            return { ...state, startTime: action.payload };
        case SET_START_LAP_TIME:
            return { ...state, startLapTime: action.payload };
        case SET_MAIN_TIMER:
            return { ...state, mainTimer: action.payload };
        case SET_CALCULATED_TIME:
            return { ...state, calculatedTime: action.payload };
        case SET_AMOUNT_OF_CALCULATED_TIME:
            return { ...state, amountOfCalculatedTime: action.payload };
        case SET_BUTTON_BLOCK:
            return { ...state, buttonBlock: action.payload };
        case SET_INTERVAL_HISTORY:
            return { ...state, intervalHistory: action.payload };
        default:
            return state;
    }
};