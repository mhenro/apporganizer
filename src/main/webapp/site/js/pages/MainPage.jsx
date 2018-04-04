import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppointmentPage from './AppointmentPage.jsx';
import DetailsPage from './DetailsPage.jsx';
import Notifier from '../components/Notifier.jsx';

class MainPage extends React.Component {
    render() {
        return (
            <BrowserRouter basename="/apporganizer">
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <Route exact path="/" component={AppointmentPage}/>
                                <Route exact path="/appointments" component={AppointmentPage}/>
                                <Route exact path="/appointments/:appId" component={DetailsPage}/>
                            </div>
                        </div>
                    </div>
                    <Notifier/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);