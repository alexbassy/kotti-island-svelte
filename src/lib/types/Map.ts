type PointKey = `${number}`

export interface IContent {
	points: Record<PointKey, IPoint>
}

export interface IPoint {
	index: string // point index, not index in list
	type: string
	name: string
	person: string
	year: number
	location: string | ITranslation
	media: ITranslation
	description: ITranslation
}

export type Language = 'de' | 'tr' | 'en'

export type ITranslation = Record<Language, string>
