import { SnackbarProvider } from "material-ui-snackbar-provider";
import * as React from "react";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./configureStore";

const { persistor, store } = configureStore();

export function ReduxRoot() {
	return (
		<Provider store={store}>
			{/* <PersistGate
				loading={<Typography>Loading...</Typography>}
				persistor={persistor}
			> */}
			<SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
				<App />
			</SnackbarProvider>

			{/* </PersistGate> */}
		</Provider>
	);
}

// import { useSnackbar } from 'material-ui-snackbar-provider'
// const snackbar = useSnackbar()
// snackbar.showMessage('Something happened!','Undo', () => handleUndo())
