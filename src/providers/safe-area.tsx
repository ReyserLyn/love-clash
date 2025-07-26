export function SafeArea({ children }: { children: React.ReactNode }) {
	return (
		<div
			className='min-h-screen'
			style={{
				paddingTop: 'env(safe-area-inset-top)',
				paddingBottom: 'env(safe-area-inset-bottom)',
				paddingLeft: 'env(safe-area-inset-left)',
				paddingRight: 'env(safe-area-inset-right)',
			}}
		>
			{children}
		</div>
	);
}
