import { User, UserActions, UserAction } from "../model";
import createReducer from "./createReducer";
import { RootState } from "./index";
import { clearStorage } from "../actions/index";

let initialState: User = {
	username: "",
	password: "",
	token: "",
	isAuthenticated: false,
};
let str = localStorage.getItem("user");
if (str) {
	let go = false;
	console.log("===== User reducer was called =====");
	initialState = JSON.parse(str);
	if (initialState.token && initialState.token.length > 0) {
		// TODO: validate token
		// go = true;
		initialState.isAuthenticated = true;
	}

	if (go) {
		clearStorage();
	}
}

export const user = createReducer<User>(initialState, {
	[UserActions.LOGIN](state: User, action: UserAction) {
		return { ...state, token: action.payload, isAuthenticated: true };
	},
	[UserActions.LOGOUT](state: User, action: UserAction) {
		return { ...state, token: "", isAuthenticated: false };
	},
});
