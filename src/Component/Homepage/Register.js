import React,{Component} from 'react';



export default class Register extends Component{
    render(){
        return(
            <div className="signcss">
            <div className="signup">
                <div className="container__child signup__thumbnail">
                    <div className="thumbnail__logo">

                        <h1 className="logo__text">Spectre</h1>
                    </div>
                    <div className="thumbnail__content text-center">
                        <h1 className="heading--primary">Welcome to Signup</h1>
                        <h2 className="heading--secondary">Are you ready to join??</h2>
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
                    <form action="#">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="form-control" type="text" name="username" id="username"
                                   placeholder="james.bond" required/>
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
                                    <input className="btn btn--form" type="submit" value="Register"/>
                                </li>
                                <li>
                                    <a className="signuphere" href="#">I am already a member</a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}