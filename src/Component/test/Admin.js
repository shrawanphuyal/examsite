import React,{Component} from 'react'
import sweetAlert from "sweetalert";
import {CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";

export default class Admin extends Component{
    constructor(props){
        super();
        this.state = {
            id: {
                UserPoolId: "ap-southeast-1_I9KxwwlCb",
                ClientId: "3c0aegq3ald7kfb9s54vn8fqgp"
            },
            info:''
        }
        this.handleInvite=this.handleInvite.bind(this);
        this.inviteUser=this.inviteUser.bind(this);
    }

    inviteUser({email}){
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
                    Name : 'email',
                    Value : email
                };

                // take each attribute object and turn it into a CognitoUserAttribute object
                const attributeEmail = new CognitoUserAttribute(dataEmail);

                //const attributeUsername = new CognitoUserAttribute(dataUsername)
                const attributeName = new CognitoUserAttribute(dataName);

                // add each CognitoUserAttribute to the attributeList array
                attributeList.push(attributeEmail, attributeName);
                const adminUserPool = new CognitoUserPool(this.state.id);
                console.log("about to USER...")
                var username = "abcdefghi"
                var password = "abcdefghi"
                adminUserPool.signUp(username, password,attributeList, null, function(err, result){
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

    handleInvite(){
        console.log(document.getElementById("email").value)
        const user  = {
            email: document.getElementById("email").value

        }
        this.inviteUser(user)
            .then(({email})=>{
                sweetAlert("Successfully Invited...");
                console.log("done inviting up")
                this.setState({
                    info: "Successfully Invited"
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
    render(){

     return(
         <div>
             Enter Email: <input type="email" id="email"/>
             <button onClick={this.handleInvite}>
                 Invite
             </button>
             <h2>{this.state.info}</h2>
         </div>
     )
 }
}