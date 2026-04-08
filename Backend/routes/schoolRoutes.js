import express from 'express';
import { addSchoolController, getSchoolsController } from '../controllers/schoolController.js';

const router = express.Router();

/**
 * @route  POST /api/schools/addSchool
 * @desc   Add a new school
 * @access Public 
 */
router.post('/addSchool', addSchoolController );

/**
 * @route  GET /api/schools/get-schools
 * @desc   Get all schools
 * @access Public 
 */
router.get('/listSchools', getSchoolsController);

export default router;