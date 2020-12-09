export interface CommonState {
	loading: boolean;
	error: ErrorData | null;
}

export interface ErrorData {
	code: number;
	message: string;
	description: string;
}

export enum CommonActions {
	SET_LOADING = "SET_LOADING",
	SET_ERROR = "SET_ERROR",
}

export interface CommonActionType<T, P> {
	type: T;
	payload: P;
}

export type CommonAction =
	| CommonActionType<typeof CommonActions.SET_LOADING, boolean>
	| CommonActionType<typeof CommonActions.SET_ERROR, ErrorData>;
