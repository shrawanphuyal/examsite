import React,{Component} from 'react';
import Image from '../../Slider/image/aws0.jpg';


export default class Testmodule extends Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div className="image">
                <img src={Image}/>
                <section className="grid default-grid">

                    <div className="container">

                        <div className="row sample-row">

                            <div className="col-xs-6 col-sm-4 gutter-margin-xs-md">
                                <div className="inner" ><a href="#Testmode/SysOps/EC2">


                                    <button type="button" className="btn btn-success">EC2</button></a>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-8 gutter-margin-xs-md">
                                <div className="inner"> <a href="#Testmode/SysOps/EC2">
                                    <button type="button" className="btn btn-success">EBS</button></a>
                                </div>
                            </div>

                        </div>


                        <div className="container">

                            <div className="row sample-row">
                                <div className="col-xs-6 col-sm-4 gutter-margin-xs-md">
                                    <div className="inner"><a href="#Testmode/SysOps/EC2">


                                        <button type="button" className="btn btn-success">S3</button></a>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-8 gutter-margin-xs-md">
                                    <div className="inner"><a href="#Testmode/SysOps/EC2">
                                        <button type="button" className="btn btn-success">VPC</button></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
                <section className="grid default-grid">
                    <div className="container">
                        <div className="row sample-row">
                            <div className="col-xs-6 col-sm-4 gutter-margin-xs-md">
                                <div className="inner"><a href="#Testmode/SysOps/Dynamo">
                                    <button type="button" className="btn btn-success">Dynamodb</button></a>
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-8 gutter-margin-xs-md">
                                <div className="inner"><a href="#Testmode/SysOps/EC2">
                                    <button type="button" className="btn btn-success">Cloudfront</button></a>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </div>


        );
    }
}