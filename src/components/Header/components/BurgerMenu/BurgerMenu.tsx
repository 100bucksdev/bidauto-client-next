import { IcSearch } from '@/shared/icons'
import Icon from '@/shared/icons/icon'

import { MMenuPopUpFromRight } from '@/assets/animation/PopUp.animation'
import { useClickAway } from '@/shared/hooks/useClickAway'
import { useLocationChanged } from '@/shared/hooks/useLocationChanged'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { HeaderData } from '../../data'
import SignUpButton from '../SignUpButton'
import SignInButton from '../SingInButton'
import BurgerMenuButton from './BurgerMenuButton'
import BurgerMenuLanguages from './BurgerMenuLanguages'
import BurgerProfileBar from './BurgerProfileBar'

const BurgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const path = useRouter()
	const t = useTranslations()
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	const menuRef = useRef<HTMLDivElement | null>(null)
	// const logout = useLogout();

	const [openShop, setOpenShop] = useState<boolean>(false)

	useClickAway({
		func: () => setIsOpen(false),
		refs: [
			buttonRef as React.RefObject<HTMLButtonElement>,
			menuRef as React.RefObject<HTMLElement>,
		],
	})
	useLocationChanged(() => setIsOpen(false))

	return (
		<div className='relative z-[99999]'>
			<BurgerMenuButton isOpen={isOpen} setIsOpen={setIsOpen} ref={buttonRef} />
			<AnimatePresence mode='wait'>
				{isOpen ? (
					<motion.nav
						initial='from'
						animate='to'
						exit='from'
						variants={MMenuPopUpFromRight}
						transition={{ type: 'keyframes', duration: 0.1 }}
						className='
              absolute text-black bg-t-header-bottom max-md:-right-4 -right-8
              h-screen w-[250px] !containerz-20 top-[50px]
            '
						ref={menuRef}
					>
						<div
							className='h-full overflow-y-auto pb-[70px] flex relative content-between w-full'
							style={{ flexFlow: 'row wrap' }}
						>
							<div className='w-full text-black'>
								{localStorage.getItem('access') ? <BurgerProfileBar /> : ''}
								<button
									onClick={() => path.push('/search/home')}
									className='flex items-center space-x-2 !text-black w-full p-[16px] !border-solid !border-b !border-b-t-header-bottom-border !z-10 bg-t-header-bottom text-[16px] w-full'
								>
									<div className='text-[20px]'>
										<IcSearch />
									</div>
									<div>{t('header.options.search')}</div>
								</button>
								{HeaderData.map((data, index) => (
									<>
										{data.path !== '' ? (
											<button
												key={index}
												onClick={() => path.push(data.path)}
												className='flex items-center space-x-2 !text-black w-full p-[16px] !border-solid !border-b !border-b-t-header-bottom-border !z-10 bg-t-header-bottom text-[16px] w-full'
											>
												<div className='text-[20px]'>
													<Icon name={data.iconKey} />
												</div>
												<div>{t(data.title)}</div>
											</button>
										) : null}
										{data.path === '' ? (
											<div className='relative'>
												<button
													key={index}
													onClick={() => setOpenShop(prev => !prev)}
													className='flex items-center space-x-2 !text-black w-full p-[16px] !border-solid !border-b !border-b-t-header-bottom-border !z-10 bg-t-header-bottom text-[16px] w-full'
												>
													<div className='text-[20px]'>
														<Icon name={data.iconKey} />
													</div>
													<div>{t(data.title)}</div>
												</button>
												<div
													className={`${
														openShop
															? 'grid-rows-[1fr] border-b border-gray-500'
															: 'grid-rows-[0fr]'
													} relative transition-all duration-150 overflow-hidden text-lg w-full grid`}
												>
													<div className='min-h-0 '>
														<div className='py-2'>
															{data.subElement?.map((subData, index2) => (
																<button
																	key={index2}
																	onClick={() => {
																		path.push(subData.path)
																		setOpenShop(false)
																	}}
																	className='text-[16px] !text-black flex items-center gap-[8px] px-[16px] pr-0 w-full py-[4px]'
																>
																	<div className='text-[20px]'>
																		<Icon name={subData.iconKey} />
																	</div>
																	<div>{t(subData.title)}</div>
																</button>
															))}
														</div>
													</div>
												</div>
											</div>
										) : null}
									</>
								))}
								{/* {HeaderData.map((data, index) => (
                  <button
                    key={index}
                    onClick={() => path(data.path)}
                    className="header-burger-option w-full"
                  >
                    <div className="text-[20px]">
                      <Icon name={data.iconKey} />
                    </div>
                    <div>{t(data.title)}</div>
                  </button>
                ))} */}
								<div className='w-full relative mt-3'>
									{localStorage.getItem('access') ? (
										<div>fff</div>
									) : (
										// <div className='flex justify-center items-center'>
										// 	<button
										// 		onClick={() => {
										// 			logout.mutateAsync()
										// 		}}
										// 		className='text-white text-[20px] bg-t-login-button-bg py-2 px-6 rounded-full'
										// 	>
										// 		{logout.isLoading ? <CircleLoader /> : 'Log Out'}
										// 	</button>
										// </div>
										<div className='flex flex-col items-center w-11/12 h-30 gap-2'>
											<SignInButton />
											<SignUpButton />
										</div>
									)}
									<div className='relative mt-3'>
										<BurgerMenuLanguages />
									</div>
								</div>
							</div>
						</div>
					</motion.nav>
				) : (
					''
				)}
			</AnimatePresence>
		</div>
	)
}

export default BurgerMenu
