import { Request, Router, Response, NextFunction } from 'express';
import UserController from '../Controller/UserController';
import Validations from '../Middlewares/Validations';

const userController = new UserController();
const loginBody = ['email', 'password'];
const validate = new Validations(loginBody);

const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => validate.validateUser(req, res, next),
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
