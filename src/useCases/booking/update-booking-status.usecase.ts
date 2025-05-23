import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IUpdateBookingStatusUseCase } from "../../entities/useCaseInterfaces/booking/update-booking-status-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";

@injectable()
export class UpdateBookingStatusUseCase implements IUpdateBookingStatusUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepository: IBookingRepository,
    @inject("IWalletRepository") private walletRepository: IWalletRepository,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}

  async execute(
    userId: string,
    bookingId: string,
    status: string
  ): Promise<void> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new CustomError(
        ERROR_MESSAGES.BOOKING_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.bookingRepository.findByIdAndUpdateBookingStatus(
      bookingId,
      status
    );

    if (status === "completed") {
      const payment = await this.paymentRepository.findByBookingId(bookingId);
      if (!payment) {
        throw new CustomError(
          "Payment not found for this booking",
          HTTP_STATUS.NOT_FOUND
        );
      }

      try {
        let updatedBooking = null;

        // Client approval path
        console.log(
          "out client approval",
          userId === booking.userId!.toString()
        );
        if (
          userId === booking.userId!.toString() &&
          !booking.isClientApproved
        ) {
          console.log("in client approval", userId);
          updatedBooking = await this.bookingRepository.updateClientApproved(
            userId
          );
          if (updatedBooking?.isVendorApproved) {
            await this.processWalletUpdates(
              bookingId,
              updatedBooking,
              payment._id!.toString()
            );
          }
        }
        // Vendor approval path
        else if (
          userId === booking.vendorId!.toString() &&
          !booking.isVendorApproved
        ) {
          console.log(
            "in vendor approval",
            userId === booking.vendorId!.toString()
          );
          updatedBooking = await this.bookingRepository.updateVendorApproved(
            userId
          );
          if (updatedBooking?.isClientApproved) {
            await this.processWalletUpdates(
              bookingId,
              updatedBooking,
              payment._id!.toString()
            );
          }
        }
      } catch (error) {
        console.error("Error processing booking completion:", error);
        throw new CustomError(
          "Failed to process booking completion",
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  private async processWalletUpdates(
    bookingId: string,
    booking: any,
    paymentId: string
  ): Promise<void> {
    const isAlreadyApproved = await this.bookingRepository.isBothApproved(
      bookingId
    );
    console.log("is both applied =>", isAlreadyApproved);
    if (!isAlreadyApproved) {
      return;
    }

    const commissionRate = 0.09;
    const commissionAmount = booking.totalPrice * commissionRate;
    const vendorAmount = booking.totalPrice - commissionAmount;

    console.log("both approved");

    await Promise.all([
      this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
        booking.vendorId,
        vendorAmount,
        paymentId
      ),
      this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
        "67fcd92c889927aedb0159e6" as string,
        (booking.totalPrice - commissionAmount) * -1,
        paymentId
      ),
    ]);
  }
}
