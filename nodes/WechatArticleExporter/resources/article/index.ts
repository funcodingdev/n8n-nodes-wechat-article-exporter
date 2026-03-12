import type { INodeProperties } from 'n8n-workflow';

const showOnlyForArticle = {
	resource: ['article'],
};

export const articleDescription: INodeProperties[] = [
	{
		displayName: '操作',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForArticle,
		},
		options: [
			{
				name: '获取文章列表',
				value: 'getArticleList',
				action: '获取文章列表',
				description: '获取公众号的历史文章列表',
			},
			{
				name: '下载文章内容',
				value: 'downloadArticle',
				action: '下载文章内容',
				description: '获取文章内容，支持 html / markdown / text / JSON 格式，可导出为文件',
			},
		],
		default: 'getArticleList',
	},
	// getArticleList
	{
		displayName: '公众号ID (Fakeid)',
		name: 'fakeid',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showOnlyForArticle,
				operation: ['getArticleList'],
			},
		},
		description: '公众号的唯一标识ID',
	},
	{
		displayName: '起始索引',
		name: 'begin',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				...showOnlyForArticle,
				operation: ['getArticleList'],
			},
		},
		description: '起始索引，下标从0开始，不能为负',
	},
	{
		displayName: '返回条数',
		name: 'size',
		type: 'number',
		default: 5,
		displayOptions: {
			show: {
				...showOnlyForArticle,
				operation: ['getArticleList'],
			},
		},
		description: '返回消息条数，最大不得超过20，一条消息可能会包含多篇文章',
	},
	// downloadArticle
	{
		displayName: '文章链接',
		name: 'articleUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showOnlyForArticle,
				operation: ['downloadArticle'],
			},
		},
		description: '要下载的文章链接',
	},
	{
		displayName: '输出格式',
		name: 'format',
		type: 'options',
		default: 'html',
		displayOptions: {
			show: {
				...showOnlyForArticle,
				operation: ['downloadArticle'],
			},
		},
		options: [
			{
				name: 'HTML',
				value: 'html',
			},
			{
				name: 'Markdown',
				value: 'markdown',
			},
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'JSON',
				value: 'json',
			},
		]
	},
	{
		displayName: '导出文件',
		name: 'exportFile',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForArticle,
				operation: ['downloadArticle'],
			},
		}
    }
];
