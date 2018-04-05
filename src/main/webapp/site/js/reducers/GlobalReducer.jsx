import {
    SET_APPOINTMENTS,
    SET_CURRENT_APPOINMENT,
    SHOW_CONFIRM_DIALOG,
    CLOSE_CONFIRM_DIALOG,
    CREATE_NOTIFY,
    REMOVE_NOTIFIES,
    REMOVE_NOTIFY
} from '../actions/GlobalActions.jsx';

const initialState = {
    appointments: [],
    currentAppoinment: null,
    confirmDialogVisible: false,
    confirmDialogOKCallback: null,
    alerts: []
};

const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APPOINTMENTS:
            return Object.assign({}, state, {appointments: action.appointments});

        case SET_CURRENT_APPOINMENT:
            return Object.assign({}, state, {currentAppoinment: action.appointment});

        case SHOW_CONFIRM_DIALOG:
            return Object.assign({}, state, {confirmDialogVisible: true, confirmDialogOKCallback: action.onOK});

        case CLOSE_CONFIRM_DIALOG:
            return Object.assign({}, state, {confirmDialogVisible: false, confirmDialogOKCallback: null});

        case CREATE_NOTIFY:
            let newAlert = {
                id: (new Date()).getTime(),
                type: action.nType,
                headline: action.header,
                message: action.message
            };
            return Object.assign({}, state, {alerts: [...state.alerts, newAlert]});

        case REMOVE_NOTIFIES:
            return Object.assign({}, state, {alerts: []});

        case REMOVE_NOTIFY:
            const alerts = state.alerts;
            const index = alerts.indexOf(action.alert);
            if (index >= 0) {
                return Object.assign({}, state, {alerts: [...alerts.slice(0, index), ...alerts.slice(index + 1)]});
            }
    }
    return state;
};

export default GlobalReducer;
