import { DynamicEnvironment } from './dynamic-environment';

class Environment extends DynamicEnvironment {
  production = true;

  constructor() {
    super();
  }

  public get apiBaseUrl() {
    return `${this.getEnvConfig().baseURL}/api/v1`;
  }
}

export const environment = new Environment();
