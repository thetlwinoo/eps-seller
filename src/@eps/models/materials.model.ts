export interface IMaterials {
  id?: number;
  name?: string;
}

export class Materials implements IMaterials {
  constructor(public id?: number, public name?: string) {}
}
