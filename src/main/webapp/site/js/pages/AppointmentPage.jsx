import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import AppointmentList from '../components/appointment/AppointmentList.jsx';

import {
    getAppointments,
    setAppointments,
    createNotify,
    confirmAppointment,
    cancelAppointment,
    deleteAppointment,
    addNoteToAppointment
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
                                     onUpdatePage={() => this.pageSelect(this.state.activePage)}
                                     onConfirm={appId => this.props.onConfirm(appId)}
                                     onCancel={appId => this.props.onCancel(appId)}
                                     onDelete={appId => this.props.onDelete(appId)}
                    />
                </div>
                <div className="col-sm-12 text-center">
                    <button className="btn btn-success">Download as CSV-file</button>
                </div>
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