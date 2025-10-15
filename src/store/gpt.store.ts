import { create } from 'zustand'

interface IGPTState {
	isGPTAllowed: boolean
	setIsGPTAllowed: (isGPTAllowed: boolean) => void
	isGPTOpensImmediately: boolean
	setIsGPTOpensImmediately: (isGPTOpensImmediately: boolean) => void
}

const localStorageIsGPTAllowed = localStorage.getItem('isGPTAllowed')
const localStorageIsGPTOpensImmediately = localStorage.getItem(
	'isGPTOpensImmediately'
)

export const gptStore = create<IGPTState>()(set => ({
	isGPTAllowed: localStorageIsGPTAllowed
		? JSON.parse(localStorageIsGPTAllowed)
		: true,
	setIsGPTAllowed: isGPTAllowed =>
		set(() => {
			localStorage.setItem('isGPTAllowed', JSON.stringify(isGPTAllowed))
			return {
				isGPTAllowed,
			}
		}),
	isGPTOpensImmediately: localStorageIsGPTOpensImmediately
		? JSON.parse(localStorageIsGPTOpensImmediately)
		: true,
	setIsGPTOpensImmediately: isGPTOpensImmediately =>
		set(() => {
			localStorage.setItem(
				'isGPTOpensImmediately',
				JSON.stringify(isGPTOpensImmediately)
			)
			return {
				isGPTOpensImmediately,
			}
		}),
}))
