import { getInfoImageForAdmin } from '@/shared/api/Lots/admin/getInfoImageForAdmin/getInfoImageForAdmin'
import { useGetInfoTextForAdmin } from '@/shared/api/Lots/admin/getInfoTextForAdmin/useGetInfoTextForAdmin'
import { useCopy } from '@/shared/hooks/useCopy'
import Modal from '@/shared/ui/Modal'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface IPlaceBetModal {
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
	auction: 'COPART' | 'IAAI'
	lot_id: string
}

const LotAdmInfoModal: FC<IPlaceBetModal> = ({
	isVisible,
	setIsVisible,
	lot_id,
	auction,
}) => {
	const [isWarning, setIsWarning] = useState<boolean>(false)
	const copy = useCopy()

	const text = useGetInfoTextForAdmin({
		params: {
			lot_id,
			auction,
		},
	})

	const DownloadImages = () => {
		getInfoImageForAdmin({
			params: {
				lot_id,
				auction,
			},
		})
		setIsWarning(true)
	}

	return (
		<Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
			<div className='bg-white w-full rounded-lg shadow-xl text-black p-4'>
				<div className='w-full rounded-2xl bg-gray-400 p-2'>
					{text.data?.text}
				</div>
				{isWarning ? (
					<p className='text-red-600 mt-2 ml-2'>
						Loading starts with a delay!!!
					</p>
				) : null}

				<div className='flex items-center gap-5'>
					<button
						onClick={() => DownloadImages()}
						className='btn bg-t-blue-light text-white w-full h-10 mt-5'
					>
						Download images
					</button>
					<button
						onClick={() => copy(text.data?.text ?? '')}
						className='btn bg-t-blue-light text-white w-full h-10 mt-5'
					>
						Copy text
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default LotAdmInfoModal
