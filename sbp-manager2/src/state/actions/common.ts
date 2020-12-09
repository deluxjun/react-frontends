import { CommonAction, CommonActions, ErrorData } from "../model";

export const setLoading = (loading: boolean): CommonAction => {
	return {
		type: CommonActions.SET_LOADING,
		payload: loading,
	};
};

export const setError = (err: ErrorData | string): CommonAction => {
	let errorData: ErrorData;
	if (typeof err == "string") {
		errorData = { code: 100, message: err, description: "" };
	} else errorData = err;
	return {
		type: CommonActions.SET_ERROR,
		payload: errorData,
	};
};

// export const setErrorMessage = (errMsg: string): CommonAction => {
// 	return {
// 		type: CommonActions.SET_ERROR,
// 		payload: { code: 100, message: errMsg, description: "" },
// 	};
// };
