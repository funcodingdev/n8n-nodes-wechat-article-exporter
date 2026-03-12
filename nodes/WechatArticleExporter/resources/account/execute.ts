import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { wechatApiRequest } from '../../shared/transport';

export async function executeAccount(
	this: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			let response: IDataObject;
			const qs: IDataObject = {};

			if (operation === 'searchByKeyword') {
				qs.keyword = this.getNodeParameter('keyword', i) as string;
				const begin = this.getNodeParameter('begin', i, 0) as number;
				const size = this.getNodeParameter('size', i, 5) as number;
				if (begin !== undefined) qs.begin = begin;
				if (size !== undefined) qs.size = Math.min(size, 20);
				response = await wechatApiRequest.call(this, 'GET', '/api/public/v1/account', qs);
			} else if (operation === 'searchByUrl') {
				qs.url = this.getNodeParameter('url', i) as string;
				response = await wechatApiRequest.call(this, 'GET', '/api/public/v1/accountbyurl', qs);
			} else if (operation === 'getAuthorInfo') {
				qs.fakeid = this.getNodeParameter('fakeid', i) as string;
				response = await wechatApiRequest.call(this, 'GET', '/api/public/beta/authorinfo', qs, undefined, false);
			} else if (operation === 'getAboutBiz') {
				qs.fakeid = this.getNodeParameter('fakeid', i) as string;
				const wechatKey = this.getNodeParameter('wechatKey', i, '') as string;
				if (wechatKey) qs.key = wechatKey;
				response = await wechatApiRequest.call(this, 'GET', '/api/public/beta/aboutbiz', qs, undefined, false);
			} else {
				throw new Error(`不支持的公众号操作: ${operation}`);
			}

			returnData.push({
				json: response,
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
