import HelpSideBar from './(widgets)/HelpSideBar'

export default async function HeplLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<section className='flex h-screen w-full mt-14 gap-5'>
			<aside className='w-[25%] max-lg:w-full'>
				<HelpSideBar />
			</aside>
			<main className='w-[75%]'>{children}</main>
		</section>
	)
}
