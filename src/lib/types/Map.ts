type PointKey = `${number}`

export interface IContent {
	points: Record<PointKey, IPoint>
}

export interface IPoint {
	index: string // point index, not index in list
	type: string | ITranslation
	name: string
	person: string
	year: string | null
	location: string | ITranslation
	media: ITranslation
	description: ITranslation
}

export type Language = 'de' | 'tr' | 'en'

export const LANGUAGES: Language[] = ['de', 'tr', 'en']

export type ITranslation = Record<Language, string>
