import React,{Component} from 'react';
// import axios from "axios/index";
var get_api = "https://n76ejhg4t3.execute-api.ap-southeast-1.amazonaws.com/fetch_userdata/fetchuserdata";
var update_status_api = "https://csjk5nn5lg.execute-api.ap-southeast-1.amazonaws.com/UpdateStatusUser/updateuserdetails"

export default class AdminDashboard extends Component{

    handleSubmit(){
        alert("inside");
        // axios.get(get_api, {
        // })
        //     .then(response => {
        //         // var ans_description = []
        //         // for(var i =0;i<response.data["res"].length;i++){
        //         //     ans_description[i] = response.data["res"][i]["correct_ans"];
        //         // }
        //         // // console.log(response.data["res"])
        //         // // console.log(response.data["res"][i]["correct_ans"]);
        //         // this.setState({
        //         //     ans_description: ans_description,
        //         //     fetched_data: response.data["res"],
        //         //     ans_length: response.data["ans_length"]
        //         // })
        //         alert(response.data["Items"])
        //     });
    }

    render(){
        return(
            <div>
                <div className="formbox">
                    <h3>Log </h3>

                        <label htmlFor="">sername</label>
                        <input type="text" name="username" className="asd"/>
                        <label htmlFor="">Password</label>
                        <input type="password"  name="password" className="asd"/>
                        <input
                            onClick={this.handleSubmit.bind(this)}
                            id="btn"
                            type="submit"
                            name="submit"
                            value="Log inn"
                            className="mainbox"/>

                        <a href="#/Register" ><div className="mainbox">Register Now</div>
                        </a>

                </div>
            </div>
        )
    }
}