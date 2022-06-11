export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus // pulbic 또는 private 값만 받기 위함.
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}