import { 
    SET_TIMER_STATE,
    SET_START_TIME,
    SET_START_LAP_TIME,
    SET_MAIN_TIMER,
    SET_CALCULATED_TIME,
    SET_AMOUNT_OF_CALCULATED_TIME,
    SET_BUTTON_BLOCK,
    SET_INTERVAL_HISTORY
} from "./actionTypes";

export const setTimerState = (newTimerState) => {
    return {
        type: SET_TIMER_STATE,
        payload: newTimerState
    };
};

export const setStartTime = (newStartTime) => {
    return {
        type: SET_START_TIME,
        payload: newStartTime
    };
};

export const setStartLapTime = (newStartLapTime) => {
    return {
        type: SET_START_LAP_TIME,
        payload: newStartLapTime
    };
}

export const setMainTimer = (newMainTimer) => {
    return {
        type: SET_MAIN_TIMER,
        payload: newMainTimer
    };
}

export const setCalculatedTime = (newCalculatedTime) => {
    return {
        type: SET_CALCULATED_TIME,
        payload: newCalculatedTime
    };
}

export const setAmountOfCalculatedTime = (newAmountOfCalculatedTime) => {
    return {
        type: SET_AMOUNT_OF_CALCULATED_TIME,
        payload: newAmountOfCalculatedTime
    };
}

export const setButtonBlock = (newButtonBlock) => {
    return {
        type: SET_BUTTON_BLOCK,
        payload: newButtonBlock
    };
}

export const setIntervalHistory = (newIntervalHistory) => {
    return {
        type: SET_INTERVAL_HISTORY,
        payload: newIntervalHistory
    };
}