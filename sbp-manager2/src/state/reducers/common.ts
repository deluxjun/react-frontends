import { CommonAction, CommonActions, Service, CommonState } from "../model";
import createReducer from "./createReducer";

const initialState: CommonState = {
	loading: false,
	error: null,
};

export const common = createReducer<CommonState>(initialState, {
	[CommonActions.SET_LOADING](state: CommonState, action: CommonAction) {
		return { ...state, loading: action.payload, error: null };
	},
	[CommonActions.SET_ERROR](state: CommonState, action: CommonAction) {
		return { ...state, loading: false, error: action.payload };
	},
});
