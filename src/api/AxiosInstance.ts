import axios, {AxiosInstance, AxiosResponse} from "axios";
import {
    MAIN_API_HOSTNAME,
    OLD_API_HOSTNAME
} from "../constants/routeConstants/ApiRouteConstants";


export function newAbortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);
    return abortController.signal;
}

export const AXIOS_INSTANCE_MAIN_API = "axiosInstanceMainApi";
export const AXIOS_INSTANCE_OLD_API = "axiosInstanceOldApi";

type AxiosBaseServer = {
    baseServer: typeof AXIOS_INSTANCE_MAIN_API | typeof AXIOS_INSTANCE_OLD_API;
}

interface IAxiosInstanceStrategy {
    getAxiosInstance(baseServer?: string): AxiosInstance;
}

class AxiosInstanceContext implements IAxiosInstanceStrategy {
    // private currentState: AxiosBaseServer = {baseServer: "axiosInstanceGateway"}
    private readonly axiosInstanceMainApi: AxiosInstance;
    private readonly axiosInstanceOldApi: AxiosInstance;

    constructor() {
        this.axiosInstanceMainApi = axios.create(AxiosInstanceContext.getConfig(MAIN_API_HOSTNAME));
        this.axiosInstanceOldApi = axios.create(AxiosInstanceContext.getConfig(OLD_API_HOSTNAME));
    }

    // setCurrentState(baseServer: AxiosBaseServer) {
    //    this.currentState = baseServer
    // }

    getAxiosInstance(baseServer?: string): AxiosInstance {
        if (baseServer === AXIOS_INSTANCE_MAIN_API) {
            return this.axiosInstanceMainApi;
        } else if (baseServer === AXIOS_INSTANCE_OLD_API) {
            return this.axiosInstanceOldApi;
        }
        return this.axiosInstanceMainApi;
    }

    private static getConfig(baseUrl: string | undefined) {

        return {
            //baseURL: "",
            baseURL: baseUrl,
            headers: {
                'Access-Control-Allow-Origin': '*'
                //Authorization: "ae2b1fca515949e5d54fb22b8ed95575",
                // Host: "",
                //Accept: AxiosHeaderValue;
                //"Content-Length": "",
                //"User-Agent": "",
                //"Content-Encoding": "",
            },
            withCredentials: true,

            //! turned off for testing
            //timeout: 10000,
            // responseType: "json", // default

            // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
            //xsrfCookieName: "XSRF-TOKEN", // default

            // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
            //xsrfHeaderName: "X-XSRF-TOKEN", // default

            // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
            //maxContentLength: 2000,

            // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
            // maxBodyLength: 2000,

            //TODO
            // cancelToken: new CancelToken(function (cancel) {}),
        };
    }

}

export const axiosContext = new AxiosInstanceContext();
const axiosInstance = axios.create({
    baseURL: MAIN_API_HOSTNAME,

    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
        //Authorization,Content-Type
        //responseType: "json", // By default.
        //xsrfCookieName: "XSRF-TOKEN", // By default. Is the name of the cookie to use as a value for xsrf token
        //xsrfHeaderName: "X-XSRF-TOKEN", // By default. Is the name of the http header that carries the xsrf token value
        //maxContentLength: 2000, // defines the max size of the http response content in bytes allowed in node.js
        //maxBodyLength: 2000, // (Node only option) defines the max size of the http request content in bytes allowed
        //timeout: 10000,
    },
    withCredentials: true,
    timeout: 60 * 1000
});

export {axiosInstance}