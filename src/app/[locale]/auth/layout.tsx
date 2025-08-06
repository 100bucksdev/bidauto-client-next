// app/auth/layout.tsx
import { ReactNode } from 'react'

interface AuthLayoutProps {
	children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<html>
			<body>
				<main>
					аа
					{children}
				</main>
			</body>
		</html>
	)
}
