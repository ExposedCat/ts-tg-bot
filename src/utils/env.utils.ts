import dotenv from "dotenv";
import pathModule from "node:path";
import { fileURLToPath } from "node:url";

export function resolvePath(localPath: string, targetPath: string) {
	const __filename = fileURLToPath(localPath);
	const __dirname = pathModule.dirname(__filename);
	return pathModule.join(__dirname, targetPath);
}

export function loadEnv(configPath = ".env") {
	const fullPath = resolvePath(import.meta.url, configPath);
	dotenv.config({
		path: fullPath,
	});
}

export function validateEnv(requiredEnvs: string[]) {
	for (const env of requiredEnvs) {
		if (process.env[env] === undefined) {
			throw new Error(`ERROR: Required variable "${env}" is  not specified`);
		}
	}
}
