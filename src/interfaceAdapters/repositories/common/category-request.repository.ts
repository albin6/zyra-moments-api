import { injectable } from "tsyringe";
import { ICategoryRequestEntity } from "../../../entities/models/category-request.entity";
import { ICategoryRequestRepository } from "../../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { CategoryRequestModel } from "../../../frameworks/database/models/category-request.model";
import { ObjectId } from "mongoose";

@injectable()
export class CategoryRequestRepository implements ICategoryRequestRepository {
  async save(
    vendorId: ObjectId,
    categoryId: ObjectId
  ): Promise<ICategoryRequestEntity> {
    return await CategoryRequestModel.create({ vendorId, categoryId });
  }

  async findById(id: any): Promise<ICategoryRequestEntity | null> {
    return await CategoryRequestModel.findById(id);
  }

  async findByVendorAndCategory(
    vendorId: ObjectId,
    categoryId: ObjectId
  ): Promise<ICategoryRequestEntity | null> {
    return await CategoryRequestModel.findOne({ vendorId, categoryId });
  }

  async findByVendorId(vendorId: any): Promise<ICategoryRequestEntity | null> {
    return await CategoryRequestModel.findOne({ vendorId });
  }

  async find(): Promise<ICategoryRequestEntity[] | []> {
    return await CategoryRequestModel.find()
      .populate({
        path: "vendorId",
        select:
          "firstName lastName email profileImage bio place averageRating totalReviews",
      })
      .populate({
        path: "categoryId",
        select: "title",
      })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
    await CategoryRequestModel.findByIdAndUpdate(id, {
      $set: { status },
    });
  }
}
