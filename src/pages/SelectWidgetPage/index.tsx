import "./style.scss";
import React, {CSSProperties, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {WidgetApi} from "../../api/WidgetApi";
import {City} from "../../models/Routes/City";
import {SearchRouteRequest} from "../../models/Routes/SearchRoutesRequest";
import {InputCityComponent} from "./inputCityComponent";
import {CommonRoute} from "../../models/Routes/CommonRoute";
import {RouteComponent} from "./routeComponent";
import {SearchComponent2} from "./searchComponent2";
import {SearchComponent} from "../WidgetPages/ExamplePage/searchComponent";

export function SelectWidgetPage(options: any) {

    //widget props
    const [bgColor, setBgColor] = useState("#00468E")
    const [cornerRadios, setCornerRadios] = useState(0);
    const [bgButtonColor, setBgButtonColor] = useState("#DA251C");
    const [buttonInkColor, setButtonInkColor] = useState("#FFFFFF");
    const [widthButton, setWidthButton] = useState(50);
    const [showTransparencyBg, setShowTransparencyBg] = useState(true);

    const [cityFrom, setCityFrom] = useState<City | null>(null)
    const [cityTo, setCityTo] = useState<City | null>(null)
    const [departureDate, setDepartureDate] = useState("2025-12-12")

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const [routes, setRoutes] = useState<CommonRoute[]>([]);

    const {searchRoutes} = WidgetApi();

    const style: { [selector: string]: CSSProperties } = {
        "button": {
            backgroundColor: bgButtonColor,
            color: buttonInkColor,
            width: widthButton + "px",
            letterSpacing: 10,
        }
    }
    //const documentRef = useRef(document);

    const testFunc = () => {
        const iframe = document.getElementById("SomeAtribute")
        console.log("i frame is null:", iframe === null);
        if (iframe !== null) {
            const color = iframe.getAttribute("param");
            console.log("Im am attribute", color)
            console.log("search params ", searchParams)
            console.log("location ", location.search)
            console.log("location ", location.pathname)
            console.log("search params ", searchParams)

        }
    }
    const searchRoutesHandler = async () => {
        let request: SearchRouteRequest = {
            CityDeparture: 1,
            CityArrival: 3,
            DateDeparture: "2025-04-10T16:31:02.319Z",
            Carriers: [],
            IsDynamic: false,
            Lang: "RUS"
        };

        const response = await searchRoutes(request)

        console.log("Response", response)

        let i = 1;
        for (const routeItem of response.Result!.CarrierRoutes) {

            console.log("routeItem " + i, routeItem.Routes)
            if (routeItem.Routes.length > 0) {
                setRoutes([...routes, ...routeItem.Routes])
            }


            i++;
            //console.log
            //setRoutes([...routes, ...routeItem])
        }
        console.log(response.Result!.CarrierRoutes)

        console.log("routes", routes)


        //setRoutes(response.Result.CarrierRoutes.)
        console.log("One route", routes[0])
        //console.log("Route data", response.Result.CarrierRoutes[0])
    }


    console.log("char");
    const styleWidget: CSSProperties = {
        backgroundImage: `linear-gradient(to right,  ${bgButtonColor}, ${bgColor} )`,
        //backgroundColor: bgColor,
        borderRadius: cornerRadios
    }
    return (
        <>

            <div className="select-widget-container">
                <div className="tools-container">
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <label>BG color:</label>
                        <input type="color" onChange={(e) => {
                            setBgColor(e.target.value)
                        }} value={bgColor}></input>
                    </div>
                    <div></div>
                    <div>
                        <label>Corner radios</label>
                        <input style={{width: "50px"}} type="number"
                               onChange={(e) => setCornerRadios(Number(e.target.value))}
                               value={cornerRadios}></input>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <label>BG Button color:</label>
                        <input type="color" onChange={(e) => {
                            setBgButtonColor(e.target.value)
                        }} value={bgButtonColor}></input>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <label>BG Button Ink color:</label>
                        <input type="color" onChange={(e) => {
                            setButtonInkColor(e.target.value)
                        }} value={buttonInkColor}></input>
                    </div>

                    <div>
                        <label>Width button</label>
                        <input style={{width: "50px"}} type="number"
                               onChange={(e) => setWidthButton(Number(e.target.value))}
                               value={widthButton}></input>
                    </div>
                    <div>
                        <input style={{width: "50px"}} type="checkbox"
                               onChange={(e) => setShowTransparencyBg(!showTransparencyBg)}
                               checked={showTransparencyBg}
                        ></input>
                        <label>Show transparency</label>
                    </div>

                </div>


                <div className="tools-container" style={{}}>Tool Container</div>

                    {/*<SearchComponent/>*/}
                <SearchComponent2/>


                <div className={showTransparencyBg ? "transparency-container" : ""}>
                    <div className="search-widget-container" style={styleWidget}>
                        <InputCityComponent placeholder={"From"} setValue={setCityFrom} runItemsSearch={() => {
                        }}/>
                        <InputCityComponent placeholder={"To"} setValue={setCityTo} runItemsSearch={() => {
                        }}/>
                        <button type="button" onClick={() => searchRoutesHandler()}>Search</button>
                        {/*<Button style={style} children={"find"}></Button>*/}
                        <p style={{fontFamily: "Arial",}}>Intercars</p>
                    </div>

                    {routes && routes.length > 0 && routes.map(route => {
                        return <RouteComponent route={route}/>
                    })}
                </div>
                <p>Routes length: {routes.length}</p>
                {routes && routes.map((item, index) => {
                    return <p style={{color: "black"}} key={"asd" + index}>{item.Path} dsadas</p>
                })}
                <div id="test-container">
                    <div id="down"></div>
                </div>
            </div>
        </>)
}