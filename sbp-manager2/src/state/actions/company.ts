import { ThunkAction } from "redux-thunk";

import { Action, Company, CompanyAction, CompanyActions } from "../model";
import { RootState } from "../reducers";
import { api } from ".";

export function getCompanies(): ThunkAction<void, RootState, null, Action> {
	return async (dispatch) => {
		// try {
		return await api(
			dispatch,
			`http://localhost:28081/service/products`,
			(data) => {
				dispatch({
					type: CompanyActions.GET_COMPANIES,
					payload: data,
				});
			}
		);
	};
}

export function addCompany(company: Company): CompanyAction {
	return {
		type: CompanyActions.ADD_COMPANY,
		payload: company,
	};
}

export function deleteCompany(id: number): CompanyAction {
	return {
		type: CompanyActions.DELETE_COMPANY,
		payload: id,
	};
}
