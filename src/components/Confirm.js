import React, { Component } from 'react'

export class Confirm extends Component {
    continue = (e) => {
        e.preventDefault();
        // Process form HERE and send it to the dummy endpoint
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        // pulling it out of the props which is in values
        const {values: {firstName, lastName, userLookup, storeType, provideDetails} } = this.props;
        return (
            <div>
                <React.Fragment>
                    <ul>
                        <li>{firstName}</li>
                        <li>{lastName}</li>
                        <li>{userLookup}</li>
                        <li>{storeType}</li>
                        <li>{provideDetails}</li>
                    </ul>
                    <button type="submit" onClick={this.continue}>Confirm & Continue</button>
                    <button type="submit" onClick={this.back}>Back</button>
                </React.Fragment>
            </div>
        )
    }
}

export default Confirm;