export class CreatePageDto {
    readonly name: string;
    readonly content: Record<string, any>; 
    readonly id_project: number;
    readonly status: boolean;
    readonly type: number
   
}  