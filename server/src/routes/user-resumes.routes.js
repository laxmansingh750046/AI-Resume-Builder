import { Router } from "express";
import {
    CreateNewResume, GetUserResumes,
    UpdateResumeDetail, GetResumeById,
    DeleteResumeById
}
from '../controllers/user-resume.controllers.js'

const router = Router();

router.route().post(CreateNewResume);
router.route().get(GetUserResumes);
router.route('/:id').get(GetResumeById);
router.route().put(UpdateResumeDetail);
router.route().delete(DeleteResumeById);

router.route('/')
    .post(CreateNewResume)
    .get(GetUserResumes);

router.route('/:id')
    .get(GetResumeById)
    .put(UpdateResumeDetail)
    .delete(DeleteResumeById);
export default router;
