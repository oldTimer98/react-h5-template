import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import type { ApiResponse } from '@/types/api'

/**
 * 通用 GET 请求 hook
 *
 * @example 基础
 * const { data, isLoading } = useGet(['todos'], () => todoApi.getList())
 *
 * @example 带参数（参数变化自动重新请求）
 * const { data } = useGet(['todos', page], () => todoApi.getList({ _page: page }))
 *
 * @example 条件请求
 * const { data } = useGet(['todo', id], () => todoApi.getById(id!), { enabled: !!id })
 */
export function useGet<T>(
  queryKey: unknown[],
  queryFn: () => Promise<ApiResponse<T>>,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({ queryKey, queryFn, ...options })
}

/**
 * 通用 POST/PUT/DELETE 请求 hook
 *
 * @example 基础
 * const { mutate } = useMutate((data: CreateParams) => todoApi.create(data))
 *
 * @example 成功后自动刷新列表
 * const { mutate } = useMutate(
 *   (data: CreateParams) => todoApi.create(data),
 *   { invalidateKeys: [['todos']] }
 * )
 */
export function useMutate<T, D = void>(
  mutationFn: (data: D) => Promise<ApiResponse<T>>,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, D>, 'mutationFn'> & {
    invalidateKeys?: unknown[][]
  },
) {
  const qc = useQueryClient()
  const { invalidateKeys, ...rest } = options ?? {}

  return useMutation({
    mutationFn,
    onSuccess: (...args) => {
      invalidateKeys?.forEach((key) => qc.invalidateQueries({ queryKey: key }))
      rest.onSuccess?.(...args)
    },
    ...rest,
  })
}
