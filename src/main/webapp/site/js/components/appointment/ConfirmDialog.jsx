import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { closeConfirmDialog, addNoteToAppointment, createNotify } from '../../actions/GlobalActions.jsx';

/*
    props:
    - onUpdatePage - callback
 */
class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: ''
        };
    }

    render() {
        return (
            <Modal show={this.props.confirmDialogVisible} onHide={() => this.onClose()} onShow={() => this.onShow()}>
                <Modal.Header>
                    Confirm the action
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to proceed with this operation?<br/>
                    {this.renderNoteInput()}
                </Modal.Body>
                <Modal.Footer>
                    {this.renderFooterButtons()}
                </Modal.Footer>
            </Modal>
        )
    }

    onShow() {

    }

    onClose() {
        this.props.onCloseDialog();
        if (typeof this.props.onUpdatePage === 'function') {
            setTimeout(() => {
                this.props.onUpdatePage();
            }, 500);
        }
        this.setState({
            note: ''
        });
    }

    onOK() {
        if (this.props.addNoteOnConfirm) {
            this.onSaveNote();
        }
        if (typeof this.props.confirmDialogOKCallback === 'function') {
            this.props.confirmDialogOKCallback();
        }
        this.onClose();
    }

    onSaveNote() {
        let noteRequest = {
            id: this.props.appointmentId,
            note: this.state.note
        };
        this.props.onAddNote(noteRequest, () => this.onClose());
    }

    renderNoteInput() {
        if (this.props.addNoteOnConfirm) {
            return (
                <input value={this.state.note} onChange={proxy => this.onFieldChange(proxy)} type="text" className="form-control" id="note" placeholder="Enter the note" name="note"/>
            )
        }
    }

    onFieldChange(proxy) {
        switch (proxy.target.id) {
            case 'note': this.setState({note: proxy.target.value}); break;
        }
    }

    renderFooterButtons() {
        return (
            <div className="btn-group">
                <Button onClick={() => this.onOK()}
                        className="btn btn-success">OK</Button>
                <Button onClick={() => this.onClose()}
                        className="btn btn-default">Cancel</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        confirmDialogVisible: state.GlobalReducer.confirmDialogVisible,
        confirmDialogOKCallback: state.GlobalReducer.confirmDialogOKCallback,
        addNoteOnConfirm: state.GlobalReducer.addNoteOnConfirm,
        appointmentId: state.GlobalReducer.appointmentId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddNote: (noteRequest, onCloseCallback) => {
            addNoteToAppointment(noteRequest).then(([response, json]) => {
                if (response.status === 200) {
                    dispatch(createNotify('success', 'Success', json.message));
                    onCloseCallback();
                }
                else {
                    dispatch(createNotify('danger', 'Error', json.message));
                }
            }).catch(error => {
                dispatch(createNotify('danger', 'Error', error.message));
            });
        },

        onCloseDialog: () => {
            dispatch(closeConfirmDialog());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);