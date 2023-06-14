import { Request, Response } from 'express';
import TeamService from '../Services/TeamService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';

export class TeamController {
    constructor(
        private teamService = new TeamService(),
    ) {}

    public async getAllTeams(_req: Request, res: Response) {
        const serviceResponse = await this.teamService.getAllTeams();
        res.status(200).json(serviceResponse.data);
    };
};