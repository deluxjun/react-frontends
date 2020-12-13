// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { forwardRef, useImperativeHandle } from "react";
import { useActions } from "../state/actions";
import * as ServiceActions from "../state/actions/service";
import { ServicePage } from "../pages/ServicePage";

interface Props {}

export interface FormHandle {
	save: () => Promise<void>;
}

export const ServiceForm = forwardRef(
	(props: Props, ref: React.Ref<FormHandle>) => {
		useImperativeHandle(ref, () => ({
			save() {
				return handleSave();
			},
		}));
		const classes = useStyles();
		const [newCompanyText, setNewCompanyText] = React.useState("");
		const serviceActions = useActions(ServiceActions);

		const handleSave = () => {
			return serviceActions
				.addService({
					name: newCompanyText,
				})
				.then(() => {
					// reset Company text if user reopens the dialog
					setNewCompanyText("");
					console.log("!!!!!!!!!!!");
				});
		};
		const handleChange = (event: any) => {
			setNewCompanyText(event.target.value);
		};

		return (
			<TextField
				id="multiline-flexible"
				multiline
				value={newCompanyText}
				onChange={handleChange}
				className={classes.textField}
			/>
		);
	}
);

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});
