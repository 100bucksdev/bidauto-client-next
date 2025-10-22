'use client'

import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiYoutube } from 'react-icons/fi'
import { IoMdMail } from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { RiFacebookCircleLine } from 'react-icons/ri'

const icons: Record<string, IconType> = {
	facebook: RiFacebookCircleLine,
	instagram: FaInstagram,
	whatsapp: FaWhatsapp,
	youtube: FiYoutube,
	email: IoMdMail,
}

const links: Record<string, string> = {
	facebook: 'https://www.facebook.com/autoimportLT?mibextid=uzlsIk',
	instagram: 'https://www.instagram.com/t_autologistics?igsh=OWlzcHh0bjkwOWEy',
	youtube: 'https://www.youtube.com/@MR-T_LT',
	whatsapp: '',
	email: '',
}

const colors: Record<string, string> = {
	facebook: 'text-blue-600',
	instagram: 'text-pink-600',
	whatsapp: 'text-green-500',
	youtube: 'text-red-600',
	email: 'text-red-600',
}

export default function ContactCard({
	messenger,
	title,
	className,
}: {
	messenger: 'facebook' | 'instagram' | 'whatsapp' | 'youtube' | 'email'
	title: string
	className?: string
}) {
	const Icon = icons[messenger]
	const color = colors[messenger]
	const href = links[messenger]

	const Wrapper: React.ElementType = href ? 'a' : 'div'

	return (
		<Wrapper
			{...(href ? { href, target: '_blank' } : {})}
			className={`bg-white rounded-2xl min-w-[300px] flex flex-col py-6 ${
				className || ''
			}`}
		>
			<div className={`flex justify-center text-9xl px-14 ${color}`}>
				<Icon />
			</div>
			<div className='px-14 text-3xl text-center font-semibold break-words'>
				<span>{title}</span>
			</div>
		</Wrapper>
	)
}
