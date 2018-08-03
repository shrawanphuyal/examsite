import React, { Component } from 'react';
import axios from 'axios';
import sweetAlert from 'sweetalert'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
var post_api = "https://j9lc0ksjg5.execute-api.ap-southeast-1.amazonaws.com/exam_mode_SolnArch_quest/exan-mode-devops"
var get_api = "https://j9lc0ksjg5.execute-api.ap-southeast-1.amazonaws.com/exam_mode_SolnArch_quest/exan-mode-devops"
// var get_api = "https://0mbjzz7yd9.execute-api.us-east-1.amazonaws.com/exam-backend/examsite-backend"
export default class Enter_daily extends Component {
    constructor() {
        super();
        this.state = {
            fetched_data:[],
            user_answer:{} ,
            correct_answer:{},
            disabled:false,
            check:[],
            complete: false,
            info:'',
            black: true,
            checkAgainIndex:0,
            answer_color:'',
            answersubmitted:false,

        };
        this.handleCheck=this.handleCheck.bind(this)
    }

    handleCheck(i, event){
        event.preventDefault()
        var list=this.state.check
        list.push(i)
        this.setState({
            check:list
        });
    }
    submit = (event) => {
        var size = Object.keys(this.state.user_answer).length;

        console.log(this.state.user_answer.length);
        confirmAlert({
            title: 'Confirm to submit',
            message: (size==0)?"You haven't done any questions. Are you sure want to do this ?"
                :(size<5)?'You have done only '+size+' question. Are you sure to do this ?':
                    'You have done '+size+' question.Are you sure to do this ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.handleSubmit(event)
                },
                {
                    label: 'No',
                    onClick: () => ""
                }
            ]
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            info:"Please Wait..."
        })
        const user = {
            name: this.state.user_answer,
            questionnumber:this.state.fetched_data.length
        };


        axios.post(get_api, { user: user})
            .then(res => {
                sweetAlert("Result:\n\n" +
                    "Total Number of Questions:  "+this.state.fetched_data.length+"\n\n" +
                    "Total Correct Answers: " +res.data['0']+
                    "\n\n Total Wrong Answers: " + (this.state.fetched_data.length-res.data['0'])+
                    "");
                // console.log(res.data[1]);
                //console.log(res.data[1][1][0]);
                // console.log(res.data[1][1][0]);
                //
                var user_ans_length = res.data[2];
                this.setState({

                    correct_answer: res.data[1],
                    info:"",
                    answersubmitted:true
                })


                // for(var i =1;i<=correct_ans_length;i++){
                //     if(this.state.user_answer[i] != null){
                //         this.setState({
                //             user_answer:this.state.user_answer[i].sort()
                //         })
                //         // console.log(this.state.user_answer[i+1].sort());
                //     }
                //
                // }

                //this.state.correct_answer = res.data[1];

                // console.log(this.state.user_answer);
                // console.log(this.state.correct_answer[1].length);
                //console.log(this.state.correct_answer[1][0])

            })
    }

    componentDidMount()
    {
        this.fetchdata()
    }

    onChange(i, e) {
        // current array of user_answer

        const user_answer1 = this.state.user_answer
        let index
        var q=(i+1).toString()
        var new1=[]
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to user_answer array
            var pre=user_answer1[i+1]

            if(pre===undefined) {

                new1.push(e.target.value)
                user_answer1[q] = new1
            }
            else{
                var new1=pre
                new1.push(e.target.value)
                user_answer1[q]=new1
            }
        }
        else {
            new1 = user_answer1[i+1].indexOf(e.target.value)
            user_answer1[i+1].splice(new1, 1)
        }

        // update the state with the new array of user_answer
        this.setState({ user_answer: user_answer1 })
        // console.log(this.state.user_answer)


    }
    changeColor(i){
        this.setState({black: !this.state.black})
        // console.log(i);
        this.setState({checkAgainIndex:i})
    }

    fetchdata(){


        axios.get(post_api, {
            params: {

            }
        })
            .then(response => {
                this.setState({
                    fetched_data: response.data["res"]
                })
            })
            .catch(error => {
            });
    }
    render(){
        var question = [];
        var answer = new Array();
        for(var l = 0; l<this.state.fetched_data.length;l++)
        {
            answer[l] = new Array();
        }
        for(var i =0;i<this.state.fetched_data.length;i++)
        {
            question[i] = this.state.fetched_data[i]["question"];
            for(var j =0;j<this.state.fetched_data[i]["answer"].length;j++)
            {
                answer[i][j] = this.state.fetched_data[i]["answer"][j];
            }
        }
        // console.log(this.state.correct_answer);
        var list=[]

        for(var i=0;i<this.state.fetched_data.length;i++){
            var ansdeep=[]
            let click=this.handleCheck.bind(this, i)
            for(var j=0;j<answer[i].length;j++){
                var val1 = j+1;
                if(this.state.answersubmitted){
                    // console.log("this is here")
                    // console.log(this.state.correct_answer[i+1][j])
                    var correct=false;
                    var user_ans_correct = false;
                    for(var k =0;k<this.state.correct_answer[i+1].length;k++){
                        if(val1 == this.state.correct_answer[i+1][k]) {
                            correct=true
                        }

                    }

                    // console.log(this.state.user_answer[i+1].length)
                    if(this.state.user_answer[i+1]!= null){
                        for(var l =0;l<this.state.user_answer[i+1].length;l++){
                            if(val1 == this.state.user_answer[i+1][l]) {
                                user_ans_correct=true
                            }

                        }
                    }

                    ansdeep.push(
                        <div className={(correct)?"green":(user_ans_correct)?"red":"answer"}>
                            <input value={val1} onChange={this.onChange.bind(this, i)} type="checkbox" disabled={this.state.disabled}/> {answer[i][j]}
                        </div>
                    );

                }

                else{
                    ansdeep.push(
                        <div className="answer col-md-12">
                            <input value={val1} onChange={this.onChange.bind(this, i)} type="checkbox"
                                   disabled={this.state.disabled}/> {answer[i][j]}
                        </div>
                    );
                }
            }
            let btn_class = this.state.black ? "" : "checkagainButton";
            list.push(

                <div className={(i%2 ==0)?"bg_color_grey":"bg_color_white"}>

                        <h2 className={(i+1 == this.state.checkAgainIndex)? btn_class :"renderque"}>
                            {i+1}. {question[i]}
                        </h2>

                        {ansdeep}

                        {/*<div className="button2">*/}
                        {/*<button value={i+1} onClick={this.changeColor.bind(this,i+1)}>Check Again</button>*/}

                    {/*</div>*/}
                </div>
            )
        }

        return <div className="bottom-header">

            {list}
            <h2>{this.state.info}</h2>
            <br/>
            <br/>
            <br/>
            <br/>

                <div className="footer"> <h2 className="footer-text">
                    You are at the end....Please review before submitting...
                </h2>            <br/>
                    <br/>
                    <button onClick={this.submit} className="">SUBMIT</button>
                </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <br/>
            <br/>
            <br/>
            </div>


    }
}