import React from "react";
import {ISvgIcon} from "../abstractions/ISvgIcon";
import {ICON_SIZE_DEFAULT} from "../constants/ComponentStyles";


export const ArrowLeftIcon = ({iconSize = ICON_SIZE_DEFAULT, svgStyle = {}}: ISvgIcon) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            style={svgStyle["svg"]}>
            <path
                d="M20 12H4M4 12L10 6M4 12L10 18"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={svgStyle["path"]}/>
        </svg>
    )
}