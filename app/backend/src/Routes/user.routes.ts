import { Request, Router, Response } from 'express';
import UserController from '../Controller/UserController';
import Validations from '../Middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateFields,
  Validations.validateEmail,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.findRole(req, res),
);

export default router;
