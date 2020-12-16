import axios from "axios";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useSnackbar } from "material-ui-snackbar-provider";
import { setError, setLoading } from "./common";
import { ErrorData, Service } from "../model";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { ContactSupportOutlined } from "@material-ui/icons";
import { logout } from "./user";

// errorComposer will compose a handleGlobally function
const errorComposer = (error: any) => {
	// const snackbar = useSnackbar();
	return () => {
		const statusCode = error.response ? error.response.status : null;
		throw new Error(error.response.data.message);
	};
};

// axios.interceptors.request.use(
// 	function (config) {
// 		// spinning start to show
// 		// UPDATE: Add this code to show global loading indicator
// 		// document.body.classList.add("loading-indicator");

// 		const token = window.localStorage.token;
// 		if (token) {
// 			config.headers.Authorization = `token ${token}`;
// 		}
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

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

export function addAuthHeader(requestOptions) {
	let str = localStorage.getItem("user");
	if (!str) return;

	// return authorization header with jwt token
	let user = JSON.parse(str);

	if (user && user.token) {
		requestOptions.Authorization = "Bearer " + user.token;
	}
}

export function clearStorage() {
	// remove user from local storage to log user out
	localStorage.removeItem("user");
}

export interface ApiSuccessFunction {
	(data: any): void;
}

export async function apiCommon(
	dispatch: any,
	url: string,
	fnSuccess: ApiSuccessFunction,
	body?: object,
	type?: string
) {
	dispatch(setLoading(true));

	try {
		// make error
		// if (Math.random() * 10 < 5) throw new Error("make an error");

		const requestOptions: RequestInit = {
			method: body ? "POST" : "GET",
			headers: {
				"Content-Type": type ? type : "application/json;charset=utf-8",
				// 'Authorization': 'Bearer my-token',
			},
			// body: body ? JSON.stringify(body) : null,
		};

		addAuthHeader(requestOptions.headers);

		if (type && type.indexOf("x-www-form-urlencoded") >= 0 && body)
			requestOptions.body = Object.entries(body)
				.map(
					([key, value]) =>
						`${encodeURIComponent(key)}=${encodeURIComponent(
							value
						)}`
				)
				.join("&");
		else if (body) {
			// json
			requestOptions.body = JSON.stringify(body);
		}

		console.log(JSON.stringify(requestOptions));

		const data = await fetch(url, requestOptions)
			.then(async (res) => {
				if (!res.ok) {
					// forbidden
					if (res.status === 401 || res.status === 403) {
						// auto logout if 401 response returned from api
						dispatch(logout());
					}
					const resData: ErrorData = await res.json();
					throw resData;
				}
				return res.text();
			})
			.then((text) => {
				// return text.length ? JSON.parse(text) : {};
				return text;
			})
			.catch((error) => {
				throw error;
			});

		let newData = data;
		try {
			newData = JSON.parse(data);
		} catch (error) {}
		fnSuccess(newData);

		dispatch(setLoading(false));
	} catch (err) {
		dispatch(setLoading(false));
		if (err instanceof Error) {
			dispatch(setError(err.message));
			console.log("Error: " + err.message);
		} else {
			dispatch(setError(err as ErrorData));
			console.log("ErrorData: " + (err as ErrorData).message);
		}
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
