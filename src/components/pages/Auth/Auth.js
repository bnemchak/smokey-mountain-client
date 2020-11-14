import React from 'react';
import userData from '../../../data/userData';

class Auth extends React.Component {
state = {
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
  date: Date.now(),
}

verifyEmail = (e) => {
  e.preventDefault();
  const { email } = this.state;
  userData.authUserByEmail(email)
    .then((res) => {
      if (res.data.success === true) {
        localStorage.setItem('authed', true);
        localStorage.setItem('user_id', res.data.id);
        this.props.authToggle();
      }
    })
    .catch((err) => console.error(err));
}

createAccount = (e) => {
  e.preventDefault();
  const {
    email, firstName, lastName, displayName, date,
  } = this.state;

  const newUser = {
    first_name: firstName,
    last_name: lastName,
    email,
    display_name: displayName,
    date,
  };
  const jsonUser = JSON.stringify(newUser);
  userData.addUser(jsonUser)
    .then((res) => {
      localStorage.setItem('authed', true);
      localStorage.setItem('user_id', res.data.id);
      this.props.authToggle();
    })
    .catch((err) => console.error(err));
}

emailChange = (e) => {
  e.preventDefault();
  this.setState({ email: e.target.value });
}

firstNameChange = (e) => {
  e.preventDefault();
  this.setState({ firstName: e.target.value });
}

lastNameChange = (e) => {
  e.preventDefault();
  this.setState({ lastName: e.target.value });
}

displayNameChange = (e) => {
  e.preventDefault();
  this.setState({ displayName: e.target.value });
}

render() {
  return (
    <div>
      <h1>Current Users</h1>
      <form className='col-6 offset-3'>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" onChange={this.emailChange} className="form-control" id="email" placeholder="please submit your email" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.verifyEmail}>Login</button>
      </form>
    <h1>New Users</h1>
      <form className='col-6 offset-3 '>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" onChange={this.emailChange} className="form-control" id="email" placeholder="email" />
        </div>
        <div className="form-group">
          <label htmlFor="First Name">First Name</label>
          <input type="text" onChange={this.firstNameChange} className="form-control" id="First Name" placeholder="First Name" />
        </div>
        <div className="form-group">
          <label htmlFor="Last Name">Last Name</label>
          <input type="text" onChange={this.lastNameChange} className="form-control" id="Last Name" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <label htmlFor="Display Name">Display Name</label>
          <input type="text" onChange={this.displayNameChange} className="form-control" id="Display Name" placeholder="Display Name" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.createAccount}>Create Account</button>
      </form>

    </div>
  );
}
}

export default Auth;
