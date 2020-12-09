import { ServiceAction, ServiceActions, Service } from "../model";
import createReducer from "./createReducer";
import { RootState } from "./index";

// const initialState : RootState = {
// 	serviceList: [],
// 	loading: false,
// 	error: null,
// };

export const serviceList = createReducer<Service[]>([], {
	[ServiceActions.GET_SERVICES](state: Service[], action: ServiceAction) {
		return action.payload;
	},
	[ServiceActions.ADD_SERVICE](state: Service[], action: ServiceAction) {
		return [...state, action.payload];
	},
	[ServiceActions.DELETE_SERVICE](state: Service[], action: ServiceAction) {
		// remove all todos with the given id
		return state.filter((t) => t.id !== action.payload);
	},
});
