import React,{Component} from 'react';
import '../../App.css';
import Sets from "./Sets";
import ExamDevOps from "./Questions/ExamDevOps";

    export default class Exam extends Component{
    render(){
        return(
<div className="color">
            <div className="container">
                <h1>  Exam Mode </h1>
                <Sets/>
                    </div>
</div>











        );
    }
}