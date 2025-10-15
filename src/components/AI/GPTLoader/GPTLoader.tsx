const GPTLoader = () => {
	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			<div
				className="relative w-[13.6px] h-8 bg-white animate-loading-keys-app-loading delay-[160ms]
        before:absolute before:top-0 before:left-[-19.992px] before:w-[13.6px] before:h-8 before:bg-white before:content-[''] before:animate-loading-keys-app-loading
        after:absolute after:top-0 after:left-[19.992px] after:w-[13.6px] after:h-8 after:bg-white after:content-[''] after:animate-loading-keys-app-loading after:[animation-delay:320ms]"
			></div>
		</div>
	)
}

export default GPTLoader
