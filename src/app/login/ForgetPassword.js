import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import {baseURL} from '../../api';
import Button from "@material-ui/core/Button";
import { Input } from "reactstrap";
import {NotificationManager,} from "react-notifications";
import "./login.scss";

export class ForgetPassword extends Component {
    constructor(props) {
      
        super(props);
    
        this.state = {username: ''}
        this.state = {email: ''}
    }

    onResetPassword() {


    if (this.state.email != "" && this.state.username != "") {
      

      fetch(
       baseURL+`/send-password?username=${this.state.username}&email=${this.state.email}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        
        .then((response)=> {
           NotificationManager.success("New Password Sent to your Email");
        })
        
        .catch((error) => {
       NotificationManager.error("Email Not sent.");
        });
    } else {
       NotificationManager.warning("Please enter an User Name & Email");
    }
  }

   

  
  
  render() {
    
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 pagesofload">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 col-md-6 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-center">
                  <img src={require("../../assets/images/logo_login.png")} alt="logo" style={{width:'auto'}}/>
                </div>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                  <Input
                           type="email"
                           
                           name="user-mail"
                           className="has-input input-lg"
                           placeholder="Enter Email Address"
                           onChange={(event) =>
                             this.setState({ email: event.target.value })
                           }
                         />
                    
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                  <Input
                           
                           type="text"
                           name="user-pwd"
                           
                           className="has-input input-lg"
                           placeholder="Enter User Name"
                           onChange={(event) =>
                             this.setState({ username: event.target.value })
                           }
                           required
                         />
                  </Form.Group>
                  <a href="login" className="auth-link text-black">Already having account?  Login</a>
                  <Form.Group className="d-flex search-field">
                  
                  </Form.Group>
                  <div className="mt-3">
                  <Button color="primary" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                           variant="contained"
                           size="large"
                           id="signin"
                           onClick={() => this.onResetPassword()}
                         >
                           Reset Password
                         </Button>
                  </div>
                  
                  
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default ForgetPassword
