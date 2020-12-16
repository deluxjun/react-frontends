import { CommonActionType } from ".";

export interface User {
	username: string;
	password: string;
	token: string;
	isAuthenticated: boolean;
}

export enum UserActions {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
}

export type UserAction =
	| CommonActionType<typeof UserActions.LOGIN, string>
	| CommonActionType<typeof UserActions.LOGOUT, null>;
