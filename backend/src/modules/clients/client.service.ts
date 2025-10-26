import { ClientRepo } from './client.repo';
export const ClientService = {
  list: ClientRepo.list,
  findById: ClientRepo.findById,
  create: ClientRepo.create,
  update: ClientRepo.update,
  remove: ClientRepo.remove,
};
