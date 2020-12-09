import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers/index";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			"& > * + *": {
				marginTop: theme.spacing(2),
			},
		},
	})
);

export default function Loading() {
	const classes = useStyles();
	const isLoading = useSelector((state: RootState) => state.common.loading);

	// React.useEffect(() => {
	// 	serviceActions.getServices();
	// }, []);

	console.log("Loading component is loaded: ", isLoading);
	return (
		<>
			{isLoading && (
				<div className={classes.root}>
					<LinearProgress />
				</div>
			)}
		</>
	);
}
