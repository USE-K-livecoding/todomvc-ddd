export default interface Entity<T extends Entity<T>> {
    identifiesWith(other: T): boolean;
}
