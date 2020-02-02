import React from "react";
import classNames from "classnames";
import pluralize from "pluralize";
import capitalize from "capitalize";

import TodoList from "@/domain/todo/TodoList";
import taglib from "@/frontend/taglib";
import { ShowType } from "./ShowType";

const showTypes: Array<ShowType> = ["all", "active", "completed"];
interface TodoListFooterViewProps {
    todoList: TodoList;
    nowShowing: ShowType;
    onNowShowingChange: (type: ShowType) => void;
    onClearCompleted: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}
const TodoListFooterView = (props: TodoListFooterViewProps) => {
    const {
        todoList,
        nowShowing,
        onNowShowingChange,
        onClearCompleted,
    } = props;

    if (todoList.isEmpty()) {
        return null;
    }

    const activeList = todoList.activeList();
    const completeList = todoList.completeList();

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeList.count()}</strong> {pluralize("item", activeList.count())} left
            </span>
            <ul className="filters">
                {showTypes.map(showType => (
                    <li
                        key={showType}
                    >
                        <a
                            className={classNames({ selected: nowShowing === showType })}
                            onClick={() => onNowShowingChange(showType)}
                        >
                            {capitalize(showType)}
                        </a>
                    </li>
                ))}
            </ul>
            <taglib.if test={!completeList.isEmpty()}>
                {() => (
                    <button
                        className="clear-completed"
                        onClick={onClearCompleted}
                    >
                        Clear completed
                    </button>
                )}
            </taglib.if>
        </footer>
    );
};

export default TodoListFooterView;
