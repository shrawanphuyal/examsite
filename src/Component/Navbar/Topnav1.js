import React,{Component} from 'react';




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
        alert("successfully, signed out")
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
        return(
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        {
                            (localStorage.getItem('admin') === "true")?
                                <a className="navbar-brand"
                                   onClick={(this.state.MenuOpened)?this.openNav.bind(this):this.closeNav.bind(this)}>
                                    Menu</a>:""
                        }


                    </div>

                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#AdminDashboard"><span className="glyphicon glyphicon-user"></span> Admin</a></li>

                        <li><a onClick={this.signOut} href="#"><span className="glyphicon glyphicon-log-in"></span> Sign Out</a></li>
                    </ul>
                </div>
            </nav>

        );
    }
}
