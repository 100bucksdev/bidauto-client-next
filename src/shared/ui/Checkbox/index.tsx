import {
	ChangeEvent,
	Dispatch,
	FC,
	InputHTMLAttributes,
	ReactNode,
	SetStateAction,
	useRef,
} from 'react'
import st from './checkbox.module.css'

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode
	setIsChecked?: Dispatch<SetStateAction<boolean>>
	isChecked?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<ICheckboxProps> = ({
	children,
	setIsChecked,
	isChecked,
	onChange,
	name,
	...options
}) => {
	const checkboxRef = useRef<HTMLInputElement>(null)

	return (
		<div className={st.checkbox_wrapper_46}>
			{onChange ? (
				<input
					onChange={onChange}
					checked={isChecked}
					ref={checkboxRef}
					type='checkbox'
					id={`cbx-46 ${name}`}
					className={st.inp_cbx}
					{...options}
				/>
			) : (
				<input
					checked={isChecked}
					onChange={() => {
						if (setIsChecked) {
							checkboxRef.current?.checked
								? setIsChecked(true)
								: setIsChecked(false)
						}
					}}
					ref={checkboxRef}
					type='checkbox'
					id={`cbx-46 ${name}`}
					className={st.inp_cbx}
					{...options}
				/>
			)}
			<label htmlFor={`cbx-46 ${name}`} className={st.cbx}>
				<span>
					<svg viewBox='0 0 12 10' height={10} width={12}>
						<polyline points='1.5 6 4.5 9 10.5 1'></polyline>
					</svg>
				</span>
				{children || <div></div>}
			</label>
		</div>
	)
}

export default Checkbox
