import { IModule, IOptions } from '../index';
import { AuthApiKey } from './auth-api-key';

export declare const AuthApiKeyModule: {(options: IOptions): IModule};

export declare const options: IOptions;
export const moduleExports: IModule = new AuthApiKey(options);