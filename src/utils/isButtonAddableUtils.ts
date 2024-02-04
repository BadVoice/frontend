export const isButtonAddable = (
  channelType: string,
  keyboardType: string,
  buttonType: string,
  buttonText: string
): string | null => {
  let maxLength = null;

  if (
    channelType === "WhatsApp" &&
    (keyboardType === "DEFAULT" || keyboardType === "INLINE")
  ) {
    maxLength = 20;
  } else if (channelType === "Vkontakte" && keyboardType === "DEFAULT") {
    maxLength = 40;
  } else if (channelType === "Telegram" && keyboardType === "INLINE") {
    maxLength = 64;
  }

  if (maxLength !== null && buttonText.length > maxLength) {
    buttonText = buttonText.substring(0, maxLength);
  }

  return buttonText;
};
