import {RegisterUserRequest} from "../models/auth/RegisterUserRequest";
import {Axios, AxiosResponse} from "axios";
import {axiosInstance} from "./AxiosInstance";
import {ROUTE_AUTH_REGISTER} from "../constants/routeConstants/ApiRouteConstants";
import {LoginRequest} from "../models/auth/LoginRequest";
import {AccountInfo} from "../models/auth/AccountInfo";
import {LoginResponse} from "../models/auth/LoginResponse";

export function AuthApi(){

    /**
     * POST method for signup
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const signup = async (request: RegisterUserRequest ): Promise<AxiosResponse<any>> => {

        const response = await axiosInstance.post(ROUTE_AUTH_REGISTER, request);
        console.log(response.data);
        return response;
    };

    /**
     * POST method for signup
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const login = async (request: LoginRequest ): Promise<LoginResponse> => {
        let result :LoginResponse;

        console.log("defore request", request)

        const response = await fetch("https://localhost:44363/token", {
            //mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: new URLSearchParams({
                'grant_type': 'password',
                'username': request.login,
                'password': request.password
            })
        })
        //console.log("Widget api response book", response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonResult = await response.json();
        console.log("Js RoutesApi",jsonResult);
        result = JSON.parse(JSON.stringify(jsonResult,null,2));
        return  result;

    };


    /**
     * POST method for signup
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const getAccountInfo = async (accessToken:string): Promise<AccountInfo|null> => {
        let result:AccountInfo ;

        const response = await fetch("https://localhost:44363/api/v1/Whitelabel/getAccountInfo", {
            //mode: "no-cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer "+accessToken,
            }
        })
        console.log("Widget api response book", response);
        if (!response.ok) {
            return null;
        }

        const jsonResult =  response;
        result =await response.json();
        console.log("Js RoutesApi",result);

        return result;
    };




    return {signup, login, getAccountInfo};
}