import { History } from "history";
import { combineReducers } from "redux";
import { CommonState, Company, ErrorData, Service } from "../model";
import * as serviceReducer from "./service";
import * as companyReducer from "./company";
import * as commonReducer from "./common";

export interface RootState {
	serviceList: Service[];
	companyList: Company[];
	common: CommonState;
	// loading: boolean;
	// error: ErrorData | null;
}

export default (history: History) =>
	combineReducers({
		...serviceReducer,
		...companyReducer,
		...commonReducer,
	});
