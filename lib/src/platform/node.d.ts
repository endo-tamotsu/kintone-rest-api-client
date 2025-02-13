/// <reference types="node" />
/// <reference types="node" />
import https from "https";
type ClientCertAuth = {
    pfx: Buffer;
    password: string;
} | {
    pfxFilePath: string;
    password: string;
};
export declare const readFileFromPath: (filePath: string) => Promise<{
    data: Buffer;
    name: string;
}>;
export declare const getRequestToken: () => never;
export declare const getDefaultAuth: () => never;
export declare const buildPlatformDependentConfig: ({ httpsAgent, clientCertAuth, socketTimeout, }: {
    httpsAgent?: https.Agent | undefined;
    clientCertAuth?: ClientCertAuth | undefined;
    socketTimeout?: number | undefined;
}) => {
    timeout: number;
    httpsAgent: https.Agent;
} | {
    timeout?: undefined;
    httpsAgent: https.Agent;
} | {
    timeout: number;
    httpsAgent?: undefined;
} | {
    timeout?: undefined;
    httpsAgent?: undefined;
};
export declare const buildHeaders: (params: {
    userAgent?: string | undefined;
}) => {
    "User-Agent": string;
};
export declare const buildFormDataValue: (data: unknown) => unknown;
export declare const buildBaseUrl: (baseUrl: string | undefined) => string;
export declare const getVersion: () => any;
export {};
