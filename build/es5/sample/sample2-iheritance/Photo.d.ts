import { Album } from "./Album";
import { Authorable } from "./Authorable";
export declare class Photo extends Authorable {
    id: string;
    filename: string;
    description: string;
    authorEmail: string;
    albums: Album[];
}
