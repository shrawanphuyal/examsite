import React,{Component} from 'react';

export default class Sets extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="container">
                <div className="heading-test">
                    <p> YOU ARE AT EXAMMODE..</p>
                    <p> YOU CAN FIND DIFFERENT QUESTIONS REGARDING THE DIFFERENT TOPICS OF DEVELOPER ASSOCIATE EXAM</p>
                </div>

                <div className="here">

                    <div className="row sample-row">
                        <div className="col-sm-4 col-md-4 ">
                            <div className="inner"><a href="#Exammode/SysOps/Set1">
                                <button type="button" className="btn btn-default boxx ">Set1</button></a>
                            </div>
                        </div>
                        <div className="col-xs-4 col-md-4 ">
                            <div className="inner"><a href="#Exammode/SysOps/Set1">
                                <button type="button" className="btn btn-default boxx">Set2</button></a>
                            </div>
                        </div>
                        <div className="col-xs-4 col-md-4 ">
                            <div className="inner"><a href="#Exammode/SysOps/Set1">
                                <button type="button" className="btn btn-default boxx">Set4</button></a>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row sample-row">
                    <div className="col-sm-4 col-md-4 ">
                        <div className="inner"><a href="#Exammode/SysOps/Set1">
                            <button type="button" className="btn btn-default boxx">Set3</button></a>
                        </div>
                    </div>

                    <div className="col-xs-4 col-md-4">
                        <div className="inner"><a href="#Exammode/SysOps/Set1">
                            <button type="button" className="btn btn-default boxx">Set4</button></a>
                        </div>
                    </div>
                    <div className="col-xs-4 col-md-4">
                        <div className="inner"><a href="#Exammode/SysOps/Set1">
                            <button type="button" className="btn btn-default boxx">Set4</button></a>
                        </div>
                    </div>

                </div>

            </div>


        )
    }

}