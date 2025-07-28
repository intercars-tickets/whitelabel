import {InputText} from "../../components/inputText";
import './style.scss';
import {AccountIcon} from "../../icons/AccountIcon";
import {OptionsIcon} from "../../icons/OptionsIcon";
import {HomeIcon} from "../../icons/HomeIcon";
import {LittleCard} from "../AccountPage/littleCard";
import {DirectionsIcon} from "../../icons/DirectionsIcon";
import {TicketIcon} from "../../icons/TicketIcon";
import {UsersIcon} from "../../icons/UsersIcon";
import {useState} from "react";
import {Button2} from "../../components/button2";
import {ImageCard} from "../AccountPage/imageCard";
import {BusIcon} from "../../icons/BusIcon";
import {AccountBoxIcon} from "../../icons/AccountBoxIcon";
import {AuthApi} from "../../api/AuthApi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {LoginRequest} from "../../models/auth/LoginRequest";
import {
    setAccessToken, setAgenstvaType,
    setCallBackUrl,
    setCompanyId, setCompanyName, setDescription, setEmail,
    setFirstName,
    setIsAuthenticated, setKomiss,
    setLastName, setPhone1, setPhone2, setValyta
} from "../../redux/authSlice";
import {WidgetApi} from "../../api/WidgetApi";


export function HomePage() {

    const {login, getAccountInfo} = AuthApi();
    const {getCities}=WidgetApi();
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const loginHandler =async () => {

        // let request2:LoginRequest = {
        //     login: "375293763552", password: "123456789"
        // };

        let request:LoginRequest = {
            login: userName, password: password
        };

        const loginResponse = await login(request)

        if(loginResponse.access_token!==undefined){
            dispatch(setAccessToken(loginResponse.access_token??""));
            dispatch(setIsAuthenticated(true));
        }

        dispatch(setAccessToken(loginResponse.access_token??""));
        console.log("login response2", loginResponse.access_token)
        //
        const response = await getAccountInfo(loginResponse.access_token);
        if(response!==null){
            dispatch(setFirstName(response.FirstName));
            dispatch(setLastName(response.LastName));
            dispatch(setEmail(response.Email));

            dispatch(setCompanyId(response.CompanyId))
            dispatch(setCompanyName(response.CompanyName));
            dispatch(setCallBackUrl(response.CallBackUrl));
            dispatch(setKomiss(response.Komiss));
            dispatch(setPhone1(response.Phone1));
            dispatch(setPhone2(response.Phone2));
            dispatch(setDescription(response.Description));
            dispatch(setValyta(response.Valyta))
            dispatch(setAgenstvaType(response.AgenstvaType));
        }

        console.log("login response", response)
        console.log("login response2", loginResponse.access_token)
    }

    const getCityHandler =async () => {
        console.log("getCityHandler part cityName");
        const response = await getCities()
        console.log("getCityHandler part cityName",response);
    }

    return (
        <div className="home-page-container">

            <div className="header-container">

                <div style={{color: "#96a0b1"}}><HomeIcon iconSize={"36px"}/> &nbsp;&nbsp; </div>
                <p>/ Intercars for Partners</p>

                <div style={{marginLeft: "auto", display: "flex", gap: "6px", flexDirection: "row"}}>
                    <div><InputText value={userName} placeholder={"login"} setValue={setUserName}/></div>
                    <div><InputText value={password} placeholder={"password"} setValue={setPassword}/></div>
                    <Button2 onClick={async() => {await loginHandler()}} text={"LogIn"}/>
                    {/*<button onClick={async() => {await getCityHandler()}}>Run</button>*/}
                    {/*<div><AccountIcon/>SignIn/</div>*/}
                    {/*<div><OptionsIcon/></div>*/}
                    {/*<div> Nootify</div>*/}
                </div>
            </div>
            <div className="info-block-container">
                <div className='info-block-part-one'>
                    <div className="">Whitelabel</div>
                </div>

                <div className='info-block-part-two'><img src={require('../../img/intercars-logo.png')}
                                                          alt="Intercars Logo"
                                                          style={{
                                                              height: '45px',
                                                              marginLeft: 'auto',
                                                              marginBottom: "-10px"
                                                          }}/></div>

            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <LittleCard cardHeader={"Множество направлений"} percent={10} numberText={"~ 5000"}
                            percentText={'в год'} icon={<DirectionsIcon/>}/>
                <LittleCard cardHeader={"Продажи белетов в день"} percent={+5} numberText={"~ 3000"}
                            icon={<TicketIcon iconSize={"35px"}/>}/>
                <LittleCard cardHeader={"Время ответа поддержки"} percent={-5} numberText={"~ 10 мин"}
                            icon={<UsersIcon/>}/>
            </div>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <LittleCard cardHeader={"Собственные автобусы"} percent={3.5} numberText={">150"}
                            percentText={'в год'} icon={<BusIcon iconSize={"45px"}/>}/>
                <LittleCard cardHeader={"Партнерские системы"} percent={undefined} numberText={"10"}
                            icon={<AccountIcon/>}/>
                <LittleCard cardHeader={"Кголичество перевозчиков"} percent={0.5} numberText={"~ 1000"}
                            icon={<UsersIcon/>}/>
            </div>

            <div className="info-block-container">
                <div className="pay-system-info-block"><img src={require('../../img/pay-system-img.png')}
                                                            alt="Intercars Logo"
                                                            style={{
                                                                height: '70px',
                                                                //marginLeft: 'auto',
                                                                //marginBottom: "-10px"
                                                            }}/>
                </div>
                <div className={"info-block-part-three"}>
                    Широкий выбор платежных систем
                </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <LittleCard cardHeader={"Множество направлений"} percent={10} numberText={"~ 5000"}
                            percentText={'в год'} icon={<DirectionsIcon/>}/>
                <LittleCard cardHeader={"Продажи белетов в день"} percent={+5} numberText={"~ 3000"}
                            icon={<TicketIcon iconSize={"35px"}/>}/>
                <LittleCard cardHeader={"Впкмя ответа поддержки"} percent={-5} numberText={"~ 10 мин"}
                            icon={<UsersIcon/>}/>
            </div>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                {/*<ImageCard imageLinks={[{*/}
                {/*    header:"string",*/}
                {/*    link:"moscov-img.png"*/}
                {/*}]}*/}
                {/*           cardTitle={"Мобильное приложение"}*/}
                {/*           cardText={"Множество рейсов"}*/}
                {/*/>*/}
                {/*<ImageCard imageLinks={[{*/}
                {/*    header:"string",*/}
                {/*    link:"moscov-img.png"*/}
                {/*},{*/}
                {/*    header:"string",*/}
                {/*    link:"moscov-img.png"*/}
                {/*}]}*/}
                {/*           cardTitle={"Популярные направления"}*/}
                {/*           cardText={"Множество рейсов"}*/}
                {/*/>*/}
                {/*<ImageCard imageLinks={[{*/}
                {/*    header:"string",*/}
                {/*    link:"../../../img/moscov-img.png"*/}
                {/*}]}*/}
                {/*           cardTitle={"Популярные направления"}*/}
                {/*           cardText={"Множество рейсов"}*/}
                {/*/>*/}
                {/*<ImageCard imageLinks={[{*/}
                {/*    header:"string",*/}
                {/*    link:"../../img/moscov-img.png"*/}
                {/*}]}*/}
                {/*           cardTitle={"Популярные направления"}*/}
                {/*           cardText={"Множество рейсов"}*/}
                {/*/>*/}
            </div>

            {/*<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>*/}
            {/*    <LittleCard/>*/}
            {/*    <LittleCard/>*/}
            {/*    <LittleCard/>*/}
            {/*</div>*/}
            {/*<div style={{display: "flex", flexDirection: "row"}}>*/}
            {/*    <LittleCard/>*/}
            {/*    <LittleCard/>*/}
            {/*    <LittleCard/>*/}
            {/*</div>*/}


        </div>


    )
}