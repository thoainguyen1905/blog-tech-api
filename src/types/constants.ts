import { Request, Response } from "express";

export interface RequestApp extends Request {
  user: {
    id: string;
    email: string;
  };
  file: FormData | string | any;
  body: any;
  query: {
    page: number | string | any;
    size: number | string | any;
    id: string;
    search: string;
    sort: string | any;
    status: string | number | any;
  };
  header: any;
}
