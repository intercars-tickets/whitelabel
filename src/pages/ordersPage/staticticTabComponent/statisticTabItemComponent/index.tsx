import {useState} from "react";
//import {CustomCheckBox} from "../../../../commonComponents/checkBoxComponents/customCheckBox";
//import {MAIN_BACKGROUND_COLOR, ON_PRIMARY_COLOR, PRIMARY_COLOR} from "../../../../../constants/PageConstants";

type StatisticTabItemProps = {
    tabName: string;
    tabTitle: string;
    isActiveTab: boolean;
    isRequired: boolean;
    changeTab: () => void;
    changeCheckbox: () => void;
};

export function StatisticTabItemComponent(props: StatisticTabItemProps) {
    const [isRequiredTab, setIsRequiredTab] = useState(props.isRequired);

    const changeTabStatusHandler = () => {
        props.changeCheckbox();
        setIsRequiredTab(!isRequiredTab);
    };
    const tabColor = props.isActiveTab ? 'gray' : "white";
    const fontColor =  props.isActiveTab ? "blue" : "#3a3f52";
    return (

        <li className="nav-item" key={StatisticTabItemComponent.name + props.tabName}
        onClick={() => {
            props.changeTab();
        }}>
            <div className=""
                 style={{
                     backgroundColor: tabColor,
                     color: fontColor,
                     border: "1px solid lightGray",
                     borderRadius: "5px",
                     padding: "8px",
                     cursor: "pointer",
                     fontSize: "13px",
                     fontFamily: "roboto"
                 }}>
                <span
                    aria-current="page"
                    className={isRequiredTab ? "user-select-none" : " user-select-none  text-muted  "}
                >
                    {props.tabTitle}
                    &nbsp;
                </span>
                {/*  redundancy functionality, probably */}
                {/*<CustomCheckBox isChecked={true} onChange={(e:boolean)=>console.log(props.changeCheckbox)} />*/}
                {/*<input type="checkbox" checked={props.isRequired} onChange={changeTabStatusHandler}*/}
                {/*       style={{color: "black", backgroundColor: "green"}}*/}
                {/*/>*/}
            </div>
        </li>

    );
}
