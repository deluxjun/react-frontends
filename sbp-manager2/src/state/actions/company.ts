import { ThunkAction } from "redux-thunk";

import { Action, Company, CompanyAction, CompanyActions } from "../model";
import { RootState } from "../reducers";
import { apiCommon } from ".";

export function getCompanies(): ThunkAction<void, RootState, null, Action> {
	return async (dispatch) => {
		// try {
		return await apiCommon(
			dispatch,
			`http://localhost:28081/service/companies`,
			(data) => {
				dispatch({
					type: CompanyActions.GET_COMPANIES,
					payload: data,
				});
			}
		);
	};
}

export function deleteCompany(id: number): CompanyAction {
	return {
		type: CompanyActions.DELETE_COMPANY,
		payload: id,
	};
}

export function addCompany(
	company: Company
): ThunkAction<void, RootState, null, Action> {
	return async (dispatch) => {
		// try {
		return await apiCommon(
			dispatch,
			`http://localhost:28081/service/company`,
			(data) => {
				dispatch({
					type: CompanyActions.ADD_COMPANY,
					payload: data,
				});
			},
			company
		);
	};
}
