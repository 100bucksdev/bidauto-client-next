'use client'

import { MMenuPopUpFromBottom } from '@/assets/animation/PopUp.animation'
import logo from '@/assets/images/main-logo.svg'
import { $Pages } from '@/config/router.config'
import { IcMail, IcPhone, IcSearch } from '@/shared/icons'
import Icon from '@/shared/icons/icon'
import Modal from '@/shared/ui/Modal'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { MdExpandMore } from 'react-icons/md'
import { RiFacebookCircleLine } from 'react-icons/ri'
import ProfileBar from './ProfileBar'
import BurgerMenu from './components/BurgerMenu/BurgerMenu'
import ChangeLanguage from './components/ChangeLanguage'
import SignUpButton from './components/SignUpButton'
import SignInButton from './components/SingInButton'
import { HeaderData } from './data'

const Header = () => {
	const t = useTranslations()

	//todo: change to server request
	const isLogin = false

	const path = useRouter()

	const [isVisible, setIsVisible] = useState(false)
	// const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
		null
	)
	const [isMessageExpanded, setIsMessageExpanded] = useState(false)
	const [messageNeedsExpansion, setMessageNeedsExpansion] = useState(false)
	const messageTextRef = useRef<HTMLAnchorElement | null>(null)

	// const { data } = useGetAppState()
	const dropdownRefs = useRef<Array<HTMLDivElement | null>>([])
	const currentLocale = useLocale()

	const getLanguageName = (value: string) => {
		switch (value) {
			case 'en':
				return 'English'
			case 'lt':
				return 'Lietuvių'
			default:
				return 'English'
		}
	}

	// Закрытие выпадающих меню при клике вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				openDropdownIndex !== null &&
				dropdownRefs.current[openDropdownIndex] &&
				!dropdownRefs.current[openDropdownIndex]?.contains(event.target as Node)
			) {
				setOpenDropdownIndex(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [openDropdownIndex])

	// useEffect(() => {
	// 	if (messageTextRef.current && data?.data?.important_message) {
	// 		const element = messageTextRef.current
	// 		setMessageNeedsExpansion(element.scrollWidth > element.clientWidth)
	// 	}
	// }, [data?.data?.important_message])

	return (
		<>
			<header className='!sticky !top-0 !block z-50'>
				<div className='flex justify-between px-[40px] py-[2px] !text-[16px] bg-t-header-top text-t-text-primary items-center max-lg:hidden'>
					<div className='flex gap-x-4 text-sm font-light'>
						<div className='flex items-center content-center gap-1.5'>
							<IcMail />
							<div>logisticstauto@gmail.com</div>
						</div>
						<div className='flex items-center gap-x-2'>
							<IcPhone width='20' height='20' />
							<div>{'+1 (954) 703-4009'}</div>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='mr-4 flex items-center gap-x-1'>
							<a
								target='_blank'
								href='https://www.facebook.com/autoimportLT?mibextid=uzlsIk'
								className='rounded-full text-t-text-primary hover:bg-blue-500 hover:bg-opacity-60 opacity-75 cursor-pointer flex items-center justify-center p-[3px]'
							>
								<RiFacebookCircleLine />
							</a>
							<a
								target='_blank'
								href='https://www.instagram.com/t_autologistics?igsh=OWlzcHh0bjkwOWEy'
								className='rounded-full text-t-text-primary hover:bg-blue-500 hover:bg-opacity-60 opacity-75 cursor-pointer p-[3px]'
							>
								<FaInstagram />
							</a>
						</div>
						<button
							className='!text-t-text-primary gap-0.5 flex items-center'
							onClick={() => setIsVisible(true)}
						>
							{getLanguageName(currentLocale)}
							<div
								className={`text-2xl ${
									isVisible ? '-rotate-90' : ''
								} duration-150`}
							>
								<MdExpandMore />
							</div>
						</button>
					</div>
				</div>

				<div className='flex justify-between 3xl:px-72 2xl:px-72 lg:px-20 max-lg:px-5 h-[70px] items-center max-md:px-[16px] !border-b-2 !border-b-t-header-bottom-border z-10 relative !border-solid'>
					<div className='flex h-[100%] select-none'>
						<Link href={$Pages.HOME}>
							<Image
								draggable={false}
								className='3xl:w-[100px] lg:w-[70px] h-[100%] object-cover max-md:hidden max-lg:w-[15vw] max-xl:w-[300px]'
								src={logo}
								alt=''
							/>
							<Image
								draggable={false}
								className='w-[80px] h-[100%] object-cover md:hidden'
								src={logo}
								alt=''
							/>
						</Link>
					</div>
					<div className='flex 3xl:mx-auto lg:mx-auto items-center h-[100%] max-xl:text-[14px] max-lg:hidden 2xl:mx-auto'>
						{HeaderData.map((data, index) => (
							<div
								key={index}
								className='relative h-full'
								ref={el => {
									dropdownRefs.current[index] = el
								}}
							>
								{data.path ? (
									<button
										onClick={() => path.push(data.path)}
										className='cursor-pointer flex items-center max-hd:!text-[14px] !text-[16px] h-[100%] px-[16px] transition duration-200 gap-2 max-xl:gap-1 max-xl:px-[8px] hover:!bg-t-header-top hover:text-t-header-bottom;'
									>
										<div className='text-xl'>
											<Icon name={data.iconKey} />
										</div>
										<div>{t(data.title)}</div>
									</button>
								) : (
									<>
										<button
											onClick={() =>
												setOpenDropdownIndex(prev =>
													prev === index ? null : index
												)
											}
											className='cursor-pointer flex items-center max-hd:!text-[14px] !text-[16px] h-[100%] px-[16px] transition duration-200 gap-2 max-xl:gap-1 max-xl:px-[8px] hover:!bg-t-header-top hover:text-t-header-bottom;'
										>
											<div className='text-xl'>
												<Icon name={data.iconKey} />
											</div>
											<div>{t(data.title)}</div>
										</button>
										<AnimatePresence mode='wait'>
											{openDropdownIndex === index && (
												<motion.div
													initial='from'
													animate='to'
													exit='from'
													variants={MMenuPopUpFromBottom}
													transition={{ duration: 0.05, type: 'keyframes' }}
													className='absolute text-black select-none w-56 top-[68px] bg-white !border-solid !border-[2px] !border-t-header-bottom-border rounded-b-md text-lg shadow-2xl'
												>
													{data.subElement?.map((subData, index2) => (
														<button
															key={index2}
															onClick={() => {
																path.push(subData.path)
																setOpenDropdownIndex(null)
															}}
															className='cursor-pointer flex items-center max-hd:!text-[14px] !text-[16px] h-[100%] px-[16px] transition duration-200 gap-2 max-xl:gap-1 max-xl:px-[8px] hover:!bg-t-header-top hover:text-t-header-bottom; w-full py-3'
														>
															<div className='text-xl'>
																<Icon name={subData.iconKey} />
															</div>
															<div>{t(subData.title)}</div>
														</button>
													))}
												</motion.div>
											)}
										</AnimatePresence>
									</>
								)}
							</div>
						))}
					</div>
					<div className='flex items-center max-lg:hidden h-full'>
						{isLogin ? (
							<ProfileBar />
						) : (
							<div className='flex gap-3'>
								<SignUpButton />
								<SignInButton />
							</div>
						)}
						<button
							onClick={() => path.push('/search/home')}
							className='cursor-pointer ml-4'
						>
							<div className='text-xl'>
								<IcSearch />
							</div>
						</button>
					</div>
					<div className='lg:hidden'>
						<BurgerMenu />
					</div>
				</div>

				{/* {data && data.data.important_message_active && (
					<div className='flex justify-between 3xl:px-72 2xl:px-36 lg:px-20 max-lg:px-5 bg-t-blue-light min-h-[20px] items-center max-md:px-[16px] relative !border-solid py-1'>
						<div className='flex items-center gap-3 text-white w-full'>
							<div className='max-sm:text-xl max-lg:text-2xl lg:text-xl flex-shrink-0'>
								<HiMiniBellAlert />
							</div>

							<div className='flex min-w-0 items-center gap-1'>
								<a
									href={data.data.important_message_link}
									className={`hover:underline block ${
										isMessageExpanded ? 'whitespace-normal' : 'truncate'
									}`}
									ref={messageTextRef}
								>
									{data.data.important_message}
								</a>
								{data.data.important_message_link && (
									<span className='opacity-85 ml-1'>
										({t('alert.clickable')})
									</span>
								)}
							</div>

							{messageNeedsExpansion && (
								<button
									onClick={() => setIsMessageExpanded(!isMessageExpanded)}
									className='flex-shrink-0 ml-2 p-1 hover:bg-white/20 rounded transition-colors duration-200 text-sm'
									aria-label={
										isMessageExpanded ? 'Collapse message' : 'Expand message'
									}
								>
									{isMessageExpanded ? <FaChevronUp /> : <FaChevronDown />}
								</button>
							)}
						</div>
					</div>
				)}*/}
			</header>

			<Modal centerChildren isVisible={isVisible} setIsVisible={setIsVisible}>
				<ChangeLanguage setIsVisible={setIsVisible} />
			</Modal>
		</>
	)
}

export default Header
