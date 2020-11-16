import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import addPost from "./content"
export default combineReducers({ auth, message, addPost });