import { Project } from '@prisma/client';

export class ProjectModel implements Project {
  id: number; 
  name: string; 
  created_at: Date;
  domain: string; 
  updated_at: Date; 
  id_user: number; 
  

  constructor(
    id: number,
    name: string,
    domian: string,
    createdAt: Date,
    updatedAt: Date,
    idUser: number,
    
  ) {
    this.id = id;
    this.name = name; 
    this.domain = domian;
    this.created_at = createdAt;
    this.updated_at = updatedAt; 
    this.id_user = this.id_user; 
  }
}
