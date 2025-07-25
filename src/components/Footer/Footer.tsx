import { memo } from 'react'
import FooterBottomNew from './FooterBotom'
import FooterTop from './FooterTop'

const Footer = memo(() => {
	return (
		<footer className='flex relative flex-col'>
			<FooterTop />
			<FooterBottomNew />
		</footer>
	)
})

export default Footer
