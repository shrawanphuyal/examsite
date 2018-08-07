import React, { Component } from 'react';

import './App.css';
import Sidenav from './Component/Sidenav/Sidenav';
import Topnav from "./Component/Navbar/Topnav";
import {HashRouter as Router,Route,Link} from 'react-router-dom';


// import all the Test Mode questions here
import TestDevOpsEC2 from "./Component/Testmode/Questions/TestDevOpsEC2";
import TestDevOpsDynamo from "./Component/Testmode/Questions/TestDevOpsDynamo";
import TestSysOps from "./Component/Testmode/Questions/TestSysOps";
import TestSolArch from "./Component/Testmode/Questions/TestSolutionArch";

// import all the Exam Mode questions here
import ExamDevOps from "./Component/Exammode/Questions/ExamDevOps";
import ExamSysOps from "./Component/Exammode/Questions/ExamSysOps";
import ExamSolArch from "./Component/Exammode/Questions/ExamSolArch";

import Homepage from './Component/Homepage/Home';

// import all the Test Module here
import Testmodule from "./Component/Testmode/Modules/Testmodule";
import TestmoduleSysOps from "./Component/Testmode/Modules/TestmoduleSysOps";
import TestmoduleSolArch from "./Component/Testmode/Modules/TestmoduleSolArch";

// import all the Test Module here
import ExammoduleDevOps from "./Component/Exammode/Modules/ExammoduleDevOps";
import ExammoduleSysOps from "./Component/Exammode/Modules/ExammoduleSysOps";
import ExammoduleSolArch from "./Component/Exammode/Modules/ExammoduleSolArch";


import Register from "./Component/Homepage/Register";
import AdminDashboard from "./Component/Homepage/AdminDashboard";



class App extends Component {
    render() {
        return (
            <Router>
              <div>
                <div className="App">
                    <Topnav/>
                    <Sidenav/>

                    <div>

                        {/*TestMode/Modules/*/}
                        <Route exact path="/testmode/DevOps" component={Testmodule}/>
                        <Route exact path="/testmode/SysOps" component={TestmoduleSolArch}/>
                        <Route exact path="/testmode/SolArch" component={TestmoduleSysOps}/>

                        {/*Testmode/Questions/*/}
                        <Route exact path="/testmode/Dynamo" component={TestDevOpsDynamo}/>
                        <Route exact path="/testmode/EC2" component={TestDevOpsEC2}/>
                        <Route exact path="/testmode/SysOps/EC2" component={TestSysOps}/>
                        <Route exact path="/testmode/SolArch/EC2" component={TestSolArch}/>

                        {/*ExamMode/Modules/*/}
                        <Route exact path="/Exammode/DevOps" component={ExammoduleDevOps}/>
                        <Route exact path="/Exammode/SysOps" component={ExammoduleSysOps}/>
                        <Route exact path="/Exammode/SolArch" component={ExammoduleSolArch}/>

                        {/*Testmode/Questions/*/}
                        <Route exact path="/Exammode/DevOps/Set1" component={ExamDevOps}/>
                        <Route exact path="/Exammode/SysOps/Set1" component={ExamSysOps}/>
                        <Route exact path="/Exammode/SolArch/Set1" component={ExamSolArch}/>

                        <Route exact path='/' component={Homepage}/>
                        <Route exact path="/Register" component={Register}/>
                      <Route exact path="/AdminDashboard" component={AdminDashboard}/>

                    </div>


                </div>
              </div>

            </Router>
        );
    }
}

export default App;
