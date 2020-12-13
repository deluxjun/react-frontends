import React, { useContext, useState } from "react";
import { FC, useRef } from "react";
import { ConfirmationDialog, ConfirmationOptions } from "./ConfirmationDialog";

const ConfirmationServiceContext = React.createContext<
	(options: ConfirmationOptions) => Promise<void>
>(Promise.reject);

export const useConfirmation = () => {
	return useContext(ConfirmationServiceContext);
};

export const ConfirmationProvider: FC = ({ children }) => {
	const [state, setState] = useState<ConfirmationOptions | null>(null);

	const awaitingPromiseRef = useRef<{
		resolve: () => void;
		reject: () => void;
	}>();

	const openConfirmation = (options: ConfirmationOptions) => {
		setState(options);
		return new Promise<void>((resolve, reject) => {
			awaitingPromiseRef.current = { resolve, reject };
		});
	};

	const handleSubmit = () => {
		awaitingPromiseRef.current && awaitingPromiseRef.current.resolve();
		setState(null);
	};
	const handleCancel = () => {
		awaitingPromiseRef.current && awaitingPromiseRef.current.reject();
		setState(null);
	};

	return (
		<>
			<ConfirmationServiceContext.Provider
				value={openConfirmation}
				children={children}
			/>
			{state != null && (
				<ConfirmationDialog
					open={Boolean(state)}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					{...state}
				/>
			)}
		</>
	);
};
