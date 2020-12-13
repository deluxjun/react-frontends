// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { forwardRef, useImperativeHandle } from "react";
import { useActions } from "../state/actions";
import * as CompanyActions from "../state/actions/company";
import { ServicePage } from "../pages/ServicePage";
import { Satellite } from "@material-ui/icons";

interface Props {}

export interface FormHandle {
	save: () => Promise<void>;
}

const defaultState = {
	companyName: "",
	adminEmail: "",
	adminName: "",
	tel: "",
	memo: "",
};

export const CompanyForm = forwardRef(
	(props: Props, ref: React.Ref<FormHandle>) => {
		useImperativeHandle(ref, () => ({
			save() {
				return handleSave();
			},
		}));
		const classes = useStyles();
		const [state, setState] = React.useState(defaultState);
		const companyActions = useActions(CompanyActions);

		const handleSave = () => {
			console.log("CompanyForm:handleOk was called");

			return companyActions
				.addCompany({
					// id: Math.random(),
					companyName: state.companyName,
					adminEmail: state.adminEmail,
					adminName: state.adminName,
					tel: state.tel,
					// "usersLimit" : 300,
					memo: state.memo,
					// "products" : [{"id":1},{"id":2}]
				})
				.then(() => {
					setState(defaultState);
				});
		};

		const handleChange = (
			event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		) => {
			const value = event.target.value;
			setState({
				...state,
				[event.target.name]: value,
			});
		};

		return (
			<>
				<TextField
					name="companyName"
					value={state.companyName}
					onChange={handleChange}
					className={classes.textField}
					placeholder="Company Name"
				/>
				<TextField
					name="adminName"
					value={state.adminName}
					onChange={handleChange}
					className={classes.textField}
					placeholder="Admin Name"
				/>
				<TextField
					name="adminEmail"
					value={state.adminEmail}
					onChange={handleChange}
					className={classes.textField}
					placeholder="Email"
				/>
				<TextField
					name="tel"
					value={state.tel}
					onChange={handleChange}
					className={classes.textField}
					placeholder="TelNo"
				/>
				<TextField
					name="memo"
					multiline
					value={state.memo}
					onChange={handleChange}
					className={classes.textField}
					placeholder="Memo"
				/>
			</>
		);
	}
);

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});
