export interface RequestState<TData> {
  data?: TData;
  isLoading: boolean;
  error?: string;
}
