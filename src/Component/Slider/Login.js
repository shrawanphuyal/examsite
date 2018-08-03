
import React,{Component} from 'react';
import ReactModalLogin from 'react-modal-login';


export default class Login extends Component{



render(){
        return(
            <div className="fullcontent">
            <div className="firstheadings">

                <h1>AWS EXAM PORTAL</h1>
                <h2>We provides you better way of preparation for the Aws examination.Different types of question sets are provided to make you ready for the examination.</h2>
            </div>
            <div className="formbox">
                <h3>Log In</h3>
                <form id="form" action="" method="post">
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" className="asd"/>
                    <label htmlFor="">Password</label>
                    <input type="text"  name="password" className="asd"/>
                    <input id="btn" type="submit" name="submit" value="Log In" className="mainbox"/>
                        <label htmlFor="">New customer?</label>
                    <a href="#/Register" ><div className="mainbox">Register Now</div>
                    </a>
                </form>
            </div>
        </div>





);
}
}