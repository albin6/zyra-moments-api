import { IVendorModel } from "../../../frameworks/database/models/vendor.model";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IVendorRepository {
  save(data: Partial<IVendorEntity>): Promise<IVendorEntity>;

  findByEmail(email: string): Promise<IVendorEntity | null>;

  findByIdAndUpdateVendorCategory(
    vendorId: any,
    categoryId: any
  ): Promise<IVendorEntity | null>;

  findById(id: any): Promise<IVendorEntity | null>;

  findByIdForPasswordUpdate(id: any): Promise<IVendorEntity | null>;

  find(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ user: IVendorEntity[] | []; total: number }>;

  findByIdAndUpdatePassword(id: any, password: string): Promise<void>;

  findByIdAndUpdateStatus(id: any, status: string): Promise<void>;

  updateVendorProfileById(
    id: string,
    data: Partial<IVendorEntity>
  ): Promise<void>;

  findByCategoryId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<{ vendors: IVendorEntity[] | []; total: number }>;

  findBestVendors(): Promise<IVendorEntity[] | []>;

  update(
    vendorId: string,
    data: Partial<IVendorEntity>
  ): Promise<IVendorEntity>;

  // ---------------------------------FOR CHAT---------------------------------
  findByIdForChat(id: any): Promise<IVendorEntity | null>;

  findByIdAndUpdateOnlineStatus(
    vendorId: string,
    status: "online" | "offline"
  ): Promise<IVendorModel | null>;

  findByIds(vendorIds: string[]): Promise<IVendorModel[]>;
}
