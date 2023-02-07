export class AutodeskModel {
	id!: number;
	jobId!: number;
	jobName!: string;
	name!: string;
	description!: string;
	qrCode!: string;
	qrCodeUrl!: string;
	modelJson!: string;
	bucketKey!: string;
	objectIdentifier!: string;
	objectKey!: string;
	location!: string;
	urn!: string;
}

export class AutodeskModelsViewModel {
	autodeskModels!: AutodeskModel[];
	autodeskModelName!: string;
	jobName!: string;
	resultCount!: number
}

export class DrawingViewModel {
	autodeskModel!: AutodeskModel;
	// job!: Job;
}
