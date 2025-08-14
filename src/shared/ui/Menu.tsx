import {
	Dispatch,
	FC,
	HTMLAttributes,
	ReactNode,
	SetStateAction,
	useRef,
} from 'react'
import { MdExpandMore } from 'react-icons/md'

export interface IMenuProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	children?: ReactNode
	headerClassName?: string
	title?: string
	search?: string
	placeholder?: string
	setSearch?: Dispatch<SetStateAction<string>>
	disabled?: boolean
	smooth?: boolean
}

const Menu: FC<IMenuProps> = ({
	isOpen,
	setIsOpen,
	children,
	search,
	setSearch,
	placeholder,
	title,
	className,
	headerClassName,
	disabled = false,
	smooth = true,
	...rest
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div
			{...rest}
			className={`w-full ${
				disabled ? 'bg-gray-200' : 'bg-white'
			} rounded-2xl ${className}`}
		>
			<div
				onClick={() => {
					if (disabled || isOpen) return

					inputRef.current?.focus()
					setIsOpen(prev => !prev)
				}}
				className={`flex ${headerClassName || ''} ${
					!isOpen && 'cursor-pointer'
				} select-none justify-between w-full items-center min-h-[45px]`}
			>
				{(search || isOpen) && setSearch ? (
					<div className='flex w-full'>
						<input
							ref={inputRef}
							onChange={e => setSearch(e.target.value)}
							type='text'
							autoFocus
							className='outline-none w-full px-2 rounded-lg cursor-text'
							placeholder={placeholder}
							autoComplete='off'
						/>
					</div>
				) : (
					<div className='text-lg font-semibold pl-3 py-2'>{title}</div>
				)}
				<button
					onClick={e => {
						e.stopPropagation()

						if (disabled) return

						inputRef.current?.focus()
						setIsOpen(prev => !prev)
					}}
					className='flex items-center mr-3 py-2'
				>
					<div
						className={`text-xl ${
							isOpen ? 'rotate-180' : 'rotate-0'
						} duration-100`}
					>
						<MdExpandMore />
					</div>
				</button>
			</div>
			{smooth ? (
				<div
					className={`grid transition-all overflow-hidden ${
						isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
					}`}
				>
					<div className='min-h-0'>
						<hr />
						{children}
					</div>
				</div>
			) : (
				<>
					{isOpen && (
						<>
							<hr />
							{children}
						</>
					)}
				</>
			)}
		</div>
	)
}

export default Menu
