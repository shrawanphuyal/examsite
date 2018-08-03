import React,{Component} from 'react';

export default class Sets extends Component{
    constructor(props) {
        super(props);
        }
       render(){
        return(
               <div className="here">
                   <section className="grid default-grid">
                       <div className="container">
                           <div className="row sample-row">
                               <div className="col-xs-6 col-sm-4 gutter-margin-xs-md">
                                   <div className="inner"><a href="#Exammode/DevOps/Set1">


                                       <button type="button" className="btn btn-success">Set1</button></a>
                                   </div>
                               </div>
                               <div className="col-xs-6 col-sm-8 gutter-margin-xs-md">
                                   <div className="inner"><a href="#Exammode/DevOps/Set1">
                                       <button type="button" className="btn btn-success">Set2</button></a>
                                   </div>
                               </div>
                           </div>

                       </div>
                   </section>
                   <section className="grid default-grid">
                       <div className="container">
                           <div className="row sample-row">
                               <div className="col-xs-6 col-sm-4 gutter-margin-xs-md">
                                   <div className="inner" ><a href="#Exammode/DevOps/Set1">
                                       <button type="button" className="btn btn-success">Set3</button></a>
                                   </div>
                               </div>

                               <div className="col-xs-6 col-sm-8 gutter-margin-xs-md">
                                   <div className="inner"><a href="#Exammode/DevOps/Set1">
                                       <button type="button" className="btn btn-success">Set4</button></a>
                                   </div>
                               </div>
                           </div>

                       </div>
                   </section>
               </div>

        )
    }

}