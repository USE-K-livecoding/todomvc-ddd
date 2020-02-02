import Todo from "@/domain/todo/Todo";
import TodoTitle from "@/domain/todo/TodoTitle";
import TodoList from "./TodoList";
import TodoStatus from "./TodoStatus";
import TodoId from "./TodoId";

export default interface TodoRepository {

    list(): Promise<TodoList>;

    add(title: TodoTitle): Promise<Todo>;

    get(id: TodoId): Promise<Todo>;

    remove(todo: Todo): Promise<void>;
    remove(todoList: TodoList): Promise<void>;
    remove(arg: Todo | TodoList): Promise<void>;

    changeTitle(id: TodoId, title: TodoTitle): Promise<void>;

    changeStatus(id: TodoId, status: TodoStatus): Promise<void>;

    changeStatusAll(status: TodoStatus): Promise<void>;
}
