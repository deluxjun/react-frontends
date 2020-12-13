import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CommonDialog } from "../components/CommonDialog";
import { FormHandle, ServiceForm } from "../components/ServiceForm";
import { ServiceTable } from "../components/ServiceTable";

export function ServicePage() {
	const { t } = useTranslation();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const serviceRef = React.useRef<FormHandle>(null);

	const handleClose = () => {
		setOpen(false);
	};
	const openDialog = () => {
		setOpen(true);
	};

	const handleAddService = () => {
		if (serviceRef.current)
			serviceRef.current.save().then(() => setOpen(false));
	};

	return (
		<Grid container className={classes.root}>
			<CommonDialog
				open={open}
				title={t("company.add")}
				onSaveAndClose={handleAddService}
				onClose={handleClose}
			>
				<ServiceForm ref={serviceRef}></ServiceForm>
			</CommonDialog>{" "}
			<Grid item xs={6}>
				<Typography variant="h4" gutterBottom>
					Service List
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={openDialog}
					>
						Add Service
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<ServiceTable />
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
