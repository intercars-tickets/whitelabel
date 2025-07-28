import {IRootState} from "./store";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//import {ICompany} from '../interfaces/companyInfoInterfaces/ICompany';

interface AuthState {
    isAuthenticated: boolean;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    //currentClientCode: string;
    userRole: string;
    roles: { [company: string]: string[] },
    siteLanguage:string
    accessToken: string;
    expiredAt: number;
    isTokenBeingRefreshed: boolean;
    authError: string;
    isValidUser: boolean;

    companyId: number;
    companyName: string;
    callBackUrl: string;
    komiss: number;
    phone1: string;
    phone2: string;
    description: string;
    valyta: string;
    agenstvaType: number;

}

const initialState: AuthState = {
    agenstvaType: 0,
    callBackUrl: "",
    companyId: 0,
    companyName: "",
    description: "",
    komiss: 0,
    phone1: "",
    phone2: "",
    valyta: "",
    isAuthenticated: false,
    middleName: "",
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    userRole: "",
    roles: {},
    //? need to remove arr add to export access and refresh tokens
    siteLanguage:"ru",
    accessToken: "",
    expiredAt: 0,
    isTokenBeingRefreshed: false,
    //! HardCode for Testing
    //currentClientCode: "",
    authError: "",
    isValidUser: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserRoles: (state, action: PayloadAction<{ [company: string]: string[] }>) => {
            state.roles = action.payload;
        },
        setUserRole: (state, action: PayloadAction<string>) => {
            state.userRole = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setExpiredAt: (state, action: PayloadAction<number>) => {
            state.expiredAt = action.payload;
        },
        setIsTokenBeingRefreshed: (state, action: PayloadAction<boolean>) => {
            state.isTokenBeingRefreshed = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
        setMiddleName: (state, action: PayloadAction<string>) => {
            state.middleName = action.payload;
        },

        setAuthError: (state, action: PayloadAction<string>) => {
            state.authError = action.payload;
        },
        setIsUserValid: (state, action: PayloadAction<boolean>) => {
            state.isValidUser = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setCompanyId: (state, action: PayloadAction<number>) => {
            state.companyId = action.payload;
        },
        setCompanyName: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload;
        },
        setCallBackUrl: (state, action: PayloadAction<string>) => {
            state.callBackUrl = action.payload;
        },
        setKomiss: (state, action: PayloadAction<number>) => {
            state.komiss = action.payload;
        },
        setPhone1: (state, action: PayloadAction<string>) => {
            state.phone1 = action.payload;
        },
        setPhone2: (state, action: PayloadAction<string>) => {
            state.phone2 = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setValyta: (state, action: PayloadAction<string>) => {
            state.valyta = action.payload;
        },
        setAgenstvaType: (state, action: PayloadAction<number>) => {
            state.agenstvaType = action.payload;
        }


    },
    extraReducers: (builder) => { }
});

export const {
    setEmail,
    setFirstName,
    setLastName,
    setUserRole,
    setUserRoles,
    setUserId,
    setAccessToken,
    setExpiredAt,
    setIsTokenBeingRefreshed,
    setIsUserValid,
    setIsAuthenticated,
    setCompanyName,
    setCompanyId,
    setCallBackUrl,
    setKomiss,
    setPhone1,
    setPhone2,
    setDescription,
    setValyta,
    setAgenstvaType,

} = authSlice.actions;
export const userValidationStatus = (state: IRootState) =>
    state.auth.isValidUser;
export default authSlice.reducer;

export const testToken = (state: IRootState) =>
    state.auth.accessToken;
