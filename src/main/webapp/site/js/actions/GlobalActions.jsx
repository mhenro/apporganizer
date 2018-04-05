import doFetch from './fetch.jsx';
import { getHost } from '../utils.jsx';

export const getAppointments = (page = 0, size = 5) => {
    return doFetch(getHost() + 'appointments?page=' + page + '&size=' + size);
};

export const getAppointmentDetails = (appId) => {
    return doFetch(getHost() + 'appointments/' + appId);
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

export const saveAppointment = (appointmentRequest) => {
    return doFetch(getHost() + 'appointments', appointmentRequest);
};

export const getAllCompanies = () => {
    return doFetch(getHost() + 'companies');
};

export const downloadCsv = () => {
    return doFetch(getHost() + 'download', null, null, 'text/csv', 'blob');
};

export const SET_APPOINTMENTS = 'SET_APPOINTMENTS';
export const SET_CURRENT_APPOINMENT = 'SET_CURRENT_APPOINMENT';

export const SHOW_CONFIRM_DIALOG = 'SHOW_CONFIRM_DIALOG';
export const CLOSE_CONFIRM_DIALOG = 'CLOSE_CONFIRM_DIALOG';

export const CREATE_NOTIFY = 'CREATE_NOTIFY';
export const REMOVE_NOTIFIES = 'REMOVE_NOTIFIES';
export const REMOVE_NOTIFY = 'REMOVE_NOTIFY';

export const setAppointments = (appointments) => {
    return {
        type: SET_APPOINTMENTS,
        appointments
    }
};

export const setCurrentAppointment = (appointment) => {
    return {
        type: SET_CURRENT_APPOINMENT,
        appointment
    }
};

export const showConfirmDialog = (onOK, noteInputVisible, appointmentId) => {
    return {
        type: SHOW_CONFIRM_DIALOG,
        onOK,
        noteInputVisible,
        appointmentId
    }
};

export const closeConfirmDialog = () => {
    return {
        type: CLOSE_CONFIRM_DIALOG
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