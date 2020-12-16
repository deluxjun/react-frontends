import * as React from "react";
import { HomePage, LoginPage, ServicePage, CompanyPage } from "./pages";

interface IRoute {
	label: string;
	path: string;
	icon: string;
	component: any;
	requireAuth: boolean;
}

export const drawerRoutes: IRoute[] = [
	{
		label: "Dashboard",
		path: "/",
		icon: "Home",
		component: HomePage,
		requireAuth: true,
	},
	{
		label: "Service",
		path: "/service",
		icon: "Redeem",
		component: ServicePage,
		requireAuth: true,
	},
	{
		label: "Company",
		path: "/company",
		icon: "Business",
		component: CompanyPage,
		requireAuth: true,
	},
];

export const allRoutes: IRoute[] = [
	...drawerRoutes,
	{
		label: "Login",
		path: "/login",
		icon: "Login",
		component: LoginPage,
		requireAuth: false,
	},
];

export const checkAuthRequired = (path: string) => {
	for (const element of allRoutes) {
		if (element.path == path) {
			return element.requireAuth;
		}
	}
	return false; // default value
};
