import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import {baseURL} from '../../api';
import Button from "@material-ui/core/Button";
import { Input } from "reactstrap";
import {NotificationManager,} from "react-notifications";
import "./login.scss";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    login: false,
    token: null,
    errorShown:false,
  };
  
  imageStyle = {
    backgroundImage:'url(../../assets/images/banner.jpg)',
    
 };
  componentDidMount(){
     
    fetch(
      encodeURI(baseURL+'/web-check-status'),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
       
        if (JSON.stringify(data).includes("ok")) {
          
         
        }else{
        
          this.props.history.push("/maintenance");
        }
        
       

      })
      .catch((err) => {

       
       
      });
  } 

  onUserLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
       
       let formData = new FormData();   
 
       formData.append('username', this.state.email);   
       formData.append('password', this.state.password);
 
 
       fetch(
         encodeURI(baseURL+'/web-login'),
         {
           method: "POST",
           body:formData
         }
       )
         .then((response) => response.json())
         .then((data) => {
            localStorage.setItem("username", data.UserInfo.user.name);
           localStorage.setItem("user_type_id", data.UserInfo.user.user_type_id);
           
           if (data.UserInfo.token) {
             localStorage.setItem("login", data.UserInfo.token);
             this.props.history.push("/cylinder");
             this.setState({
               login: true,
               token: data.UserInfo.token,
             });
           }
           
           if(JSON.stringify(data).includes("Unauthorised")) {
           
               NotificationManager.error("Username or password incorrect");
               this.setState({
                 errorShown: true,
               });
          
           }
 
 
         })
         .catch((err) => {
 
          
           if(!this.state.errorShown){
               NotificationManager.error("Username or password incorrect");
               this.setState({
                 errorShown: false,
               });
           }
         });
     } else {
       if(!this.state.errorShown){
         NotificationManager.error("Please enter Username or Password");
         this.setState({
           errorShown: false,
         });
     }
     } 
   }

   onUserSignUp() {
    this.props.history.push("/signup");
  }

  
  
  render() {
    let x = document.getElementById("pwd");
     if (x) {

       x.addEventListener("keyup", function (event) {

         if (event.keyCode === 13) {

           event.preventDefault();

           document.getElementById("signin").click();
         }
       });
     }
     if (this.state.login){
      
      this.props.history.push("/dashboard");
     } 
     const { email, password } = this.state;
 
   

    return (
      <div >
        <div className="d-flex align-items-center auth px-0 pagesofload">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 col-md-6 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-center" >
                  <img src={require("../../assets/images/logo_login.png")} alt="logo" style={{width:'auto'}}/>
                </div>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                  <Input
                           type="text"
                           value={email}
                           name="user-mail"
                           className="has-input input-lg"
                           placeholder="Username"
                           onChange={(event) =>
                             this.setState({ email: event.target.value })
                           }
                         />
                    
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                  <Input
                           value={password}
                           type="Password"
                           name="user-pwd"
                           // id="pwd"
                           className="has-input input-lg"
                           placeholder="Password"
                           onChange={(event) =>
                             this.setState({ password: event.target.value })
                           }
                           required
                         />
                  </Form.Group>
                  <a href="forget-password" className="auth-link text-black">Forgot password?</a>
                  <Form.Group className="d-flex search-field">
                  
                  </Form.Group>
                  <div className="mt-3">
                  <Button color="primary" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                           variant="contained"
                           size="large"
                           id="signin"
                           onClick={() => this.onUserLogin()}
                         >
                           Sign In
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

export default Login
