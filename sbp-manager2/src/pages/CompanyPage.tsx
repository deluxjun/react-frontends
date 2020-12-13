import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { CommonDialog } from "../components/CommonDialog";
import { FormHandle, CompanyForm } from "../components/CompanyForm";
import { CompanyTable } from "../components/CompanyTable";
import { useTranslation } from "react-i18next";

export function CompanyPage() {
	const { t } = useTranslation();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const companyRef = React.useRef<FormHandle>(null);

	const handleClose = () => {
		setOpen(false);
	};

	const openCompanyDialog = () => {
		setOpen(true);
	};

	const handleAddCompany = () => {
		if (companyRef.current) companyRef.current.save();
		// success and close
		setOpen(false);
	};

	return (
		<Grid container className={classes.root}>
			<CommonDialog
				open={open}
				title={t("company.add")}
				onSaveAndClose={handleAddCompany}
				onClose={handleClose}
			>
				<CompanyForm ref={companyRef}></CompanyForm>
			</CommonDialog>
			<Grid item xs={6}>
				<Typography variant="h4" gutterBottom>
					Company List
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={openCompanyDialog}
					>
						Add Company
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<CompanyTable />
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},
}));
