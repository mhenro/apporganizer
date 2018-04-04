import React from 'react';
import { connect } from 'react-redux';

class DetailsPage extends React.Component {
    render() {
        return (
            <div>
                DetailsPage
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);