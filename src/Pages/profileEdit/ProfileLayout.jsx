
import { Outlet } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar";

export default function ProfileLayout() {
    return (
        // <div className="container-xl profile_edit">
        //     <div className="row w-100">
        //         <div className="col-md-3">
        //             <ProfileSideBar />
        //         </div>
        //         <div className="col-md-9">
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
        <div className="container-xl profile_edit">
            <div className="row w-100">
                <div className="col-lg-3 d-none d-lg-block">
                    <ProfileSideBar />
                </div>
                <div className="col-12 col-lg-9">
                    <Outlet />
                </div>
            </div>
        </div>

    );
}
