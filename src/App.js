import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, computed, decorate, action } from "mobx";
import './App.css';

const users = {
  'notspiderman@email.com': { name: 'Peter Parker' }
};

class App extends Component {
  get name() {
    return this.email && users[this.email] ? users[this.email].name : 'Not logged in';
  }

  setEmail = ({ target }) => {
    this.loginEmail = target.value;
  }

  login = () => {
    if (this.loginEmail && users[this.loginEmail]) {
      this.email = this.loginEmail;
      this.authenticated = true;
      this.message = null;
    } else {
      this.message = "You're not allowed in!"
      this.authenticated = false;
    }
  }

  logout = () => {
    this.email = null;
    this.message = "You have been logged out"
    this.authenticated = false;
  }

  render() {
    return (
      <div className="container">
        <h2>{this.message}</h2>
        <header>
          <h5>{this.email}</h5>
          <h6>{this.name}</h6>
        </header>
        <main>
          {this.authenticated ? <button onClick={this.logout}>Logout</button> : (
            <div>
            <input type="email" onChange={this.setEmail}></input>
            <button onClick={this.login}>Login</button>
          </div>)
          }
        </main>
      </div>
    );
  }
}

decorate(App,
  {
    authenticated: observable,
    name: computed,
    message: observable,
    email: observable,
    loginEmail: observable,
    login: action,
    logout: action,
    setEmail: action,
  });

export default observer(App);
