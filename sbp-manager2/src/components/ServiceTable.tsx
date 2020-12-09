// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActions } from "../state/actions";
import * as ServiceActions from "../state/actions/service";
import { Service } from "../state/model";
import { RootState } from "../state/reducers";

export function ServiceTable() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const serviceList = useSelector((state: RootState) => state.serviceList);
	const serviceActions = useActions(ServiceActions);

	React.useEffect(() => {
		serviceActions.getServices();
	}, []);

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{serviceList &&
						serviceList.map((n: Service) => {
							return (
								<TableRow key={n.id} hover>
									<TableCell padding="none">
										{n.name}
									</TableCell>
									<TableCell padding="none">
										<IconButton
											aria-label="Delete"
											color="default"
											onClick={() =>
												serviceActions.deleteService(
													n.id
												)
											}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});
