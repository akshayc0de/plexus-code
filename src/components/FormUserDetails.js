import React, { Component } from 'react'

export class FormUserDetails extends Component {
    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values, handleChange, handleSelect, metroSelected, errorMessage, disableButton } = this.props;
        let details;
        let message;

        if(metroSelected) {
            details = <textarea className="mt-2 form-control" name="provideDetails" defaultValue={values.provideDetails} onChange={handleChange} placeholder="Please provide details" required/>;
        }
        if(disableButton) {
            message = <div className="text-center bg-danger errorMessage mt-3 p-2 text-white rounded">{errorMessage}</div>
        }
        return (
        <div className="container">
            <div className="card p-3 mt-5">
                <React.Fragment>
                    <h3>Enter Store Details</h3>
                    <select className="mt-3 form-control h-75" name="storeType" defaultValue={values.storeType} onChange={handleSelect}>
                        <option value="">Select a store</option>
                        <option value="Mall">Mall</option>
                        <option value="Metro">Metro</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Centre">Centre</option>
                    </select>
                    {details}
                    <br />
                    <button className="btn btn-primary" type="submit" disabled={disableButton ? 'disabled' : '' } onClick={this.continue}>Continue</button>
                </React.Fragment>
            </div>
            {message}
        </div>
        )
    }
}

export default FormUserDetails;

// running log of this component
// the dropdown changes and sets the state and retains it - done
// the textarea also sends its data to the state and retains it - done
// next I need to conditionally render the textarea based on the user selection - done
// validate form part 1 - done
// validate form part 2 - 
// Perform user lookup and autofill - sort of done