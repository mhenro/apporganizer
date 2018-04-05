import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { closeConfirmDialog } from '../../actions/GlobalActions.jsx';

/*
    props:
    - onUpdatePage - callback
 */
class ConfirmDialog extends React.Component {
    render() {
        return (
            <Modal show={this.props.confirmDialogVisible} onHide={() => this.onClose()} onShow={() => this.onShow()}>
                <Modal.Header>
                    Confirm the action
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to proceed with this operation?
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
    }

    onOK() {
        if (typeof this.props.confirmDialogOKCallback === 'function') {
            this.props.confirmDialogOKCallback();
        }
        this.onClose();
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
        confirmDialogOKCallback: state.GlobalReducer.confirmDialogOKCallback
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseDialog: () => {
            dispatch(closeConfirmDialog());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);