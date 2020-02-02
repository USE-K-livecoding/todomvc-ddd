import TodoService from "@/domain/todo/TodoService";
import TodoStorage from "../storage/TodoStorage";
import TodoList from "@/domain/todo/TodoList";
import TodoTitle from "@/domain/todo/TodoTitle";
import Todo from "@/domain/todo/Todo";
import TodoId from "@/domain/todo/TodoId";
import TodoStatus from "@/domain/todo/TodoStatus";

class TodoFrontendService {
    private service: TodoService;

    public constructor() {
        this.service = new TodoService(
            new TodoStorage("react-todos")
        );
    }

    public async list(): Promise<TodoList> {
        return this.service.list();
    }

    public async add(title: TodoTitle): Promise<Todo> {
        return this.service.add(title);
    }

    public remove(todo: Todo): Promise<void>;
    public remove(todoList: TodoList): Promise<void>;
    public remove(arg: Todo | TodoList): Promise<void>;
    public async remove(arg: Todo | TodoList): Promise<void> {
        return this.service.remove(arg);
    }

    public async clearCompleted(): Promise<void> {
        return this.service.clearCompleted();
    }

    public async changeTitleOrDestroy(id: TodoId, title: TodoTitle): Promise<void> {
        return this.service.changeTitleOrDestroy(id, title);
    }
    public async changeStatus(id: TodoId, status: TodoStatus): Promise<void> {
        return this.service.changeStatus(id, status);
    }

    public async changeStatusAll(status: TodoStatus): Promise<void> {
        return this.service.changeStatusAll(status);
    }
}

export default TodoFrontendService;
