import {Router} from 'express';
import * as JobCountController from '../controller/JobCountController.js';

export const jobCountRouter = Router();

jobCountRouter.route('/job-count')
    .post(JobCountController.addJobCount)
    .get(JobCountController.getJobCount);