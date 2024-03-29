import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeContractorsRepository from '../repositories/fakes/FakeContractorsRepository';
import FakeContractorsTokenRepository from '../repositories/fakes/FakeContractorsTokensRepository';
import CreateContractorService from './CreateContractorService';

let fakeContractorsRepository: FakeContractorsRepository;
let createContractor: CreateContractorService;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let fakeContractorTokenRepository: FakeContractorsTokenRepository;

describe('CreateContractor', () => {
  beforeEach(() => {
    fakeContractorsRepository = new FakeContractorsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeContractorTokenRepository = new FakeContractorsTokenRepository();
    fakeMailProvider = new FakeMailProvider();
    createContractor = new CreateContractorService(
      fakeContractorsRepository,
      fakeMailProvider,
      fakeHashProvider,
      fakeContractorTokenRepository
    );
  });

  it('Should be able to create a new contractor.', async () => {
    const contractor = await createContractor.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    expect(contractor).toHaveProperty('id');
  });

  it('Should not be able to create a new contractor with a same e-mail from another.', async () => {
    await createContractor.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      phone: '99999999',
      password: '1234',
      accept_terms: true,
    });

    await expect(
      createContractor.execute({
        name: 'John Doe',
        email: 'johndoe@teste.com',
        phone: '99999999',
        password: '1234',
        accept_terms: true,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new contractor without accept the terms of conditions.', async () => {
    await expect(
      createContractor.execute({
        name: 'John Doe',
        email: 'johndoe@teste.com',
        phone: '99999999',
        password: '1234',
        accept_terms: false,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
