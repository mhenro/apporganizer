import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import AppointmentList from '../components/appointment/AppointmentList.jsx';
import ConfirmDialog from '../components/appointment/ConfirmDialog.jsx';

import {
    getAppointments,
    setAppointments,
    createNotify,
    confirmAppointment,
    cancelAppointment,
    deleteAppointment,
    showConfirmDialog
} from '../actions/GlobalActions.jsx';

class AppointmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            totalPages: 1,
            pageSize: 5
        };
    }

    componentDidMount() {
        this.props.onGetAppointments(this.state.activePage, this.state.pageSize, page => this.updatePage(page));
    }

    render() {
        return (
            <div>
                <div className="col-sm-12 text-center">
                    <h2>Appointment list</h2>
                </div>
                <div className="col-sm-12 text-center">
                    <Pagination
                        className={'shown'}
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={this.state.totalPages}
                        maxButtons={3}
                        activePage={this.state.activePage}
                        onSelect={page => this.pageSelect(page)}/>
                    <br/>
                    <br/>
                </div>
                <div className="col-sm-12 text-center">
                    <AppointmentList appointments={this.props.appointments}
                                     onShowNote={note => this.props.onShowNote(note)}
                                     onConfirm={appId => this.onConfirmAction(() => this.props.onConfirm(appId), true, appId)}
                                     onCancel={appId => this.onConfirmAction(() => this.props.onCancel(appId), false, appId)}
                                     onDelete={appId => this.onConfirmAction(() => this.props.onDelete(appId), false, appId)}
                    />
                </div>
                <div className="col-sm-12 text-center">
                    <button className="btn btn-success">Download as CSV-file</button>
                </div>

                {/* popup dialog for actions confirmation */}
                <ConfirmDialog onUpdatePage={() => this.pageSelect(this.state.activePage)}/>
            </div>
        )
    }

    pageSelect(page) {
        this.setState({
            activePage: page
        });

        this.props.onGetAppointments(page, this.state.pageSize, page => this.updatePage(page));
    }

    updatePage(page) {
        this.setState({
            totalPages: page.totalPages,
        });
    }

    onConfirmAction(action, noteInputVisible, appId) {
        this.props.onConfirmAction(action, noteInputVisible, appId);
    }
}

const mapStateToProps = (state) => {
    return {
        appointments: state.GlobalReducer.appointments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAppointments: (page, size, callback) => {
            getAppointments(page - 1, size).then(([response, json]) => {
                if (response.status === 200) {
                    let appointments = json.content;
                    dispatch(setAppointments(appointments));
                    callback(json);
                }
                else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onConfirmAction: (action, noteInputVisible, appId) => {
            dispatch(showConfirmDialog(action, noteInputVisible, appId));
        },

        onShowNote: (note) => {
            dispatch(createNotify('info', 'Info', note));
        },

        onConfirm: (appId) => {
            confirmAppointment(appId).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(createNotify('success', 'Success', json.message));
                }
                else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onCancel: (appId) => {
            cancelAppointment(appId).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(createNotify('success', 'Success', json.message));
                }
                else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onDelete: (appId) => {
            deleteAppointment(appId).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(createNotify('success', 'Success', json.message));
                }
                else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentPage);