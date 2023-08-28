import { atom } from "recoil";
import { UserInterface } from "@/model/model";

export const storeUser = atom({
  key: "store-user",
  default: {} as UserInterface,
});
