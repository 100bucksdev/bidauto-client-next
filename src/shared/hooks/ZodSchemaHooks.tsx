import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES } from '../constants/constants'

export function useRegisterSchema() {
	const isDev = process.env.NODE_ENV === 'development'
	const t = useTranslations()

	let schema = z.object({
		first_name: z
			.string()
			.min(3, t('validation.shortFirstName'))
			.max(35, t('validation.longFirstName')),
		last_name: z
			.string()
			.min(3, t('validation.shortLastName'))
			.max(35, t('validation.longLastName')),
		email: z.string().email(t('validation.invalidEmail')),
		phone_number: z
			.string()
			.nonempty({ message: t('validation.requiredError') })
			.min(6, { message: 'Ensure this field has at least 6 characters.' }),
		password: z
			.string()
			.min(8, t('validation.shortPass'))
			.max(30, t('validation.longPass')),
		country: z.string().nullable().optional(),
		terms: z.boolean().refine(val => val === true, {
			message: 'You must agree with terms of use',
		}),
		captcha: z.string().min(1, 'Captcha is required'),
	})

	if (!isDev) {
		schema = schema.extend({
			captcha: z.string().min(1, 'Captcha is required'),
		})
	}

	return schema
}

export function useLoginSchema() {
	const isDev = process.env.NODE_ENV === 'development'
	const t = useTranslations()

	let schema = z.object({
		email: z.string().email(t('validation.invalidEmail')),
		password: z
			.string()
			.min(8, t('validation.shortPass'))
			.max(30, t('validation.longPass')),
		captcha: isDev
			? z.string().optional() // not required in dev
			: z.string().min(1, 'Captcha is required'),
	})

	// if (!isDev) {
	// 	schema = schema.extend({
	// 		captcha: z.string().min(1, 'Captcha is required'),
	// 	})
	// }

	return schema
}

export function useCodeSchema() {
	const t = useTranslations()

	return z.object({
		code: z
			.string()
			.min(3, t('validation.shortCode'))
			.max(8, t('validation.longCode')),
	})
}

export function useForgotPasswordSchema() {
	const isDev = process.env.NODE_ENV === 'development'
	const t = useTranslations()

	let schema = z.object({
		email: z.string().email(t('validation.invalidEmail')),
		new_password: z
			.string()
			.min(8, t('validation.shortPass'))
			.max(30, t('validation.longPass')),
		captcha: z.string().min(1, 'Captcha is required'),
	})

	if (!isDev) {
		schema = schema.extend({
			captcha: z.string().min(1, 'Captcha is required'),
		})
	}

	return schema
}

export function useTermsSchema() {
	const t = useTranslations()

	const schema = z.object({
		terms: z.boolean().refine(val => val === true, {
			message: 'You must agree with terms of use',
		}),
	})

	return schema
}

export function useAdminBidSchema() {
	const schema = z.object({
		final_bid: z.string(),
	})

	return schema
}

export function useAdminStaffSchema() {
	const schema = z.object({
		email: z.string().nonempty('Please enter an email').email(),
	})

	return schema
}

export function useAdminSendEmailSchema() {
	const schema = z.object({
		user_id: z.number(),
		subject: z.string().min(5),
		message: z.string().min(10),
	})

	return schema
}

export function useAdminSendSmsSchema() {
	const schema = z.object({
		user_id: z.number(),
		message: z.string().min(10),
	})

	return schema
}
export function useAdminSendEmailEverybodySchema() {
	const schema = z.object({
		subject: z.string().min(5),
		message: z.string().min(10),
	})

	return schema
}

export function useAdminSendSmsEverybodySchema() {
	const schema = z.object({
		message: z.string().min(10),
	})

	return schema
}

export function useAdminCreateContainerSchema() {
	const schema = z.object({
		destination: z.string().min(2).max(50),
		ship_line: z.string().min(5).max(200),
		vessel: z.string().max(50),
		container_key: z.string().min(2).max(50),
	})

	return schema
}

export function useAdminCreateUserSchema() {
	const t = useTranslations()

	const schema = z.object({
		first_name: z
			.string()
			.min(3, t('validation.shortFirstName'))
			.max(35, t('validation.longFirstName')),
		last_name: z
			.string()
			.min(3, t('validation.shortLastName'))
			.max(35, t('validation.longLastName')),
		email: z.string().email(t('validation.invalidEmail')),
		phone_number: z
			.string()
			.nonempty({ message: t('validation.requiredError') })
			.min(6, { message: 'Ensure this field has at least 6 characters.' }),
		password: z
			.string()
			.min(8, t('validation.shortPass'))
			.max(30, t('validation.longPass')),
		country: z.string().min(2).max(2),
		delivery_info: z
			.object({
				country: z.string().optional(),
				zip_code: z.string().optional(),
				city: z.string().optional(),
				state: z.string().optional(),
				address: z.string().optional(),
			})
			.optional(),
	})

	return schema
}

export function useAdminCreateOrderSchema() {
	const schema = z.object({
		auction_name: z.string().max(20).optional(),
		auction_city: z
			.object({
				id: z.number().optional(),
				location: z.string().optional(),
				auction: z.string().optional(),
				city: z.string().optional(),
				state: z.string().optional(),
				postal_code: z.string().optional(),
				savannah: z.number().optional(),
				houston: z.number().optional(),
				miami: z.number().optional(),
				chicago: z.number().optional(),
				nj: z.number().optional(),
			})
			.optional(),
		terminal: z.string().max(20).optional(),
		lot_id: z.string().optional(),
		from_dealer: z.boolean().optional(),
		vehicle_type: z.string().optional(),
		car_value: z.string().optional(),
		extra_fee: z
			.array(
				z
					.object({
						name: z.string().optional(),
						amount: z.number().or(z.string()).optional(),
					})
					.optional()
			)
			.optional(),
		vin: z.string().optional(),
		vehicle_name: z.string().optional(),
		keys: z.boolean().optional(),
		damage: z.boolean().optional(),
		color: z.string().optional(),
		created_at: z.string().optional(),
		container: z
			.object({
				container_key: z.string().optional(),
				id: z.number().optional(),
			})
			.nullable()
			.optional(),
		user: z
			.object({
				id: z.number().optional(),
				first_name: z.string().optional(),
				last_name: z.string().optional(),
			})
			.optional(),
		auction_image: z
			.array(
				z.any().refine(files => {
					return ACCEPTED_IMAGE_TYPES.includes(files?.type)
				}, 'Only .jpg, .jpeg, .png and .webp formats are supported.')
			)
			.optional(),
		depth_video_url: z.any().optional(),
		fee_type: z.string(),
	})

	return schema
}

export function useAppealCreateMessageSchema() {
	const schema = z.object({
		message: z.string().optional(),
		images: z
			.array(
				z.any().refine(file => {
					return ACCEPTED_IMAGE_TYPES.includes(file?.type)
				}, 'Only .jpg, .jpeg, .png and .webp formats are supported.')
			)
			.max(10, 'You can upload a maximum of 10 images.')
			.optional(),
	})

	return schema
}
