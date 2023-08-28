import { atom } from "recoil";
import { MovieModel } from "@/model/model";


export const storeMovie = atom({
    key: "store-movie",
    default: {} as MovieModel
})