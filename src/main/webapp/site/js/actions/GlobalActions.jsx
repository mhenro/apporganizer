import doFetch from './fetch.jsx';
import { getHost } from '../utils.jsx';

export const getAppointments = (page = 0, size = 5) => {
    return doFetch(getHost() + 'appointments?page=' + page + '&size=' + size);
};

export const confirmAppointment = (appId) => {
    return doFetch(getHost() + 'appointments/' + appId + '/confirm');
};

export const cancelAppointment = (appId) => {
    return doFetch(getHost() + 'appointments/' + appId + '/cancel');
};

export const deleteAppointment = (appId) => {
    return doFetch(getHost() + 'appointments/' + appId, 'DELETE');
};

export const addNoteToAppointment = (noteRequest) => {
    return doFetch(getHost() + 'appointments/note', noteRequest);
};

export const SET_APPOINTMENTS = 'SET_APPOINTMENTS';

export const CREATE_NOTIFY = 'CREATE_NOTIFY';
export const REMOVE_NOTIFIES = 'REMOVE_NOTIFIES';
export const REMOVE_NOTIFY = 'REMOVE_NOTIFY';

export const setAppointments = (appointments) => {
    return {
        type: SET_APPOINTMENTS,
        appointments
    }
};

export const createNotify = (type, header, message) => {
    return {
        type: CREATE_NOTIFY,
        nType: type,
        header,
        message
    }
};

export const removeNotifies = () => {
    return {
        type: REMOVE_NOTIFIES
    }
};

export const removeNotify = (alert) => {
    return {
        type: REMOVE_NOTIFY,
        alert
    }
};