import { ServiceAction } from "./service";
import { CompanyAction } from "./company";
import { CommonAction } from "./common";

export * from "./service";
export * from "./company";
export * from "./common";

export type Action = ServiceAction | CompanyAction | CommonAction;
