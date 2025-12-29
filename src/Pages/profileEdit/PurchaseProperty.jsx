import React from 'react'
import ProfileSideBar from './ProfileSideBar'
import demopic from '../../assets/images/LOGO1.png'

const PurchaseProperty = () => {
    return (
        <div className="container profile_edit">
            <div className="row w-100">
                <ProfileSideBar />

                <div className="col-md-9 mt-3">
                    <div className='row' >
                        <div className='col-8'>
                            <div className='row' 
                            style={{
                                padding: 22,
                                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                margin: "20px 0px"
                            }}
                            >
                                <div className='col-8'>
                                    <p style={{ fontSize: '15px', fontWeight: '400' }}> boAt Airdopes 161 with 40 Hours Playback, ASAP Charge & 10mm Drivers Bluetooth Headset</p>
                                    <p> <b> ₹1,109</b></p>
                                </div>
                                <div className='col-4'>
                                    <div>
                                        <img src={demopic} alt="demo" style={{width:"130px",height:"70px"}} />
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className='col-4' style={{
                            padding: 22,
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            margin: "20px 0px"
                        }}>div</div>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default PurchaseProperty