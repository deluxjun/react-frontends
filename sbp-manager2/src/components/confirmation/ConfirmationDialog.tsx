import * as React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@material-ui/core";

export interface ConfirmationOptions {
	type: "info" | "confirm";
	title: string;
	description: string;
}

export interface DialogOptionsProps extends ConfirmationOptions {
	open: boolean;
	onSubmit: () => void;
	onCancel: () => void;
}

export const ConfirmationDialog: React.FC<DialogOptionsProps> = ({
	open,
	type,
	title,
	description,
	onSubmit,
	onCancel,
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{type === "info" && (
					<Button color="primary" onClick={onSubmit}>
						OK
					</Button>
				)}
				{type === "confirm" && (
					<>
						<Button color="primary" onClick={onSubmit}>
							Ok
						</Button>
						<Button color="primary" onClick={onCancel} autoFocus>
							Close
						</Button>
					</>
				)}
			</DialogActions>
		</Dialog>
	);
};
