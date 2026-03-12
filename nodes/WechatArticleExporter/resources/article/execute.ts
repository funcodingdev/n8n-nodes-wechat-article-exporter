import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { wechatApiRequest } from '../../shared/transport';

export async function executeArticle(
	this: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			let response: IDataObject | string;
			const qs: IDataObject = {};

			if (operation === 'getArticleList') {
				qs.fakeid = this.getNodeParameter('fakeid', i) as string;
				const begin = this.getNodeParameter('begin', i, 0) as number;
				const size = this.getNodeParameter('size', i, 5) as number;
				if (begin !== undefined) qs.begin = begin;
				if (size !== undefined) qs.size = Math.min(size, 20);
				response = await wechatApiRequest.call(this, 'GET', '/api/public/v1/article', qs);
			} else if (operation === 'downloadArticle') {
				qs.url = this.getNodeParameter('articleUrl', i) as string;
				qs.format = this.getNodeParameter('format', i, 'html') as string;
				// 下载接口不需要认证
				response = await wechatApiRequest.call(this, 'GET', '/api/public/v1/download', qs, undefined, false);
			} else {
				throw new Error(`不支持的文章操作: ${operation}`);
			}

			returnData.push({
				json: typeof response === 'string' ? { content: response } : response,
				pairedItem: { item: i },
			});
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: (error as Error).message,
					},
					pairedItem: { item: i },
				});
				continue;
			}
			throw error;
		}
	}

	return returnData;
}
