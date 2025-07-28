import {useEffect, useState} from "react";
import "./style.scss";
import {City} from "../../../models/Routes/City";
import {WidgetApi} from "../../../api/WidgetApi";

type Index = {
    placeholder: string;
    setValue: (value: City|null) => void;
    runItemsSearch: (partInputValue: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function InputCityComponent(props: Index) {

    const [cityArr, setCityArr] = useState<City[]>([]);
    const [searchResult, setSearchResult] = useState<City[]>([]);
    const [cityName, setCityName] = useState("");
    const [isSelectVisible, setIsSelectVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const {searchCity}= WidgetApi();


    const inputHandler = async (value: string) => {
        setCityName(value);
        if (value.length === 3 && searchResult.length === 0) {
            let response =await searchCity({
                Lang: "RUS", Name: value, isExactly: false
            })
             if(response.Result.length > 0){
                 setCityArr(response.Result)
                 setSearchResult(response.Result)
             }
        }
        if (value.length === 1 && cityArr.length > 0) {
            setCityArr([])
            setSearchResult([])
        }
        if (value.length >= 3) {
            setCityArr(
                searchResult.filter((city) => city.Name.toLowerCase().includes(value.toLowerCase()))
            );
        }
    };
    const selectHandler = (itemValue: City) => {
        setCityName(itemValue.Name)
        setIsSelectVisible(false);
        props.setValue(itemValue);
    };
    useEffect(() => {
        console.log("UseEffect");
        if(isFocused && searchResult.length > 0 ){
            console.log("makeVisible array length",cityArr.length);
           setIsSelectVisible(true);
        }else { setIsSelectVisible(false);}

    }, [isFocused,cityArr.length]);

    return (
        <div className="input-city-container">
            <div className="input-city-item">
                {/*<label htmlFor="city-name-input">From</label>*/}
                <input
                    id={"popover-trigger-focus" }
                    type="text"
                    style={{border: "none"}}
                    className="form-control common-input "
                    placeholder={props.placeholder}
                    autoComplete="off"
                    value={cityName}
                    onFocus={()=>{setIsFocused(true)}}
                    onBlur={()=>{setIsFocused(false)}}

                    onChange={async (e) => {
                        await inputHandler(e.target.value);
                    }}
                />
                {cityArr && isSelectVisible &&
                    <div className="input-city-select"
                         style={{display: isSelectVisible ? "" : "none"}}
                    >
                        {cityArr.map((item, index) => (<li key={index} onClick={() => selectHandler(item)}
                        >{item.Name}</li>))}

                    </div>}
                {cityName !== "" ? <div className="clear-input" onClick={() => {
                    setCityName("");
                    props.setValue(null);
                }}>&#x2715;</div> : <div className="clear-input">&nbsp;&nbsp;&nbsp;</div>}
            </div>
        </div>
    );
}
