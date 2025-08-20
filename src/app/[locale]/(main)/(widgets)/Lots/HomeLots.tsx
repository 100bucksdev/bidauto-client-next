'use client'

import CarCard from '@/components/CarCard/CarCard'
import { useCarousel } from '@/shared/hooks/useCarousel'
import SwiperArrows from '@/shared/ui/SwiperArrows'
import { TLot } from '@/types/Lot.interface'
import { useTranslations } from 'next-intl'
import { Fragment, useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CarCardMask from './HomeLotsMask'

const Lots = ({ data, title }: { data: TLot[]; title: string }) => {
	const { windowWidth, setIsHover, setSwiper } = useCarousel({
		scrollTimeMs: 3000,
		loop: true,
	})
	const prevButtonRef = useRef(null)
	const nextButtonRef = useRef(null)
	const t = useTranslations()

	return (
		<div>
			<div>
				<h2 className='text-4xl mb-3 font-bold max-lg:ml-20'>{title}</h2>
				<h3 className='text-xl font-medium mb-6 max-lg:ml-20'>
					{t('home.cars.lates')} {title} {t('home.cars.details')}
				</h3>
			</div>
			{!data ? (
				<div className='flex justify-center flex-wrap gap-10'>
					<CarCardMask />
					<CarCardMask />
					<CarCardMask />
					<CarCardMask />
					<CarCardMask />
				</div>
			) : (
				<>
					{windowWidth >= 1440 ? (
						<div className='flex justify-center items-start gap-10 relative'>
							<div className='absolute right-[45rem] -top-[10vh]'>
								<SwiperArrows
									prevButtonRef={prevButtonRef}
									nextButtonRef={nextButtonRef}
									onMouseEnter={() => setIsHover(true)}
									onMouseLeave={() => setIsHover(false)}
								/>
							</div>
							<Swiper
								modules={[A11y, Navigation]}
								slidesPerView={5}
								onSwiper={setSwiper}
								centeredSlides={true}
								spaceBetween={290}
								touchRatio={0}
								breakpoints={{
									1441: { slidesPerView: 7, spaceBetween: 270 },
									1024: {
										slidesPerView: 5,
									},
								}}
								navigation={{
									nextEl: nextButtonRef.current,
									prevEl: prevButtonRef.current,
								}}
								loop
							>
								{data.map((lot: TLot) => (
									<SwiperSlide
										onMouseEnter={() => setIsHover(true)}
										onMouseLeave={() => setIsHover(false)}
										key={lot.U_ID}
									>
										<CarCard lot={lot} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					) : (
						<div className='flex justify-center items-start flex-wrap gap-10'>
							{data.map((lot: TLot, index: number) => (
								<Fragment key={lot.U_ID}>
									{index <= 4 ? <CarCard lot={lot} /> : ''}
								</Fragment>
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Lots
