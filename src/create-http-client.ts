import path from 'path';
import fs from 'fs';
import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

// @ts-ignore
import cert from './cacert.pem';

// @ts-ignore
import { version } from '../package.json';

export interface MollieRequestConfig extends AxiosRequestConfig {
  apiKey: string;
}
declare let window: any;

/**
 * Create pre-configured httpClient instance
 *
 * @private
 */
export default function createHttpClient(options: MollieRequestConfig): AxiosInstance {
  options.baseURL = 'https://api.mollie.com:443/v2/';

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${options.apiKey}`,
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
    'User-Agent': `node.js/${process.version}`,
    'X-Mollie-User-Agent': `mollie/${version}`,
  };

  // Setting the root CA certificate will fail in a browser environment
  if (typeof window !== 'undefined') {
    options.httpsAgent = new https.Agent({
      cert: fs.readFileSync(path.resolve(__dirname, cert), 'utf8'),
    });
  }

  options.paramsSerializer = options.paramsSerializer || qs.stringify;

  return axios.create(options);
}