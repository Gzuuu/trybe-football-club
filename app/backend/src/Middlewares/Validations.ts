import { NextFunction, Request, Response } from 'express';

class Validations {
  private requiredKeys: string[];
  constructor(keys: string[]) {
    this.requiredKeys = keys;
  }

  validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const book = req.body;
    const notFoundKey = this.requiredKeys.find((key) => !(key in book));
    if (notFoundKey) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default Validations;
