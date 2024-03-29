import { getRepository, Repository } from 'typeorm';

import IContractorsRepository from '@modules/contractors/domain/repositories/IContractorsRepository';
import ICreateContractorsDTO from '@modules/contractors/domain/dtos/ICreateContractorsDTO';

import Contractor from '../entities/Contractor';

class ContractorsRepository implements IContractorsRepository {
  private ormRepository: Repository<Contractor>;

  constructor() {
    this.ormRepository = getRepository(Contractor);
  }

  public async findById(id: string): Promise<Contractor | undefined> {
    const contractor = await this.ormRepository.findOne(id);

    return contractor;
  }

  public async findByEmail(email: string): Promise<Contractor | undefined> {
    const contractor = await this.ormRepository.findOne({ where: { email } });

    return contractor;
  }

  public async create({
    name,
    email,
    password,
    phone,
    accept_terms,
  }: ICreateContractorsDTO): Promise<Contractor> {
    const contractor = this.ormRepository.create({
      name,
      email,
      password,
      phone,
      accept_terms,
    });
    await this.ormRepository.save(contractor);

    return contractor;
  }

  public async save(contractor: Contractor): Promise<Contractor> {
    return this.ormRepository.save(contractor);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ContractorsRepository;
