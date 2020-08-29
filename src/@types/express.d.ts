declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    assessor: {
      id: number;
    };
  }
}
