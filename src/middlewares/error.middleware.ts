import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues
    })
  }

  console.error(err)

  return res.status(500).json({
    success: false,
    message: "Internal server error"
  })
}