export function useCopy() {
	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => console.log('Text copied to clipboard.'))
			.catch(err => console.error('Ошибка копирования: ', err))
	}

	return copyToClipboard
}
