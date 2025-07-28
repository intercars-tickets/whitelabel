import "./style.scss"
import {HomeIcon} from "../../../icons/HomeIcon";
import {JSX} from "react";
import {DirectionsIcon} from "../../../icons/DirectionsIcon";

type LittleCardProps ={
    icon?: JSX.Element;
    cardHeader: string;
    percent?:number;
    percentText?:string;
    numberText?:string;
}


export function LittleCard(props: LittleCardProps): React.ReactElement {


    const getPercentStyle = (percent:number|undefined)=>{
        if(percent===undefined || percent>=0){return  "percent_increase"}
        else {return "percent_decrease"}
    }



    const getPercentText = (percent:number|undefined)=>{
        if(percent===undefined){return ""}

        if(percent>=0){return "+"+percent+"% "+ (props.percentText===undefined?"":props.percentText)}
        else{return percent+"% " + (props.percentText===undefined?"":props.percentText)}
    }



    return <>
        <div className="intercars-little-card-contaier">
            <div className="intercars-little-card-content">
                <div typeof="header">{props.cardHeader}</div>

                <div className="intercars-little-card-numbers">
                    <div typeof="numbers">{props.numberText}</div>
                    <div typeof={getPercentStyle(props.percent)}>{getPercentText(props.percent)}</div>
                </div>

            </div>
            <div className="intercars-little-card-icon-item">
                {props.icon && props.icon}
            </div>
        </div>
    </>
}