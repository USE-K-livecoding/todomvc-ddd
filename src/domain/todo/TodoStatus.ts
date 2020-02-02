// enum TodoStatus {
//     Active,
//     Complete,
// }
type TodoStatus = number;
interface TodoStatusConstructor {
    Active: TodoStatus;
    Complete: TodoStatus;
    toggle(status: TodoStatus): TodoStatus;
}
const TodoStatus: TodoStatusConstructor = (() => {
    enum TodoStatus {
        Active,
        Complete,
    }

    return {
        ...TodoStatus,
        toggle: (status: TodoStatus) => {
            if (TodoStatus.Active === status) return TodoStatus.Complete;
            return TodoStatus.Active;
        },
    };
})();
export default TodoStatus;
