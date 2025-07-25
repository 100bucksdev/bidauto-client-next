import { IconsProps } from '.'
import { iconMap, TIcon } from './data'

interface Props extends IconsProps {
	name: TIcon
}

const Icon = ({ name, ...props }: Props) => {
	const IconComponent: React.ElementType = iconMap[name] || (
		<div className='w-6 h-6 bg-gray-300' />
	)
	return <IconComponent {...props} />
}

export default Icon
