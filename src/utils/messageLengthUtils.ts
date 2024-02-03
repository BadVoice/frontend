export const getMaxMessageLengthByChannel = (channelType: string): number => {
  switch (channelType) {
    case "Telegram":
    case "Vkontakte":
      return 4096;
    case "WhatsApp":
      return 1000;
    default:
      return 4096;
  }
};
