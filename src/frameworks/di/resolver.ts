import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";
import { VerifyOTPController } from "../../interfaceAdapters/controllers/auth/verify-otp.controllers";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controllers";
import { LogoutUserController } from "../../interfaceAdapters/controllers/auth/logout.controllers";
import { GetAllCategoriesController } from "../../interfaceAdapters/controllers/common/get-all-categories.controllers";
import { CreateNewCategoryController } from "../../interfaceAdapters/controllers/admin/create-new-category.controllers";
import { JoinCategoryController } from "../../interfaceAdapters/controllers/vendor/join-category-request.controllers";
import { GetAllUsersController } from "../../interfaceAdapters/controllers/admin/get-all-users.controllers";
import { GetVendorDetailsController } from "../../interfaceAdapters/controllers/vendor/get-vendor-details.controllers";
import { GetAllCategoryJoinRequestController } from "../../interfaceAdapters/controllers/admin/get-all-category-join-request.controllers";
import { GetClientDetailsConrtoller } from "../../interfaceAdapters/controllers/client/get-client-details.controllers";
import { UpdateClientPasswordController } from "../../interfaceAdapters/controllers/client/update-client-password.controllers";
import { UpdateVendorPasswordController } from "../../interfaceAdapters/controllers/vendor/update-vendor-password.controllers";
import { UpdateUserStatusController } from "../../interfaceAdapters/controllers/admin/update-user-status.controllers";
import { GetAllPaginatedCategoryController } from "../../interfaceAdapters/controllers/admin/get-all-paginated-category.controllers";
import { CreateWorkSampleController } from "../../interfaceAdapters/controllers/vendor/create-work-sample.controllers";
import { GetAllWorkSampleByVendorIdController } from "../../interfaceAdapters/controllers/vendor/get-all-work-sample-by-vendorid.controller";
import { UpdateVendorProfileController } from "../../interfaceAdapters/controllers/vendor/update-vendor-profile.controller";
import { UpdateClientProfileController } from "../../interfaceAdapters/controllers/client/update-client-profile.controller";
import { GetVendorCategoryJoinRequestStatusController } from "../../interfaceAdapters/controllers/vendor/get-vendor-category-join-request-status.controller";
import { UpdateCategoryStatusController } from "../../interfaceAdapters/controllers/admin/update-category-status.controller";
import { UpdateCategoryRequestStatusController } from "../../interfaceAdapters/controllers/admin/update-category-request-status.controller";
import { BlockedStatusMiddleware } from "../../interfaceAdapters/middlewares/block-status.middleware";
import { GetWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/get-work-sample-by-id.controller";
import { UpdateWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/update-work-sample-by-id.controller";
import { DeleteWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/delete-work-sample-by-id.controller";
import { CreateServiceController } from "../../interfaceAdapters/controllers/vendor/service/create-service.controller";
import { GetAllServicesByVendorIdController } from "../../interfaceAdapters/controllers/vendor/service/get-all-services-by-vendor-id.controller";
import { GetServiceDetailsByIdController } from "../../interfaceAdapters/controllers/vendor/service/get-service-details-by-id.controller";
import { UpdateServiceByIdController } from "../../interfaceAdapters/controllers/vendor/service/update-service-by-id.controller";
import { GetVendorsUnderCategoryController } from "../../interfaceAdapters/controllers/client/get-vendors-under-category.controller";
import { GetVendorProfileDetailsController } from "../../interfaceAdapters/controllers/client/get-vendor-profile-details.controller";
import { GetBestVendorsController } from "../../interfaceAdapters/controllers/client/get-best-vendors.controller";
import { CreatePaymentIntentController } from "../../interfaceAdapters/controllers/payment/create-payment-intent.controller";
import { ConfirmPaymentController } from "../../interfaceAdapters/controllers/payment/confirm-payment.controller";
import { HandleWebHookController } from "../../interfaceAdapters/controllers/payment/handle-webhook.controller";
import { GetAllServicesForBookingController } from "../../interfaceAdapters/controllers/client/get-all-services-for-booking.controller";
import { GetAllBookingByClientController } from "../../interfaceAdapters/controllers/booking/get-all-booking-by-client.controller";
import { GetAllBookingForVendorController } from "../../interfaceAdapters/controllers/booking/get-all-booking-for-vendor.controller";
import { GoogleController } from "../../interfaceAdapters/controllers/auth/google.controller";
import { UpdateBookingStatusController } from "../../interfaceAdapters/controllers/booking/update-booking-status.controller";
import { HostNewEventController } from "../../interfaceAdapters/controllers/event/host-new-event.controller";
import { GetAllEventsByHostIdController } from "../../interfaceAdapters/controllers/event/get-all-events-by-host-id.controller";
import { GetEventDetailsByIdController } from "../../interfaceAdapters/controllers/event/get-event-details-by-id.controller";
import { GetAllTransactionsByUserIdController } from "../../interfaceAdapters/controllers/payment/get-all-transactions-by-userid.controller";
import { GetWalletDetailsOfUserController } from "../../interfaceAdapters/controllers/wallet/get-wallet-details-of-user.controller";
import { CreateTicketController } from "../../interfaceAdapters/controllers/event/ticket/create-ticket.controller";
import { MarkAttendanceController } from "../../interfaceAdapters/controllers/event/ticket/mark-attendance.controller";
import { ListPaginatedEventsController } from "../../interfaceAdapters/controllers/event/list-paginated-events.controller";
import { DownloadTicketAsPdfController } from "../../interfaceAdapters/controllers/event/ticket/download-ticket-as-pdf.controller";
import { GetUpcomingEventsController } from "../../interfaceAdapters/controllers/event/get-upcoming-events.controller";
import { UpdateEventDetailsByIdController } from "../../interfaceAdapters/controllers/event/update-event-details-by-id.controller";
import { GetEventAttendanceController } from "../../interfaceAdapters/controllers/event/get-event-attendance.controller";
import { ChatController } from "../../interfaceAdapters/controllers/chat/chat.controller";
import { GetVendorDetailsForChatController } from "../../interfaceAdapters/controllers/chat/get-vendor-details.controller";
import { CreateChatRoomController } from "../../interfaceAdapters/controllers/chat/create-chat-room-controller";
import { GetAllTicketsByUserIdController } from "../../interfaceAdapters/controllers/event/ticket/get-all-tickets-by-user-id.controller";
import { CancelTicketController } from "../../interfaceAdapters/controllers/event/ticket/cancel-ticket.controller";
import { GetDashboardStatsController } from "../../interfaceAdapters/controllers/admin/get-dashboard-stats.controller";
import { GetPaginatedEventsController } from "../../interfaceAdapters/controllers/event/get-paginated-events.controller";
import { LoggerMiddleware } from "../../interfaceAdapters/middlewares/logger.middleware";
import { ILogger } from "../../interfaceAdapters/services/logger/logger.interface";
import { ErrorMiddleware } from "../../interfaceAdapters/middlewares/error.middleware";
import { GetAllBookingController } from "../../interfaceAdapters/controllers/booking/get-all-booking.controller";
import { CreateReviewController } from "../../interfaceAdapters/controllers/review/create-review.controller";
import { GetPaginatedReviewsByVendorIdController } from "../../interfaceAdapters/controllers/review/get-paginated-reviews-by-vendor-id.controller";
import { CreateFundReleaseRequestController } from "../../interfaceAdapters/controllers/event/fund-release/create-fund-release-request.controller";
import { GetAllFundReleaseRequestController } from "../../interfaceAdapters/controllers/event/fund-release/get-all-fund-release-request.controller";
import { UpdateFundReleaseRequestStatusController } from "../../interfaceAdapters/controllers/event/fund-release/update-fund-release-request-status.controller";
import { VerifyExistingEmailController } from "../../interfaceAdapters/controllers/auth/verify-existing-email.controller";
import { UpdateNewPasswordController } from "../../interfaceAdapters/controllers/auth/update-new-password.controller";

DependencyInjection.registerAll();

export const blockStatusMiddleware = container.resolve(BlockedStatusMiddleware);

export const registerController = container.resolve(RegisterUserController);

export const loginController = container.resolve(LoginUserController);

export const sendEmailController = container.resolve(SendEmailController);

export const veryfyOTPController = container.resolve(VerifyOTPController);

export const refreshTokenController = container.resolve(RefreshTokenController);

export const logoutUserController = container.resolve(LogoutUserController);

export const joinCategoryController = container.resolve(JoinCategoryController);

export const getAllUsersController = container.resolve(GetAllUsersController);

export const getAllCategoriesController = container.resolve(
  GetAllCategoriesController
);

export const createNewCategoryController = container.resolve(
  CreateNewCategoryController
);

export const getVendorDetailsController = container.resolve(
  GetVendorDetailsController
);

export const getAllCategoryJoinRequestController = container.resolve(
  GetAllCategoryJoinRequestController
);

export const getClientDetailsController = container.resolve(
  GetClientDetailsConrtoller
);

export const updateClientPasswordController = container.resolve(
  UpdateClientPasswordController
);

export const updateVendorPasswordController = container.resolve(
  UpdateVendorPasswordController
);

export const updateUserStatusController = container.resolve(
  UpdateUserStatusController
);

export const getAllPaginatedCategoryController = container.resolve(
  GetAllPaginatedCategoryController
);

export const createWorkSampleController = container.resolve(
  CreateWorkSampleController
);

export const getAllWorkSampleByVendorIdController = container.resolve(
  GetAllWorkSampleByVendorIdController
);

export const getWorkSampleByIdController = container.resolve(
  GetWorkSampleByIdController
);

export const updateWorkSampleByIdController = container.resolve(
  UpdateWorkSampleByIdController
);

export const deleteWorkSampleByIdController = container.resolve(
  DeleteWorkSampleByIdController
);

export const updateVendorProfileController = container.resolve(
  UpdateVendorProfileController
);

export const updateClientProfileController = container.resolve(
  UpdateClientProfileController
);

export const getVendorCategoryJoinRequestStatusController = container.resolve(
  GetVendorCategoryJoinRequestStatusController
);

export const updateCategoryStatusController = container.resolve(
  UpdateCategoryStatusController
);

export const updateCategoryRequestStatusController = container.resolve(
  UpdateCategoryRequestStatusController
);

export const createServiceController = container.resolve(
  CreateServiceController
);

export const getAllServicesByVendorIdController = container.resolve(
  GetAllServicesByVendorIdController
);

export const getServiceDetailsByIdController = container.resolve(
  GetServiceDetailsByIdController
);

export const updateServiceByIdController = container.resolve(
  UpdateServiceByIdController
);

export const getVendorsUnderCategoryController = container.resolve(
  GetVendorsUnderCategoryController
);

export const getVendorProfileDetailsController = container.resolve(
  GetVendorProfileDetailsController
);

export const getBestVendorsController = container.resolve(
  GetBestVendorsController
);

export const createPaymentIntentController = container.resolve(
  CreatePaymentIntentController
);

export const confirmPaymentController = container.resolve(
  ConfirmPaymentController
);

export const handleWebHookController = container.resolve(
  HandleWebHookController
);

export const getAllServicesForBookingController = container.resolve(
  GetAllServicesForBookingController
);

export const getAllBookingByClientController = container.resolve(
  GetAllBookingByClientController
);

export const getAllBookingForVendorController = container.resolve(
  GetAllBookingForVendorController
);

export const googleController = container.resolve(GoogleController);

export const updateBookingStatusController = container.resolve(
  UpdateBookingStatusController
);

export const hostNewEventController = container.resolve(HostNewEventController);

export const getAllEventsByHostIdController = container.resolve(
  GetAllEventsByHostIdController
);

export const getEventDetailsByIdController = container.resolve(
  GetEventDetailsByIdController
);

export const getAllTransactionsByUserIdController = container.resolve(
  GetAllTransactionsByUserIdController
);

export const getWalletDetailsOfUserController = container.resolve(
  GetWalletDetailsOfUserController
);

export const createTicketController = container.resolve(CreateTicketController);

export const markAttendanceController = container.resolve(
  MarkAttendanceController
);

export const listPaginatedEventsController = container.resolve(
  ListPaginatedEventsController
);

export const downloadTicketAsPdfController = container.resolve(
  DownloadTicketAsPdfController
);

export const getUpcomingEventsController = container.resolve(
  GetUpcomingEventsController
);

export const updateEventDetailsByIdController = container.resolve(
  UpdateEventDetailsByIdController
);

export const getEventAttendanceController = container.resolve(
  GetEventAttendanceController
);

export const chatController = container.resolve(ChatController);

export const getVendorDetailsForChatController = container.resolve(
  GetVendorDetailsForChatController
);

export const createChatRoomController = container.resolve(
  CreateChatRoomController
);

export const getAllTicketsByUserIdController = container.resolve(
  GetAllTicketsByUserIdController
);

export const cancelTicketController = container.resolve(CancelTicketController);

export const getDashboardStatsController = container.resolve(
  GetDashboardStatsController
);

export const getPaginatedEventsController = container.resolve(
  GetPaginatedEventsController
);

export const getAllBookingController = container.resolve(
  GetAllBookingController
);

export const createReviewController = container.resolve(CreateReviewController);

export const getPaginatedReviewsByVendorIdController = container.resolve(
  GetPaginatedReviewsByVendorIdController
);

export const createFundReleaseRequestController = container.resolve(
  CreateFundReleaseRequestController
);

export const getAllFundReleaseRequestController = container.resolve(
  GetAllFundReleaseRequestController
);

export const updateFundReleaseRequestStatusController = container.resolve(
  UpdateFundReleaseRequestStatusController
);

export const verifyExistingEmailController = container.resolve(
  VerifyExistingEmailController
);

export const updateNewPasswordController = container.resolve(
  UpdateNewPasswordController
);

// -------------------------------- logger service middleware -----------------------------
export const injectedLoggerMiddleware =
  container.resolve<LoggerMiddleware>("LoggerMiddleware");
export const injectedLogger = container.resolve<ILogger>("ILogger");

// -------------------------------- error handler middleware ------------------------------
export const injectedErrorMiddleware =
  container.resolve<ErrorMiddleware>("ErrorMiddleware");
