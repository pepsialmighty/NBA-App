import React, { Component } from 'react';
import axios from 'axios';
import { URL_SUBS } from './paths';

class Subscriptions extends Component {
  state = {
    email: '',
    error: false,
    success: false,
    alreadyIn: false,
  };

  saveSubscription = (email) => {
    //go to the database and check if the email already existed
    /// ?email=${email} means go to the database where property email equal to ${email}
    axios.get(`${URL_SUBS}?email=${email}`).then((response) => {
      console.log(response);
      if (!response.data.length) {
        /// if the email not exited in the databse, post user
        axios(URL_SUBS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({ email: email }),
        }).then((response) => {
          this.setState({
            email: '',
            success: true,
          });
          this.clearMessages();
        });
      } else {
        /// Already in
        this.setState({
          email: '',
          alreadyIn: true,
        });
        this.clearMessages();
      }
    });
  };

  //update input,update state
  onChangeInput = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  //clear input after 2s
  clearMessages = () => {
    setTimeout(() => {
      this.setState({
        error: false,
        success: false,
        alreadyIn: false,
      });
    }, 2000);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let email = this.state.email;
    let regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {
      this.saveSubscription(email);
    } else {
      this.setState({ error: true });
      this.clearMessages();
    }
  };

  render() {
    const state = this.state;

    return (
      <div className='subcribe_panel'>
        <h3>Subscribe to us</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              placeholder='youremail@gmail.com'
              value={state.email}
              onChange={this.onChangeInput}
            />
            <div className={state.error ? 'error show' : 'error'}>
              Check your email
            </div>
            <div className={state.success ? 'success show' : 'success'}>
              Thank you
            </div>
            <div className={state.alreadyIn ? 'success show' : 'success'}>
              You are already in
            </div>
          </form>
        </div>
        <small>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi .
        </small>
      </div>
    );
  }
}

export default Subscriptions;
