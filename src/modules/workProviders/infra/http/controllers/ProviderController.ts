import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProviderProfileService from '@modules/workProviders/domain/services/UpdateProviderProfileService';
import DeleteProviderService from '@modules/workProviders/domain/services/DeleteProviderServide';
import CreateProviderService from '../../../domain/services/CreateProviderService';

class ProviderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      phone,
      accept_terms,
    } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      name,
      fantasyName,
      CEP,
      email,
      password,
      documentNumber,
      phone,
      accept_terms,
    });

    return response.json(classToClass(provider));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const {
      name,
      fantasyName,
      email,
      password,
      CEP,
      documentNumber,
      old_password,
      phone,
      bio,
      service_categories,
    } = request.body;

    const updateProfile = container.resolve(UpdateProviderProfileService);

    const provider = await updateProfile.execute({
      provider_id,
      name,
      fantasyName,
      email,
      password,
      CEP,
      old_password,
      documentNumber,
      phone,
      bio,
      service_categories,
    });

    return response.json(classToClass(provider));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteProvider = container.resolve(DeleteProviderService);

    await deleteProvider.execute(id);

    return response.status(200).send();
  }
}

export default ProviderController;
