import type {
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WechatArticleExporterApi implements ICredentialType {
	name = 'wechatArticleExporterApi';

	displayName = 'WeChat Article Exporter API';

	// eslint-disable-next-line @n8n/community-nodes/icon-validation
	icon: Icon = { light: 'file:../icons/wechat.png', dark: 'file:../icons/wechat.png' };

	documentationUrl = 'https://down.mptext.top/dashboard/api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The API key for authentication (X-Auth-Key header)',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://down.mptext.top',
			required: true,
			description: 'The base URL of the API server',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/public/v1/account',
			method: 'GET',
			headers: {
				'X-Auth-Key': '={{$credentials.apiKey}}',
			},
			qs: {
				keyword: 'test',
				size: 1,
			},
		},
	};
}
