export interface GPTMessage {
	from: 'gpt' | 'user' | 'ai' | 'operator'
	status: 'pending' | 'success' | 'error'
	message: string
	type: 'message' | 'info'
	info?: 'show_button_for_lot' | 'operator_called' | 'ended' | 'accepted'
	lot_id?: string
	auction?: 'iaai' | 'copart'
}
