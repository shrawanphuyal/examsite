import React,{Component} from 'react';
import axios from "axios/index";
var upload_api = "https://mqtnyvj2kb.execute-api.ap-southeast-1.amazonaws.com/sysops-questions/sysops-question-post"
export default class UploadQuestionDevOps extends Component{
    constructor(props){
        super(props);
        this.state={
            noOfAns:4,
            noOfCorAns:1,
            QuestionStart:0
        }

    }
    addNoOfAns(){
        var noOfAns = document.getElementById("selAns").value;
        this.setState({
            noOfAns: noOfAns,
        })
    }
    addNoOfCorAns(){

        var noOfCorAns = document.getElementById("selCorAns").value;
        this.setState({
            noOfCorAns: noOfCorAns
        })
    }
    handleSubmit(){
        var question_no = document.getElementById("question_no").value;
        var question = document.getElementById("question").value;
        var ans_description = document.getElementById("ans_description").value;
        var tag = document.getElementById("tag").value;
        var answer = []
        var correct_ans = []
        for(var i =0;i<this.state.noOfAns;i++){
            answer[i] = document.getElementById("ans"+(i+1)).value;
        }
        for(var i =0;i<this.state.noOfCorAns;i++){
            correct_ans[i] = document.getElementById("cor_ans"+(i+1)).value;
        }
        const quest = {
            mode:"uploadQuestion",
            question:question,
            question_no:question_no,
            answer:answer,
            correct_answer:correct_ans,
            answer_description:ans_description,
            tag:tag,
        };
        axios.post(upload_api, { quest: quest})
            .then(res => {
                console.log(res.data);
                alert("Data is successfully stored in table")
                // window.location.reload();
            })
    }
    componentDidMount(){
        const quest = {
            mode:"QuestionNumber",
        };
        axios.post(upload_api, { quest: quest})
            .then(res => {
            	console.log(res)
                var a = parseInt(res.data)
                this.setState({
                    QuestionStart:(a+1)
                })
            })
    }

    render(){
        var answers = [];

        for(var i =0;i<this.state.noOfAns;i++){
            answers.push(
                <div>
                    <h2 className="questionadmin">Answer {i+1}</h2><label htmlFor="inputlg"></label>
                    <input className="form-control input-lg" id={"ans"+(i+1)} type="text"></input>
                </div>
            )
        }
        var correct_answers = [];

        for(var i =0;i<this.state.noOfCorAns;i++){
            correct_answers.push(
                <div>
                    <h2 className="questionadmin">Correct Ans {i+1}</h2><label htmlFor="inputlg"></label>
                    <input className="form-control input-lg" id={"cor_ans"+(i+1)}  type="text"></input>
                </div>
            )
        }

        return(

            <div>

                <div className="well-sm upload">
                    <form onSubmit={this.handleSubmit.bind(this)} action="">
                    <h2 className="questionadmin">Question No.</h2><label htmlFor="inputlg"></label>
                    <input value={this.state.QuestionStart} className="form-control input-lg" id="question_no" type="text"></input>

                    <h2 className="questionadmin">Question</h2><label htmlFor="inputlg"></label>
                    <input className="form-control input-lg" id="question" type="text"></input>

                    <h2 className="questionadmin">No. of Answer</h2><label htmlFor="inputlg"></label>
                    <select id="selAns" className="form-control"  onClick={this.addNoOfAns.bind(this)}>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    {answers}

                    <h2 className="questionadmin">No of Correct Answer   </h2><label htmlFor="inputlg"></label>
                    <select id="selCorAns" className="form-control"  onClick={this.addNoOfCorAns.bind(this)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    {correct_answers}

                    <h2 className="questionadmin">Answer Description</h2><label htmlFor="inputlg"></label>
                    <input className="form-control input-lg" id="ans_description" type="text"></input>

                    <h2 className="questionadmin">Tag</h2><label htmlFor="inputlg"></label>
                    <input className="form-control input-lg" id="tag" type="text"></input>
                    <br/>
                    <input className="form-control input-lg" id="inputlg" type="submit"></input>
                    <br/>
                    <br/>
                    </form>
                </div>
            </div>
        )
    }
}