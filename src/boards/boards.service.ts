import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable() //다른 컨트롤러나 어디에서든 사용할 수 있게 만들어줌.
export class BoardsService {
    // private를 사용하지않으면 다른 Component에서 수정할 수 있음. 위험
    private boards: Board[] = [];

    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(), //유니크한 값을 id에 줌 (uuid 모듈 사용)
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id)
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
