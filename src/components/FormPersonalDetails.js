import React, { Component } from 'react';
import Suggestions from './Suggestions';
import axios from 'axios';

export class FormPersonalDetails extends Component {

    state = {
        success: false,
        error: false,
        errorMessage: 'Submit failed: Empty fields',
        successMessage: 'Form submitted'
    }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
    
    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    submitData = () => {
        let {values, selectedSuggestion} = this.props;
        const postData = {
            storeType : values.storeType,
            provideDetails: values.provideDetails,
            selectedSuggestion: selectedSuggestion,
            firstName: values.firstName,
            lastName: values.lastName
        }
        if(selectedSuggestion !== '') {
            axios.post('https://webhook.site/68a595f8-b1d8-4326-bca8-cbf796fd2bc3', {postData}).then(res => {
                console.log(res);
                console.log(res.data);
                if(res.status == 200) {
                    this.setState({
                        error: false
                    });
                    values.firstName = '';
                    values.lastName = '';
                    values.suggestionSelected = '';
                }
            });
            this.setState({
                success: true
            })
        } else {
            this.setState({
                error: true
            })
        } 
    }

    render() {
        let filteredNames;
        let message;
        let errorDOM;
        let successful;

        const {values, handleChange, suggestions, suggestionSelected, disableButton} = this.props;
        const {success, error, errorMessage, successMessage} = this.state;
        if(values.userLookup.length > 0) {
            filteredNames = <Suggestions suggestionSelected={suggestionSelected} suggestions={suggestions} />
        }
        if(disableButton) {
            message = <div className="text-center bg-danger errorMessage mt-3 p-2 text-white rounded">{errorMessage}</div>
        }
        if(success) {
            successful = <div className="text-center bg-success errorMessage mt-3 p-2 text-white rounded">{successMessage}</div>
        }
        if(error) {
            errorDOM = <div className="text-center bg-danger errorMessage mt-3 p-2 text-white rounded">{errorMessage}</div>
        }
        return (
            <div className="container">
                <div className="card p-3 mt-5">
                    <React.Fragment>
                        <h3>Enter User Details</h3>
                        <div className="autocomplete">
                            <input className="form-control mt-3 mb-2 rounded" type="text" name="userLookup" onChange={handleChange}
                            value={values.userLookup} placeholder="Search Users..."></input>
                            {filteredNames}
                        </div>
                        <input className="form-control mb-2" type="text" name="firstName" onChange={handleChange} 
                        defaultValue={values.firstName} placeholder="First Name" readOnly></input>
                        <input className="form-control mb-2" type="text" name="lastName" onChange={handleChange} 
                        defaultValue={values.lastName} placeholder="Last Name" readOnly></input>
                        <div className="btn-group">
                            <button className="btn btn-success" type="submit" onClick={this.submitData}>Submit</button>
                            <button className="btn btn-warning text-white" type="submit" onClick={this.back}>Back</button>
                        </div>
                    </React.Fragment>
                </div>
                {message}
                {successful}
                {errorDOM}
            </div>
        )
    }
}

export default FormPersonalDetails;