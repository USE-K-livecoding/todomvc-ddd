import Entity from "@/ddd-interface/Entity";
import TodoId from "./TodoId";
import TodoTitle from "./TodoTitle";

export default class Todo implements Entity<Todo> {
    public readonly id: TodoId;

    public title: TodoTitle;

    public constructor(title: TodoTitle);
    public constructor(id: TodoId, title: TodoTitle);
    public constructor(...args: [TodoTitle] | [TodoId, TodoTitle]) {
        if (args.length === 1) {
            const [title] = args;
            this.id = new TodoId();
            this.title = title;
        }

        if (args.length === 2) {
            const [id, title] = args;
            this.id = id;
            this.title = title;
        }

        throw new TypeError("constructor arguments");
    }

    public identifiesWith(other: Todo): boolean {
        return this === other || this.id.equals(other.id);
    }
}
