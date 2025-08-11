export type TStatisticReportsTimeRange = 'month' | 'week'

export interface IStatisticReports {
	id: number
	time_range: TStatisticReportsTimeRange
	start_date: Date
	end_date: Date
	report_markdown_text: string
	created_at: Date
}

export interface IStatisticReportsResponse {
	pagination: {
		size: number
		page: number
		pages: number
		count: number
	}
	data: IStatisticReports[]
}
