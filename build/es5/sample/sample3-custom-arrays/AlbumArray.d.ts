import { Album } from "./Album";
export declare class AlbumArray extends Array<Album> {
    findByName(name: string): Album;
}
