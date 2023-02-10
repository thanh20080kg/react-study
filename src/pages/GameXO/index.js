import React from 'react';
import GameXO from "../../components/GameXO/GameXO";
import route from "./route";
import Layout from "../../components/Common/Layout";

const App = () => {
    return (
        <Layout path={route.path} component={<GameXO/>}/>
    )
}


// ========================================

export default <App/>;