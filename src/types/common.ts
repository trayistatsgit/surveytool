export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  errors: boolean;
  success: boolean;
}
