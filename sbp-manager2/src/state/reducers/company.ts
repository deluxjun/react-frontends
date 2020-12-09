import { Company, CompanyAction, CompanyActions } from "../model";
import createReducer from "./createReducer";

// const initialState : RootState = {
// 	serviceList: [],
// 	loading: false,
// 	error: null,
// };

export const companyList = createReducer<Company[]>([], {
	[CompanyActions.GET_COMPANIES](state: Company[], action: CompanyAction) {
		return action.payload;
	},
	[CompanyActions.ADD_COMPANY](state: Company[], action: CompanyAction) {
		return [...state, action.payload];
	},
	[CompanyActions.DELETE_COMPANY](state: Company[], action: CompanyAction) {
		// remove all todos with the given id
		return state.filter((t) => t.id !== action.payload);
	},
});
