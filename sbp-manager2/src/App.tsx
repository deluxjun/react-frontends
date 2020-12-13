// prettier-ignore
import { AppBar, Badge, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import { useSnackbar } from "material-ui-snackbar-provider";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Router } from "react-router-dom";
import Loading from "./components/Loading";
import { history } from "./configureStore";
import { HomePage, ServicePage } from "./pages";
import { CompanyPage } from "./pages/CompanyPage";
import { ErrorData } from "./state/model";
import { RootState } from "./state/reducers/index";
import { withRoot } from "./withRoot";

interface IRoute {
	label: string;
	path: string;
	icon: string;
	component: any;
}

const routes: IRoute[] = [
	{
		label: "Dashboard",
		path: "/",
		icon: "Home",
		component: HomePage,
	},
	{
		label: "Service",
		path: "/service",
		icon: "Redeem",
		component: ServicePage,
	},
	{
		label: "Company",
		path: "/company",
		icon: "Business",
		component: CompanyPage,
	},
];

const MaterialIcon = (icon: string) => {
	let iconName = icon.replace(/Icon$/, "");
	let resolved = require(`@material-ui/icons/${iconName}`).default;

	if (!resolved) {
		throw Error(`Could not find @material-ui/icons/${iconName}`);
	}

	return React.createElement(resolved);
};

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			{routes.map(({ path, component }, key) => (
				<Route
					exact={true}
					path={path}
					component={component}
					key={key}
				/>
			))}
		</div>
	);
}

// menu!
function Drawer() {
	const { t } = useTranslation();
	const classes = useStyles();

	return (
		<div>
			<div className={classes.drawerHeader} />
			{routes.map(({ label, path, icon, component }) => {
				return (
					<React.Fragment key={label}>
						<Divider />
						<List>
							<ListItem button onClick={() => history.push(path)}>
								<ListItemIcon>
									{MaterialIcon(icon)}
								</ListItemIcon>
								<ListItemText primary={t(label)} />
							</ListItem>
						</List>
					</React.Fragment>
				);
			})}
		</div>
	);
}

function App() {
	const { t } = useTranslation();
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);
	const isMobile = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const snackbar = useSnackbar();
	const error: ErrorData | null = useSelector(
		(state: RootState) => state.common.error
	);

	React.useEffect(() => {
		if (error != null)
			snackbar.showMessage(`${error?.message}`, "close", () => null);
	}, [error]);

	return (
		// eslint-disable-line no-unused-vars
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								color="inherit"
								noWrap={isMobile}
							>
								{t("product.name")}
							</Typography>
						</Toolbar>
						<Loading></Loading>
					</AppBar>
					<Hidden mdUp>
						<DrawerMui
							variant="temporary"
							anchor={"left"}
							open={mobileOpen}
							classes={{
								paper: classes.drawerPaper,
							}}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<Drawer />
						</DrawerMui>
					</Hidden>
					<Hidden smDown>
						<DrawerMui
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Drawer />
						</DrawerMui>
					</Hidden>
					<Routes />
				</div>
			</div>
		</Router>
	);
}

// function TodoIcon(props: { todoList: Todo[] }) {
// 	let uncompletedTodos = props.todoList.filter(t => t.completed === false);

// 	if (uncompletedTodos.length > 0) {
// 		return (
// 			<Badge color="secondary" badgeContent={uncompletedTodos.length}>
// 				<FormatListNumberedIcon />
// 			</Badge>
// 		);
// 	} else {
// 		return <FormatListNumberedIcon />;
// 	}
// }

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));

export default withRoot(App);
