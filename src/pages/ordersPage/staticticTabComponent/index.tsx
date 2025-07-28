import {
    CUSTOMER_ADDITIONAL_SERVICES,
    COMMON_PAGE,
    CUSTOMER_AIR_COMPANIES,
    CUSTOMER_FLIGHTS,
    CUSTOMER_TICKET_ORDERS,
    STATEMENT_SALES,
    STATEMENT_INCOMES,
} from "../../../constants/routeConstants/InnerRouteConstants";
//import {IRequiredReports} from "../../../../interfaces/componentInterfaces/IRequiredReports";
import {StatisticTabItemComponent} from "./statisticTabItemComponent";
import {useTranslation} from "react-i18next";
import {ON_PRIMARY_COLOR, PRIMARY_COLOR} from "../../../constants/PageConstants";
import {IRequiredReports} from "../../../models/IRequiredReports";




interface StatisticTabProps {
    changeTab: (tabName: string) => void;
    activeTabName: string;
    requiredReports: IRequiredReports;
    reportsCheckHandler: (tabName: string, value: boolean) => void;
}

export function StatisticTabComponent(props: StatisticTabProps) {
    const {t} = useTranslation();
    return (
        <>
            <ul className="nav nav-pills gap-1">
                <li className="nav-item">
                    <div
                        className=""

                        // style={{ backgroundColor: props.activeTabName === COMMON_PAGE ? "#eeffe3" : "" }}
                        style={{
                            backgroundColor: props.activeTabName === COMMON_PAGE ? PRIMARY_COLOR : "white",
                            color: props.activeTabName === COMMON_PAGE ? ON_PRIMARY_COLOR : "#3a3f52",
                            border: "1px solid lightGray",
                            borderRadius: "5px",
                            padding: "8px",
                            userSelect: "none",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontFamily: "roboto"
                        }}
                    >
            <span
                aria-current="page"
                onClick={() => {
                    props.changeTab(COMMON_PAGE);
                }}
            >
              {t("reportsPage.commonReport")}
            </span>
                    </div>
                </li>

                <StatisticTabItemComponent
                    key={StatisticTabComponent.name + "_" + STATEMENT_SALES}
                    tabName={STATEMENT_SALES}
                    isRequired={props.requiredReports.isStatementSalesRequired}
                    changeTab={() => {
                        //setActiveTab(STATEMENT_SALES);
                        props.changeTab(STATEMENT_SALES);
                    }}
                    changeCheckbox={() => {
                        props.reportsCheckHandler(
                            STATEMENT_SALES,
                            !props.requiredReports.isStatementSalesRequired
                        );
                    }}
                    isActiveTab={props.activeTabName === STATEMENT_SALES}
                    tabTitle={t("reportsPage.statementSales")}
                />

                <StatisticTabItemComponent
                    key={StatisticTabComponent.name + "_" + STATEMENT_INCOMES}
                    tabName={STATEMENT_INCOMES}
                    isRequired={props.requiredReports.isStatementIncomesRequired}
                    changeTab={() => {
                        props.changeTab(STATEMENT_INCOMES);
                    }}
                    changeCheckbox={() => {
                        props.reportsCheckHandler(
                            STATEMENT_INCOMES,
                            !props.requiredReports.isStatementIncomesRequired
                        );
                    }}
                    isActiveTab={props.activeTabName === STATEMENT_INCOMES}
                    tabTitle={t("reportsPage.customerIncomes")}
                />

                <StatisticTabItemComponent
                    key={StatisticTabComponent.name + "_" + CUSTOMER_FLIGHTS}
                    tabName={CUSTOMER_FLIGHTS}
                    isRequired={props.requiredReports.isCustomerFlightsRequired}
                    changeTab={() => {
                        props.changeTab(CUSTOMER_FLIGHTS);
                    }}
                    changeCheckbox={() => {
                        props.reportsCheckHandler(
                            CUSTOMER_FLIGHTS,
                            !props.requiredReports.isCustomerFlightsRequired
                        );
                    }}
                    isActiveTab={props.activeTabName === CUSTOMER_FLIGHTS}
                    tabTitle={t("reportsPage.customerFlights")}
                />
                <StatisticTabItemComponent
                    key={StatisticTabComponent.name + "_" + CUSTOMER_TICKET_ORDERS}
                    tabName={CUSTOMER_TICKET_ORDERS}
                    isRequired={props.requiredReports.isCustomerTicketOrdersRequired}
                    changeTab={() => {
                        props.changeTab(CUSTOMER_TICKET_ORDERS);
                    }}
                    changeCheckbox={() => {
                        props.reportsCheckHandler(
                            CUSTOMER_TICKET_ORDERS,
                            !props.requiredReports.isCustomerTicketOrdersRequired
                        );
                    }}
                    isActiveTab={props.activeTabName === CUSTOMER_TICKET_ORDERS}
                    tabTitle={t("reportsPage.customerTicketOrders")}
                />

                <StatisticTabItemComponent
                    key={StatisticTabComponent.name + "_" + CUSTOMER_AIR_COMPANIES}
                    tabName={CUSTOMER_AIR_COMPANIES}
                    isRequired={props.requiredReports.isCustomerAirCompaniesRequired}
                    changeTab={() => {
                        props.changeTab(CUSTOMER_AIR_COMPANIES);
                    }}
                    changeCheckbox={() => {
                        props.reportsCheckHandler(
                            CUSTOMER_AIR_COMPANIES,
                            !props.requiredReports.isCustomerAirCompaniesRequired
                        );
                    }}
                    isActiveTab={props.activeTabName === CUSTOMER_AIR_COMPANIES}
                    tabTitle={t("reportsPage.customerAirCompanies")}
                />

                <StatisticTabItemComponent
                    key={StatisticTabComponent.name + "_" + CUSTOMER_ADDITIONAL_SERVICES}
                    tabName={CUSTOMER_ADDITIONAL_SERVICES}
                    isRequired={props.requiredReports.isCustomerAdditionalService}
                    changeTab={() => {
                        props.changeTab(CUSTOMER_ADDITIONAL_SERVICES);
                    }}
                    changeCheckbox={() => {
                        props.reportsCheckHandler(
                            CUSTOMER_ADDITIONAL_SERVICES,
                            !props.requiredReports.isCustomerAdditionalService
                        );
                    }}
                    isActiveTab={props.activeTabName === CUSTOMER_ADDITIONAL_SERVICES}
                    tabTitle={t("reportsPage.customerAdditionalService")}
                />
            </ul>
        </>
    );
}
