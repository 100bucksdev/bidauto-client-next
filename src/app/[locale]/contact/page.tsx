import { Metadata } from 'next'
import ContactCard from './(widgets)/ContactCard'

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Contact with t-autologistics',
}

export default async function Contact() {
	return (
		<>
			<div className='my-10 max-w-[1200px] flex flex-col items-center mx-auto'>
				<h1 className='font-bold text-5xl mb-10'>Our social networks</h1>
				<div className='mx-10 max-md:mx-4'>
					<div className='flex items-center flex-wrap justify-center gap-x-6 gap-y-6'>
						<ContactCard title='Facebook' messenger='facebook' />
						<ContactCard title='Instagram' messenger='instagram' />
						<ContactCard title='YouTube' messenger='youtube' />
						<ContactCard title='+1 (954) 703-4009' messenger='whatsapp' />
						<ContactCard
							className='min-w-[420px] max-md:min-w-[300px]'
							title='logisticstauto@gmail.com'
							messenger='email'
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export const dynamic = 'force-static'
