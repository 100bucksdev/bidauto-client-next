import defaultUserAvatar from '@/assets/images/default-user-avatar.svg'

const ProfileBannerMask = () => {
	return (
		<>
			<div className='flex w-full items-center max-lg:flex-col justify-between gap-y-2 relative'>
				<div className='flex flex-col items-center w-64 max-lg:w-full mr-4 max-lg:mr-0'>
					<div>
						<img
							draggable={false}
							className='w-[92px] h-[92px] rounded-full select-none relative mb-2'
							src={defaultUserAvatar}
							alt=''
						/>
					</div>
					<div className='bg-gray-300 mb-1 skeleton rounded-md w-[100%] h-8'></div>
					<div className='bg-gray-300 mb-1 skeleton rounded-md w-[100%] h-10'></div>
				</div>
				<div className='max-lg:flex max-lg:w-full max-lg:justify-start'>
					<div className='bg-gray-300 skeleton rounded-md w-[200px] h-32'></div>
				</div>
				<div className='max-lg:flex max-lg:w-full max-lg:justify-start'>
					<div className='bg-gray-300 skeleton rounded-md w-[200px] h-32'></div>
				</div>
			</div>
		</>
	)
}

export default ProfileBannerMask
