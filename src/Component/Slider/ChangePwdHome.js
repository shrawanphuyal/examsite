import React,{Component} from 'react'
import '../../App.css'

export default class ChangePwdHome extends Component{

    constructor(props){
        super(props);
        this.state = {
            admins:[],
            users:{},
            username: '',
            password: '',
            info: '',
            admin_info:'',
            data: {},
            adminids: '',
            id: {
                UserPoolId: "ap-southeast-1_GtNg9gtZb",
                ClientId: "7m7g7pc3gh42ahp15cr1km7lj8"
            },
            id_admins: {
                UserPoolId: "ap-southeast-1_nuOMeIyJB",
                ClientId: "2o5uf80dfm2bkp87rp0217el5a"
            }
        };
    }

    render(){

        localStorage.setItem("changePwdHome","true")
        return(
            <div className="fullcontent">
                <div className="formbox formbox-pwd">
                    <h3>Create A Password</h3>
                    <div className="form">

                        {/*<label htmlFor="">Password</label>*/}
                        {/*<input*/}
                            {/*id="password1"*/}
                            {/*type="password"*/}
                            {/*name="password1"*/}
                            {/*className="asd"/>*/}

                        <label htmlFor="">New Password</label>
                        <input
                            id="password2"
                            type="password"
                            name="password2"
                            className="asd"/>
                        <label htmlFor="">Confirm New Password</label>
                        <input
                            id="password3"
                            type="password"
                            name="password3"
                            className="asd"/>
                        <input
                            id="btn"
                            type="submit"
                            name="submit"
                            className="mainbox"/>


                        <h1 className="message"></h1>

                    </div>
                </div>
            </div>
        )
    }
}