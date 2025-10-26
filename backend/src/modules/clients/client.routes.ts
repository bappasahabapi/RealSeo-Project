import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler';
import { ClientController } from './client.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();
router.use(requireAuth);
router.get('/', asyncHandler(ClientController.list));
router.get('/:id', asyncHandler(ClientController.findById));
router.post('/', asyncHandler(ClientController.create));
router.put('/:id', asyncHandler(ClientController.update));
router.delete('/:id', asyncHandler(ClientController.remove));
export default router;
