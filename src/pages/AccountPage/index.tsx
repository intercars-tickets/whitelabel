import "./style.scss";
import {InputText} from "../../components/inputText";
import {Button} from "../../components/button";
import {AuthApi} from "../../api/AuthApi";
import {RegisterUserRequest} from "../../models/auth/RegisterUserRequest";
import {FormEvent, useState} from "react";
import {InputText2} from "../../components/inputText2";
import {LoginRequest} from "../../models/auth/LoginRequest";
import {Button2} from "../../components/button2";
import {useAppSelector} from "../../redux/hooks";
import {TextOut} from "../../components/textOut";
import {UsersIcon} from "../../icons/UsersIcon";
import {AccountIcon} from "../../icons/AccountIcon";
import {AccountBoxIcon} from "../../icons/AccountBoxIcon";

export function AccountPage() {
    const auth = useAppSelector(state => state.auth);

    const {signup, login, getAccountInfo} = AuthApi();
    const [inputLogin, setInputLogin] = useState("");
    const [password, setPassword] = useState("");

    let signupRequestData: RegisterUserRequest = {
        confirmPassword: "asdf123",
        firstName: "Сергей",
        lang: "RUS",
        lastName: "Хинкевич",
        middleName: "Владимирович",
        password: "asdf123",
        userName: "Сергей Хинкевич"
    }

    const signupHandler = async () => {
        const response = await signup(signupRequestData)

        console.log(response.status)
        console.log(response.data)
    }

    return (<>
        <div className="account-page-container">
            <div className="acc-info-container">
                <div className="account-info-item">
                    <p>{auth.companyName ?? "Информация о компании"} </p>
                    <div style={{marginLeft: "auto"}}></div>
                    <div style={{marginLeft: "auto", display: "flex", flexDirection: "row"}}>
                        <TextOut title="Название:" text={auth.companyName}/>
                    </div>

                </div>

                <div className="account-info-sub-item">
                    <AccountIcon iconSize="56px"/>
                    <div> {auth.email ?? "Данные  о пользователе"}</div>
                    <div style={{marginLeft: "auto", display: "flex", flexDirection: "row"}}>
                        <TextOut title="Имя" text={auth.firstName}/>
                        <TextOut title="Фамилия:" text={auth.lastName}/>
                        <TextOut title="Jnxtcndj:" text={auth.middleName ?? "no data"}/>
                    </div>
                </div>
            </div>
            <div className="account-card-container">
                <div typeof='label'>Настройки WhiteLabel</div>
                <div className="account-card-item">
                    {/*<TextOut title="UserId" text={auth.userId??"411ad4a5-42ff-4817-9f0c-4e1ecf951191"}/>*/}
                    <TextOut title="UserId:" text={"411ad4a5-42ff-4817-9f0c-4e1ecf951191"} mode="block"/>
                    <TextOut title="Phone1:" text={auth.phone1} mode="block" minWidth="180px"/>
                    <TextOut title="Phone2:" text={auth.phone2} mode="block" minWidth="180px"/>
                    <TextOut title="CallBack Url" text={auth.callBackUrl ?? "no data"} mode="block" minWidth="350px"/>
                    <TextOut title="WhiteLabelId:" text={auth.userId ?? "no data"} mode="block"/>
                    <TextOut title="Phone2:" text={auth.agenstvaType.toString()} mode="block"/>
                </div>

                <div className="account-card-item">
                    <TextOut title="CallBack Url" text={auth.callBackUrl ?? "no data"} mode="block" minWidth="350px"/>
                    <TextOut title="WhiteLabelId:" text={auth.userId ?? "no data"} mode="block"/>
                    <TextOut title="Phone2:" text={auth.agenstvaType.toString()} mode="block"/>
                </div>
            </div>

            <div className="account-card-container">
                <div typeof='label'>Данные компании</div>
                <div className="account-card-item">
                    {/*<TextOut title="UserId" text={auth.userId??"411ad4a5-42ff-4817-9f0c-4e1ecf951191"}/>*/}
                    <TextOut title="UserId:" text={"411ad4a5-42ff-4817-9f0c-4e1ecf951191"} mode="block"/>

                    <TextOut title="Phone1:" text={auth.phone1} mode="block" minWidth="180px"/>
                    <TextOut title="Phone2:" text={auth.phone2} mode="block" minWidth="180px"/>
                </div>

                <div className="account-card-item">
                    <TextOut title="CallBack Url" text={auth.callBackUrl ?? "no data"} mode="block" minWidth="350px"/>
                    <TextOut title="WhiteLabelId:" text={auth.userId ?? "no data"} mode="block"/>
                    <TextOut title="Phone2:" text={auth.agenstvaType.toString()} mode="block"/>

                </div>

            </div>
        </div>
    </>)
}