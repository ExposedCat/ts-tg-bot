import dotenv from 'dotenv'
import { resolvePath } from './resolve-path.js'

export function loadEnv(configName = '.env') {
	const fullPath = resolvePath(import.meta.url, `../../${configName}`)
	dotenv.config({
		path: fullPath
	})
}
