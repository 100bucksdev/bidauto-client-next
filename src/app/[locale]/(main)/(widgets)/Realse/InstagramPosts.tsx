'use client'

import { useCarousel } from '@/shared/hooks/useCarousel'
import SwiperArrows from '@/shared/ui/SwiperArrows'
import { IInstagramPost } from '@/types/InstagramPost.interface'
import { useTranslations } from 'next-intl'
import { Fragment, useRef } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import VideoPost from './InstagramCard'

const InstagramPosts = ({ data }: { data: IInstagramPost[] }) => {
	const t = useTranslations()
	const { windowWidth, setSwiper, setIsHover } = useCarousel({
		loop: false,
		scrollTimeMs: 5000,
	})
	const prevButtonRef = useRef(null)
	const nextButtonRef = useRef(null)

	console.log('InstagramPosts data:', data)

	return (
		<div>
			{data ? (
				<>
					<div>
						<h2 className='text-5xl max-sm:text-3xl max-sm:w-[120vw] max-lg:text-4xl mb-2 font-bold'>
							{t('home.instagram.header')}
						</h2>
						<h3 className='text-xl font-medium ml-1 mb-8 max-sm:text-base'>
							{t('home.instagram.subHeader')}
						</h3>
					</div>
					{windowWidth < 1024 ? (
						<div className='flex flex-col gap-y-3'>
							{data.map((post: IInstagramPost, index: number) => (
								<>
									{index <= 2 && post.url && post.videoUrl ? (
										<div key={index} className='!max-w-[250vw] relative'>
											<VideoPost post={post} />
											{/* <InstagramEmbed url={post.url} width={320} /> */}
										</div>
									) : (
										''
									)}
								</>
							))}
						</div>
					) : windowWidth >= 1440 ? (
						<div
							className={` flex flex-wrap items-start mb-5 w-full overflow-hidden`}
						>
							<div className='absolute right-[27rem] bottom-[-13vh]'>
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
								touchRatio={0}
								breakpoints={{
									1441: { slidesPerView: 5, spaceBetween: 200 },
									1024: {
										slidesPerView: 4,
										spaceBetween: 200,
									},
								}}
								navigation={{
									nextEl: nextButtonRef.current,
									prevEl: prevButtonRef.current,
								}}
								slidesOffsetBefore={0}
								spaceBetween={200}
							>
								{data.map(
									(post: IInstagramPost) =>
										!!post.url &&
										post.videoUrl && (
											<SwiperSlide key={post.id}>
												<div className='w-auto rounded-2xl'>
													<VideoPost post={post} />
													{/* <InstagramEmbed
															// onMouseEnter={() => setIsHover(true)}
															// onMouseLeave={() => setIsHover(false)}
															url={post.url}
															key={post.id}
															width={340}
														/> */}
												</div>
											</SwiperSlide>
										)
								)}
							</Swiper>
						</div>
					) : (
						<div className='flex justify-center items-start flex-wrap gap-10'>
							{data.map((post: IInstagramPost) => (
								<Fragment key={post.id}>
									<VideoPost post={post} />
								</Fragment>
							))}
						</div>
					)}
				</>
			) : (
				''
			)}
		</div>
	)
}

export default InstagramPosts
