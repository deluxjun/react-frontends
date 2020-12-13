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
import { apiCommon } from ".";

export function getServices(): ThunkAction<void, RootState, null, Action> {
	// return async (dispatch) => {
	// 	await api(dispatch, `/service/products`);
	// };
	return async (dispatch) => {
		// try {
		return await apiCommon(
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

export function addService(
	service: Service
): ThunkAction<void, RootState, null, Action> {
	return async (dispatch) => {
		// try {
		return await apiCommon(
			dispatch,
			`http://localhost:28081/service/product`,
			(data) => {
				dispatch({
					type: ServiceActions.ADD_SERVICE,
					payload: data,
				});
			},
			service
		);
	};
}

export function deleteService(
	id: number
): ThunkAction<void, RootState, null, Action> {
	return async (dispatch) => {
		// try {
		return await apiCommon(
			dispatch,
			`http://localhost:28081/service/product/deleteId/${id}`,
			(data) => {
				dispatch({
					type: ServiceActions.DELETE_SERVICE,
					payload: id,
				});
			}
		);
	};
}
