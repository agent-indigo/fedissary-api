import {Router} from 'express'
import check from '../services/noAdmin/check.js'
const noAdminRouter = Router()
noAdminRouter
.route('/')
.get(check)
export default noAdminRouter