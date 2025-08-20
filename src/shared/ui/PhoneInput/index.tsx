import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import ReactPhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'
import './phone-input.css'

interface PhoneInputProps {
	control: Control<any, any>
	country?: string
	error?: FieldError
	name?: string
}

const PhoneInput: FC<PhoneInputProps> = ({
	error,
	control,
	country,
	name = 'phone_number',
}) => {
	const t = useTranslations()

	return (
		<>
			<span className='text-t-text-error flex justify-end h-[24px]'>
				{error?.message}
			</span>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<ReactPhoneInput
						{...field}
						value={field.value}
						onChange={value => field.onChange(value)}
						onBlur={field.onBlur}
						inputStyle={{
							width: '100%',
							fontSize: '1rem',
							lineHeight: '1.5rem',
							textTransform: 'none',
							borderRadius: '1rem',
							borderWidth: '2px',
							borderColor: '#9CA3AF',
							outline: 'none',
						}}
						specialLabel={`${t('auth.phone')}*`}
						countryCodeEditable={true}
						autocompleteSearch={true}
						localization={es}
						country={country?.toLowerCase()}
						inputClass='form-control'
					/>
				)}
			/>
		</>
	)
}

export default PhoneInput
