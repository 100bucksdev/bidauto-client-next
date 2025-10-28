'use client'

import { useCarousel } from '@/shared/hooks/useCarousel'
import { useTranslations } from 'next-intl'
import { Fragment } from 'react'
import { youTubeVideoData } from './data'
import YouTUbeVideoPost from './YouTubeVideo'

const YouTubePosts = () => {
	const t = useTranslations()
	const { windowWidth } = useCarousel({
		loop: false,
		scrollTimeMs: 5000,
	})

	return (
		<div>
			<div>
				<h2 className='text-5xl max-sm:text-3xl max-sm:w-[120vw] max-lg:text-4xl mb-2 font-bold text-wrap'>
					{t('home.youtube.header')}
				</h2>
				<h3 className='text-xl font-medium ml-1 mb-8 max-sm:text-base text-wrap'>
					{t('home.youtube.subHeader')}
				</h3>
			</div>
			{windowWidth < 1024 ? (
				<div className='flex flex-col gap-y-3 items-center'>
					{youTubeVideoData.map((post, index: number) => (
						<>
							{index <= 2 && post.videoUrl ? (
								<div key={index} className='relative'>
									<YouTUbeVideoPost videoUrl={post.videoUrl} />
									{/* <InstagramEmbed url={post.url} width={320} /> */}
								</div>
							) : (
								''
							)}
						</>
					))}
				</div>
			) : (
				<div className='flex items-start flex-wrap gap-[11rem]'>
					{youTubeVideoData.map(post => (
						<Fragment key={post.id}>
							<YouTUbeVideoPost videoUrl={post.videoUrl} />
						</Fragment>
					))}
				</div>
			)}
		</div>
	)
}

export default YouTubePosts

// : windowWidth >= 1440 ? (
// 				<div
// 					className={` flex flex-wrap items-start mb-5 w-full overflow-hidden`}
// 				>
// 					<div className='absolute right-[21vw] -bottom-[17vh]'>
// 						<NewSwiperArrows
// 							prevButtonRef={prevButtonRef}
// 							nextButtonRef={nextButtonRef}
// 							onMouseEnter={() => setIsHover(true)}
// 							onMouseLeave={() => setIsHover(false)}
// 						/>
// 					</div>
// 					<Swiper
// 						modules={[A11y, Navigation]}
// 						slidesPerView={5}
// 						onSwiper={setSwiper}
// 						touchRatio={0}
// 						breakpoints={{
// 							1441: { slidesPerView: 5, spaceBetween: 200 },
// 							1024: {
// 								slidesPerView: 4,
// 								spaceBetween: 200,
// 							},
// 						}}
// 						navigation={{
// 							nextEl: nextButtonRef.current,
// 							prevEl: prevButtonRef.current,
// 						}}
// 						slidesOffsetBefore={0}
// 						spaceBetween={200}
// 					>
// 						{youTubeVideoData.map(
// 							post =>
// 								post.videoUrl && (
// 									<SwiperSlide key={post.id}>
// 										<div className='w-auto rounded-2xl'>
// 											<YouTUbeVideoPost videoUrl={post.videoUrl} />
// 											{/* <InstagramEmbed
// 														// onMouseEnter={() => setIsHover(true)}
// 														// onMouseLeave={() => setIsHover(false)}
// 														url={post.url}
// 														key={post.id}
// 														width={340}
// 													/> */}
// 										</div>
// 									</SwiperSlide>
// 								)
// 						)}
// 					</Swiper>
// 				</div>
// 			) :
