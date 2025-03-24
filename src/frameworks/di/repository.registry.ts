import { container } from "tsyringe";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminRepository } from "../../interfaceAdapters/repositories/admin/admin.respository";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { ClientRepository } from "../../interfaceAdapters/repositories/client/client.repository";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "../../interfaceAdapters/repositories/vendor/vendor.repository";
import { IOTPRepository } from "../../entities/repositoryInterfaces/auth/otp-repository.inteface";
import { OTPRepository } from "../../interfaceAdapters/repositories/auth/otp.repsitory";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { CategoryRespository } from "../../interfaceAdapters/repositories/common/category.repository";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { CategoryRequestRepository } from "../../interfaceAdapters/repositories/common/category-request.repository";
import { IRedisTokenRepository } from "../../entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { RedisTokenRepository } from "../../interfaceAdapters/repositories/redis/redis-token.repository";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { RefreshTokenRepository } from "../../interfaceAdapters/repositories/auth/refresh-token.respository";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { WorkSampleRepository } from "../../interfaceAdapters/repositories/vendor/work-sample.repository";
import { IServiceRepository } from "../../entities/repositoryInterfaces/common/service-repository.interface";
import { ServiceRepository } from "../../interfaceAdapters/repositories/common/service.repository";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { PaymentRepository } from "../../interfaceAdapters/repositories/payment/payment.repository";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingRepository } from "../../interfaceAdapters/repositories/booking/booking.repository";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { EventRepository } from "../../interfaceAdapters/repositories/event/event.repository";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { WalletRepository } from "../../interfaceAdapters/repositories/wallet/wallet.repository";
import { ITicketRepository } from "../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { TicketRepository } from "../../interfaceAdapters/repositories/event/ticket.repository";
import { IChatRoomRepository } from "../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { ChatRoomRepository } from "../../interfaceAdapters/repositories/chat/chat-room.repository";
import { IMessageRepository } from "../../entities/repositoryInterfaces/chat/message-repository.interface";
import { MessageRepository } from "../../interfaceAdapters/repositories/chat/message.repository";
import { IDashBoardStatsRepository } from "../../entities/repositoryInterfaces/admin/dashboard-stats-repository.interface";
import { DashboardStatsRepository } from "../../interfaceAdapters/repositories/admin/dashboard-stats.repository";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { ReviewRepository } from "../../interfaceAdapters/repositories/review/review.repository";
import { IFundReleaseRequestRepository } from "../../entities/repositoryInterfaces/event/fund-release-request-repository.interface";
import { FundReleaseRequestRepository } from "../../interfaceAdapters/repositories/event/fund-release-request.repository";

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IAdminRepository>("IAdminRepository", {
      useClass: AdminRepository,
    });

    container.register<IClientRepository>("IClientRepository", {
      useClass: ClientRepository,
    });

    container.register<IVendorRepository>("IVendorRepository", {
      useClass: VendorRepository,
    });

    container.register<IOTPRepository>("IOTPRepository", {
      useClass: OTPRepository,
    });

    container.register<ICategoryRepository>("ICategoryRepository", {
      useClass: CategoryRespository,
    });

    container.register<ICategoryRequestRepository>(
      "ICategoryRequestRepository",
      { useClass: CategoryRequestRepository }
    );

    container.register<IRedisTokenRepository>("IRedisTokenRepository", {
      useClass: RedisTokenRepository,
    });

    container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
      useClass: RefreshTokenRepository,
    });

    container.register<IWorkSampleRepository>("IWorkSampleRepository", {
      useClass: WorkSampleRepository,
    });

    container.register<IServiceRepository>("IServiceRepository", {
      useClass: ServiceRepository,
    });

    container.register<IPaymentRepository>("IPaymentRepository", {
      useClass: PaymentRepository,
    });

    container.register<IBookingRepository>("IBookingRepository", {
      useClass: BookingRepository,
    });

    container.register<IEventRepository>("IEventRepository", {
      useClass: EventRepository,
    });

    container.register<IWalletRepository>("IWalletRepository", {
      useClass: WalletRepository,
    });

    container.register<ITicketRepository>("ITicketRepository", {
      useClass: TicketRepository,
    });

    container.register<IDashBoardStatsRepository>("IDashBoardStatsRepository", {
      useClass: DashboardStatsRepository,
    });

    container.register<IReviewRepository>("IReviewRepository", {
      useClass: ReviewRepository,
    });

    container.register<IFundReleaseRequestRepository>(
      "IFundReleaseRequestRepository",
      { useClass: FundReleaseRequestRepository }
    );

    // -----chat-----

    container.register<IChatRoomRepository>("IChatRoomRepository", {
      useClass: ChatRoomRepository,
    });

    container.register<IMessageRepository>("IMessageRepository", {
      useClass: MessageRepository,
    });
  }
}
