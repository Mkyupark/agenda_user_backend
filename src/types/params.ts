import type { Request, Response, NextFunction } from 'express';

export type RequestType = Request & { user?: unknown };

export type ResponseType = Response;

export type NextType = NextFunction;
