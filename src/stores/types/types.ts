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
  text: string;
}
