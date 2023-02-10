import {lazy} from "react";

export default {
    path: "/gamexo",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}
