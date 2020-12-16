import { ThunkAction } from "redux-thunk";
import {
	ErrorData,
	CommonActions,
	Action,
	UserActions,
	User,
	UserAction,
} from "../model";
import { RootState } from "../reducers";
import { apiCommon } from ".";
import { clearStorage } from "./index";

export function login(user: User): ThunkAction<void, RootState, null, Action> {
	return async (dispatch) => {
		// try {
		return await apiCommon(
			dispatch,
			`/service/users/signin`,
			(data) => {
				console.log("Returned data: " + data);
				user.token = data;
				user.password = "";
				localStorage.setItem("user", JSON.stringify(user));
				user.isAuthenticated = true;
				dispatch({
					type: UserActions.LOGIN,
					payload: data,
				});
			},
			user, // body
			"application/x-www-form-urlencoded;charset=utf-8" // type
		);
	};
}

export function logout(): UserAction {
	clearStorage();
	return {
		type: UserActions.LOGOUT,
		payload: null,
	};
}
