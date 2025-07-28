import {useEffect, useState} from "react";
import {t} from "i18next";
import "./style.scss";

type InputDateProps = {
    inputDateISO?: string
    setDateHandler: (dateIso: string) => void;
    dateLabel?: string;
}

//get and return date in ISO string format
export function InputDate ({inputDateISO, dateLabel,setDateHandler}: InputDateProps) {

    const [inputTextDate, setInputTextDate] = useState(inputDateISO !== "" ? new Date(inputDateISO!).toDateString() : "");

    const parseDateHandler = (inputDate: string) => {


        if (inputDate.length === 8) {
            //move to dateService
            const date = inputDate.substring(0, 2);
            const month = inputDate.substring(2, 4);
            const year = inputDate.substring(4, 8);
            let newDate = new Date(Number(year), Number(month) - 1, Number(date))
            setInputTextDate(newDate.toDateString());
            //console.log(`before set date input: ${inputDate}; date: ${date}; month ${month}`)
            setDateHandler(newDate.toISOString());
            //console.log("new date", newDate)
        }else{
            alert('Неправильный формат даты');
            setInputTextDate("");
        }
    }
    //The  date is presented in a DatePicker Format {YYYY-MM-DD}
    const setDateByDatePicker = (date: string) => {
        setInputTextDate("")
        const regDate = new RegExp("[0-9]{4}(\\W)[0-9]{2}(\\W)[0-9]{2}");

        if (regDate.test(date)) {
            const dateArr = date.split('-');
            const newDate = new Date(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2]));
            setInputTextDate(newDate.toDateString());
            setDateHandler(newDate.toISOString());
        }
    }

    const clearDate = () => {
        setInputTextDate("");
        setDateHandler("");
    }
    useEffect(() => {
        setInputTextDate(inputDateISO !== "" ? new Date(inputDateISO!).toDateString() : "")

    }, [inputDateISO]);

    useEffect(() => {
        if(inputTextDate.length===8){
            parseDateHandler(inputTextDate)
        }

    }, [inputTextDate]);

    return (
        <div className='input-date-component-container'>

            {dateLabel && <label
                >   {dateLabel}&nbsp;&nbsp;
            </label>}

            <div className="input-date-element">
                <input type="text"
                       typeof="input-text-date"
                       style={{border: "none"}}
                       placeholder={t("componentText.inputDateTemplate")}
                       value={inputTextDate}
                       onChange={(e) => {
                           setInputTextDate(e.target.value)
                       }}
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               parseDateHandler(inputTextDate)
                           }
                       }}
                />
                {inputTextDate === "" ? <input
                    type="date"
                    typeof="input-date-picker"
                    placeholder=""
                    style={{width: "18px", border: "none"}}
                    value={inputTextDate}
                    onChange={(e) => {
                        setDateByDatePicker(e.target.value);
                    }}
                /> : <div
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        clearDate();
                    }}>&#x2715;</div>}
                <div>
                </div>
            </div>
        </div>
    )
}