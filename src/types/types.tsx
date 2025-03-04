export interface ChannelsProps {
    id: number;
    name: string;
    hidden: boolean;
    description: string;
    image: string;
    subscribers: number;
  }

  export interface CategoryResponse {
    id: string
    name: string
    translit_name: string
    channels_count: number
}
  
  export interface recRes {
    name: string;
    translit_name: string;
    description: string;
    image: string;
  }