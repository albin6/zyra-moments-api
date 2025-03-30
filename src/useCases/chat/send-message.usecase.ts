// usecases/chat/send-message.usecase.ts
import { injectable, inject } from "tsyringe";
import { IMessageEntity } from "../../entities/models/message.entity";
import { IMessageRepository } from "../../entities/repositoryInterfaces/chat/message-repository.interface";
import { IChatRoomRepository } from "../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { ISendMessageUseCase } from "../../entities/useCaseInterfaces/chat/send-message-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class SendMessageUseCase implements ISendMessageUseCase {
  constructor(
    @inject("IMessageRepository") private messageRepository: IMessageRepository,
    @inject("IChatRoomRepository") private chatRoomRepository: IChatRoomRepository
  ) {}

  async execute(
    clientId: string,
    vendorId: string,
    senderId: string,
    senderType: "Client" | "Vendor",
    content: string,
    chatRoomId?: string,
    file?: string,
    bookingId?: string
  ): Promise<IMessageEntity> {
    const isFile = (file && file.startsWith("https://res.cloudinary.com")) ? true : false
    console.log('is file checkin in usecaase =>', isFile)
    let chatRoom;
  
    if (chatRoomId) {
      chatRoom = await this.chatRoomRepository.findById(chatRoomId);
      if (!chatRoom) throw new CustomError(ERROR_MESSAGES.CHAT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    } else {
      if (!bookingId) throw new CustomError(ERROR_MESSAGES.BOOKING_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      chatRoom = await this.chatRoomRepository.findOrCreate(
        clientId,
        vendorId,
        bookingId,
        {
          content: isFile ? "File" : content,
          senderId,
          senderType,
          createdAt: new Date(),
        }
      );
    }

    console.log('after setting the last message')
  
    const message: IMessageEntity = {
      chatRoomId: chatRoom._id!.toString(),
      content : (file && isFile) ? file : content,
      senderId,
      senderType,
      isFile: isFile,
      read: false,
      createdAt: new Date(),
    };
    const createdMessage = await this.messageRepository.create(message);

    console.log('here is the created message : ', createdMessage)
    console.log('befor updating the last message => file and is file', file, isFile)
  
    await this.chatRoomRepository.updateLastMessage(
      chatRoom._id!.toString(),
      (file && isFile) ? "file" : content,
      senderId,
      senderType,
      createdMessage.createdAt!
    );
  
    if (senderType === "Client") {
      await this.chatRoomRepository.incrementUnreadCount(chatRoom._id!.toString(), "vendor");
    } else {
      await this.chatRoomRepository.incrementUnreadCount(chatRoom._id!.toString(), "client");
    }
  
    return createdMessage;
  }
}