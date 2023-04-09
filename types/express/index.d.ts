declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      full_name: string;
      email: string;
      password: string;
    };
  }
}
