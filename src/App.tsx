import {Route, Routes} from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import {MainLayout} from "./layouts/mainLayout";
import {HomePage} from "./pages/homePage";
import {SelectWidgetPage} from "./pages/SelectWidgetPage";
import {AccountPage} from "./pages/AccountPage";
import {ExamplePage} from "./pages/WidgetPages/ExamplePage";
import {OrdersPage} from "./pages/ordersPage";

export function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}></Route>
                    <Route path="account" element={<AccountPage/>}></Route>
                    <Route path="orders" element={<OrdersPage/>}></Route>

                    <Route path="whitelabel">
                        <Route index element={<AccountPage/>}></Route>
                        <Route path="widgets" element={<SelectWidgetPage/>}></Route>
                        <Route path="example" element={<ExamplePage/>}></Route>
                    </Route>
                </Route>
                {/*<CommonRoute path="/widgets" element={<MainLayout />}>*/}
                {/*    <CommonRoute index element={<SelectWidgetPage/>}></CommonRoute>*/}
                {/*    <CommonRoute path="/widgets" element= {<SelectWidgetPage/>}></CommonRoute>*/}
                {/*</CommonRoute>*/}
            </Routes>
        </>
    );
}


export default App;
