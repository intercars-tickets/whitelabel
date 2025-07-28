import "./style.scss"
import {StatisticTabComponent} from "./staticticTabComponent";
import {useEffect} from "react";


export function OrdersPage() {

    return (<>
        <div className="">
            <StatisticTabComponent activeTabName={"asdf"} changeTab={function (tabName: string): void {
                throw new Error("Function not implemented.");
            }} requiredReports={ {
                isStatementSalesRequired: true,
                isStatementIncomesRequired: true,
                isCustomerFlightsRequired: true,
                isCustomerBuhDocsRequired: true,
                isCustomerAirCompaniesRequired: true,
                isCustomerTicketOrdersRequired: true,
                isCustomerAdditionalService: true,
            }} reportsCheckHandler={function (tabName: string, value: boolean): void {
                throw new Error("Function not implemented.");
            }}/>

        </div>
    </>)
}