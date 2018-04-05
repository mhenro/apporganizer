import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils.jsx';


/*
    props:
    - appointment - object
    - onConfirm - callback
    - onCancel - callback
    - onDelete - callback
*/
class AppointmentListItem extends React.Component {
    render() {
        return (
            <tr className={this.getStatusClass()}>
                <td>{this.getStatus()}</td>
                <td>{this.getActions()}</td>
                <td>{this.getDate()}</td>
                <td>{this.getTime()}</td>
                <td>{this.getCompany()}</td>
                <td>{this.getAddress()}</td>
                <td>{this.getContact()}</td>
            </tr>
        )
    }

    getStatusClass() {
        if (this.props.appointment.confirmed) {
            return 'success';
        }
        if (this.props.appointment.cancelled) {
            return 'active';
        }
        return '';
    }

    getStatus() {
        if (this.props.appointment.confirmed) {
            return 'Confirmed';
        }
        if (this.props.appointment.cancelled) {
            return 'Cancelled';
        }
        return 'Active';
    }

    getActions() {
        let appId = this.props.appointment.id,
            noteBtnVisible = this.props.appointment.confirmed === true,
            confirmBtnVisible = !this.props.appointment.confirmed && !this.props.appointment.cancelled,
            cancelBtnVisible = !this.props.appointment.confirmed && !this.props.appointment.cancelled,
            editBtnVisible = !this.props.appointment.confirmed && !this.props.appointment.cancelled,
            deleteBtnVisible = true;

        return (
            <div className="btn-group">
                <button className={'btn btn-info ' + (noteBtnVisible ? '' : 'hidden')}>Show note</button>
                <button onClick={() => this.onClick(() => this.props.onConfirm(appId))} className={'btn btn-success ' + (confirmBtnVisible ? '' : 'hidden')}>Confirm</button>
                <button onClick={() => this.onClick(() => this.props.onCancel(appId))} className={'btn btn-warning ' + (cancelBtnVisible ? '' : 'hidden')}>Cancel</button>
                <Link to={'/appointments/' + this.props.appointment.id} className={'btn btn-info ' + (editBtnVisible ? '' : 'hidden')}>Edit</Link>
                <button onClick={() => this.onClick(() => this.props.onDelete(appId))} className={'btn btn-danger ' + (deleteBtnVisible ? '' : 'hidden')}>Delete</button>
            </div>
        )
    }

    onClick(callback) {
        callback();
    }

    getDate() {
        let date = new Date(this.props.appointment.date);
        return formatDate(date, 'D-M-Y');
    }

    getTime() {
        let date = new Date(this.props.appointment.date + 'T' + this.props.appointment.time);
        return formatDate(date, 'h:m:s');
    }

    getCompany() {
        return this.props.appointment.company.name + ' (' + this.props.appointment.company.url + ')';
    }

    getAddress() {
        return this.props.appointment.company.address.street;
    }

    getContact() {
        return this.props.appointment.company.contactPerson.firstName + ' ' + this.props.appointment.company.contactPerson.lastName;
    }
}

export default AppointmentListItem;