import React from 'react';

import AppointmentListItem from './AppointmentListItem.jsx';

/*
    props:
    - appointments - array
    - onUpdatePage - callback
    - onConfirm - callback
    - onCancel - callback
    - onDelete - callback
 */
class AppointmentList extends React.Component {
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <td>Status</td>
                        <td>Action</td>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Company</td>
                        <td>Address</td>
                        <td>Contact person</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderAppointments()}
                </tbody>
            </table>
        )
    }

    renderAppointments() {
        return this.props.appointments.map((app, key) => {
            return (
                <AppointmentListItem key={key} appointment={app}
                                     onUpdatePage={this.props.onUpdatePage}
                                     onConfirm={this.props.onConfirm}
                                     onCancel={this.props.onCancel}
                                     onDelete={this.props.onDelete}
                />
            )
        });
    }
}

export default AppointmentList;