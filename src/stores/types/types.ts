export interface ICompany {
  id: number;
  name: string;
}

export interface IChannel {
  id: number;
  company_id: number;
  app_name: string;
  channel_name: string;
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  channel_id: number;
  text?: string;
  keyboards?: IKeyboard[];
}

enum IKeyboardType {
  TEXT = "TEXT",
  INLINE = "INLINE",
}

export interface IKeyboard {
  id: number;
  message_id: number;
  type: IKeyboardType;
  buttons: IButton[];
}

enum IButtonType {
  TEXT = "TEXT",
  LINK = "LINK",
}

export interface IButton {
  id: number;
  content: string;
  keyboard_id: number;
  type: IButtonType;
}
