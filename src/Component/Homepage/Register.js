import React,{Component} from 'react';
import sweetAlert from 'sweetalert';
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

import axios from 'axios';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            id: {
                UserPoolId: "ap-southeast-1_GtNg9gtZb",
                ClientId: "7m7g7pc3gh42ahp15cr1km7lj8"
            },
            info:''

        }
        this.signUpUser=this.signUpUser.bind(this);
        this.onRegister=this.onRegister.bind(this);
    }


    signUpUser({username, password, email, fullname}){
        console.log("SIGN UP USER...");
        // instantiate a promise so we can work with this async easily
        const p = new Promise((res, rej)=>{
            setTimeout(() => {
                // create an array of attributes that we want
                const attributeList = [];
                // create the attribute objects in plain JS for each parameter we want to save publically (aka NOT the password)
                const dataEmail = {
                    Name : 'email',
                    Value : email
                };

                const dataName = {
                    Name : 'name',
                    Value : fullname
                };

                // take each attribute object and turn it into a CognitoUserAttribute object
                const attributeEmail = new CognitoUserAttribute(dataEmail);

                //const attributeUsername = new CognitoUserAttribute(dataUsername)
                const attributeName = new CognitoUserAttribute(dataName);

                // add each CognitoUserAttribute to the attributeList array
                attributeList.push(attributeEmail, attributeName);
                const adminUserPool = new CognitoUserPool(this.state.id);
                console.log("about to USER...")
                adminUserPool.signUp(username, password, attributeList, null, function(err, result){
                    if (err) {
                        console.log("an error occurred");
                        console.log(err);

                        rej(err)
                    }
                    console.log("Sgo on")
                    res({email})
                })
            }, 1000);
        });
        return p
    }
    onRegister(){
        var fullname  = document.getElementById("fullname").value;
        var username  = document.getElementById("username").value;
        var email  = document.getElementById("email").value;
        var password  = document.getElementById("password").value;
        var passwordRepeat  = document.getElementById("passwordRepeat").value;



        if(fullname.length != 0 && password === passwordRepeat){
            const user = {
                fullname:fullname,
                username:username,
                email:email,
                password:password,
                status:"deactive"
            };

            this.signUpUser(user)
                .then(({email})=>{
                    sweetAlert("Successfully registered...Verify your email and Login");
                    console.log("done signing up")
                    this.setState({
                        info: "Successfully registered...Verify your email and Login"
                    });


                })
                .catch((err)=>{
                    // if failure, display the error message and toggle the loading icon to disappear
                    console.log(err);
                    if(err['code']==="InvalidLambdaResponseException"){
                        this.setState({
                            info: "Email Already Used"
                        });
                    }
                    else{
                        this.setState({
                            info: err['message']
                        })
                    }
                })



        }

        else{
            sweetAlert("Something Went Wrong")
        }

    }


    render(){

        return(
            <div className="down">
            <div className="signcss">
            <div className="signup">
                <div className="container__child signup__thumbnail">
                    <div className="thumbnail__logo">

                        <h1 className="logo__text">Spectre</h1>
                    </div>
                    <div className="thumbnail__content text-center">
                        <h1 className="heading--primary">You can directly register here!!!!</h1>

                    </div>
                    <div className="thumbnail__links">
                        <ul className="list-inline m-b-0 text-center">
                            <li><a href="http://alexdevero.com/" target="_blank"><i className="fa fa-globe"></i></a>
                            </li>
                            <li><a href="https://www.behance.net/alexdevero" target="_blank">
                                <fa className="fa fa-behance"></fa>
                            </a></li>
                            <li><a href="https://github.com/alexdevero" target="_blank"><i className="fa fa-github"></i></a>
                            </li>
                            <li><a href="https://twitter.com/alexdevero" target="_blank"><i
                                className="fa fa-twitter"></i></a></li>
                        </ul>
                    </div>
                    <div className="signup__overlay"></div>
                </div>
                <div className="signup ">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input className="form-control" type="text" name="fullname" id="fullname"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="form-control" type="text" name="username" id="username"
                                    required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="text" name="email" id="email"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" id="password"
                                    required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordRepeat">Repeat Password</label>
                            <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat"
                                    required/>
                        </div>
                        <div className="m-t-lg">
                            <ul className="list-inline">
                                <li>
                                    <input className="btn btn--form" onClick={this.onRegister} type="submit" value="Register"/>
                                </li>
                                <li>
                                    <a className="signuphere" href="#">I am already a member</a>
                                </li>
                            </ul>
                        </div>
                    </form>
                    <h3>{this.state.info}</h3>

                </div>
            </div>
            </div>
            </div>
        )
    }
}