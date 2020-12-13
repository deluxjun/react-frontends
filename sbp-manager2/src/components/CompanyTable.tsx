// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useActions } from "../state/actions";
import * as CompanyActions from "../state/actions/company";
import { Company, Service } from "../state/model";
import { RootState } from "../state/reducers";
import { useConfirmation } from "./confirmation/ConfirmationService";

export function CompanyTable() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const companyList = useSelector((state: RootState) => state.companyList);
	const companyActions = useActions(CompanyActions);

	React.useEffect(() => {
		companyActions.getCompanies();
	}, []);

	const confirm = useConfirmation();
	const handleDelete = (id: number) => {
		confirm({
			type: "confirm",
			title: "Confirm",
			description: "Are you delete?",
		})
			.then(() => companyActions.deleteCompany(id))
			.catch(() => console.log("Confirmation was canceled"));
	};

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{companyList &&
						companyList.map((n: Company) => {
							return (
								<TableRow key={n.id} hover>
									<TableCell padding="none">
										{n.companyName}
									</TableCell>
									<TableCell padding="none">
										{n.adminName}
									</TableCell>
									<TableCell padding="none">
										{n.adminEmail}
									</TableCell>
									<TableCell padding="none">
										<IconButton
											aria-label="Delete"
											color="default"
											onClick={() => handleDelete(n.id)}
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
