export interface IContent {
	points: Record<string, IPoint>
}

export interface IPoint {
	index: number // point index, not index in list
	type: string
	name: string
	person: string
	year: number
	location: string
	media: ITranslation
	description: ITranslation
}

export type Language = 'de' | 'tr' | 'en'

export type ITranslation = Record<Language, string>
