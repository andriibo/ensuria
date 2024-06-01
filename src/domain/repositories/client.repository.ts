import {ClientEntity} from 'domain/entities';

export interface IClientRepository {
  findByShopId(shopId: string): Promise<ClientEntity | null>;
  save(entity: ClientEntity): Promise<ClientEntity>;
}

export const IClientRepository = Symbol('IClientRepository');
