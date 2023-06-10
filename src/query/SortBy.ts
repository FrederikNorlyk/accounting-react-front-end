export class SortBy {
    field: string
    direction: SortDirection

    constructor(field: string, direction: SortDirection) {
        this.field = field
        this.direction = direction
    }

    public getDirectionAsString() {
        return this.direction == SortDirection.ASCENDING ? 'ASC' : 'DESC'
    }
        
}

export enum SortDirection {
    ASCENDING,
    DESCENDING
}