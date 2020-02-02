import { HashRouter, Route } from "react-router-dom";
import TodoListView from "./todo-list";
import React from "react";
import ShowPath from "./todo-list/ShowPath";

const View = () => {
    return (
        <HashRouter>
            <Route path={ShowPath.paths()} >
                <TodoListView />
            </Route>
        </HashRouter>
    );
};

export default View;
