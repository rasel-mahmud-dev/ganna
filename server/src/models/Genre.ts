import Common from "./Common";
import sqlDate from "../utils/sqlDate";

export interface GenreType {
    genreId?: number;
    name: string;
    createdAt?: string | Date;
}

class Genre extends Common implements GenreType {
    genreId?: number;
    name: string;
    createdAt?: string | Date;

    static tableName = "genres";

    constructor({ name }: GenreType) {
        super(Genre.tableName);
        this.name = name;
        this.createdAt = sqlDate(new Date());
    }
}

export default Genre;
