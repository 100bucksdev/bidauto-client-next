import {
	ChangeEvent,
	Dispatch,
	FC,
	InputHTMLAttributes,
	SetStateAction,
	useRef,
} from 'react'
import st from './swipe-checkbox.module.css'

interface SwipeCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	title: string
	setIsChecked?: Dispatch<SetStateAction<boolean>>
	isChecked?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	switchCl?: string
	sliderCl?: string
	titleCl?: string
}

const SwipeCheckbox: FC<SwipeCheckboxProps> = ({
	title,
	setIsChecked,
	isChecked,
	onChange,
	switchCl,
	sliderCl,
	titleCl,
	...options
}) => {
	const checkboxRef = useRef<HTMLInputElement>(null)

	return (
		<div className='flex items-center'>
			<label className={`${st.switch} ${switchCl || ''}`}>
				{onChange ? (
					<input
						{...options}
						checked={isChecked}
						type='checkbox'
						onChange={onChange}
						className='opacity-0 w-0 h-0'
					/>
				) : (
					<input
						{...options}
						ref={checkboxRef}
						checked={isChecked}
						type='checkbox'
						onChange={() => {
							if (setIsChecked) {
								checkboxRef.current?.checked
									? setIsChecked(true)
									: setIsChecked(false)
							}
						}}
						className='opacity-0 w-0 h-0'
					/>
				)}
				<span
					className={`${st.slider} before:h-[15px] before:w-[15px] ${
						sliderCl || ''
					} `}
				></span>
			</label>
			<span className={`${titleCl || ''}`}>{title}</span>
		</div>
	)
}

export default SwipeCheckbox
