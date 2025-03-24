import { inject, injectable } from "tsyringe";
import { ILogger } from "../services/logger/logger.interface";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../entities/utils/custom-error";
import { ValidationError } from "../../entities/utils/validation-error";

@injectable()
export class ErrorMiddleware {
  constructor(@inject('ILogger') private logger: ILogger) {}

  public handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGES.SERVER_ERROR;
    let errors: any[] | undefined;

    console.log('Inside error handler ==>')

    this.logger.error('An error occurred', {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    // Handle specific error types
    if (err instanceof ZodError) {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = ERROR_MESSAGES.VALIDATION_ERROR;
      errors = err.errors.map((e) => ({ message: e.message }));
    } else if (err instanceof CustomError) {
      statusCode = err.statusCode;
      message = err.message;
      if (err instanceof ValidationError) {
        errors = err.errors;
      }
    } else {
      // Unhandled errors (default to 500)
      statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      message = err.message || ERROR_MESSAGES.SERVER_ERROR;
    }

    // Send response
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors && { errors }), // Include errors array only if it exists
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Optional stack trace in dev
    });
  }
}