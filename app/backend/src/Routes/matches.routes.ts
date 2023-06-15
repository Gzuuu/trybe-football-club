import { Request, Router, Response } from 'express';
import MatchController from '../Controller/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllTeams(req, res));

export default router;
