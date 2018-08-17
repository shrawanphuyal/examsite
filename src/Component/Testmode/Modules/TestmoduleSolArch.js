import React,{Component} from 'react';
import Image from '../../Slider/image/aws0.jpg';


export default class Testmodule extends Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div className="that">
                <div className="heading-text">
                    <p> YOU ARE AT TESTMODE..</p>
                    <p> YOU CAN FIND DIFFERENT QUESTIONS REGARDING THE DIFFERENT TOPICS RELATED TO DEVELOPER ASSOCIATE EXAM</p>
                </div>
                <div className="container ">
                    <div className="image">
                        <section className="grid default-grid imaget">
                            <div className=" testmodule">
                                <div className="row sample-row testmodule">
                                    <div className="col-sm-4 col-md-4  testhere">
                                        <div className="inner" ><a href="#testmode/SolArch/EC2">


                                            <button type="button" className="btn btn-default black">EC2</button></a>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-md-4 gutter-margin-xs-md testhere">
                                        <div className="inner"> <a href="#testmode/SolArch/EC2">
                                            <button type="button" className="btn btn-default black">EBS</button></a>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-md-4 gutter-margin-xs-md testhere">
                                        <div className="inner"> <a href="#testmode/SolArch/EC2">
                                            <button type="button" className="btn btn-default black">S3</button></a>
                                        </div>
                                    </div>

                                </div>

                                <br/>
                                <div className="testmodule">
                                    <div className="row sample-row testmodule">
                                        <div className="col-sm-4 col-md-4  testhere">
                                            <div className="inner"><a href="#testmode/SolArch/EC2">
                                                <button type="button" className="btn btn-default black">Dynamo</button></a>
                                            </div>
                                        </div>

                                        <div className="col-xs-4 col-md-4 gutter-margin-xs-md testhere">
                                            <div className="inner"><a href="#testmode/SolArch/EC2">
                                                <button type="button" className="btn btn-default black">VPC</button></a>
                                            </div>
                                        </div>
                                        <div className="col-xs-4 col-md-4 gutter-margin-xs-md testhere">
                                            <div className="inner"><a href="#testmode/SolArch/EC2">
                                                <button type="button" className="btn btn-default black">Cloudfront</button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </section>
                    </div>

                </div>
            </div>
        );
    }
}