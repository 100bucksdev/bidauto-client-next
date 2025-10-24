import Link from 'next/link'
import './global.css'

export default function Custom404() {
	return (
		<div className='w-full grid place-items-center h-[100vh]'>
			<div>
				<div className='text-8xl font-bold text-center'>404</div>
				<div className='text-3xl text-center'>
					<div className='text-4xl mb-2 font-semibold'>Page not found. </div>
					<div>
						<Link href={'/'} className='text-blue-500'>
							Return to home page
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
