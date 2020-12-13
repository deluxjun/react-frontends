import { CommonActionType } from ".";

export interface Company {
	id: number;
	companyName: string;
	adminName: string;
	adminEmail: string;
	memo: string;
}

export enum CompanyActions {
	GET_COMPANIES = "GET_COMPANIES",
	ADD_COMPANY = "ADD_COMPANY",
	DELETE_COMPANY = "DELETE_COMPANY",
}

export type CompanyAction =
	| CommonActionType<typeof CompanyActions.GET_COMPANIES, Company[]>
	| CommonActionType<typeof CompanyActions.ADD_COMPANY, Company>
	| CommonActionType<typeof CompanyActions.DELETE_COMPANY, number>;
