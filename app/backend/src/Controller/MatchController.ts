import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';
import { IMatches } from '../Interfaces/MatchesMigrate';

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

    const data = { inProgress: false };

    const serviceResponse = await this.matchService.updateMatchResult(id, token, data);

    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(401).json(serviceResponse.data);
    }

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const token = String(req.headers.authorization);

    const data = { ...req.body };

    const serviceResponse = await this.matchService.updateMatchResult(id, token, data);

    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(401).json(serviceResponse.data);
    }

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const data = { 
      homeTeamId: Number(req.body.homeTeamId),
      awayTeamId: Number(req.body.awayTeamId),
      homeTeamGoals: Number(req.body.homeTeamGoals),
      awayTeamGoals: Number(req.body.awayTeamGoals),
    } as Exclude<IMatches, 'id' | 'inProgress' >

    const serviceResponse = await this.matchService.createMatch(data);

    if(serviceResponse.status === 'CONFLICT'){
      return res.status(404).json(serviceResponse.data);
    }

    if(serviceResponse.status === 'INVALID_DATA'){
      return res.status(422).json(serviceResponse.data);
    }

    return res.status(201).json(serviceResponse.data);
  }
}
