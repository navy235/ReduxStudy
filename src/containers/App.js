import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FullScreen } from '../components/UI';
import { Modal} from 'react-bootstrap';
import { errorClear } from '../actions/error';

@connect(state => ({error: state.error.error}),
    {errorClear})
export default
class App extends Component {

    onErrorClose() {
        this.props.errorClear();
    }

    render() {
        var showError = this.props.error != null;
        var errorMessage = this.props.error && this.props.error.message;
        return (
            <FullScreen id="app">
                {this.props.children}
                <Modal status='error' onHide={this.onErrorClose}
                       show={showError}>
                    <Modal.Header closeButton>
                        <Modal.Title>The Application Get Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Error Message</h4>

                        <div>{errorMessage}</div>
                    </Modal.Body>
                </Modal>
            </FullScreen>
        )
    }
}
