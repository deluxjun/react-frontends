// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../state/actions";
import * as ServiceActions from "../state/actions/service";

interface Props {
	open: boolean;
	onClose: () => void;
}

export function ServiceDialog(props: Props) {
	const { open, onClose } = props;
	const classes = useStyles();
	const [newServiceText, setNewServiceText] = React.useState("");
	const serviceActions = useActions(ServiceActions);

	const handleClose = () => {
		serviceActions.addService({
			id: Math.random(),
			completed: false,
			text: newServiceText,
		});
		onClose();

		// reset service text if user reopens the dialog
		setNewServiceText("");
	};

	const handleChange = (event: any) => {
		setNewServiceText(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add a new Service</DialogTitle>
			<TextField
				id="multiline-flexible"
				multiline
				value={newServiceText}
				onChange={handleChange}
				className={classes.textField}
			/>
			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});
