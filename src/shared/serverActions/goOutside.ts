export class GoOutside {
	static toUser(url: string) {
		window.location.href = `${process.env.NEXT_PUBLIC_APP_CLIENT_URL}/user${url}`
	}

	static toAdmin(url: string) {
		window.location.href = `${process.env.NEXT_PUBLIC_APP_CLIENT_URL}/admin${url}`
	}
}
