import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import routes from "./pages/routes";

function App() {
    return (<BrowserRouter>
        <Routes>
            {routes.map(({component: Component, path, ...rest}) => {
                return (<Route element={(<React.Suspense fallback={<>...</>}>
                    {Component}
                </React.Suspense>)}
                               path={path}
                               key={path}
                               {...rest}
                />);
            })}
        </Routes>
    </BrowserRouter>);
}

export default App;
