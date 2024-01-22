import { Dialouge } from "./dialouge";
import { Direction } from "./direction";

export interface Play {
  _id: any;
  title: string;
  author_first_name: string;
  author_last_name: string;
  act: number;
  scene: number;
  direction: string
  interaction: Array<Direction | Dialouge>
}
