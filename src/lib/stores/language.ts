import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import { LANGUAGES, type Language } from './../types/Map'

const KEY = 'lang'

export const activeLanguage = writable<Language>('de')

if (browser) {
	const hasPersistedLanguage = localStorage.getItem(KEY)

	// if the user has previously selected a language, use it
	// otherwise, if the browser reports a supported language, use it
	if (hasPersistedLanguage) {
		activeLanguage.set(localStorage.getItem(KEY) as Language)
	} else {
		const navigatorLanguage = navigator.language.split('-')[0].toLowerCase() as Language
		if (LANGUAGES.includes(navigatorLanguage)) {
			activeLanguage.set(navigatorLanguage)
		}
	}

	// update the language in local storage when it changes
	activeLanguage.subscribe((language) => {
		localStorage.setItem(KEY, language)
	})
}
