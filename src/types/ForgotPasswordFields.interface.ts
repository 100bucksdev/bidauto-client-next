export interface IForgotPasswordFields {
	email: string
}

export interface IForgotPasswordNewPassFields {
	code: string
	new_password: string
	confirm_password: string
}
