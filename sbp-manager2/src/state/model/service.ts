export interface Service {
	id: number;
	name: string;
}

export enum ServiceActions {
	GET_SERVICES = "GET_SERVICES",
	ADD_SERVICE = "ADD_SERVICE",
	DELETE_SERVICE = "DELETE_SERVICE",
}

interface ServiceActionType<T, P> {
	type: T;
	payload: P;
}

export type ServiceAction =
	| ServiceActionType<typeof ServiceActions.GET_SERVICES, Service[]>
	| ServiceActionType<typeof ServiceActions.ADD_SERVICE, Service>
	| ServiceActionType<typeof ServiceActions.DELETE_SERVICE, number>;
