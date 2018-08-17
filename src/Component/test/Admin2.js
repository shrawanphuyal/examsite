import React,{Component} from 'react'
export  default class Admin2 extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("https://amryktmkuj.execute-api.ap-southeast-1.amazonaws.com/user_det_fetch/cog-userdetails").
        then(response => response.json()).
        then(findresponse => {
            this.setState({
                data: [findresponse]
            });
        })
    }

    render() {
        console.log(this.state.data)
        return (
            <div>
                {
                    this.state.data.map((dynamicData, Key) => {
                        let keys = Object.keys(dynamicData);
                        let d = dynamicData;
                        return keys.map(data => {
                            return (
                                    <table border="1">
                                        <tr>
                                            <td>fullname: {dynamicData[data].fullname}</td>
                                            <td>email: {dynamicData[data].email}</td>
                                            <td>status: {dynamicData[data].status}</td>
                                        </tr>
                                    </table>

                            );
                        });
                    })

                }
            </div>
        )
    }
}

