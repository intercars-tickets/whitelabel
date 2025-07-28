import React, {CSSProperties, SetStateAction, useEffect, useState} from "react";
import {Button} from "../button";
import {ArrowLeftIcon} from "../../icons/ArrowLeftIcon";
import {Utils} from "../../Utils/Utils";
import './style.scss'


interface IMdDatePickerProps {
    style?: { [selector: string]: CSSProperties };
    isEditable?: boolean;
    day?: string;
    setDay?: (day: string) => void;
    month?: string;
    setMonth?: (month: string) => void;
    year?: string;
    setYear?: (year: string) => void;
    selectedDate?: Date;
    setSelectedDate?: React.Dispatch<SetStateAction<Date>>;
    disabled?: boolean;
    onDateChange?: (value: string) => void;

    min?: Date;
    max?: Date;

    onChange?: (value: any) => void;
    onFocus?: () => void;
}

export function MdDatePicker(props: IMdDatePickerProps) {
    let root: HTMLElement | null = null;


    const {
        setDay,
        onDateChange,
        onChange,
        onFocus,
        disabled,
    } = props;

    const style = props.style ?? {};

    const isEditable = props.isEditable ?? false;


    const [viewType, setViewType] = useState<'days' | 'months' | 'years'>('days');

    const [selectedDate, setSelectedDate] = useState<Date>(props.selectedDate != null ? props.selectedDate : new Date());
    const [selectedMonth, setSelectedMonth] = useState<number>(selectedDate.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(selectedDate.getFullYear());


    const [isFocused, setIsFocused] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    const focusHandler = (event: React.FocusEvent) => {
        setIsFocused(true);
        setIsOpened(true);
        if(onFocus != null) {
            onFocus();
        }
    }

    const blurHandler = (event: React.FocusEvent) => {
        setIsFocused(false);
        setIsOpened(false);
    }

    const toggleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked && !isOpened) {
            setIsOpened(true);
        }
        else if(!event.target.checked && isOpened) {
            setIsOpened(false);
        }
    }

    // const dayChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if(!isOpened) {
    //         setIsOpened(true);
    //     }
    //     if(setDay != null) {
    //         setDay(event.target.value);
    //     }
    //     if(onDateChange != null) {
    //         onDateChange([day, month, year].join('-'));
    //     }
    // }


    const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    }

    const onDayInput = (event: any) => {
        console.warn(event.target.value);

        // if(!event.target.value.match('\\b(0?[1-9]|[1-9][0-9]|100)\\b')) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return;
        // }
    }

    const onMonthInput = (event: any) => {

    }

    const onYearInput = (event: any) => {
        event.t.value.replace(/(\d{2})(\d{2})(\d{4})/,"$1-$2-$3");
    }

    const [date, setDate] = useState<string>('15-10-2024');

    useEffect(() => {
        setSelectedYear(selectedDate.getFullYear());
        setSelectedMonth(selectedDate.getMonth());
    }, [selectedDate]);


    useEffect(() => { }, [isFocused, isOpened]);


    return (
        <div className={("md-datepicker" + (disabled ? " --disabled" : ""))}
             style={style["root"]}>

            <div className="md-datepicker-input-field"
                 style={style["input-field"]}>
                {/*<input type="date" />*/}
                <input className="date-input"
                       value={date}
                       type="text"
                       onFocus={onInputFocus}
                       onChange={(e) => {
                           // @ts-ignore
                           setDate(e.target.value.replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3"))
                       }}
                />
                {/*<input className="day-input" type="text" onFocus={onInputFocus} onInput={onDayInput} />*/}
                {/*<span>-</span>*/}
                {/*<input className="month-input" type="text" onFocus={onInputFocus} onInput={onMonthInput} />*/}
                {/*<span>-</span>*/}
                {/*<input className="year-input"*/}
                {/*       value={year}*/}
                {/*       type="text"*/}
                {/*       onFocus={onInputFocus}*/}
                {/*    onChange={(e) => {*/}
                {/*        // @ts-ignore*/}
                {/*        setYear(e.target.value.replace(/(\d{2})(\d{2})(\d{4})/,"$1-$2-$3"))*/}
                {/*    }}*/}
                {/*/>*/}
                <div className="toggle-button-icon"
                     style={style["toggle-button-icon"]}>

                </div>
            </div>

            <div className={"md-datepicker-calendar  --opened" + (isOpened ? " --opened" : "")}>

                {
                    (() => {
                        switch (viewType) {
                            case "years":
                                return (
                                    <MdDatePickerCalendarYears
                                        min={props.min}
                                        max={props.max}
                                        selectedDate={selectedDate}
                                        year={selectedYear}
                                        setYear={setSelectedYear}
                                        setViewType={setViewType}
                                    />
                                )
                            case "months":
                                return (
                                    <MdDatePickerCalendarMonths
                                        min={props.min}
                                        max={props.max}
                                        selectedDate={selectedDate}
                                        month={selectedMonth}
                                        setMonth={setSelectedMonth}
                                        year={selectedYear}
                                        setYear={setSelectedYear}
                                        setViewType={setViewType}
                                    />
                                )
                            case "days":
                            default:
                                return (
                                    <MdDatePickerCalendarDays
                                        min={props.min}
                                        max={props.max}
                                        month={selectedMonth}
                                        year={selectedYear}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                        setViewType={setViewType}
                                    />
                                )
                        }
                    })()
                }

            </div>

        </div>
    )
}


export interface IMdDatePickerCalendarDaysProps {
    min?: Date;
    max?: Date;
    month: number;
    year: number;
    selectedDate: Date | undefined;
    setSelectedDate: (date: Date) => void;
    setViewType: (viewType: 'days' | 'months' | 'years') => void;
}

export function MdDatePickerCalendarDays(props: IMdDatePickerCalendarDaysProps) {
    const weekStart = 1;
    const daysLimit = 42;
    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


    const [currentPeriod, setCurrentPeriod]   = useState<Date>(new Date(props.year, props.month, 1));
    const [currentPeriodDates, setCurrentPeriodDates] = useState<Date[]>([]);


    const getDays = (viewMonth: number, viewYear: number) => {
        // get first and last day of selected month
        const firstOfMonth = new Date(viewYear, viewMonth, 1);
        const lastOfMonth = new Date(viewYear, viewMonth + 1, 0);

        // prepare first and last calendar date
        let firstCalendarDate = firstOfMonth;
        let lastCalendarDate = lastOfMonth;

        // get the day of the week of the first day of the selected month
        const firstOfMonthDayOfWeek = firstOfMonth.getDay();

        // calculate difference between start week day and week of the first day of selected month
        const weekDaysDiff = (firstOfMonthDayOfWeek - weekStart + 7) % 7;
        firstCalendarDate.setDate(firstCalendarDate.getDate() - weekDaysDiff);

        // calculate days between first and last calendar date
        const daysCount = Math.floor((lastOfMonth.getTime()-firstCalendarDate.getTime())/(24*3600*1000));

        // check if count of days between first and last calendar date less than displayed on calendar
        if(daysCount < daysLimit) { // daysLimit - 42 by default (7x6 grid)
            // add remain days to the last calendar day
            lastCalendarDate.setDate(lastCalendarDate.getDate() + daysLimit - daysCount);
        }

        // return array of dates between first and last calendar date
        return Array.from(Array(daysLimit).keys()).map((dayOffset, dayOffsetIndex) => {
            const date = new Date(firstCalendarDate);
            date.setDate(date.getDate() + dayOffset);
            return date;
        });
    }


    const slideToLeft = () => {
        let nextPeriod = new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() - 1, 1);
        setCurrentPeriod(nextPeriod);
    }

    const slideToRight = () => {
        let nextPeriod = new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() + 1, 1);
        setCurrentPeriod(nextPeriod);
    }


    const isDisabledDate = (date: Date) => {
        if(props.max != null) {
            if(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() > new Date(props.max.getFullYear(), props.max.getMonth(), props.max.getDate()).getTime()) {
                return true;
            }
        }
        if(props.min != null) {
            if(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() < new Date(props.min.getFullYear(), props.min.getMonth(), props.min.getDate()).getTime()) {
                return true;
            }
        }
        return false;
    }


    const selectDate = (date: Date) => {
        props.setSelectedDate(date);
    }


    const allowSlideLeft = () => {
        if(props.min != null && currentPeriodDates.length > 0) {
            if(currentPeriodDates.some(x => x.getDate() == props.min?.getDate() && x.getMonth() == props.min.getMonth() && x.getFullYear() == props.min.getFullYear())) {
                return false;
            }
        }
        return true;
    }

    const allowSlideRight = () => {
        if(props.max != null && currentPeriodDates.length > 0) {
            if(currentPeriodDates.some(x => x.getDate() == props.max?.getDate() && x.getMonth() == props.max.getMonth() && x.getFullYear() == props.max.getFullYear())) {
                return false;
            }
        }
        return true;
    }



    // listen changes in the selected month or year
    useEffect(() => {
        // update days grid
        setCurrentPeriodDates(getDays(currentPeriod.getMonth(), currentPeriod.getFullYear()));
    }, [currentPeriod]);


    return (
        <>
            <div className="md-datepicker-calendar-header">

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            width: "36px",*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    disabled={!allowSlideLeft()}*/}
                {/*    onClick={() => slideToLeft()}*/}
                {/*>*/}
                {/*    <ArrowLeftIcon*/}
                {/*       iconSize= "16px"*/}
                {/*    />*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            flex: 1,*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            color: "#363636",*/}
                {/*            fontWeight: 700,*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    onClick={() => { props.setViewType('months') }}*/}
                {/*>*/}
                {/*    {*/}
                {/*        monthNames[currentPeriod.getMonth()]*/}
                {/*        + " "*/}
                {/*        + currentPeriod.getFullYear()*/}
                {/*    }*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            width: "36px",*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    disabled={!allowSlideRight()}*/}
                {/*    onClick={() => slideToRight()}*/}
                {/*>*/}
                {/*    <ArrowLeftIcon*/}
                {/*        iconSize="16px"*/}
                {/*        svgStyle={{*/}
                {/*            "svg": {*/}
                {/*                transform: "rotate(180deg)"*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Button>*/}

            </div>

            <div className="md-datepicker-calendar-content">

                <div className="md-datepicker-calendar-view">
                    <div className="days">
                        <div className="days-of-week">
                            {
                                Array.from(Array(7).keys()).map((dayOfWeek, dayOfWeekIndex) => {
                                    return (
                                        <span className="dow">
                                    {
                                        daysOfWeek[Utils.mod(weekStart + dayOfWeekIndex, 7)]
                                    }
                                </span>
                                    )
                                })
                            }
                        </div>

                        <div className="days-layout">

                            <div className="md-datepicker-calendar-grid --active-slide">
                                {
                                    currentPeriodDates.map((date, dateIndex) => {
                                        const today = new Date();
                                        return (<></>
                                            // <Button
                                            //     className={(
                                            //         ("md-datepicker-calendar-grid-cell day")
                                            //         + ((date.getMonth() < currentPeriod.getMonth()) ? " --prev-month" : "")
                                            //         + ((date.getMonth() > currentPeriod.getMonth()) ? " --next-month" : "")
                                            //         + ((date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) ? " --today" : "")
                                            //         + ((date.getDate() == props.selectedDate?.getDate() && date.getMonth() == props.selectedDate?.getMonth() && date.getFullYear() == props.selectedDate?.getFullYear()) ? " --selected-day" : "")
                                            //     )}
                                            //     style={{
                                            //         "ink": {
                                            //             backgroundColor: "rgba(0, 0, 0, 0.05)"
                                            //         }
                                            //     }}
                                            //     disabled={isDisabledDate(date)}
                                            //     onClick={() => { selectDate(date) }}
                                            // >
                                            //     {
                                            //         date.getDate()
                                            //     }
                                            // </Button>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}



export interface IMdDatePickerCalendarMonthsProps {
    min?: Date;
    max?: Date;
    selectedDate: Date | undefined;
    month: number;
    setMonth: React.Dispatch<SetStateAction<number>>;
    year: number;
    setYear: React.Dispatch<SetStateAction<number>>;
    setViewType: (viewType: 'days' | 'months' | 'years') => void;
}

export function MdDatePickerCalendarMonths(props: IMdDatePickerCalendarMonthsProps) {
    const monthNames = ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек"];

    const slideToLeft = () => {
        props.setYear(prev => prev - 1);
    }

    const slideToRight = () => {
        props.setYear(prev => prev + 1);
    }

    const allowSlideLeft = () => {
        if(props.min != null) {
            if(props.year - 1 < props.min.getFullYear()) {
                return false;
            }
        }
        return true;
    }

    const allowSlideRight = () => {
        if(props.max != null) {
            if(props.year + 1 > props.max.getFullYear()) {
                return false;
            }
        }
        return true;
    }


    const isDisabledMonth = (month: number) => {
        if(props.max != null) {
            if(props.year >= props.max.getFullYear() && month > props.max.getMonth()) {
                return true;
            }
        }
        if(props.min != null) {
            if(props.year <= props.min.getFullYear() && month < props.min.getMonth()) {
                return true;
            }
        }
        return false;
    }


    const selectMonth = (month: number) => {
        props.setMonth(month);
        props.setViewType('days');
    }


    useEffect(() => {

    }, []);


    return (
        <>
            <div className="md-datepicker-calendar-header">

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            width: "36px",*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    disabled={!allowSlideLeft()}*/}
                {/*    onClick={() => slideToLeft()}*/}
                {/*>*/}
                {/*    <ArrowLeftIcon*/}
                {/*        iconSize="16px"*/}
                {/*    />*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            flex: 1,*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            color: "#363636",*/}
                {/*            fontWeight: 700,*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    onClick={() => { props.setViewType('years') }}*/}
                {/*>*/}
                {/*    {*/}
                {/*        props.year*/}
                {/*    }*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            width: "36px",*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    disabled={!allowSlideRight()}*/}
                {/*    onClick={() => slideToRight()}*/}
                {/*>*/}
                {/*    <ArrowLeftIcon*/}
                {/*       iconSize={"16px"}*/}
                {/*       svgStyle={{*/}
                {/*            "svg": {*/}
                {/*                transform: "rotate(180deg)"*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Button>*/}

            </div>

            <div className="md-datepicker-calendar-content">

                <div className="md-datepicker-calendar-view">
                    <div className="months">

                        <div className="months-layout">

                            <div className="md-datepicker-calendar-grid --active-slide">
                                {
                                    monthNames.map((month, monthIndex) => {
                                        const today = new Date();
                                        return (<></>
                                            // <Button
                                            //     className={(
                                            //         ("md-datepicker-calendar-grid-cell month")
                                            //         + ((monthIndex == props.month) ? " --same-month" : "")
                                            //         + ((monthIndex == props.month && props.year == props.selectedDate?.getFullYear()) ? " --selected-month" : "")
                                            //     )}
                                            //     style={{
                                            //         "ink": {
                                            //             backgroundColor: "rgba(0, 0, 0, 0.05)"
                                            //         }
                                            //     }}
                                            //     disabled={isDisabledMonth(monthIndex)}
                                            //     onClick={() => { selectMonth(monthIndex) }}
                                            // >
                                            //     {
                                            //         month
                                            //     }
                                            // </Button>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}



export interface IMdDatePickerCalendarYearsProps {
    min?: Date;
    max?: Date;
    selectedDate: Date | undefined;
    year: number;
    setYear: (year: number) => void;
    setViewType: (viewType: 'days' | 'months' | 'years') => void;
}

export function MdDatePickerCalendarYears(props: IMdDatePickerCalendarYearsProps) {

    const [startPeriod, setStartPeriod] = useState<number>(Math.trunc(props.year / 12) * 12);


    const slideToLeft = () => {
        setStartPeriod(prev => Math.max(prev - 12, 1200));
    }

    const slideToRight = () => {
        setStartPeriod(prev => Math.min(prev + 12, 9996));
    }


    const allowSlideLeft = () => {
        if(props.min != null) {
            if(Array.from(Array(12).keys()).some(x => x + startPeriod == props.min?.getFullYear())) {
                return false;
            }
        }
        return true;
    }

    const allowSlideRight = () => {
        if(props.max != null) {
            if(Array.from(Array(12).keys()).some(x => x + startPeriod == props.max?.getFullYear())) {
                return false;
            }
        }
        return true;
    }


    const isDisabledYear = (year: number) => {
        if(props.max != null) {
            if(year > props.max.getFullYear()) {
                return true;
            }
        }
        if(props.min != null) {
            if(year < props.min.getFullYear()) {
                return true;
            }
        }
        return false;
    }


    const selectYear = (year: number) => {
        props.setYear(year);
        props.setViewType('months');
    }


    useEffect(() => {

    }, []);


    return (
        <>
            <div className="md-datepicker-calendar-header">

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            width: "36px",*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    disabled={!allowSlideLeft()}*/}
                {/*    onClick={() => slideToLeft()}*/}
                {/*>*/}
                {/*    <ArrowLeftIcon*/}
                {/*        iconSize="16px"*/}
                {/*    />*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            flex: 1,*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            color: "#363636",*/}
                {/*            fontWeight: 700,*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {*/}
                {/*        (startPeriod + " - " + (startPeriod + 12))*/}
                {/*    }*/}
                {/*</Button>*/}

                {/*<Button*/}
                {/*    style={{*/}
                {/*        "button": Object.assign({*/}
                {/*            "--highlighted-background-color": "#F4F4F4"*/}
                {/*        }, {*/}
                {/*            width: "36px",*/}
                {/*            height: "36px",*/}
                {/*            border: "none",*/}
                {/*            justifyContent: "center",*/}
                {/*            fontSize: "14px"*/}
                {/*        }),*/}
                {/*        "ink": {*/}
                {/*            backgroundColor: "rgba(0, 0, 0, 0.05)"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    disabled={!allowSlideRight()}*/}
                {/*    onClick={() => slideToRight()}*/}
                {/*>*/}
                {/*    <ArrowLeftIcon*/}
                {/*        iconSize="16px"*/}
                {/*        svgStyle={{*/}
                {/*            "svg": {*/}
                {/*                transform: "rotate(180deg)"*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Button>*/}

            </div>

            <div className="md-datepicker-calendar-content">

                <div className="md-datepicker-calendar-view">
                    <div className="years">

                        <div className="years-layout">

                            <div className="md-datepicker-calendar-grid --active-slide">
                                {
                                    Array.from(Array(12).keys()).map((offset, offsetIndex) => {
                                        const today = new Date();
                                        return (<></>
                                            // <Button
                                            //     className={(
                                            //         ("md-datepicker-calendar-grid-cell year")
                                            //         + ((startPeriod + offsetIndex == props.year) ? " --selected-year" : "")
                                            //     )}
                                            //     style={{
                                            //         "ink": {
                                            //             backgroundColor: "rgba(0, 0, 0, 0.05)"
                                            //         }
                                            //     }}
                                            //     disabled={isDisabledYear(startPeriod + offsetIndex)}
                                            //     onClick={() => { selectYear(startPeriod + offsetIndex) }}
                                            // >
                                            //     {
                                            //         (startPeriod + offsetIndex)
                                            //     }
                                            // </Button>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>

    )
}