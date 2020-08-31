import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import { saveUserPasswordAPI } from "../models/saveUserPasswordTypes";
import { connect } from "react-redux";
import { saveUserPassword } from "../actions/saveUserPasswordActions";
import { Dispatch } from "redux";
import { AppState } from "../reducers/main";
import { Modal, Button } from "react-bootstrap"
import { useState } from "react";

interface appOwnProps {

}

interface appOwnState {
  username: string
  password: string
  reEnterPassword: string
}

interface appDispatchProps {
  saveUserPassword: (pathParam: string, requestPayload: string) => void
}

interface appStateProps {
  saveUserPasswordResponse: saveUserPasswordAPI
}

type appProps = appOwnProps & appDispatchProps & appStateProps

class App extends React.Component<appProps, appOwnState> {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      reEnterPassword: '',
    }
  }

  errorHandlingModal = () => {
    const [show, setShow] = useState(true)
    const handleClose = () => setShow(false)

    return (
      <>
        <Modal show={show} onHide={handleClose}>
            {this.props.saveUserPasswordResponse.callStatus.success === false ? <Modal.Body>Something went wrong, please try again later.</Modal.Body> :
            this.props.saveUserPasswordResponse.callStatus.success === true ? <Modal.Body>Password has been verified and updated successfully.</Modal.Body> : undefined}
            <Modal.Footer>
              <Button className="btn-info" variant="secondary" onClick={handleClose}>
                Ok
            </Button>
            </Modal.Footer>
          </Modal>
      </>
    );
  }

  onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value })
  }

  onChangePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }

  onChangeReEnterPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ reEnterPassword: event.target.value })
  }

  checkPasswordsMatch = (): boolean => {
    return this.state.password !== '' && this.state.password === this.state.reEnterPassword ? true : false
  }

  checkPasswordLengthGreaterThanSix = (): boolean => {
    return this.state.password.length > 6 ? true : false
  }

  checkAtLeastUpperCase = (): boolean => {
    const regex: RegExp = /(?=.*[A-Z])/
    return regex.test(this.state.password) ? true : false
  }

  checkAtLeastLowerCase = (): boolean => {
    const regex: RegExp = /(?=.*[a-z])/
    return regex.test(this.state.password) ? true : false
  }

  checkAtLeastOneDigit = (): boolean => {
    const regex: RegExp = /[\d]{1}/
    return regex.test(this.state.password) ? true : false
  }


  rulesVerifiedSuccessfully = (): boolean => {
    return this.checkAtLeastLowerCase() &&
      this.checkAtLeastUpperCase() &&
      this.checkAtLeastOneDigit() &&
      this.checkPasswordLengthGreaterThanSix() &&
      this.checkPasswordsMatch() &&
      this.state.username !== '' ? true : false
  }

  onSubmit = () => {
    const requestPayload = this.state.password
    const pathParam = this.state.username

    requestPayload && this.props.saveUserPassword(pathParam, requestPayload)
  }

  loadingAPI = () => {
    return this.props.saveUserPasswordResponse &&
      this.props.saveUserPasswordResponse.callStatus &&
      this.props.saveUserPasswordResponse.callStatus.loading === true
  }

  public render() {
    return (
      <div className="passwordVerificationApp">

        <div id="passwordVerificationAppForm">
          <label className="label">Username:</label>
          <input className="input form-control" type="username" placeholder="Username" value={this.state.username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeUsername(event)} />
        </div>

        <div id="password">
          <label className="label">Password:</label>
          <input className="input form-control" type="password" placeholder="Password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangePasswordInput(event)} />
        </div>

        <div id="reEnterPassword">
          <label className="label">Re-Enter Password:</label>
          <input className="input form-control" type="password" placeholder="Re-Enter Password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeReEnterPasswordInput(event)} />
        </div>

        {this.state.reEnterPassword !== '' ? <div className={this.checkPasswordsMatch() ? "alert alert-success" : "alert alert-danger"} role="alert">
          {this.checkPasswordsMatch() ? 'Passwords match!' : 'Please enter matching passwords.'}
        </div> : undefined}

        {this.props.saveUserPasswordResponse &&
          this.props.saveUserPasswordResponse.callStatus &&
          this.props.saveUserPasswordResponse.callStatus.loading === false &&
          this.props.saveUserPasswordResponse.callStatus.success !== undefined ?
          <this.errorHandlingModal /> : undefined}  

        <button className="submitButton btn btn-info" disabled={!this.rulesVerifiedSuccessfully()} onClick={() => this.onSubmit()}>
          {this.loadingAPI() ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> : 'Submit'}
        </button>

        <div className="rules">
          <label className="label">Password Rules</label>
          <li className={this.checkAtLeastLowerCase() ? "text-success" : "text-danger"} >Password must have at least one lowercase.</li>
          <li className={this.checkAtLeastUpperCase() ? "text-success" : "text-danger"} >Password must have at least one uppercase.</li>
          <li className={this.checkAtLeastOneDigit() ? "text-success" : "text-danger"} >Password must have at least one number.</li>
          <li className={this.checkPasswordLengthGreaterThanSix() ? "text-success" : "text-danger"} >Password length must be greater than 6.</li>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: AppState): appStateProps => ({
  saveUserPasswordResponse: state && state.saveUserPasswordAPI
})

const mapDispatchToProps = (dispatch: Dispatch<any>): appDispatchProps => ({
  saveUserPassword: (pathParam, requestPayload): void => {
    saveUserPassword(dispatch, pathParam, requestPayload)
  }
})

export default connect<appStateProps, appDispatchProps, appOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
