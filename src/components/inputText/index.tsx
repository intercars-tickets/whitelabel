import "./style.scss";
import {CSSProperties} from "react";

type InputTextProps = {
    title?: string;
    value: string;
    placeholder?: string;
    label?: string;
    name?: string;
    type?: string;

    runActionByEnter?:()=>void;
    setValue: (value: string) => void;
    style?: { [selector: string]: CSSProperties };
};
export function InputText (props:InputTextProps) {
   const style = props.style??{};

    return (
        <div className="input-text-container" style={style["container"]}
             typeof="first">
            {props.label && <div className="input-text-component-label" >{props.label}</div>}
            <div className="input-text-custom-item" typeof="first">
                <label className="input-text-component-label__active"></label>
                <input
                    type={props.type??"text"}
                   // style={style["input"]}
                    name="common-input"
                    className=" common-input "
                    value={props.value}
                                        placeholder={props.placeholder}
                    onChange={(e) => {props.setValue(e.target.value)}}
                    onKeyDown={(e)=>{ if(e.key==="Enter" && props.runActionByEnter!==undefined) props.runActionByEnter() }}
                />
                {props.value !== "" ? <div className="clear-input" onClick={() => {
                    props.setValue("")
                   // setInputText("");
                }}>&#x2715;</div> : <div className="clear-input">&nbsp;&nbsp;&nbsp;</div>}
            </div>
        </div>
    )
}