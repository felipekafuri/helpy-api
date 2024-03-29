import Service from '../../infra/typeorm/entities/Service';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';
import IDeleteServiceDTO from '../dtos/IDeleteServiceDTO';

export default interface IServiceRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  listContractorService(contractor_id: string): Promise<Service[]>;
  show(): Promise<Service[]>;
  deleteService({
    service_id,
    contractor_id,
  }: IDeleteServiceDTO): Promise<void>;
  findServiceByCategory(category: string): Promise<Service[]>;
  save(service: Service): Promise<Service>;
  findById(id: string): Promise<Service | undefined>;
}
