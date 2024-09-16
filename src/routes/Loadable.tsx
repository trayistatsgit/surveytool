import React, { Suspense, ComponentType } from 'react';

export const Loadable = (Component: ComponentType<any>): React.FC => {
	const LoadableComponent: React.FC = (props) => {
		return (
			<Suspense>
				<Component {...props} />
			</Suspense>
		);
	};

	return LoadableComponent;
};
