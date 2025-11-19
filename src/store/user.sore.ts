import { IUserInRegistration } from '@/types/User.interface'
import { create } from 'zustand'

interface IUserSotre {
	user: IUserInRegistration
	setUser: (user: IUserInRegistration) => void
}

export const userStore = create<IUserSotre>()(set => ({
	user: {} as IUserInRegistration,

	setUser(user: IUserInRegistration) {
		set(() => ({
			user,
		}))
	},
}))
