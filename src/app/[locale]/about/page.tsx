import { Metadata } from 'next'
import AboutUsContent from './(widgets)/AboutUsContent'

export const metadata: Metadata = {
	title: 'About us',
	description: 'About t-autologistics',
}

export default async function About() {
	return (
		<>
			<div>
				<AboutUsContent />
			</div>
		</>
	)
}
