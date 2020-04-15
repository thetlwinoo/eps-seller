export interface ICurrency {
  id?: number;
  code?: string;
  name?: string;
}

export class Currency implements ICurrency {
  constructor(public id?: number, public code?: string, public name?: string) {}
}
