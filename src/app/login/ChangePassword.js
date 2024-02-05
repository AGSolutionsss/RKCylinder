import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const ChangePassword = (props) => {

    let history = useHistory();

    const [changePassword, setChangePassword] = useState({
        old_password: "",
        password: "",
        confirm_password: ""
    });

    const onInputChange = (e) => {
        
        setChangePassword({
        ...changePassword,
        [e.target.name]: e.target.value,
        });
        
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    const onSubmit = (e) => {
        
        e.preventDefault();

        if (changePassword.password !== changePassword.confirm_password) {
            NotificationManager.error("Passwords don't match");
            return false;
        }
      
        let data = {
            old_password: changePassword.old_password,
            password: changePassword.password,
            username: localStorage.getItem("username"),
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-change-password",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Password Updated Successfully");
                history.push("cylinder");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Change Password </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Old Password"
                                            autoComplete="Name"
                                            type="password"
                                            name="old_password"
                                            value={changePassword.old_password}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="New Password"
                                            autoComplete="Name"
                                            type="password"
                                            name="password"
                                            value={changePassword.password}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Confirm Password"
                                            autoComplete="Name"
                                            type="password"
                                            name="confirm_password"
                                            value={changePassword.confirm_password}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-8">
                                        <div className="form-group">
                                        <Button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onSubmit(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            Update
                                            </Button>
                                            <Link to="cylinder">
                                            <Button className="btn btn-light" color="success">
                                            Cancel
                                            </Button>
                                            </Link> 
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ChangePassword;