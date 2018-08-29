import React,{Component} from 'react';
import axios from "axios/index";
import '../../../App.css';
import sweetAlert from "sweetalert";


var post_api = "https://ds8xbume54.execute-api.ap-southeast-1.amazonaws.com/questionnare_devops_test/questionare-test-devops";
var get_api = "https://ujai96180i.execute-api.us-east-1.amazonaws.com/web-exam/exam-web";
export default class Test extends Component {
    constructor() {
        super();
        this.state = {
            countCorrect:0,
            countAns:0,
            correct_answer:{},
            user_answers:[],
            question:[],
            answer:[],
            fetched_data:[],
            disabled:false,
            currentPage: 1,
            previousPages:[],
            questionPerPage: 1,
            greenColor:false,
            info:'',
            answer_description:[],
            correct:false,
            answerSubmitted:false,
            disabledInfo:''
        };
        this.handlePageNumClick = this.handlePageNumClick.bind(this);
    }

    handleCheckButton = event => {
        event.preventDefault();
        // console.log("we are in");
        this.setState({
            info:"",
            answerSubmitted:true
        });



        var correctansVariable = this.state.correct_answer[this.state.currentPage]
        var useransVariable = this.state.user_answers;
        if(this.state.user_answers.length!=0){


            if(correctansVariable.length == useransVariable.length){
                useransVariable.sort();
                // console.log(" both array ko length equal xa");
                for(var j =0;j<correctansVariable.length;j++){
                    if(correctansVariable[j] != useransVariable[j]){
                        // console.log("wrong answer");
                        this.setState({
                            info:this.state.answer_description[(this.state.currentPage-1)]
                        });
                        break;
                    }
                    else{
                        // console.log("right");
                        this.setState({
                            info:'',
                            greenColor:true
                        })
                    }
                }
            }
            else{
                // console.log("length equal xainaa");
                this.setState({

                    info:this.state.answer_description[(this.state.currentPage-1)]
                });
            }
            this.setState({

                disabled:true,
            });
        }
        else{
            sweetAlert("oops!!! Nothing Selected");
            this.setState({
                correct:false,
                answerSubmitted:false,
                disabled:false
            })
        }

    }


    onChange(e) {
        const user_answers = this.state.user_answers
        const previousPages = this.state.previousPages
        let index, index1
        if(this.state.user_answers.length < this.state.correct_answer[this.state.currentPage].length){

            if (e.target.checked) {
                user_answers.push(+e.target.value)
                previousPages.push(this.state.currentPage)

            }
            else {
                index = user_answers.indexOf(+e.target.value);
                user_answers.splice(index, 1);

                index1 = previousPages.indexOf(this.state.currentPage);
                previousPages.splice(index1, 1)

            }

            this.setState({
                user_answers: user_answers,
                previousPages: previousPages
            })
        }
        else{
            if(e.target.checked == false){
                index = user_answers.indexOf(+e.target.value);
                user_answers.splice(index,1);
                this.setState({ user_answer: user_answers})

                index1 = previousPages.indexOf(this.state.currentPage)
                previousPages.splice(index1,1);
                this.setState({previousPages:previousPages})
            }
            else{
                e.target.checked = false;
                sweetAlert("For Valid Answer, You cannot select more than "+this.state.correct_answer[this.state.currentPage].length+" answer");
                // e.target.checked = false;
            }


        }

    }

    componentDidMount()
    {
        if(this.state.fetched_data == null){
            document.write("data is loading");
        }
        this.fetchdata()
    }
    fetchdata(){


        axios.get(post_api, {
            params: {

            }
        })
            .then(response => {
                this.setState({
                    fetched_data: response.data["resDynamo"],
                    correct_answer:response.data["ansDynamo"]
                })
            })
            .catch(error => {
            });
    }
    handlePageNumClick(event) {
        var a = false;
        for(var l =0;l<this.state.previousPages.length;l++){
            if(event.target.id == this.state.previousPages[l]){
                a = true;
            }
        }
        if(a){
            this.setState({disabled:true, disabledInfo:"( you have already done this quesiton )"})
        }
        else{
            this.setState({disabled:false, disabledInfo:''})
        }
        // logic for removing the checkbox checked when going to next page
        var items=document.getElementsByName('ans');
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox'){
                items[i].checked=false;
            }
        }

        // save the answer status in state before going to the next one
        var correct = false;
        for(var j =0;j<this.state.correct_answer[this.state.currentPage].length;j++){
            // console.log(this.state.user_answers[j]);
            // console.log(this.state.correct_answer[this.state.currentPage][j]);
            var useransVar = this.state.user_answers.sort();
            if(this.state.user_answers.length == this.state.correct_answer[this.state.currentPage].length){
                if(useransVar[j] == this.state.correct_answer[this.state.currentPage][j]){
                    correct = true;
                }

            }

        }
        if(correct){
            var count = this.state.countCorrect;
            this.setState({
                countCorrect: count+1
            })
        }
        if(this.state.user_answers.length != 0){
            var count1 = this.state.countAns;
            this.setState({
                countAns: count1+1
            })
        }
        this.setState({
            answerSubmitted:false,
            correct:false,
            greenColor:false,
            info:'',
            currentPage: Number(event.target.id),
            user_answers:[]
        });




    }
    nextButton(cur, event){
        console.log(event.target.id)
        var a = false;
        console.log("a"+event.target.id);
        for(var l =0;l<this.state.previousPages.length;l++){
            if((cur+1) == this.state.previousPages[l]){
                a = true;
            }
        }
        if(a){
            this.setState({disabled:true, disabledInfo:"( you have already done this quesiton )"})
        }
        else{
            console.log("we are outside disabled")
            this.setState({disabled:false, disabledInfo:''})
        }
        var a = this.state.currentPage+1;
        this.setState({
            currentPage:Number(event.target.id+a)
        });

        var items=document.getElementsByName('ans');
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox'){
                items[i].checked=false;
            }
        }
        // save the answer status in state before going to the next one
        var correct = false;
        for(var j =0;j<this.state.correct_answer[this.state.currentPage].length;j++){
            // console.log(this.state.user_answers[j]);
            // console.log(this.state.correct_answer[this.state.currentPage][j]);
            var useransVar = this.state.user_answers.sort();
            if(this.state.user_answers.length == this.state.correct_answer[this.state.currentPage].length){
                if(useransVar[j] == this.state.correct_answer[this.state.currentPage][j]){
                    correct = true;
                }

            }

        }
        if(correct){
            var count = this.state.countCorrect;
            this.setState({
                countCorrect: count+1
            })
        }
        if(this.state.user_answers.length != 0){
            var count1 = this.state.countAns;
            this.setState({
                countAns: count1+1
            })
        }

        this.setState({
            answerSubmitted:false,
            correct:false,
            greenColor:false,
            info:'',
            user_answers:[],
        });
    }
    previousButton(cur,event){
        console.log(cur);
        var a = false;
        for(var l =0;l<this.state.previousPages.length;l++){
            if((cur-1) == this.state.previousPages[l]){
                a = true;
            }
        }
        if(a){
            this.setState({disabled:true, disabledInfo:"( you have already done this quesiton )"})
        }
        else{
            this.setState({disabled:false, disabledInfo:''})
        }
        var a = this.state.currentPage-1;
        this.setState({
            currentPage:Number(event.target.id+a)
        });

        var items=document.getElementsByName('ans');
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox'){
                items[i].checked=false;
            }
        }
        // save the answer status in state before going to the next one
        var correct = false;
        for(var j =0;j<this.state.correct_answer[this.state.currentPage].length;j++){
            // console.log(this.state.user_answers[j]);
            // console.log(this.state.correct_answer[this.state.currentPage][j]);
            var useransVar = this.state.user_answers.sort();
            if(this.state.user_answers.length == this.state.correct_answer[this.state.currentPage].length){
                if(useransVar[j] == this.state.correct_answer[this.state.currentPage][j]){
                    correct = true;
                }

            }

        }
        if(correct){
            var count = this.state.countCorrect;
            this.setState({
                countCorrect: count+1
            })
        }
        if(this.state.user_answers.length != 0){
            var count1 = this.state.countAns;
            this.setState({
                countAns: count1+1
            })
        }
        this.setState({
            answerSubmitted:false,
            correct:false,
            greenColor:false,
            info:'',
            user_answers:[]
        });


    }
    showSummary(){
        var countCorrectPage10 =0,countAnsPage10 =0;
        // here, in the 10th page, if we cannot click previous, next and other page numbers,
        // the answer count will no be increased. so for managing this, we need to add this
        if(this.state.currentPage == 10){
            var correct = false;
            for(var j =0;j<this.state.correct_answer[this.state.currentPage].length;j++){
                // console.log(this.state.user_answers[j]);
                // console.log(this.state.correct_answer[this.state.currentPage][j]);
                var useransVar = this.state.user_answers.sort();
                if(this.state.user_answers.length == this.state.correct_answer[this.state.currentPage].length){
                    if(useransVar[j] == this.state.correct_answer[this.state.currentPage][j]){
                        correct = true;

                    }

                }

            }

            if(correct){
                countCorrectPage10 =countCorrectPage10+1;
            }
            if(this.state.user_answers.length != 0){
                countAnsPage10 = countAnsPage10+1;
            }
        }

        sweetAlert("Total Questions: 10 \n\n" +
            "Total Answer Done: "+(countAnsPage10+this.state.countAns)+" \n\n" +
            "Total Correct Answer: "+(countCorrectPage10+this.state.countCorrect)+" \n\n" +
            "Pass Threshold: 65% \n\n" +
            "You scored: "+((countCorrectPage10+this.state.countCorrect)*100)/10+"%"
        )

        //set the user_answer array to null after submitting it
        //set countAns and countCorrect to null after submittting it
        this.setState({
            user_answers:[],
            countAns: 0,
            countCorrect : 0
        })
    }


    render() {
        //console.log(this.state.previousPages);
        this.state.answer= new Array();
        for(var l = 0; l<this.state.fetched_data.length;l++)
        {
            this.state.answer[l] = new Array();
        }
        // fetch question and answer
        for(var i =0;i<this.state.fetched_data.length;i++)
        {
            this.state.question[i] = this.state.fetched_data[i]["question"];
            this.state.answer_description[i] = this.state.fetched_data[i]["correct_ans"];
            for(var j =0;j<this.state.fetched_data[i]["answer"].length;j++)
            {
                this.state.answer[i][j] = this.state.fetched_data[i]["answer"][j];
            }
        }
        const { question, answer,currentPage, questionPerPage } = this.state;

        // Logic for displaying current question and current answer
        const indexOfLastTodo = currentPage * questionPerPage;
        const indexOfFirstTodo = indexOfLastTodo - questionPerPage;
        const currentquestion = question.slice(indexOfFirstTodo, indexOfLastTodo);
        const currentanswer =[];
        var ans= [];
        ans = this.state.answer[(this.state.currentPage)-1];
        for (var key in ans) {
            if (ans.hasOwnProperty(key)) {
                currentanswer[key] = ans[key];
            }
        }

        // display questions
        const renderquestion = currentquestion.map((todo, index) => {
            return <div>
                <p className="renderQuestion" key={index}>{this.state.currentPage}. {todo}</p>
            </div>;
        });

        // display answers
        const renderanswer= currentanswer.map((todo, index) => {
            if(this.state.answerSubmitted){
                var correct = false;
                var user_ans_correct = false;
                // display green color for right answer
                for(var k =0;k<this.state.correct_answer[this.state.currentPage].length;k++){
                    if((index+1) == this.state.correct_answer[this.state.currentPage][k]){
                        correct = true;

                    }

                }

                // display red color for wrong answers
                for(var l =0;l<this.state.correct_answer[this.state.currentPage].length;l++){
                    if(this.state.user_answers[l] != this.state.correct_answer[this.state.currentPage][l])
                    {
                        user_ans_correct = true;
                    }

                }
            }


            return <div>

                <p className={(correct)?'greenColor':(user_ans_correct)?'redColor':'ansColor'}  key={index}>
                    <input
                        name="ans"
                        value={index+1}
                        type="checkbox"
                        disabled={this.state.disabled}
                        onChange={this.onChange.bind(this)} /> &nbsp;
                    {todo}
                </p>
            </div>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(question.length / questionPerPage); i++) {
            pageNumbers.push(i);
        }

        // constant variable to render the page numbers
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <table className="pagenum" id="display_index" border="1">
                    <button
                        className={(this.state.currentPage == number)?"styleCurrentButton":'styleButton'}
                        key={number}
                        id={number}
                        disabled={(this.state.currentPage ==number)?true:false}
                        onClick={this.handlePageNumClick}
                    >
                        {number}
                    </button>

                </table>
            );
        });

        return (
            <div className="jenita">
                <ul>
                    {renderquestion}
                    {renderanswer}
                </ul>

                <ul>

                    {/*display check button in every page*/}
                    <button
                        disabled={(this.state.user_answers.length ==0)?true:false}
                        onClick={this.handleCheckButton.bind(this)}
                        className="btn btn-primary jenita">Check</button>
                    &nbsp;&nbsp;<b>{this.state.disabledInfo}</b>
                    {/*display the information of answer if user select wrong answer*/}
                    <h3>{this.state.info}</h3>
                </ul>

                <div className="row border padding-top-30">

                    {/*display the previous button*/}
                    <div className="col-md-3 ">
                        {/*disable if current page is 1*/}
                        <button
                            disabled={(this.state.currentPage == 1)?true:false}
                            onClick={this.previousButton.bind(this,this.state.currentPage)}
                            type="button"
                            className="btn btn-primary">Previous</button>
                    </div>

                    {/*display all page numbers */}
                    {/*<div className="col-md-4  number">*/}
                    {/*<ul id="page-numbers">*/}
                    {/*{renderPageNumbers}*/}
                    {/*</ul>*/}
                    {/*</div>*/}

                    {/*display the next button*/}
                    <div className="col-md-4">

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        {/*if currentpage is 10, then disable it*/}
                        <button
                            disabled={(this.state.currentPage == 10)?true:false}
                            onClick={this.nextButton.bind(this, this.state.currentPage)}
                            type="button"
                            className="btn btn-primary">Next</button>
                    </div>

                    {/*display the submit button at last page        */}
                    {/*display the button only if current page is 10*/}
                    {(this.state.currentPage ==10)?<div className="col-md-3 allign-right">

                        <button
                            onClick={this.showSummary.bind(this)}
                            type="button"
                            className="btn btn-primary">Summary</button>
                    </div>:''
                    }

                </div>
            </div>
        );
    }
}
