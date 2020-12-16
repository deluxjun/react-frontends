import { ServiceAction } from "./service";
import { CompanyAction } from "./company";
import { CommonAction } from "./common";
import { UserAction } from "./users";

export * from "./service";
export * from "./company";
export * from "./common";
export * from "./users";

export type Action = ServiceAction | CompanyAction | CommonAction | UserAction;
