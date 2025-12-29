import React from 'react'
import img from "../../assets/images/dummyimg.jpg";
import { Link } from 'react-router-dom';
import ProfileSideBar from './ProfileSideBar';

function Dashboard() {
    return (
        <>


<div className="container profile_edit">
        <div className="row w-100">
        

        <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
          <div>
                <h6>Welcome to your Dashboard</h6>
                <hr />
            </div>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card shadow border-0">
                                <div className="card-body p-1">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-5">
                                            <div className="list_img">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="homes-img"
                                                >
                                                    <img
                                                        src={img}
                                                        alt="img"
                                                        className="hover-effect1"
                                                        style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-7">
                                            <div className='d-flex py-3'>
                                                <div className="badge badge-pill bg-soft-success text-success">
                                                    Active
                                                </div>
                                                <div className="ms-auto text-muted">
                                                    19 Oct 2024
                                                </div>
                                            </div>
                                             <span className="text-nowrap text-xs text-muted">
                                                Property ID: ONLND1003
                                            </span>

                                            <div className="row mt-2">
                                                <div className="col-5">
                                                    <label>Customer name :</label>
                                                </div>
                                                <div className="col-7">
                                                    <label>James Bond</label>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-5">
                                                    <label>Propert Type :</label>
                                                </div>
                                                <div className="col-7">
                                                    <label>Land</label>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-5">
                                                    <label>Sub Property :</label>
                                                </div>
                                                <div className="col-7">
                                                    <label>Farm Land</label>
                                                </div>
                                            </div>

                                            <hr className="mt-2 mb-2 m-0" />
                                            <div className='text-end me-2'>
                                                <button className="btn1">
                                                    View more...
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6"></div>
                    </div>
                </div>
            </section>
          </div>
        </div>
      </div>

    


        
        </>
    )
}

export default Dashboard