import React,{Component} from 'react';




export default class Topnav extends Component{
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.state = {
            MenuOpened: true
        }

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

                        {/*<a className="navbar-brand"*/}
                           {/*onClick={(this.state.MenuOpened)?this.openNav.bind(this):this.closeNav.bind(this)}>*/}
                            {/*Menu</a>*/}

                    </div>

                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#Admin/AdminLogin"><span className="glyphicon glyphicon-user"></span> Admin</a></li>

                        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
            </nav>

        );
    }
}
