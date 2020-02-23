import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import axios from 'axios';

export default class UserForm extends Component {
    state = {
        step: 1,
        storeType: '',
        provideDetails: '',
        userLookup: '',
        results: [],
        suggestions: [],
        selectedSuggestion: '',
        firstName: '',
        lastName: '',
        metroSelected: false,
        errorMessage: 'Fields cannot be empty',
        showMessage: false,
        disableButton: false
    }

    // this fires on DOM load
    componentDidMount() {
        const initialDisable = this.state.storeType;
        if(initialDisable == '') {
            this.setState({
                disableButton: true
            })
        }
    }

    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        })
    }

    // Handle fields change and disable button if the text fields are empty
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        }, () => {
            this.performLookup();
        });

        // If there is something in the textfield, do not disable the button
        if(this.state.provideDetails !== '') {
            this.setState({
                disableButton: false
            })
        } 

        // Detect changes in the DOM and disable button as required
        if(e.target.value == '') {
            this.setState({
                disableButton: true
            })
        }

        // Detect changes in user lookup
        if(this.state.selectedSuggestion !== '') {
            this.setState({
                disableButton: false
            })
        }
    }

    suggestionSelected = (e) => {
        let alpha = e.currentTarget.innerText.split(' ')[0];
        let delta = e.currentTarget.innerText.split(' ')[1];
        this.setState({
            selectedSuggestion: e.currentTarget.innerText,
            userLookup: e.currentTarget.innerText,
            firstName: alpha,
            lastName: delta,
            suggestions: []
        })
    }

    performLookup = () => {
        const {userLookup} = this.state;
        if(userLookup.length >= 0) {
            axios.get('https://randomuser.me/api/?results=5&nat=au&exc=login').then((response) => {
                this.setState({
                    results: response.data.results,
                    suggestions: response.data.results
                })
            }).catch(error => { console.log(error); });
        }
    }

    // Handle select state change
    handleSelect = (e) => {
        this.setState({
            storeType : e.target.value
        })

        // Check if the select is empty and toggle button activity
        if(e.target.value !== '') {
            this.setState({
                disableButton: false
            })
        } else {
            this.setState(prevState => ({
                disableButton: !prevState.disableButton
            }))
        }

        // This one is used for conditional rendering
        if(e.target.value == "Metro") {
            this.setState(prevState => ({
                metroSelected: !prevState.metroSelected
            }))
        } else {
            this.setState({
                metroSelected: false
            })
        }

        // Check the validation here as it is on click
        if(e.target.value == "Metro") {
            // get the state of provideDetails
            const details = this.state.provideDetails;
            if(details == '') {
                this.setState({
                    disableButton: true
                })
            } else {
                this.setState({
                    disableButton: false
                })
            }
        }
    }

    render() {
        const {step} = this.state;
        const {firstName, lastName, storeType, provideDetails, userLookup, metroSelected, errorMessage, disableButton, suggestions, selectedSuggestion} = this.state;
        const values = {firstName, lastName, storeType, provideDetails, userLookup, metroSelected, selectedSuggestion}
        
        switch(step) {
            case 1: return (
                <FormUserDetails 
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                handleSelect={this.handleSelect}
                values={values}
                metroSelected={metroSelected}
                errorMessage={errorMessage}
                disableButton={disableButton} />
            )
            case 2: return (
                <FormPersonalDetails 
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
                suggestions={suggestions}
                selectedSuggestion={selectedSuggestion}
                suggestionSelected={this.suggestionSelected}
                errorMessage={errorMessage}
                disableButton={disableButton}
                />
            )
            default: 
        }
    }
}
