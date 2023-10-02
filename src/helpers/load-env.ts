import dotenv from 'dotenv'
import { resolvePath } from './resolve-path.js'

export function loadEnv(configName = '.env') {
	// NOTE(DP): things will be broken when config file or this file will be moved
	//           hardcoded relative paths are evil
	const fullPath = resolvePath(import.meta.url, `../../${configName}`)
	dotenv.config({
		path: fullPath
	})
}
