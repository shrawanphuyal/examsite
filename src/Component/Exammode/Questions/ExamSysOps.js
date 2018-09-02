import React, { Component } from 'react';
import '../../../App.css';
import axios from 'axios';
import sweetAlert from 'sweetalert'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
var api_devOps = "https://mqtnyvj2kb.execute-api.ap-southeast-1.amazonaws.com/sysops-questions/sysops-question-post"
// var get_api = "https://0mbjzz7yd9.execute-api.us-east-1.amazonaws.com/exam-backend/examsite-backend"
export default class Enter_daily extends Component {
    constructor() {
        super();
        this.state = {
            fetched_data:[],
            ans_length:[],
            ans_description:[],
            selectedRadio:{},
            user_answer:{} ,
            question:[],
            correct_answer:{},
            disabled:false,
            check:[],
            complete: false,
            info:'',
            black: true,
            checkAgainIndex:[],
            answer_color:'',
            answersubmitted:false,
            correct_answer_index:[]

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

        // console.log(this.state.user_answer.length);
        confirmAlert({
            title: '',
            message: (size==0)?"You haven't done any questions. Are you sure want to do this ?"
                :(size<5)?'You have done only '+size+' question. Are you sure to do this ?':
                    'You have done '+size+' question.Are you submit answer?',
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
        const quest = {
            mode:"SysOpsAnsCheck",
            name: this.state.user_answer,
            questionnumber:this.state.fetched_data.length
        };


        axios.post(api_devOps, { quest: quest})
            .then(res => {
                sweetAlert("Result:\n\n" +
                    "Total Number of Questions:  "+this.state.fetched_data.length+"\n\n" +
                    "Total Correct Answers: " +res.data['0']+
                    "\n\n Total Wrong Answers: " + (this.state.fetched_data.length-res.data['0'])+
                    "");
                // console.log(res.data[3])
                var user_ans_length = res.data[2];
                this.setState({
                    correct_answer_index: res.data[3],
                    correct_answer: res.data[1],
                    info:"",
                    answersubmitted:true
                })
            })
    }

    componentDidMount()
    {
        this.fetchdata()
    }
    handleRadio(i, e){

        var val = e.target.value;
        var list=this.state.selectedRadio
        list[i]=val
        this.setState({
            selectedRadio:list
        });
        // console.log(this.state.selectedRadio)

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
            // else{
            //     var new1=pre
            //     new1.push(e.target.value)
            //     user_answer1[q]=new1
            // }
            else{
                new1 = user_answer1[i+1].indexOf(e.target.value);
                user_answer1[i+1].splice(new1, 1);
                user_answer1[q].push(e.target.value)

            }
        }
        else {
            // console.log("we are in spllice");
            new1 = user_answer1[i+1].indexOf(e.target.value)
            user_answer1[i+1].splice(new1, 1)
        }

        // update the state with the new array of user_answer
        this.setState({ user_answer: user_answer1 })
        // console.log(this.state.user_answer)

    }
    onChange(i, e) {
        // current array of user_answer
        const user_answer1 = this.state.user_answer
        var a = this.state.user_answer[i+1]
        let index
        var q=(i+1).toString()
        var new1=[]
        if(this.state.user_answer[i+1] != null){
            if(this.state.user_answer[i+1].length < this.state.ans_length[i]){
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
            else{
                if(e.target.checked == false){

                    new1 = user_answer1[i+1].indexOf(e.target.value)
                    user_answer1[i+1].splice(new1, 1)
                    this.setState({ user_answer: user_answer1 })
                }
                else{
                    e.target.checked = false;
                    sweetAlert("For Valid Answer, You cannot select more than "+this.state.ans_length[i]+" answer");
                }
            }
        }
        else{
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


        // check if the check box is checked or unchecked

    }
    changeColor(i){

        const checkAgainQuestions = this.state.checkAgainIndex
        checkAgainQuestions.push(i)
        this.setState({black: !this.state.black})
        // console.log(i);
        this.setState({checkAgainIndex:checkAgainQuestions})
    }

    fetchdata(){
        const quest = {
            mode:"SysOpsSetA"
        }
        axios.post(api_devOps, {quest: quest })
            .then(response => {
                var ans_description = []
                for(var i =0;i<response.data["res"].length;i++){
                    ans_description[i] = response.data["res"][i]["correct_ans"];
                }
                // console.log(response.data["res"])
                // console.log(response.data["res"][i]["correct_ans"]);
                this.setState({
                    ans_description: ans_description,
                    fetched_data: response.data["res"],
                    ans_length: response.data["ans_length"]
                })
            })
            .catch(error => {
            });
    }
    render(){
        // console.log(this.state.checkAgainIndex)
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
                    if(this.state.ans_length[i] == 1){
                        // console.log("single choice");
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

                            <div className={(correct)?"green col-md-12":(user_ans_correct)?"red col-md-12":"answer col-md-12"}>
                                <input
                                    checked={this.state.selectedRadio == val1}
                                    value={val1}
                                    onChange={this.handleRadio.bind(this,i)}
                                    type="radio"
                                    disabled={true}/> {answer[i][j]}

                            </div>
                        );


                    }
                    else{
                        // console.log("multi choice");
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
                            <div className={(correct)?"green col-md-12":(user_ans_correct)?"red col-md-12":"answer col-md-12"}>
                                <input
                                    value={val1}
                                    onChange={this.onChange.bind(this, i)}
                                    type="checkbox"
                                    disabled={true}/> {answer[i][j]}
                            </div>
                        );

                    }

                }


                else{
                    if(this.state.ans_length[i] == 1){

                        ansdeep.push(
                            <div className="answer col-md-12">
                                <input
                                    checked={this.state.selectedRadio[i] == val1}
                                    value={val1}
                                    onChange={this.handleRadio.bind(this,i)}
                                    type="radio"
                                    disabled={this.state.disabled}/> {answer[i][j]}
                            </div>
                        );
                    }
                    else{
                        // console.log("multi choice");
                        ansdeep.push(
                            <div className="answer col-md-12">
                                <input value={val1}
                                       onChange={this.onChange.bind(this, i)}
                                       type="checkbox"
                                       disabled={this.state.disabled}/> {answer[i][j]}
                            </div>
                        );
                    }

                }
            }
            let btn_class = this.state.black ? "" : "checkagainButton";
            var flag = false;
            for(var l =0;l<this.state.checkAgainIndex.length;l++){
                if(i+1 == this.state.checkAgainIndex[l]){
                    flag = true
                }
            }
            var ans_correct = false
            for(var d =0;d<this.state.correct_answer_index.length;d++){
                if(this.state.correct_answer_index[d] == i+1){
                    ans_correct = true;

                }
            }
            list.push(

                <div className={(i%2 ==0)?"bg_color_grey":"bg_color_white"}>

                    <h2 className={
                        (flag)
                            ? btn_class :"renderque"}>
                        {i+1}. {question[i]}

                        {(ans_correct == false)
                            ?(
                                (this.state.answersubmitted)
                                    ?
                                    <span className="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>
                                    :""
                            )
                            :<span className="glyphicon glyphicon-ok text-success" aria-hidden="true"></span>
                        }
                    </h2>
                    {ansdeep}

                    {/*<div className="button2">*/}
                    {/*<button value={i+1} onClick={this.changeColor.bind(this,i+1)}>Check Again</button>*/}
                    <div className="abc col-md-12"><i>
                        {(ans_correct == false)?((this.state.answersubmitted)?"("+this.state.ans_description[i]+")":""):''}
                    </i>{/*</div>*/}
                    </div>
                </div>
            )
        }

        return <div className="bottom-header">

            {list}
            <h2>{this.state.info}</h2>


            <div className="footer"> <h2 className="footer-text">
                You are at the end....Please review before submitting...
            </h2>
                <br/>
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