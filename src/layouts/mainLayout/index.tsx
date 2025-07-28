import "./style.scss";
import {Outlet} from "react-router-dom";
//import {LeftMenu} from "../../components/leftMenu";
import {LeftMenu2} from "../../components/leftMenu2";

export function MainLayout() {
    return (
        // <section className="" style={{display: "flex", flexDirection: "row",height:"100%"}}>
        <div className="main-layout-container">

            <div className="main-sidebar">
                <LeftMenu2/>
            </div>
            {/*<div style={{backgroundColor: "blue"}}>asdf</div>*/}
            {/*<div style={{backgroundColor: "blue"}}>sd</div>*/}
            {/*<div style={{backgroundColor: "blue"}}>asdf</div>*/}

            <div className="main-content" role="main">
                <Outlet/>

            </div>

        </div>
        // </section>
    )
}