import { ThunkAction } from "redux-thunk";
import {
	ErrorData,
	Service,
	ServiceAction,
	ServiceActions,
	CommonActions,
	Action,
} from "../model";
import { RootState } from "../reducers";
import { api } from ".";

// export function getServices(): ThunkAction<void, RootState, null, Action> {
// 	// return async (dispatch) => {
// 	// 	await api(dispatch, `/service/products`);
// 	// };
// 	return async (dispatch) => {
// 		// try {
// 		const res = await fetch(`http://localhost:28081/service/products`);

// 		if (!res.ok) {
// 			const resData: ErrorData = await res.json();
// 			throw new Error(resData.message);
// 			// dispatch({
// 			// 	type: CommonActions.SET_ERROR,
// 			// 	payload: resData,
// 			// });
// 		}
// 		const resData: Service[] = await res.json();
// 		dispatch({
// 			type: ServiceActions.GET_SERVICES,
// 			payload: resData,
// 		});
// 		// } catch (err) {
// 		// 	dispatch({
// 		// 		type: CommonActions.SET_ERROR,
// 		// 		payload: err.message,
// 		// 	});
// 		// }
// 	};
// }

export function getServices(): ThunkAction<void, RootState, null, Action> {
	// return async (dispatch) => {
	// 	await api(dispatch, `/service/products`);
	// };
	return async (dispatch) => {
		// try {
		return await api(
			dispatch,
			`http://localhost:28081/service/products`,
			(data) => {
				dispatch({
					type: ServiceActions.GET_SERVICES,
					payload: data,
				});
			}
		);
	};
}

export function addService(service: Service): ServiceAction {
	return {
		type: ServiceActions.ADD_SERVICE,
		payload: service,
	};
}

export function deleteService(id: number): ServiceAction {
	return {
		type: ServiceActions.DELETE_SERVICE,
		payload: id,
	};
}
