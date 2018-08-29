import {NavLink, withRouter} from 'react-router-dom';
import React,{Component} from 'react';
import ReactModalLogin from 'react-modal-login';
import axios from "axios/index";
import sweetAlert from "sweetalert";
// import ExamDevOps from "../Exammode/Modules/ExammoduleSolArch";

import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
var fetchAdmin = "https://amryktmkuj.execute-api.ap-southeast-1.amazonaws.com/cog_test/cogresource";
var fetchUser = "https://amryktmkuj.execute-api.ap-southeast-1.amazonaws.com/user_det_fetch/cog-userdetails"

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            admins:[],
            users:{},
            username: '',
            password: '',
            info: '',
            admin_info:'',
            data: {},
            adminids: '',
            id: {
                UserPoolId: "ap-southeast-1_GtNg9gtZb",
                ClientId: "7m7g7pc3gh42ahp15cr1km7lj8"
            },
            id_admins: {
                UserPoolId: "ap-southeast-1_nuOMeIyJB",
                ClientId: "2o5uf80dfm2bkp87rp0217el5a"
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //fetch admin details
        axios.get(fetchAdmin, {
            params: {

            }
        })
            .then(response => {
                // console.log(response.data);
                this.setState({
                    admins:response.data
                })
            })
            .catch(error => {
            });
        //fetch user details
        axios.get(fetchUser, {
            params: {

            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    users:response.data
                })
            })
            .catch(error => {
            });
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    signInUser({username, password}){
        //this.getids()
        const p = new Promise((res, rej)=> {
            setTimeout(() => {
                var authenticationData = {
                    Username: username,
                    Password: password,
                };

                var authenticationDetails = new AuthenticationDetails(authenticationData);

                try{
                    const adminUserPool = new CognitoUserPool(this.state.id)
                    var userData = {
                        Username: username,
                        Pool: adminUserPool
                    };
                    var cognitoUser = new CognitoUser(userData);
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            //console.log('access token + ' + result.getAccessToken().getJwtToken());
                            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
                            //console.log('idToken + ' + result.idToken.jwtToken);
                            //console.log('refresh token - '+result.getRefreshToken().getToken())
                            //console.log(result);
                            localStorage.setItem("companyAccessToken", result.getAccessToken().getJwtToken());
                            localStorage.setItem("companyIdToken", result.idToken.jwtToken);

                            res({result})
                        },

                        onFailure: function (err) {

                            console.log(err);

                            rej(err)
                        }

                    });
                }
                catch(err){
                    console.log(err)
                    this.setState({
                        info:"Slow Connection. Try Again."
                    })
                }

            }, 5000);

        })

        return p;
    }
    signInAdmin({username, password}){
        //this.getids()
        const p = new Promise((res, rej)=> {
            setTimeout(() => {
                var authenticationData = {
                    Username: username,
                    Password: password,
                };

                var authenticationDetails = new AuthenticationDetails(authenticationData);

                try{
                    const adminUserPool = new CognitoUserPool(this.state.id_admins)
                    var userData = {
                        Username: username,
                        Pool: adminUserPool
                    };
                    var cognitoUser = new CognitoUser(userData);
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            //console.log('access token + ' + result.getAccessToken().getJwtToken());
                            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
                            //console.log('idToken + ' + result.idToken.jwtToken);
                            //console.log('refresh token - '+result.getRefreshToken().getToken())
                            //console.log(result);
                            localStorage.setItem("companyAccessToken", result.getAccessToken().getJwtToken());
                            localStorage.setItem("companyIdToken", result.idToken.jwtToken);

                            res({result})
                        },

                        onFailure: function (err) {

                            console.log(err);

                            rej(err)
                        }

                    });
                }
                catch(err){
                    console.log(err)
                    this.setState({
                        info:"Slow Connection. Try Again."
                    })
                }

            }, 5000);

        })

        return p;
    }

    handleSubmit(event){
        event.preventDefault();
       // sweetAlert("Logging in... please wait!!!")
        localStorage.setItem("admin", "true");
        this.setState({
            info: "Logging in..Please Wait!!"
        });
        for(var i =0;i<this.state.admins.length;i++)
        {
           var user = document.getElementById("username").value;
            if(this.state.admins[i] === user)
            {
                //admin
                this.signInAdmin({
                    username: this.state.username,
                    password: this.state.password
                })
                    .then(({result})=>{

                        localStorage.setItem("admin", "true");

                        localStorage.setItem("adminname", this.state.username)
                        console.log("done signing in")
                        this.setState({
                            info: "Successfully Signed In..Please Wait"
                        });
                        setTimeout(() => {
                            this.props.history.push('/Admin/AdminDashboard');
                        }, 100);

                    })
                    .catch((err)=>{
                        // if failure, display the error message and toggle the loading icon to disappear

                        this.setState({
                            info: err['message']

                        })

                    })
            break;
            }
            else{
                // user
                this.signInUser({
                    username: this.state.username,
                    password: this.state.password
                })
                    .then(({result})=>{


                        for(var i =0;i<this.state.users.length;i++){
                            if(this.state.users[i]["username"] == this.state.username && this.state.users[i]["status"] == "active"){
                                localStorage.setItem("activeUser","true");
                                break;
                            }
                            else{
                                localStorage.setItem("activeUser","false");
                            }

                        }
                        localStorage.setItem("adminname", this.state.username)
                        console.log("done signing in")
                        this.setState({
                            info: "Successfully Signed In..Please Wait"
                        });
                        setTimeout(() => {
                            this.props.history.push('/loggedin');
                        }, 100);

                    })
                    .catch((err)=>{
                        // if failure, display the error message and toggle the loading icon to disappear

                        this.setState({
                            info: err['message']
                        })

                    })

            }
        }

    }

    render(){
        let submit=this.handleSubmit.bind();
        return(
            <div className="fullcontent">
                <div className="firstheadings">

                    <h1 className="topic">AWS EXAM PORTAL</h1>
                    <h2>We provides you better way of preparation for the AWS examination. Different types of question sets are provided to make you ready for the examination.</h2>

                    {/*<a href="#changepwd">Change pwd</a>*/}
                </div>
                <div className="formbox">
                    <h3 className="topic">Log In</h3>
                    <div className="form">
                        <form action="">
                        <label htmlFor="">Username / Email</label>
                        <input
                            value={this.state.username}
                            onChange={(event) => this.handleChange(event)}
                            id="username"
                            type="text"
                            name="username"
                            className="asd"/>

                        <label htmlFor="">Password</label>

                        <input
                            value={this.state.password}
                            onChange={(event) => this.handleChange(event)}
                            id="password"
                            type="password"
                            name="password"
                            className="asd"/>

                        <input
                            onClick={submit}
                            id="btn"
                            type="submit"
                            name="submit"
                            value="Log In"
                            className="mainbox"/>

                        <a href="#/Register" ><div className="mainbox">Register Now</div>
                        </a>

                        <h1 className="message">{this.state.info}</h1>
                        </form>
                    </div>
                 </div>
            </div>





        );
    }
}
export default withRouter(Login)