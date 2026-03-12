import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccount = {
	resource: ['account'],
};

export const accountDescription: INodeProperties[] = [
	{
		displayName: '操作',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAccount,
		},
		options: [
			{
				name: '根据关键字搜索公众号',
				value: 'searchByKeyword',
				action: '根据关键字搜索公众号',
				description: '根据公众号名称或关键字查询公众号列表',
			},
			{
				name: '根据文章链接搜索公众号',
				value: 'searchByUrl',
				action: '根据文章链接搜索公众号',
				description: '根据公众号文章链接查询公众号',
			},
			{
				name: '获取公众号主体信息',
				value: 'getAuthorInfo',
				action: '获取公众号主体信息',
				description: '根据公众号的 fakeid 查询主体信息',
			},
			{
				name: '获取公众号详细信息',
				value: 'getAboutBiz',
				action: '获取公众号详细信息',
				description: '根据公众号的 fakeid 查询详细信息（需要密钥）',
			},
		],
		default: 'searchByKeyword',
	},
	// searchByKeyword
	{
		displayName: '关键字',
		name: 'keyword',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showOnlyForAccount,
				operation: ['searchByKeyword'],
			},
		},
		description: '搜索公众号的关键字',
	},
	{
		displayName: '起始索引',
		name: 'begin',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				...showOnlyForAccount,
				operation: ['searchByKeyword'],
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
				...showOnlyForAccount,
				operation: ['searchByKeyword'],
			},
		},
		description: '返回条数，最大不得超过20',
	},
	// searchByUrl
	{
		displayName: '文章链接',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showOnlyForAccount,
				operation: ['searchByUrl'],
			},
		},
		description: '公众号文章链接',
	},
	// getAuthorInfo & getAboutBiz
	{
		displayName: '公众号ID (Fakeid)',
		name: 'fakeid',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showOnlyForAccount,
				operation: ['getAuthorInfo', 'getAboutBiz'],
			},
		},
		description: '公众号的唯一标识ID',
	},
	// getAboutBiz key
	{
		displayName: '微信密钥 (可选)',
		name: 'wechatKey',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForAccount,
				operation: ['getAboutBiz'],
			},
		},
		description: '微信抓包获取的x-wechat-key参数',
	},
];
