import axios from "axios";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useSnackbar } from "material-ui-snackbar-provider";
import { setError, setLoading } from "./common";
import { ErrorData, Service } from "../model";
import SelectInput from "@material-ui/core/Select/SelectInput";

// errorComposer will compose a handleGlobally function
const errorComposer = (error: any) => {
	// const snackbar = useSnackbar();
	return () => {
		const statusCode = error.response ? error.response.status : null;
		throw new Error(error.response.data.message);
	};
};

axios.interceptors.request.use(
	function (config) {
		// spinning start to show
		// UPDATE: Add this code to show global loading indicator
		// document.body.classList.add("loading-indicator");

		const token = window.localStorage.token;
		if (token) {
			config.headers.Authorization = `token ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// axios.interceptors.response.use(
// 	function (response) {
// 		// spinning hide
// 		// UPDATE: Add this code to hide global loading indicator
// 		// document.body.classList.remove("loading-indicator");

// 		return response;
// 	},
// 	function (error) {
// 		error.handleGlobally = errorComposer(error);

// 		return Promise.reject(error);
// 	}
// );

// saga

export function useActions(actions: any, deps?: any): any {
	const dispatch = useDispatch();
	return useMemo(
		() => {
			if (Array.isArray(actions)) {
				return actions.map((a) => bindActionCreators(a, dispatch));
			}
			return bindActionCreators(actions, dispatch);
		},
		deps ? [dispatch, ...deps] : deps
	);
}

export interface ApiSuccessFunction {
	(data: any): void;
}

export async function api(
	dispatch: any,
	url: string,
	fnSuccess: ApiSuccessFunction
) {
	dispatch(setLoading(true));

	try {
		if (Math.random() * 10 < 5) throw new Error("make an error");

		const res = await fetch(url);
		// await new Promise((r) => setTimeout(r, 5000));

		if (!res.ok) {
			const resData: ErrorData = await res.json();
			dispatch(setLoading(false));
			dispatch(setError(resData));
		} else {
			const data = await res.json();
			fnSuccess(data);
			dispatch(setLoading(false));

			// const resData: Service[] = await res.json();
			// dispatch({
			// 	type: ServiceActions.GET_SERVICES,
			// 	payload: resData,
			// });
		}
	} catch (err) {
		dispatch(setLoading(false));
		dispatch(setError(err.message));
	} finally {
	}
}

// export function apiAction({
// 	url = "",
// 	method = "GET",
// 	data = null,
// 	accessToken = null,
// 	onSuccess = () => {},
// 	onFailure = () => {},
// 	label = "",
// 	headersOverride = null,
// }) {
// 	return {
// 		type: API,
// 		payload: {
// 			url,
// 			method,
// 			data,
// 			accessToken,
// 			onSuccess,
// 			onFailure,
// 			label,
// 			headersOverride,
// 		},
// 	};
// }
