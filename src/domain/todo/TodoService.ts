import Todo from "@/domain/todo/Todo";
// import TodoId from "@/domain/todo/TodoId";
import TodoTitle from "@/domain/todo/TodoTitle";
import TodoRepository from "@/domain/todo/TodoRepository";
import TodoList from "./TodoList";
import TodoId from "./TodoId";
import TodoStatus from "./TodoStatus";
import { validate } from "class-validator";

class TodoService {
    private repository: TodoRepository;

    public constructor(repository: TodoRepository) {
        this.repository = repository;
    }

    public async list(): Promise<TodoList> {
        return this.repository.list();
    }
    public async add(title: TodoTitle): Promise<Todo> {
        const errors = await validate(title);
        if (errors.length > 0) {
            throw errors;
        }
        return this.repository.add(title);
    }
    public async remove(todo: Todo): Promise<void>;
    public async remove(todoList: TodoList): Promise<void>;
    public async remove(arg: Todo | TodoList): Promise<void>;
    public async remove(arg: Todo | TodoList): Promise<void> {
        return this.repository.remove(arg);
    }

    public async clearCompleted(): Promise<void> {
        const currentList = await this.repository.list();
        const completeList = currentList.completeList();
        return this.repository.remove(completeList);
    }

    public async changeTitleOrDestroy(id: TodoId, title: TodoTitle): Promise<void> {
        if (title.isEmpty()) {
            const target = await this.repository.get(id);
            return this.repository.remove(target);
        }
        return this.repository.changeTitle(id, title);
    }
    public async changeStatus(id: TodoId, status: TodoStatus): Promise<void> {
        return this.repository.changeStatus(id, status);
    }

    public async changeStatusAll(status: TodoStatus): Promise<void> {
        return this.repository.changeStatusAll(status);
    }

}

export default TodoService;
