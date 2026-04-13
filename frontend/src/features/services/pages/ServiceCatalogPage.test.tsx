import { render, screen } from '@testing-library/react'
import ServiceCatalogPage from './ServiceCatalogPage'

const useAuthMock = vi.fn()
const useServiceCatalogMock = vi.fn()
const useCreateServiceMock = vi.fn()
const useUpdateServiceMock = vi.fn()
const useDeleteServiceMock = vi.fn()

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => useAuthMock(),
}))

vi.mock('../hooks/useServiceCatalog', () => ({
  useServiceCatalog: (...args: unknown[]) => useServiceCatalogMock(...args),
  useCreateService: () => useCreateServiceMock(),
  useUpdateService: () => useUpdateServiceMock(),
  useDeleteService: () => useDeleteServiceMock(),
}))

describe('ServiceCatalogPage', () => {
  beforeEach(() => {
    useAuthMock.mockReset()
    useServiceCatalogMock.mockReset()
    useCreateServiceMock.mockReset()
    useUpdateServiceMock.mockReset()
    useDeleteServiceMock.mockReset()

    useCreateServiceMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useUpdateServiceMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
    useDeleteServiceMock.mockReturnValue({ isPending: false, mutate: vi.fn(), error: null })
  })

  it('shows access denied state for non-admin and disables catalog query', () => {
    useAuthMock.mockReturnValue({
      user: { id: '2', name: 'Staff User', email: 'staff@hotel.local', role: 'STAFF', initials: 'SU' },
    })
    useServiceCatalogMock.mockReturnValue({ data: [], isLoading: false, error: null })

    render(<ServiceCatalogPage />)

    expect(screen.getByText(/You do not have permission to access service catalog management/i)).toBeInTheDocument()
    expect(useServiceCatalogMock).toHaveBeenCalledWith({ enabled: false })
  })
})
