export type FormatConfig = {
  pattern?: {
    ident?: string;
    literal?: string;
    string?: string;
  };
};

export type FormatValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | bigint
  | Date
  | Uint8Array
  | Record<string, unknown>
  | Array<unknown>;
