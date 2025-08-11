import { useState } from 'react'
import { CiVideoOn } from 'react-icons/ci'
import EngineStartVideoModal from './EngineStartVideoModal'

const EngineStartVideoButton = ({ engineVideo }: { engineVideo: string }) => {
	const [isVisible, setIsVisible] = useState(false)
	return (
		<>
			{engineVideo && (
				<>
					<button
						onClick={() => setIsVisible(true)}
						className={`flex z-40 items-center gap-x-2 px-2 py-1 bg-black hover:bg-black hover:bg-opacity-100 rounded-md duration-200 bg-opacity-50`}
					>
						<span>
							<CiVideoOn />
						</span>
						<span>Engine Starts</span>
					</button>
					<EngineStartVideoModal
						isVisible={isVisible}
						setIsVisible={setIsVisible}
						src={engineVideo}
					/>
				</>
			)}
		</>
	)
}

export default EngineStartVideoButton
