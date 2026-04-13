import { useDeferredValue, useMemo, useState } from 'react'
import { Button, Card, CardContent, CardHeader, Table } from '../../../components/ui'
import type { CreateUserRequest, UpdateUserRequest, User } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { UserFormModal } from '../components/UserFormModal'
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from '../hooks/useUsers'

export default function UserListPage() {
  const { user: currentUser } = useAuth()
  const isAdmin = currentUser?.role?.trim().toUpperCase() === 'ADMIN'

  const [searchValue, setSearchValue] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const deferredSearchValue = useDeferredValue(searchValue.trim())

  const { data: users = [], isLoading, error } = useUsers(
    { keyword: deferredSearchValue || undefined },
    { enabled: isAdmin },
  )
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const pageErrorMessage =
    (error instanceof Error && error.message) ||
    (createUser.error instanceof Error && createUser.error.message) ||
    (updateUser.error instanceof Error && updateUser.error.message) ||
    (deleteUser.error instanceof Error && deleteUser.error.message) ||
    null

  const columns = useMemo(
    () => [
      { key: 'username', header: 'Username' },
      { key: 'fullName', header: 'Full Name' },
      { key: 'position', header: 'Role' },
      {
        key: 'mail',
        header: 'Email',
        render: (item: User) => item.mail || '-',
      },
      {
        key: 'description',
        header: 'Description',
        render: (item: User) => item.description || '-',
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (item: User) => (
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="rounded-lg"
              onClick={() => {
                setEditingUser(item)
                setModalOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              size="sm"
              variant="danger"
              className="rounded-lg"
              onClick={() => {
                if (confirm(`Delete user ${item.username}?`)) {
                  deleteUser.mutate(item.id, {
                    onSuccess: () => {
                      setFeedbackMessage(`User ${item.username} was deleted.`)
                    },
                  })
                }
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [deleteUser],
  )

  const handleCreate = (data: CreateUserRequest) => {
    createUser.mutate(data, {
      onSuccess: () => {
        setModalOpen(false)
        setEditingUser(null)
        setFeedbackMessage(`User ${data.username} was created.`)
      },
    })
  }

  const handleUpdate = (data: UpdateUserRequest) => {
    if (!editingUser) {
      return
    }

    updateUser.mutate(
      { id: editingUser.id, data },
      {
        onSuccess: () => {
          setModalOpen(false)
          setEditingUser(null)
          setFeedbackMessage(`User ${data.username} was updated.`)
        },
      },
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to user management.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">User Management</h1>
          <p className="mt-1 font-medium text-slate-500">Manage the internal admin accounts that operate this property.</p>
        </div>

        <Button
          onClick={() => {
            setEditingUser(null)
            setModalOpen(true)
          }}
          className="rounded-2xl bg-primary-600 px-8 py-6 shadow-xl shadow-primary-200 hover:bg-primary-500"
        >
          <span className="material-symbols-outlined mr-2">person_add</span>
          Create User
        </Button>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}
      {feedbackMessage && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{feedbackMessage}</div>}

      <Card className="border-none shadow-2xl shadow-slate-200/50">
        <CardHeader
          title="User Directory"
          subtitle={`${users.length} user account(s) in the current result`}
          icon="group"
          action={
            <div className="group flex w-64 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 p-1 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100">
              <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search username, full name, email..."
                className="w-full border-none bg-transparent px-2 py-1.5 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          }
        />
        <CardContent noPadding>
          <Table columns={columns} data={users} keyExtractor={(item) => item.id} loading={isLoading} emptyMessage="No users found." />
        </CardContent>
      </Card>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingUser(null)
        }}
        user={editingUser}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        loading={createUser.isPending || updateUser.isPending}
      />
    </div>
  )
}
