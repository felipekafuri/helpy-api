import { getRepository, Repository } from 'typeorm';

import ICreateProviderDTO from '@modules/workProviders/domain/dtos/ICreateProviderDTO';
import IProviderRepository from '@modules/workProviders/domain/repositories/IProviderRepository';

import Provider from '../entities/Provider';

class CompaniesRepository implements IProviderRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne({
      where: { email },
    });

    return provider;
  }

  public async create({
    name,
    email,
    password,
    bio,
    documentNumber,
    fantasyName,
    CEP,
    phone,
    accept_terms,
  }: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create({
      name,
      CEP,
      documentNumber,
      email,
      bio,
      fantasyName,
      password,
      phone,
      accept_terms,
    });

    await this.ormRepository.save(provider);

    return provider;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne(id);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }

  public async index(): Promise<Provider[]> {
    const providers = this.ormRepository.find();

    return providers;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CompaniesRepository;
