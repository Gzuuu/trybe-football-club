import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllTeams(req: Request, res: Response) {
    const query = req.query.inProgress;

    if (query !== undefined) {
      const serviceResponse = await this.matchService.getInProgressMatches(String(query));

      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchService.getAllMatches();

    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const token = String(req.headers.authorization);

    const serviceResponse = await this.matchService.updateMatch(id, token);

    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(401).json(serviceResponse.data);
    }

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
