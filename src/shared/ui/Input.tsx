import { FC, InputHTMLAttributes } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	register?: UseFormRegister<any>
	error: FieldValues | undefined
	valueAsNumber?: boolean
	label?: string
	pattern?: any
}

const Input: FC<InputProps> = ({
	name,
	register,
	error,
	valueAsNumber,
	label,
	className,
	pattern,
	...options
}) => {
	return (
		<div>
			<span className='text-red-500 z-20 relative max-w-full break-words flex justify-end min-h-[24px] mb-1'>
				{error && error.message}
			</span>

			<div className='relative rounded-2xl'>
				<label
					className='absolute left-1.5 -top-6 px-[5px] font-medium rounded-md'
					htmlFor={label || ''}
				>
					{label}
				</label>
				{register ? (
					<input
						className={`w-full placeholder:normal-case py-4 px-3 rounded-2xl border-2 border-gray-400 hover:border-black duration-200 outline-none focus:border-t-blue-light ${className}`}
						{...options}
						{...register(name, { valueAsNumber, pattern })}
					/>
				) : (
					<input
						className={`w-full placeholder:normal-case py-4 px-3 rounded-2xl border-2 border-gray-400 hover:border-black duration-200 outline-none focus:border-t-blue-light ${className}`}
						{...options}
					/>
				)}
			</div>
		</div>
	)
}

export default Input
