import { Photo } from "./Photo";
import { Authorable } from "./Authorable";
export declare class Album extends Authorable {
    id: string;
    name: string;
    photos: Photo[];
}
