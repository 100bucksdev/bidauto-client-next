import { useState } from 'react'
import { TbView360Number } from 'react-icons/tb'
import View360Modal from './View360Modal'

const View360Button = ({ view360 }: { view360: string | undefined }) => {
	const [isVisible, setIsVisible] = useState(false)
	return (
		<>
			{view360 && (
				<>
					<button
						onClick={() => setIsVisible(true)}
						className={`flex z-40 items-center gap-x-2 px-2 py-1 bg-black hover:bg-black hover:bg-opacity-100 rounded-md duration-200 bg-opacity-50`}
					>
						<span>
							<TbView360Number />
						</span>
						<span>View</span>
					</button>
					<View360Modal
						isVisible={isVisible}
						setIsVisible={setIsVisible}
						src={view360}
					/>
				</>
			)}
		</>
	)
}

export default View360Button
