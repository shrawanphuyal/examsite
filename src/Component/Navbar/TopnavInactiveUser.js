import React,{Component} from 'react';
import '../Admin/AdminLogin.css'
import sweetAlert from "sweetalert";



export default class TopnavBefore extends Component{
    signOut(){
        localStorage.setItem("admin", "false");
        sweetAlert("Thanks for using our system....")
    }
    render(){
        return(
            <nav className="navbar navbar-inverse navbar-fixed-top text">

                <h1>You are Inactive, Please Call adminstrator for active</h1>
                {
                    (localStorage.getItem('admin') === "true")?
                        <li><a onClick={this.signOut} href="#"><span className="glyphicon glyphicon-log-in"></span> Sign Out</a></li>:""
                }
            </nav>

        );
    }
}