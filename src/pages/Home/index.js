import React from 'react';
import Layout from "../../components/Common/Layout";
import route from "./route";

const App = () => {
    return (
        <Layout path={route.path} component={"Hi Shiro"}/>
    )
}

export default <App/>;