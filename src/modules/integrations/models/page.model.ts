import { Page } from '@prisma/client';

export class PageModel implements Page {
  id: number; 
  name: string; 
  created_at: Date;
  content: any; 
  updated_at: Date; 
  id_project: number; 
  status: boolean;
  type: number;

  constructor(
    id: number,
    name: string,
    content: any,
    createdAt: Date,
    updatedAt: Date,
    idProject: number,
    status: boolean,
    type: number
  ) {
    this.id = id;
    this.name = name; 
    this.content = content;
    this.created_at = createdAt;
    this.updated_at = updatedAt; 
    this.id_project = idProject; 
    this.status = status;
    this.type = type;

  }
}
