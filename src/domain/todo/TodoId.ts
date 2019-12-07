import ValueObject from "@/ddd-interface/ValueObject";
import uuidv4 from "uuid/v4";

export default class TodoId implements ValueObject<TodoId> {
    private value: string;

    public constructor();
    public constructor(value: string);
    public constructor(value?: string) {
        this.value = value || uuidv4();
    }
    public equals(other: TodoId): boolean {
        return this === other || this.value === other.value;
    }
}
