import {NavLink, withRouter} from 'react-router-dom';
import React,{Component} from 'react';
import ReactModalLogin from 'react-modal-login';
import axios from "axios/index";
import sweetAlert from "sweetalert";
// import ExamDevOps from "../Exammode/Modules/ExammoduleSolArch";

import Topnav1 from '../Navbar/TopnavFinal'
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
var get_api = "https://n76ejhg4t3.execute-api.ap-southeast-1.amazonaws.com/fetch_userdata/fetchuserdata";


export default class LoggedinHome extends Component{

    // handleSubmit(){
    //     var username  = document.getElementById("username").value;
    //     var password  = document.getElementById("password").value;
    //         const user = {
    //             username:username,
    //             password:password
    //         };
    //
    //
    //         axios.post(get_api, { user: user})
    //             .then(res => {
    //                 sweetAlert(res.data)
    //             })
    // }
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            info: '',
            data: {},
            adminids: '',
            id: {
                UserPoolId: "ap-southeast-1_vYxc8AyG3",
                ClientId: "3l4j8kug1b16kfd4cnq96qsrk3"
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
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


    handleSubmit(event){
        event.preventDefault();

        this.setState({
            info: "Logging in..Please Wait!!"
        });
        this.signInUser({
            username: this.state.username,
            password: this.state.password
        })
            .then(({result})=>{

                // localStorage.setItem("admin", "true");
                // localStorage.setItem("adminname", this.state.username)
                console.log("done signing in")
                this.setState({
                    info: "Successfully Signed In..Please Wait"
                });
                setTimeout(() => {
                    // this.props.history.push('/testmode/DevOps');
                }, 100);

            })
            .catch((err)=>{
                // if failure, display the error message and toggle the loading icon to disappear

                this.setState({
                    info: err['message']
                })

            })


    }

    render(){
        let submit=this.handleSubmit.bind();
        return(

            <div className="fullcontent">
                <Topnav1/>
                <div className="firstheadings first">

                    <h1 className="insideloggin">HELLO! Welcome to the AWS exam portal</h1>
                    <h2 className="insideloggin"> YOU CAN NOW GO THROUGH THE MENU BAR FOR THE TEST QUESTIONS AS WELL AS EXAM QUESTIONS</h2>
                </div>
                {/*<div className="formbox">*/}
                    {/*<h3>Log In</h3>*/}
                    {/*<div className="form">*/}

                        {/*<label htmlFor="">Username</label>*/}
                        {/*<input*/}
                            {/*value={this.state.username}*/}
                            {/*onChange={(event) => this.handleChange(event)}*/}
                            {/*id="username"*/}
                            {/*type="text"*/}
                            {/*name="username"*/}
                            {/*className="asd"/>*/}
                        {/*<label htmlFor="">Password</label>*/}
                        {/*<input*/}
                            {/*value={this.state.password}*/}
                            {/*onChange={(event) => this.handleChange(event)}*/}
                            {/*id="password"*/}
                            {/*type="password"*/}
                            {/*name="password"*/}
                            {/*className="asd"/>*/}
                        {/*<input*/}
                            {/*onClick={submit}*/}
                            {/*id="btn"*/}
                            {/*type="submit"*/}
                            {/*name="submit"*/}
                            {/*value="Log In"*/}
                            {/*className="mainbox"/>*/}

                        {/*<a href="#/Register" ><div className="mainbox">Register Now</div>*/}
                        {/*</a>*/}
                        {/*<h1 className="message">{this.state.info}</h1>*/}

                    {/*</div>*/}
                 {/*</div>*/}
            </div>





        );
    }
}
