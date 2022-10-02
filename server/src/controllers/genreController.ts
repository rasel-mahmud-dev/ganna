import { NextFunction, Request, Response } from "express";

import Genre from "../models/Genre";
import artistValidator from "../validator/artist";
import Artist from "../models/Artist";
import genre from "../models/Genre";

export async function getAllGenres(req: Request, res: Response, next: NextFunction) {
    try {
        const genres = await Genre.find<Genre[]>();
        if (genres) {
            return res.status(200).json({ genres: genres });
        } else {
            next("Internal Error");
        }
    } catch (ex) {
        next(ex);
    }
}

export async function addGenre(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    try {
        const genre = new Genre({ name });
        let id = await genre.save();
        if (!id) {
            return res.status(500).json({ message: "Please try again" });
        }
        genre.genreId = id;
        const { tableName, ...other } = genre;
        return res.status(201).json({ message: "Artist added", genre: other });
    } catch (ex) {
        next(ex);
    }
}

export async function updateGenre(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { name } = req.body;

    try {
        const genre = new Genre({ name });

        let isUpdated = await genre.updateOne({ fieldName: "genreId", value: id });
        if (!isUpdated) {
            return res.status(500).json({ message: "Please try again" });
        }
        genre.genreId = Number(id);
        const { tableName, ...other } = genre;
        return res.status(201).json({ message: "genre is updated", genre: other });
    } catch (ex) {
        next(ex);
    }
}

export async function deleteGenre(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const isDeleted = await Genre.deleteOne({ genreId: Number(id) });
        if (!isDeleted) {
            return res.status(500).json({ message: "Delete fail. try again" });
        }
        return res.status(201).json({ message: "genre deleted" });
    } catch (ex) {
        next(ex);
    }
}
