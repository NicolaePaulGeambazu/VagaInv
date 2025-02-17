export type AssetType = "crypto" | "stock" | "fiat" | "bond" | "commodity";

export interface Portfolio {
  id: string;
  asOf: string;
  positions: Position[];
}

export interface Position {
  id: number;
  asset: string;
  quantity: number;
  asOf?: string;
  price?: number;
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
}

export interface Price {
  id: string;
  asset: string;
  price: number;
}

export interface SignUpFormInputs {
  email: string;
  password: string;
}

export type DatePickerRangeProps = {
  mode: "range";
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  fromLabel?: string;
  toLabel?: string;
};

export type DatePickerSingleProps = {
  mode: "single";
  date: string;
  onDateChange: (date: string) => void;
  label?: string;
};

export type DatePickerProps = DatePickerRangeProps | DatePickerSingleProps;
