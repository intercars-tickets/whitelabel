import {useAppDispatch} from "../../../redux/hooks";
import {CSSProperties, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./style.scss";
import {CalendarIcon} from "../../../icons/CalendarIcon";
import {InputText} from "../../../components/inputText";
import {ArrowFormIcon} from "../../../icons/ArrowFormIcon";


const initialStateResultCity = {
    Id: 0,
    Name: '',
    Coordinates: {
        Latitude: '',
        Longitude: ''
    }
}

export interface ICityDataProps {
    Result: [
        {
            Id: number,
            Name: string,
            Coordinates: {
                Latitude: string,
                Longitude: string
            }
        }
    ],
    Error: null
}

export interface IFetchDataRoutes {
    SearchId?: string,
    CityDeparture: number,
    CityArrival: number,
    DateDeparture: string,
    Carriers?: number[],
    IsDynamic?: boolean,
    Lang?: string
}

export interface IRouteData {
    Result: {
        CarrierRoutes: [],
        CityArrival: number,
        CityDeparture: number
        Date: string,
        Id: string,
        IsActive: boolean,
        IsDynamic: boolean,
        SaveDate: string
    },
    Error: null
}


export function SearchComponent2() {

    const navigate = useNavigate();
    const [cityDepartureValue, setCityDepartureValue] = useState<string>('');
    const [cityArrivalValue, setCityArrivalValue] = useState<string>('');
    const [cityDepartureData, setCityDepartureData] = useState<ICityDataProps>({
        Result: [initialStateResultCity],
        Error: null
    });
    const [cityArrivalData, setCityArrivalData] = useState<ICityDataProps>({
        Result: [initialStateResultCity],
        Error: null
    });
    const TodayDate = new Date();
    // const defaultDate = moment(TodayDate).format('DD.MM.YYYY');
    //  const defaultNextDate = moment(TodayDate).add(1, 'd').format('DD.MM.YYYY');

    const [date, setDate] = useState("2025.02.02");
    const [isCalendarShow, setCalendarShow] = useState(false)
    const [isButtonClicked, setButtonClicked] = useState(false);

    const styleIcon = {"svg": {position: "absolute", cursor: "pointer", right: "8px"}};

    // Функция для проверки, является ли дата прошедшей
    const isPastDate = (date: any) => {
        return date < TodayDate;
    };
    const className = '';

    // Функция для определения, можно ли кликнуть по дате
    const tileDisabled = ({date}: { date: any }) => {
        return isPastDate(date);
    };

    const formatedDateFetch = (date: any) => {
        //const formetedDate = moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
        return "2025-03-03"
    }
    const handleDepartureChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCityDepartureValue(e.target.value);
        console.log(e.target.value)
    };

    const handleArrivalChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCityArrivalValue(e.target.value);

    };
    console.log(cityArrivalValue)
    const handleDateChange = (selectedDate: any) => {
        const newDate = "2025.25.02";
        setDate(newDate);
        setCalendarShow(prevState => !prevState);
    };

    useEffect(() => {
        const fetchCityDeparture = async (cityDeparture: string) => {
            try {
                const data = {
                    name: cityDeparture,
                    lang: 'RUS'
                }
                // const response = await axios.post('/api/v1/cities/find',  data );
                //  const dat = response.data;
                //  setCityDepartureData(dat);
                //  console.log(dat)
            } catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
        if (cityDepartureValue.length > 3) {
            fetchCityDeparture(cityDepartureValue);
        }
        const fetchCityArrival = async (cityArrival: string) => {
            try {
                const data = {
                    name: cityArrival,
                    lang: 'RUS'
                }
                // const response = await axios.post('/api/v1/cities/find', data);
                // const dat = response.data;
                // setCityArrivalData(dat);
                // console.log(dat)
            } catch (error) {

                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
        if (cityArrivalValue.length > 3) {
            fetchCityArrival(cityArrivalValue);
        }
    }, [cityArrivalValue, cityDepartureValue])
    const fetchData = async () => {
        const newDateFormated = formatedDateFetch(date);
        try {
            const datas: IFetchDataRoutes = {
                CityDeparture: cityDepartureData.Result[0].Id,
                CityArrival: cityArrivalData.Result[0].Id,
                DateDeparture: newDateFormated,
                IsDynamic: true,
                Lang: "RUS"
            };
            console.log(datas)
            // const response = await axios.post('/api/v1/routes/search', datas);
            // const dat = response.data;
            // dispatch(setDataRoute(dat));
            navigate('/list-result-routes', {state: 'Поиск билетов'});
        } catch (error) {

            console.error('Ошибка при отправке данных на сервер:', error);
        } finally {
            setCityDepartureValue('');
            setCityArrivalValue('');
        }
    };

    if (isButtonClicked) {
        fetchData();
        setButtonClicked(false);
    }
    const handleSubmit = () => {
        setButtonClicked(true);
    };
    // console.log(Calendar)
    //styles
    const inputStyle: { [key: string]: CSSProperties } = {
        "container": {border: "none", borderRadius: "15px", gap: "6px"},
        "input": {flex: 1, fontSize: "16px", color: "#445978", border: "none", backgroundColor: "#ffffff"},
    }
    //let inputFrom = inputStyle;
    let inputFrom = {...inputStyle, ...{"input": {backgroundColor: "green"}}};

    return (
        <>
            <form className={`form-search`}
                  style={{backgroundColor: "#0243a6", paddingLeft: "16px", paddingRight: "10px"}}>
                <div className='form-search__wrapper'>
                    <label className='form-search__label'>Откуда</label>
                    <div className='form-search__container'>
                        <input className='form-search__input'
                               id="departure"
                               name='departure'
                               type="text"
                               value={cityDepartureValue}
                               onChange={handleDepartureChange}
                               placeholder='Пункт отправления'
                        />
                        <div className='form-search__image'>
                            <ArrowFormIcon iconSize="33px"
                                //  className='form-search__image'
                            />
                        </div>
                    </div>

                    <div className='form-search__sample'>
                        <p className='form-search__text'>Например:</p>
                        <button className='form-search__btn' type='button' onClick={() => (console.log("hello"))}>Минск
                        </button>
                        <button className='form-search__btn' type='button'
                                onClick={() => console.log("")}>Mosсow
                        </button>
                    </div>
                </div>

                <div className='form-search__wrapper'>
                    <label className='form-search__label'>Куда</label>

                    <input
                    className='form-search__input'
                    id="arrival"
                    name='arrival'
                    type="text"
                    value={cityArrivalValue}
                    onChange={handleArrivalChange}
                    placeholder='Пункт назначения'
                    />
                    <div className='form-search__sample'>
                        <p className='form-search__text'>Например:</p>

                        <button className='form-search__btn' type='button'
                                onClick={() => console.log()}>Minsk
                        </button>
                        <button className='form-search__btn' type='button'
                                onClick={() => console.log()}>Mosсow
                        </button>
                    </div>
                </div>

                <div className='form-search__wrapper'>
                    <label className='form-search__label'>Когда</label>
                    <div className='form-search__container'>
                        {/*<input*/}
                        {/*    className='form-search__input'*/}
                        {/*    id="date"*/}
                        {/*    name='date'*/}
                        {/*    type="text"*/}
                        {/*    value={date}*/}
                        {/*    readOnly*/}
                        {/*    onClick={() => setCalendarShow(true)}*/}
                        {/*/>*/}

                        <input
                                className='form-search__input'
                                id="date"
                                name='date'
                                type="text"
                                value={date}
                                readOnly
                                onClick={() => setCalendarShow(true)}
                            />

                        <div className="form-search__icon"> <CalendarIcon iconSize="24px" onClick={() => {
                            setCalendarShow(prevState => !prevState)
                        }}/></div>

                        {/*<CalendarIcon*/}
                        {/*    iconSize={"14px"}*/}
                        {/*    styleIcon={} />/*/}
                        {/*    onClick={() => setCalendarShow(prevState => !prevState)}*/}
                        {/*/>*/}
                    </div>

                    <div className='form-search__sample'>
                        <p className='form-search__text'>Например:</p>
                        <button className='form-search__btn' type='button'
                                onClick={() => console.log()}>Today
                        </button>
                        <button className='form-search__btn' type='button'
                                onClick={() => console.log}>Tomorrow
                        </button>
                    </div>
                    {isCalendarShow ?
                        <div className='form-search__calendar'>
                            {/*<Calendar*/}
                            {/*    onClickDay={handleDateChange}*/}
                            {/*    value={TodayDate}*/}
                            {/*    tileDisabled={tileDisabled}*/}

                            {/*/>*/}
                        </div>
                        : null}

                </div>
                <div className='form-search__wrapper'>
                    <button className='form-search__btn-submit' type='button' onClick={handleSubmit}>Найти билеты
                    </button>
                </div>

            </form>

        </>)
}