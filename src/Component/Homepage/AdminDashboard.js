import React,{Component} from 'react';


export default class AdminDashboard extends Component{
    render(){
        return(
<div>
    <div className="formbox">
        <h3>Log In</h3>
        <form id="form" action="" method="post">
            <label htmlFor="">Username</label>
            <input type="text" name="username" className="asd"/>
            <label htmlFor="">Password</label>
            <input type="password"  name="password" className="asd"/>
            <input id="btn" type="submit" name="submit" value="Log In" className="mainbox"/>

            <a href="#/Register" ><div className="mainbox">Register Now</div>
            </a>
        </form>
    </div>
</div>
        )
    }
}