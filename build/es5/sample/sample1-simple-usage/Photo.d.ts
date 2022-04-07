import { Album } from "./Album";
import { User } from "./User";
export declare class Photo {
    id: string;
    filename: string;
    description: string;
    tags: string[];
    author: User;
    albums: Album[];
    readonly name: string;
    getAlbums(): Album[];
}
