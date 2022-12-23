import type { PageServerData } from './$types';
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export const load = (() => {
	const filePath = path.resolve('./data/content.yml')
	return yaml.load(fs.readFileSync(filePath).toString())
}) satisfies PageServerData