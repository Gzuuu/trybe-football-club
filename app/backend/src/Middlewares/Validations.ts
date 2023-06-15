import { NextFunction, Request, Response } from 'express';

class Validations {
  // static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
  //   const book = req.body;
  //   const requiredKeys = ['email', 'password'];
  //   const notFoundKey = requiredKeys.find((key) => !(key in book));
  //   if (notFoundKey) {
  //     return res.status(400).json({ message: 'All fields must be filled' });
  //   }

  //   next();
  // }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    next();
  }

  static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    const { email, password } = req.body;

    if (!(emailRegex.test(email) && password.length >= 6)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default Validations;
