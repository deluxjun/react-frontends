import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	TextField,
	Theme,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useActions } from "../state/actions";
import * as UserActions from "../state/actions/user";
import { RootState } from "../state/reducers";

interface LoginState {
	isError: boolean;
	isButtonDisabled: false;
	username: string;
	password: string;
}

const loginState: LoginState = {
	isError: false,
	isButtonDisabled: false,
	username: "",
	password: "",
};

export const LoginPage = (props) => {
	const classes = useStyles();
	const userActions = useActions(UserActions);
	const [state, setState] = React.useState(loginState);

	const handleLogin = () => {
		userActions
			.login({
				username: state.username,
				password: state.password,
			})
			.then((d: any) => {
				console.log("login success : " + d);
			});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setState({
			...state,
			[event.target.name]: value,
		});
		console.log("handleChanged: " + value);
	};

	const { from } = props.location.state || { from: { pathname: "/" } };
	const isAuthenticated = useSelector((state: RootState) => {
		return state.user.isAuthenticated;
	});

	console.log("LOGIN from : " + JSON.stringify(from));
	console.log("isAuthenticated? : " + isAuthenticated);
	return (
		<>
			{isAuthenticated && <Redirect to={from} />}
			<form className={classes.container} noValidate autoComplete="off">
				<Card className={classes.card}>
					<CardHeader className={classes.header} title="Login App" />
					<CardContent>
						<div>
							<TextField
								error={state.isError}
								fullWidth
								id="username"
								name="username"
								type="email"
								label="Username"
								placeholder="Username"
								margin="normal"
								onChange={handleChange}
								// onKeyPress={handleKeyPress}
							/>
							<TextField
								error={state.isError}
								fullWidth
								id="password"
								name="password"
								type="password"
								label="Password"
								placeholder="Password"
								margin="normal"
								// helperText={state.helperText}
								onChange={handleChange}
								// onKeyPress={handleKeyPress}
							/>
						</div>
					</CardContent>
					<CardActions>
						<Button
							variant="contained"
							size="large"
							color="secondary"
							className={classes.loginBtn}
							onClick={handleLogin}
							disabled={state.isButtonDisabled}
						>
							Login
						</Button>
					</CardActions>
				</Card>
			</form>
		</>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			flexWrap: "wrap",
			width: 400,
			margin: `${theme.spacing(0)} auto`,
		},
		loginBtn: {
			marginTop: theme.spacing(2),
			flexGrow: 1,
		},
		header: {
			textAlign: "center",
			background: "#212121",
			color: "#fff",
		},
		card: {
			marginTop: theme.spacing(10),
		},
	})
);
