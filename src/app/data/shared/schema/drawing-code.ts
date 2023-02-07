import { DrawingSubCode } from './drawing-sub-code';

export class DrawingCode {
	id!: number;
	organisationId!: number;
	organisationName!: string;
	name!: string;
	description!: string;
	drawingSubCodes!: DrawingSubCode[];
}
