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
}
