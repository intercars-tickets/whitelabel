import {HomeIcon} from "../../icons/HomeIcon";
import {useTranslation} from "react-i18next";
import "./style.scss"
import {ToolsIcon} from "../../icons/ToolsIcon";
import {useLocation} from "react-router-dom";


interface INavigateItem {
    icon?: React.ReactNode;
    itemName: string;
    itemTranslateLink: string;
    itemLink: string;
    items?: INavigateItem[];
}

const leftMenu: INavigateItem[] = [
    {itemName: "Home", itemTranslateLink: "leftMenu.home", itemLink: "/home", items: [
            {itemName: "Orders", itemTranslateLink: "string", itemLink: "/home", }
        ],icon:<HomeIcon/>},
    {itemName: "WhiteLabel", itemTranslateLink: "leftMenu.whitelabel", itemLink: "/whitelabel", items: [],icon:<ToolsIcon/>},
    {itemName: "Orders", itemTranslateLink: "string", itemLink: "/home", items: [],},
    {itemName: "Finance", itemTranslateLink: "string", itemLink: "/home", items: [],},
]


enum Pages {
    Home = 0,
    WhiteLabel = 1,
    Orders = 2,
    Finance = 3,
}

export function LeftMenu() {
    //console.log(t("commonText.email"));
    const {t} = useTranslation();
    const location = useLocation();


    const getActivePage = () => {
        const segments = location.pathname.split("/");

        if (location.pathname === "/") {
            console.log(location.pathname)
            return Pages.Home;
        }
    }

    return (
        <>
            <nav id={"sidebar-menu"} className="sidenav">
                <ul className="main-buttons">
                {leftMenu.map((item: INavigateItem) =>  (<li className="nav-li-item">
                    <div typeof="icon">{item.icon}</div>
                    <div typeof="text">{t(item.itemTranslateLink)}</div>
                </li>))}

                </ul>


                <ul className="main-buttons">
                    <li className={("nav-li-item" + (getActivePage() === Pages.Home ? "active" : "null"))}>
                        {/*<i className="fa fa-circle fa-2x"></i>*/}

                        <div typeof="icon"><HomeIcon/></div>
                        <div typeof="text">{t("leftMenu.home")}</div>

                        <ul className="hidden">
                            <li style={{color: "white"}}>{t("commonText.email")}</li>
                            <li>Инструменты</li>
                            <li></li>
                            <li>your post?</li>
                        </ul>
                    </li>

                    <li className="nav-li-item">
                        {/*<i className="fa fa-circle fa-2x"></i>*/}

                        <div typeof="icon"><ToolsIcon/></div>
                        <div typeof="text">{t("leftMenu.tools")}</div>

                        <ul className="hidden">
                            <li style={{color: "white"}}>{t("commonText.email")}</li>
                            <li>Инструменты</li>
                            <li></li>
                            <li>your post?</li>
                        </ul>
                    </li>


                    <li>
                        {/*<i className="fa fa-circle fa-2x"></i>*/}
                        {/*J cfqnt*/}
                        <ul className="hidden">
                            <li>Dark</li>
                            <li>Wings</li>
                            <li>Dark</li>
                            <li>Words</li>
                            <li>John SNUUW</li>
                        </ul>
                    </li>
                    <li>
                        <i className="fa fa-circle fa-2x"></i>
                        Consectetur<HomeIcon/>
                        <ul className="hidden">
                            <li>Lorem</li>
                            <li>Ipsum</li>
                            <li>Dolor</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>)
}