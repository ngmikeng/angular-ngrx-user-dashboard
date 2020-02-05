import { IEnvConfig } from '../app/shared/models/app-env.model';

declare var window: any;

export class DynamicEnvironment {
	constructor() {
	}

	getEnvConfig(): IEnvConfig {
		if (window && window.envConfig) {
			return window.envConfig;
		}
		return {
			baseURL: 'http://localhost'
		};
	}
}
