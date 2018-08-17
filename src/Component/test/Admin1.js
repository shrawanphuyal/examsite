import React, {Component} from 'react'
import axios from 'axios';
var get_api = "https://amryktmkuj.execute-api.ap-southeast-1.amazonaws.com/user_det_fetch/cog-userdetails";
export default class Admin1 extends Component{
    constructor(){
        super();
        this.state={
            emails:[],
            fullnames:[],
            statuses:[]

        }
    }
    componentDidMount(){
        console.log("entered hai")

            axios.get(get_api, {
                params: {

                }
            })
                .then(response => {
                    var emails =[], fullnames = [], statuses = [];
                    // console.log(response.data["res"][0]["email"])
                    for(var i =0;i<response.data["res"].length;i++){
                        emails.push(response.data["res"][i]["email"]);
                        fullnames.push(response.data["res"][i]["fullname"]);
                        statuses.push(response.data["res"][i]["status"]);
                    }
                    this.setState({emails: emails,
                                    fullnames: fullnames,
                                    statuses: statuses
                    })
                    console.log(response.data["res"].length);
                    var data1 = response.data["res"]
                    //console.log(typeof data1)
                    this.setState({
                        fetched_data: data1
                    })
                })
                .catch(error => {
                });
    }

    render(){
        const obj = this.state.fetched_data

        // console.log(this.state.emails)
        // console.log(this.state.fullnames)
        // console.log(this.state.statuses)
        console.log(obj)
        return(
            <div>
                <table border="1">
                    <tr>
                        {/*<td>{useremail}</td>*/}
                        {/*<td>{userfullname}</td>*/}
                        {/*<td>{userstatus}</td>*/}
                    </tr>
                </table>
            </div>
        )
    }
}