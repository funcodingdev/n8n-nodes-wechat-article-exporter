import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { wechatApiRequest } from '../../shared/transport';

function getMimeType(format: string): string {
	const mimeTypes: Record<string, string> = {
		html: 'text/html',
		markdown: 'text/markdown',
		text: 'text/plain',
		json: 'application/json',
	};
	return mimeTypes[format] || 'text/plain';
}

function getFileExtension(format: string): string {
	const extensions: Record<string, string> = {
		html: '.html',
		markdown: '.md',
		text: '.txt',
		json: '.json',
	};
	return extensions[format] || '.txt';
}

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
				const exportFile = this.getNodeParameter('exportFile', i, false) as boolean;
				// 下载接口不需要认证
				response = await wechatApiRequest.call(this, 'GET', '/api/public/v1/download', qs, undefined, false);

				// 如果启用导出文件，返回二进制数据
				if (exportFile) {
					const content = response as unknown as string;
					const mimeType = getMimeType(qs.format);
					const extension = getFileExtension(qs.format);
					const dataBuffer = Buffer.from(content, 'utf-8');

					returnData.push({
						json: {},
						binary: {
							data: {
								data: dataBuffer.toString('base64'),
								mimeType,
								fileName: `article${extension}`,
							},
						},
						pairedItem: { item: i },
					});
					continue;
				}
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
