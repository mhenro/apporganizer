import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import {
    getAppointments,
    setAppointments,
    getAppointmentDetails,
    setCurrentAppointment,
    saveAppointment,
    getAllCompanies,
    createNotify
} from '../actions/GlobalActions.jsx';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            time: '',
            companies: [{value: null, label: 'Not selected'}],
            company: {value: null, label: 'Not selected'}
        };
    }

    componentDidMount() {
        this.props.onGetDetails(this.props.match.params.appId, () => this.updateForm());
        this.props.onGetAllCompanies(items => this.updateComboboxItems(items), () => this.updateForm());
    }

    render() {
        if (!this.isDataLoaded()) {
            return (
                <div className="col-sm-12 text-center">
                    Data is loading. Please wait...
                </div>
            )
        }
        return (
            <div>
                <div className="col-sm-12 text-center">
                    <h2>Appointment detals</h2>
                    <br/>
                </div>
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form className="form-horizontal" onSubmit={event => this.onSubmit(event)}>
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="date">Date</label>
                                    <div className="col-sm-10">
                                        <input value={this.state.date} onChange={proxy => this.onFieldChange(proxy)} type="text" className="form-control" id="date" placeholder="Enter the date" name="date"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="time">Time</label>
                                    <div className="col-sm-10">
                                        <input value={this.state.time} onChange={proxy => this.onFieldChange(proxy)} type="text" className="form-control" id="time" placeholder="Enter the time" name="time"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="company">Company</label>
                                    <div className="col-sm-10">
                                        <Select value={this.state.company} id="company" options={this.state.companies} onChange={c => this.onCompanyChange(c)} placeholder="Choose company"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-1">
                                        <Link to="/" onClick={() => this.onSubmit()} className="btn btn-success btn-block">Edit</Link>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/" className="btn btn-default btn-block">Cancel</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    isDataLoaded() {
        return this.props.currentAppoinment !== null;
    }

    onFieldChange(proxy) {
        switch (proxy.target.id) {
            case 'date': this.setState({date: proxy.target.value}); break;
            case 'time': this.setState({time: proxy.target.value}); break;
            case 'company': this.setState({company: proxy.target.value}); break;
        }
    }

    updateComboboxItems(items) {
        let options = [];
        for (let company in items) {
            options.push({
                value: items[company].id,
                label: items[company].name
            });
        }
        this.setState({companies: options});
    }

    onCompanyChange(company) {
        this.setState({
            company: company
        });
    }

    updateForm() {
        this.setState({
            date: this.props.currentAppoinment.date,
            time: this.props.currentAppoinment.time,
            company: {value: this.props.currentAppoinment.company.id, label: this.props.currentAppoinment.company.name}
        });
    }

    onSubmit(event) {
        if (event) {
            event.preventDefault();
        }

        let appointmentRequest = {
            appId: this.props.currentAppoinment.id,
            date: this.state.date,
            time: this.state.time,
            companyId: this.state.company.value
        };
        this.props.onSaveAppointment(appointmentRequest);
        setTimeout(() => {
            this.props.onUpdateAppointments();
        }, 500);
    }
}

const mapStateToProps = (state) => {
    return {
        currentAppoinment: state.GlobalReducer.currentAppoinment
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDetails: (appId, callback) => {
            getAppointmentDetails(appId).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(setCurrentAppointment(json.message));
                    callback();
                } else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onSaveAppointment: (appointmentRequest) => {
            saveAppointment(appointmentRequest).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(createNotify('success', 'Success', json.message));
                } else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onGetAllCompanies: (callback, updateCallback) => {
            getAllCompanies().then(([response, json]) => {
                if (response.status === 200) {
                    callback(json.message);
                    updateCallback();
                } else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onUpdateAppointments: () => {
            getAppointments(0).then(([response, json]) => {
                if (response.status === 200) {
                    let appointments = json.content;
                    dispatch(setAppointments(appointments));
                }
                else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);