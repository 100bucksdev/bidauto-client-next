import { FC, useEffect } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import Checkbox from './Checkbox'

interface IAgreeWithTerms {
	error: FieldValues | undefined
	setValue: UseFormSetValue<any>
	name: string
}

const AgreeWithTerms: FC<IAgreeWithTerms> = ({ error, setValue, name }) => {
	useEffect(() => {
		setValue(name, true)
	}, [name, setValue])

	return (
		<div>
			<div className={`${!!error && 'mb-2'}`}>
				<Checkbox
					defaultChecked
					onChange={e => {
						setValue(name, e.target.checked || undefined)
					}}
				>
					<div className='inline ml-3'>I agree with </div>
					<a
						href='/help/terms-of-use'
						target='_blank'
						rel='noopener noreferrer'
						className='inline text-blue-500 hover:underline'
					>
						terms of use
					</a>
				</Checkbox>
			</div>
			{error && <span className='text-red-500 flex'>{error.message}</span>}
		</div>
	)
}

export default AgreeWithTerms
