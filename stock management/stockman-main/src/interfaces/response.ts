interface custJson {
  success: boolean;
  message: string;
}

export interface customRes extends custJson {
  [key: string]: any;
}
