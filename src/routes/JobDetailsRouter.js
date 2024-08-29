import {Router} from 'express';
import * as JobDetailController from '../controller/JobDetailController.js';


export const jobDetailRouter = Router();

jobDetailRouter.route('/job-detail')
    .post(JobDetailController.addJobDetail);

jobDetailRouter.route('/job-detail-list')
    .post(JobDetailController.addJobDetailList)
    .get(JobDetailController.getJobDetailList);