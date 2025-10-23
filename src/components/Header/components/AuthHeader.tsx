import logo_pk from '@/assets/icons/logo-desktop.svg'
import logo_mb from '@/assets/icons/mobile-logo.svg'
import { $Pages } from '@/config/router.config'
import Image from 'next/image'
import Link from 'next/link'

const AuthHeader = () => {
	return (
		<header className='bg-t-header-bottom flex justify-center items-center h-[70px] overflow-hidden'>
			<Link href={$Pages.CLIENT.HOME}>
				<Image
					draggable={false}
					className='w-[400px] h-[100%] object-cover max-md:hidden'
					src={logo_pk}
					alt=''
				/>
				<Image
					draggable={false}
					className='w-[120px] h-[100%] object-cover md:hidden'
					src={logo_mb}
					alt=''
				/>
			</Link>
		</header>
	)
}

export default AuthHeader
