import {SearchCityRequest} from "../models/Routes/SearchCityRequest";
import {ApiResponse} from "../models/ApiResponse";
import {City} from "../models/Routes/City";

export function WhiteLabelApi() {

    /**
     * POST method for searchCities
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const getTickets = async (request: SearchCityRequest): Promise<ApiResponse<City>> => {

        let result : ApiResponse<City>;
        const response = await fetch("https://localhost:44363" + "/api/v1/Whitelabel/getTickets", {
            //mode: "no-cors",
            method: "GET",
            headers: {
                //Accept:"application/json",
                //"Accept-Encoding": "gzip, deflate, br, zstd",
                //"Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: JSON.stringify(request)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonResult = await response.json();
        console.log("Js",<ApiResponse<City>>jsonResult);
        result = JSON.parse(JSON.stringify(jsonResult,null,2));
        return  result;
    }

}