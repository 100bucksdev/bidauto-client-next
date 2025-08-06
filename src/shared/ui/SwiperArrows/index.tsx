import { IcChevronLeft, IcChevronRight } from '@/shared/icons'
import { HTMLAttributes, MutableRefObject } from 'react'
import st from './swiper-arrows.module.css'

const SwiperArrows = ({
	prevButtonRef,
	nextButtonRef,
	className,
	...divProps
}: {
	prevButtonRef: MutableRefObject<null | HTMLButtonElement>
	nextButtonRef: MutableRefObject<null | HTMLButtonElement>
} & HTMLAttributes<HTMLButtonElement>) => {
	return (
		<div className={st.new_arrow_wraper}>
			<button
				{...divProps}
				className={`${st.new_arrow}  ${className || ''}`}
				ref={prevButtonRef}
			>
				<IcChevronLeft />
			</button>
			<button
				{...divProps}
				className={`${st.new_arrow} ${className || ''}`}
				ref={nextButtonRef}
			>
				<IcChevronRight />
			</button>
		</div>
	)
}

export default SwiperArrows
