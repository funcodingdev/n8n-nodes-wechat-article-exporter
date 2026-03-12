import type {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

type WechatRequestContext =
	| IHookFunctions
	| IExecuteFunctions
	| IExecuteSingleFunctions
	| ILoadOptionsFunctions;

interface WechatCredentials {
	apiKey: string;
	baseUrl: string;
}

function normalizeEndpoint(endpoint: string): string {
	if (!endpoint.startsWith('/')) {
		return `/${endpoint}`;
	}
	return endpoint;
}

export async function wechatApiRequest(
	this: WechatRequestContext,
	method: IHttpRequestMethods,
	endpoint: string,
	qs: IDataObject = {},
	body?: IDataObject,
	requireAuth: boolean = true,
): Promise<IDataObject> {
	const credentials = (await this.getCredentials('wechatArticleExporterApi')) as unknown as WechatCredentials;
	const baseUrl = credentials.baseUrl || 'https://down.mptext.top';
	const url = `${baseUrl}${normalizeEndpoint(endpoint)}`;

	const headers: IDataObject = {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
	};

	// Add auth header if required
	if (requireAuth && credentials.apiKey) {
		headers['X-Auth-Key'] = credentials.apiKey;
	}

	const options: IHttpRequestOptions = {
		method,
		url,
		qs,
		body,
		headers,
		json: true,
	};

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	if (!body || Object.keys(body).length === 0) {
		delete options.body;
	}

    // eslint-disable-next-line no-useless-catch
	try {
		return (await this.helpers.httpRequest.call(this, options)) as IDataObject;
	} catch (error) {
		throw error;
	}
}
