import type { AxiosError } from 'axios'

export function getErrorMessage(err: unknown): string {
  if ((err as AxiosError<{ message?: string }>)?.response?.data?.message) {
    return (err as AxiosError<{ message?: string }>).response!.data!.message!
  }

  if (err instanceof Error) {
    return err.message
  }

  return 'Something went wrong'
}
