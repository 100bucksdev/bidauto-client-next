import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const SuccessDeposit = () => {
	// const path = useNavigate();

	return (
		<div className='mx-auto my-10 w-full max-w-[1200px]'>
			<div className='mx-10 max-md:mx-4'>
				<div className='w-full mb-4 rounded-lg bg-t-profile-banner-bg shadow-xl'>
					<div className='flex items-center justify-center flex-col py-20'>
						<div className='flex items-center justify-center  gap-x-4 text-4xl'>
							<div>Success deposit</div>
							<div className='text-5xl text-green-500'>
								<IoMdCheckmarkCircleOutline />
							</div>
						</div>
						{/* <div>
              <button
                onClick={() => path("/")}
                className='text-blue-500 text-2xl mt-5'
              >
                Return to home page
              </button>
            </div> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuccessDeposit
