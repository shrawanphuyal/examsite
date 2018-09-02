import React,{Component} from 'react';
import UploadQuestionDevOps from './UploadQuestionDevOps'



export default class Modules extends Component {



    render(){
        return(
            <div className="container margin-top">

                <div className="image">
                    <section className="grid default-grid imaget">
                        <div className=" testmodule">
                            <div className="row sample-row testmodule">
                                <div className="col-sm-4 col-md-4  testhere">
                                    <div className="inner" ><a href="#Admin/AdminDashboard/UploadQuest/DevOps">


                                        <button type="button" className="btn btn-default update">
                                            Developer Associates
                                        </button></a>
                                    </div>
                                </div>
                                <div className="col-xs-4 col-md-4 gutter-margin-xs-md testhere">
                                    <div className="inner"> <a href="#Admin/AdminDashboard/UploadQuest/SolArch">
                                        <button type="button" className="btn btn-default update ">Solution Architecture</button></a>
                                    </div>
                                </div>
                                <div className="col-xs-4 col-md-4 gutter-margin-xs-md testhere">
                                    <div className="inner"> <a href="#Admin/AdminDashboard/UploadQuest/SysOps">
                                        <button type="button"className="btn btn-default update ">Sysops</button></a>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
