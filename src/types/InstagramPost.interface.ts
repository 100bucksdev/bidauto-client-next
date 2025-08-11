// export interface IInstagramPost {
//   caption: string;
//   childPost: [];
//   commentsCount: number;
//   dimensionHeight: number;
//   dimensionWidth: number;
//   displayUrl: string;
//   firstComment: string;
//   hashtags: string[];
//   id: string;
//   images: string[];
//   inputUrl: string;
//   isPinned: boolean;
//   isSponsored: boolean;
//   latestComments: any[];
//   likesCount: number;
//   locationId: string;
//   locationName: string;
//   mention: any[];
//   musicInfo: any;
//   ownerFullName: string;
//   ownerId: string;
//   ownerUsername: string;
//   productType: string;
//   shortCode: string;
//   timestamp: string;
//   type: string;
//   url: string;
//   videoDuration: number;
//   videoPlayCount: number;
//   videoUrl: string;
//   videoViewCount: number;
// }

export interface IInstagramPost {
	id: string
	inputUrl: string
	type: 'Video'
	url: string
	displayUrl: string
	videoUrl: string
	locationName: string
	ownerFullName: string
	ownerUsername: string
}
