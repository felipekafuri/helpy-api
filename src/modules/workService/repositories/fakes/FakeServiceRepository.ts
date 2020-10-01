import IDeleteServiceDTO from '@modules/workService/dtos/IDeleteServiceDTO';
import { uuid } from 'uuidv4';
import ICreateServiceDTO from '../../dtos/ICreateServiceDTO';
import Service from '../../infra/typeorm/entities/Service';
import IServiceRepository from '../IServiceRepository';

export default class FakeServiceRepository implements IServiceRepository {
  private services: Service[] = [];

  public async create(data: ICreateServiceDTO): Promise<Service> {
    const service = new Service();

    Object.assign(
      service,
      {
        id: uuid(),
      },
      data
    );

    this.services.push(service);

    return service;
  }

  public async listContractorService(
    contractor_id: string
  ): Promise<Service[]> {
    const contractorsServices = this.services.filter(
      service => service.contractor_id === contractor_id
    );

    return contractorsServices;
  }

  public async deleteService({
    service_id,
    contractor_id,
  }: IDeleteServiceDTO): Promise<void> {
    this.services.find(service => service.id === service_id);
  }

  public async findServiceByCategory(category: string): Promise<Service[]> {
    const services = this.services.filter(
      service => service.category.title === category
    );

    return services;
  }

  public async show(): Promise<Service[]> {
    return this.services;
  }
}