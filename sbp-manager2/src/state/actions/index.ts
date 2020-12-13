import axios from "axios";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useSnackbar } from "material-ui-snackbar-provider";
import { setError, setLoading } from "./common";
import { ErrorData, Service } from "../model";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { ContactSupportOutlined } from "@material-ui/icons";

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

export async function apiCommon(
	dispatch: any,
	url: string,
	fnSuccess: ApiSuccessFunction,
	body?: object
) {
	dispatch(setLoading(true));

	try {
		// make error
		// if (Math.random() * 10 < 5) throw new Error("make an error");

		const requestOptions: RequestInit = {
			method: body ? "POST" : "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				// 'Authorization': 'Bearer my-token',
			},
			body: body ? JSON.stringify(body) : null,
		};

		console.log(JSON.stringify(requestOptions));

		const data = await fetch(url, requestOptions)
			.then(async (res) => {
				if (!res.ok) {
					const resData: ErrorData = await res.json();
					throw resData;
				}
				return res.text();
			})
			.then((text) => (text.length ? JSON.parse(text) : {}))
			.catch((error) => {
				throw error;
			});

		fnSuccess(data);
		dispatch(setLoading(false));
	} catch (err) {
		dispatch(setLoading(false));
		dispatch(setError(err));
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
