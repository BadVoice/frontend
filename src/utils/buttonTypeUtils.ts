export const getSupportedButtonTypes = (
  channelType: string,
  keyboardType: string
): string[] => {
  if (channelType === "Vkontakte") {
    return ["LINK", "TEXT"];
  } else if (channelType === "WhatsApp") {
    if (keyboardType === "DEFAULT") {
      return ["TEXT"];
    } else {
      return ["LINK", "TEXT"];
    }
  } else if (channelType === "Telegram") {
    if (keyboardType === "DEFAULT") {
      return ["TEXT"];
    } else {
      return ["LINK", "TEXT"];
    }
  }
  return [];
};
