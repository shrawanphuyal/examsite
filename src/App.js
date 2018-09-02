import React, { Component } from 'react';

import './App.css';
import Sidenav from './Component/Sidenav/Sidenav';
import TopnavFinal from "./Component/Navbar/TopnavFinal";


import {HashRouter as Router,Route, Redirect, Link} from 'react-router-dom';


// import all the Test Mode questions here
import TestDevOpsEC2 from "./Component/Testmode/Questions/TestDevOpsEC2";
import TestDevOpsDynamo from "./Component/Testmode/Questions/TestDevOpsDynamo";
import TestDevOpsIAM from "./Component/Testmode/Questions/TestDevOpsIAM";
import TestDevOpsS3 from "./Component/Testmode/Questions/TestDevOpsS3";
import TestSysOps from "./Component/Testmode/Questions/TestSysOps";
import TestSolArch from "./Component/Testmode/Questions/TestSolutionArch";

// import all the Exam Mode questions here
import ExamDevOps from "./Component/Exammode/Questions/ExamDevOps";
import ExamSysOps from "./Component/Exammode/Questions/ExamSysOps";
import ExamSolArch from "./Component/Exammode/Questions/ExamSolArch";

import Homepage from './Component/Homepage/Home';
import LoggedinHome from './Component/Slider/LoggedinHome';
import Login from './Component/Slider/Login';
import ChangePwdHome from './Component/Slider/ChangePwdHome';

// import all the Test Module here
import Testmodule from "./Component/Testmode/Modules/Testmodule";
import TestmoduleSysOps from "./Component/Testmode/Modules/TestmoduleSysOps";
import TestmoduleSolArch from "./Component/Testmode/Modules/TestmoduleSolArch";

// import all the Test Module here
import ExammoduleDevOps from "./Component/Exammode/Modules/ExammoduleDevOps";
import ExammoduleSysOps from "./Component/Exammode/Modules/ExammoduleSysOps";
import ExammoduleSolArch from "./Component/Exammode/Modules/ExammoduleSolArch";


import Register from "./Component/Homepage/Register";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import UploadQuestionDevOps from "./Component/Admin/UploadQuestionDevOps";
import UploadQuestionSysOps from "./Component/Admin/UploadQuestionSysOps";
import UploadQuestionSolArch from "./Component/Admin/UploadQuestionSolArch";
import Modules from "./Component/Admin/Modules";


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render = {(props) => (
        localStorage.getItem('admin') === "true"
            ? <Component {...props}/>
            : <Redirect to='/login'/>
    )}/>
)
class App extends Component {
    render() {
        return (
            <Router>
              <div>
                <div className="App">
                    <TopnavFinal/>{/*{*/}


                    <Sidenav/>

                    <div>

                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/changepwd" component={ChangePwdHome}/>
                        <PrivateRoute exact path = "/loggedin" component={LoggedinHome}/>


                        {/*TestMode/Modules/*/}
                        <PrivateRoute exact path="/testmode/DevOps" component={Testmodule}/>
                        <PrivateRoute exact path="/testmode/SysOps" component={TestmoduleSolArch}/>
                        <PrivateRoute exact path="/testmode/SolArch" component={TestmoduleSysOps}/>

                        {/*Testmode/Questions/*/}
                        <PrivateRoute exact path="/testmode/Dynamo" component={TestDevOpsDynamo}/>
                        <PrivateRoute exact path="/testmode/IAM" component={TestDevOpsIAM}/>
                        <PrivateRoute exact path="/testmode/S3" component={TestDevOpsS3}/>
                        <PrivateRoute exact path="/testmode/EC2" component={TestDevOpsEC2}/>
                        <PrivateRoute exact path="/testmode/SysOps/EC2" component={TestSysOps}/>
                        <PrivateRoute exact path="/testmode/SolArch/EC2" component={TestSolArch}/>

                        {/*ExamMode/Modules/*/}
                        <PrivateRoute exact path="/Exammode/DevOps" component={ExammoduleDevOps}/>
                        <PrivateRoute exact path="/Exammode/SysOps" component={ExammoduleSysOps}/>
                        <PrivateRoute exact path="/Exammode/SolArch" component={ExammoduleSolArch}/>

                        {/*Testmode/Questions/*/}
                        <PrivateRoute exact path="/Exammode/DevOps/Set1" component={ExamDevOps}/>
                        <PrivateRoute exact path="/Exammode/SysOps/Set1" component={ExamSysOps}/>
                        <PrivateRoute exact path="/Exammode/SolArch/Set1" component={ExamSolArch}/>

                        <Route exact path='/' component={Homepage}/>
                        <Route exact path="/Register" component={Register}/>

                        <PrivateRoute exact path="/Admin/AdminDashboard" component={AdminDashboard}/>
                        <PrivateRoute exact path="/Admin/AdminDashboard/UploadQuest" component={Modules}/>
                        <PrivateRoute exact path="/Admin/AdminDashboard/UploadQuest/DevOps" component={UploadQuestionDevOps}/>
                        <PrivateRoute exact path="/Admin/AdminDashboard/UploadQuest/SysOps" component={UploadQuestionSysOps}/>
                        <PrivateRoute exact path="/Admin/AdminDashboard/UploadQuest/SolArch" component={UploadQuestionSolArch}/>

                    </div>


                </div>

                {/*<AuthExample/>*/}
                  {/*<Admin/>*/}
                </div>

            </Router>
        );
    }
}

export default App;
