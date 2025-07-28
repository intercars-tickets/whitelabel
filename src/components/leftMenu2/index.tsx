import {HomeIcon} from "../../icons/HomeIcon";
import {ToolsIcon} from "../../icons/ToolsIcon";
import "./style.scss";
import {useState} from "react";
import {AccountIcon} from "../../icons/AccountIcon";
import {useLocation, useNavigate} from "react-router-dom";

enum Pages {
    Home = 0,
    WhiteLabel = 1,
    Orders = 2,
    Finance = 3,
}

interface INavigateItem {
    icon?: React.ReactNode;
    itemName: string;
    itemTranslateLink: string;
    itemLink: string;
    subItems?: INavigateItem[];
    page: Pages;
}


export function LeftMenu2() {

    let navigate = useNavigate();
    let location = useLocation();
    const [activePage, setActivePage] = useState()





    const leftMenu: INavigateItem[] = [
        {
            itemName: "Cabinet", itemTranslateLink: "leftMenu.home", itemLink: "/home", subItems: [
                {
                    itemName: "Home",
                    itemTranslateLink: "string",
                    itemLink: "/",
                    page: Pages.Orders,
                    icon: <AccountIcon/>
                },
                {itemName: "Account Info", itemTranslateLink: "string", itemLink: "/account", page: Pages.Orders,icon: <AccountIcon/>},
                {itemName: "Orders", itemTranslateLink: "string", itemLink: "/orders", page: Pages.Orders,icon: <ToolsIcon/>}
            ], icon: <HomeIcon/>, page: Pages.Orders
        },
        {
            itemName: "WhiteLabel",
            itemTranslateLink: "leftMenu.whitelabel",
            itemLink: "/whitelabel",
            subItems: [
                {itemName: "About", itemTranslateLink: "string", itemLink: "/whitelabel", page: Pages.Orders,icon: <ToolsIcon/>},
                {itemName: "Widgets", itemTranslateLink: "string", itemLink: "/whitelabel/widgets", page: Pages.Orders,icon: <ToolsIcon/>},
                {itemName: "WhiteLabel", itemTranslateLink: "string", itemLink: "/whitelabel/example", page: Pages.Orders,icon: <ToolsIcon/>},
            ],
            icon: <ToolsIcon/>, page: Pages.Orders
        },
        {itemName: "Reports", itemTranslateLink: "string", itemLink: "/home", subItems: [], page: Pages.Orders},
        {itemName: "Finance", itemTranslateLink: "string", itemLink: "/home", subItems: [], page: Pages.Orders},
    ]

    const isActivePage = (link: string) => {
        console.log("LeftMenu", location.pathname, "link",  link , location.pathname===link)
        const route = location.pathname.split("/")[0]
        if (location.pathname === link){ return '_active'}
        else return "";
    }

    return (<>
        <nav className="left-menu">
            {leftMenu.map((item: INavigateItem) => (
                <div className={"menu-item"}>
                    <div typeof="text-title" onClick={()=>navigate(item.itemLink)}>{item.itemName}</div>
                    {item.subItems?.map((subItem: INavigateItem) => (<>
                        <div className={"sub-menu-item" + isActivePage(subItem.itemLink)} onClick={()=>navigate(subItem.itemLink)}>
                            <div typeof="icon">{subItem.icon}</div>
                            <div typeof="text">{subItem.itemName}</div>
                        </div>
                    </>))}
                </div>))
            }
        </nav>
    </>)
}