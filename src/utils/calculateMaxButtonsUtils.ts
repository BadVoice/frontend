export const calculateMaxButtons = (
  channelType: string,
  keyboardType: string,
  buttonType: string
): number => {
  let maxButtons: number = 40;

  switch (channelType) {
    case "Vkontakte":
      maxButtons = keyboardType === "DEFAULT" ? 40 : 10;
      break;

    case "WhatsApp":
      if (keyboardType === "DEFAULT") {
        maxButtons = 10;
      } else if (keyboardType === "INLINE") {
        maxButtons = buttonType === "LINK" ? 1 : 3;
      }
      break;

    case "Telegram":
      maxButtons = keyboardType === "INLINE" ? 10 : 40;
      break;

    default:
      console.log("Неизвестно");
      break;
  }

  return maxButtons;
};
