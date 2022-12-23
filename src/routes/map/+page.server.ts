import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

/** @type {import('./$types').PageLoad} */
export function load() {
	const filePath = path.resolve('src/lib/data/content.yml')
	return yaml.load(fs.readFileSync(filePath).toString())
}
