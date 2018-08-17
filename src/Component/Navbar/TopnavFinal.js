import React,{Component} from 'react';
import sweetAlert from "sweetalert"



export default class Topnav extends Component{
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.state = {
            MenuOpened: true
        }

    }
    signOut(){
        localStorage.setItem("admin", "false");
        sweetAlert("Thanks for using our system....")
    }
    openNav()
        {

            document.getElementById("mySidenav").style.width = "250px";
            this.setState({
                MenuOpened: false
            })
        }
        closeNav()
        {
            document.getElementById("mySidenav").style.width = "0px";
            this.setState({
                MenuOpened:true
            })
        }


        render(){
        console.log(localStorage.getItem('admin'));
        console.log(localStorage.getItem('activeUser'))
        return(
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div >
                        {
                            ((localStorage.getItem('admin') === "true") &&(localStorage.getItem('activeUser') === "true"))?
                           <div className="row">

                            <div className="col-md-5 col-lg-8">
                                <a className="navbar-brand"
                                   onClick={(this.state.MenuOpened)?this.openNav.bind(this):this.closeNav.bind(this)}>
                                    Menu</a></div>
                                <div className="col-md-2 col-lg-3  pull-right">
                                <a onClick={this.signOut} className="navbar-brand" href="">Signout</a></div>

                           </div>
                                :""


                        }


                    </div>
                    {
                        (localStorage.getItem('admin') === "false")?
                            <nav className="navbar navbar-inverse navbar-fixed-top text">

                                <h1>WELCOME TO AWS EXAM PORTAL!!! LOGIN IS REQUIRED TO VIEW RESOURCES</h1>

                            </nav>:""
                    }


                    {
                        ((localStorage.getItem('admin') === "true") && (localStorage.getItem('activeUser') === "false"))?
                            <div className="row">

                                <div className="col-md-2 col-lg-2">
                                    <a className="navbar-brand inactive"
                                       >
                                        Menu</a></div>
                                <div className="col-md-8 col-lg-8">
                                    <h4 className="mar-to-13">
                                        Your account is Deactivated please contact the Administrator</h4></div>

                                <div className="col-md-2 col-lg-2  pull-right">
                                    <a onClick={this.signOut} className="navbar-brand" href="">Signout</a></div>

                            </div>
                            :""
                    }

                    {/*<ul className="nav navbar-nav navbar-right">*/}
                        {/*/!*<li><a href="#AdminDashboard"><span className="glyphicon glyphicon-user"></span> Admin</a></li>*!/*/}
                      {/*//  {*/}
                            {/*(localStorage.getItem('admin') === "true")?*/}
                                {/*<li><a onClick={this.signOut} href="#"><span className="glyphicon glyphicon-log-in"></span> Sign Out</a></li>:""*/}
                       {/*// }*/}

                    {/*</ul>*/}

                    {/*<nav className="navbar navbar-inverse navbar-fixed-top text">*/}
                        {/*<ul className="nav navbar-nav navbar-right">*/}
                            {/*Inactive User*/}
                        {/*<li><a onClick={this.signOut} href="#"><span className="glyphicon glyphicon-log-in"></span> Sign Out</a></li>*/}
                        {/*</ul>*/}
                    {/*</nav>*/}
                </div>
            </nav>

        );
    }
}
