import React,{Component} from 'react';

export default class AdminLogin extends Component{
    render(){
        return(
            <div className="dashtop">
            <div className="firstheadingsh">
            <div className="formb">
                <h3 className="login">Log In</h3>
                <hr/>
                <br/>
                <form id="form" action="" >
                    <label htmlFor="">Email</label>
                    <br/>

                    <input type="email" name="email" className="abc"/>
                    <br/>
                    <br/>
                    <label htmlFor="">Password</label>
                    <br/>

                    <input type="password"  name="password" className="abc"/>
                    <br/>
                    <br/>
                    <input id="btn" type="submit" name="submit" value="Login" className="mainr"/>

                    <a href="#Admin/AdminLogin/AdminDashboard" ><div className="mainre">Register Now</div>
                    </a>
                </form>
            </div>
            </div>
            </div>

        )
    }
}