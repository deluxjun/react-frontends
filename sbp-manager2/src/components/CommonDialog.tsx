// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Component, useRef } from "react";
import { useActions } from "../state/actions";
import * as CompanyActions from "../state/actions/company";

interface Props {
	open: boolean;
	title: string;
	onSaveAndClose?: () => void;
	onClose: () => void;
}

export const CommonDialog: React.FunctionComponent<Props> = (props) => {
	const { open, title, onSaveAndClose, onClose } = props;
	const { children } = props;

	return (
		<Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
			<DialogTitle>{title}</DialogTitle>
			{children}
			<DialogActions>
				{onSaveAndClose && (
					<Button color="primary" onClick={onSaveAndClose}>
						OK
					</Button>
				)}
				<Button color="primary" onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
