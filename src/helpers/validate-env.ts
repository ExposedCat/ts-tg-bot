export function validateEnv(requiredEnvs: string[]) {
	// NOTE(DP): in general, it is OK to use validation like this since envvars are trivial at the moment
	//           but for more complex things, it may be better to use something like https://www.npmjs.com/package/joi
	for (const env of requiredEnvs) {
		if (process.env[env] === undefined) {
			throw `ERROR: Required variable "${env}" is  not specified`
		}
	}
}
