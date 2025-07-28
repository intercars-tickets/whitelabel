import {CommonRoute} from "../../../models/Routes/CommonRoute";
import "./style.scss";

type RouteProps = {
    route: CommonRoute
}

export function RouteComponent({route}: RouteProps) {
    return (
        <div className="route-offer-container">

            <div className="route-offer-info-block">
                <div className="route-date-item">
                    <div >{route.DateDepart}</div>
                    <div className="route-offer-push-to-last" style={{marginLeft:"auto"}}>{route.DateArrive}</div>
                </div>
                <div className="route-direction-item">
                    <div >{route.City1}</div>
                    <div style={{justifyContent:"center", flexGrow:1}}>
                        <svg height="200" width="500" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10" y1="15" x2="700" y2="15" style={{stroke:"red", strokeWidth:2}}/>
                        </svg>
                    </div>
                    <div className="route-direction-item route-offer-push-to-last"
                         id="route-offer-push-to-last">{route.City2}</div>
                </div>
            </div>

            <div className="route-offer-price-block">
                <div className="">{route.Price[0].Dtar}</div>
                <div className="">{route.Price[0].Dtar}</div>
                <div className="">{route.Price[0].Dtar}</div>
                <div className="">{route.Price[0].Dtar}</div>
            </div>


        </div>
    )
}