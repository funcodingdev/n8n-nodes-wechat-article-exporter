import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { accountDescription } from './resources/account';
import { articleDescription } from './resources/article';
import { executeAccount } from './resources/account/execute';
import { executeArticle } from './resources/article/execute';

export class WechatArticleExporter implements INodeType {
	description: INodeTypeDescription = {
		displayName: '微信公众号文章导出器(WeChatArticleExporter)',
		name: 'wechatArticleExporter',
		icon: { light: 'file:../../icons/wechat.svg', dark: 'file:../../icons/wechat.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: '微信公众号文章导出器 API - 搜索公众号、获取文章列表、下载文章内容',
		defaults: {
			name: '微信公众号文章导出器',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'wechatArticleExporterApi',
				required: true,
			},
		],
		usableAsTool: true,
		properties: [
			{
				displayName: '资源',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: '公众号',
						value: 'account',
						description: '搜索公众号、获取公众号信息',
					},
					{
						name: '文章',
						value: 'article',
						description: '获取文章列表、下载文章内容',
					},
				],
				default: 'account',
			},
			...accountDescription,
			...articleDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let returnData: INodeExecutionData[] = [];

		if (resource === 'account') {
			returnData = await executeAccount.call(this, operation, items);
		} else if (resource === 'article') {
			returnData = await executeArticle.call(this, operation, items);
		}

		return [returnData];
	}
}
