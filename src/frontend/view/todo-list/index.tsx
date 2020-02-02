import React from "react";
import TodoListHeaderView from "./TodoListHeaderView";
import TodoListMainView from "./TodoListMainView";
import TodoListFooterView from "./TodoListFooterView";
import TodoList from "@/domain/todo/TodoList";
import TodoFrontendService from "@/frontend/service/TodoFrontendService";
import { ShowType } from "./ShowType";

const todoService = new TodoFrontendService();

const TodoListView = () => {
    const [nowShowing, setNowShowing] = React.useState<ShowType>("all");
    const [todoList, setTodoList] = React.useState(new TodoList());

    React.useEffect(
        () => {
            todoService.list().then(setTodoList);
        },
        []
    );


    return (
        <div>
            <TodoListHeaderView
                addTodo={async (title) => {
                    await todoService.add(title);
                    setTodoList(await todoService.list());
                }}
            />
            <TodoListMainView
                todoList={todoList}
                nowShowing={nowShowing}
                onToggle={async (status) => {
                    await todoService.changeStatusAll(status);
                    setTodoList(await todoService.list());
                }}
                onChangeStatus={async (id, status) => {
                    await todoService.changeStatus(id, status);
                    setTodoList(await todoService.list());
                }}
                onDestroy={async (todo) => {
                    await todoService.remove(todo);
                    setTodoList(await todoService.list());
                }}
                onChangeTitle={async (id, title) => {
                    await todoService.changeTitleOrDestroy(id, title);
                    setTodoList(await todoService.list());
                }}
            />
            <TodoListFooterView
                todoList={todoList}
                nowShowing={nowShowing}
                onNowShowingChange={async (nowShowing: ShowType) => setNowShowing(nowShowing)}
                onClearCompleted={async () => {
                    await todoService.clearCompleted();
                    setTodoList(await todoService.list());
                }}
            />
        </div>
    );
}

export default TodoListView;
