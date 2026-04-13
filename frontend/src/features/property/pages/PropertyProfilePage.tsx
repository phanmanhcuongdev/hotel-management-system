import { useEffect, useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Card, CardContent, CardHeader, Input, Select } from '../../../components/ui'
import type { PropertyProfile, UpdatePropertyProfileRequest } from '../../../types'
import { useAuth } from '../../auth/useAuth'
import { usePropertyProfile, useUpdatePropertyProfile } from '../hooks/usePropertyProfile'

const starLevelOptions = [
  { value: '1', label: '1 Star' },
  { value: '2', label: '2 Stars' },
  { value: '3', label: '3 Stars' },
  { value: '4', label: '4 Stars' },
  { value: '5', label: '5 Stars' },
]

const emptyForm: UpdatePropertyProfileRequest = {
  name: '',
  starLevel: 4,
  address: '',
  description: '',
}

export default function PropertyProfilePage() {
  const { user } = useAuth()
  const isAdmin = user?.role?.trim().toUpperCase() === 'ADMIN'

  const [formState, setFormState] = useState<UpdatePropertyProfileRequest>(emptyForm)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const { data: profile, isLoading, error } = usePropertyProfile({ enabled: isAdmin })
  const updatePropertyProfile = useUpdatePropertyProfile()

  useEffect(() => {
    if (!profile) {
      return
    }

    setFormState({
      name: profile.name,
      starLevel: profile.starLevel,
      address: profile.address,
      description: profile.description ?? '',
    })
  }, [profile])

  const pageErrorMessage =
    (error instanceof Error && error.message) ||
    (updatePropertyProfile.error instanceof Error && updatePropertyProfile.error.message) ||
    null

  const hasChanges = useMemo(() => {
    if (!profile) {
      return false
    }

    return (
      formState.name !== profile.name ||
      formState.starLevel !== profile.starLevel ||
      formState.address !== profile.address ||
      (formState.description || '') !== (profile.description ?? '')
    )
  }, [formState, profile])

  const handleFieldChange = (field: keyof UpdatePropertyProfileRequest, value: string | number) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
    setFeedbackMessage(null)
  }

  const handleReset = () => {
    if (!profile) {
      return
    }

    setFormState({
      name: profile.name,
      starLevel: profile.starLevel,
      address: profile.address,
      description: profile.description ?? '',
    })
    setFeedbackMessage(null)
  }

  const handleSubmit = () => {
    updatePropertyProfile.mutate(
      {
        name: formState.name.trim(),
        starLevel: formState.starLevel,
        address: formState.address.trim(),
        description: formState.description?.trim() || '',
      },
      {
        onSuccess: (updatedProfile) => {
          syncFormWithProfile(updatedProfile, setFormState)
          setFeedbackMessage('Property profile was updated.')
        },
      },
    )
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
        You do not have access to property settings.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
        {pageErrorMessage || 'Property profile not found.'}
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Property Settings</h1>
          <p className="mt-1 font-medium text-slate-500">
            Manage the single hotel profile used across this back-office product. This scope remains single-property.
          </p>
        </div>
      </div>

      {pageErrorMessage && <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{pageErrorMessage}</div>}
      {feedbackMessage && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{feedbackMessage}</div>}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Current Property Profile" subtitle="Operational reference for the hotel this system manages." icon="apartment" />
          <CardContent className="space-y-4">
            <SnapshotField label="Property Name" value={profile.name} />
            <SnapshotField label="Star Level" value={renderStarLevel(profile.starLevel)} />
            <SnapshotField label="Address" value={profile.address} />
            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Description</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{profile.description || 'No description provided.'}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader title="Edit Property Profile" subtitle="Keep hotel identity and address data current for internal operations." icon="edit_square" />
          <CardContent className="space-y-5">
            <Input
              id="property-name"
              label="Property Name"
              value={formState.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
              placeholder="Enter property name"
            />

            <Select
              id="property-star-level"
              label="Star Level"
              value={String(formState.starLevel)}
              onChange={(event) => handleFieldChange('starLevel', Number(event.target.value))}
              options={starLevelOptions}
            />

            <div>
              <label htmlFor="property-address" className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="property-address"
                className="block min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formState.address}
                onChange={(event) => handleFieldChange('address', event.target.value)}
                placeholder="Enter property address"
              />
            </div>

            <div>
              <label htmlFor="property-description" className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="property-description"
                className="block min-h-32 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formState.description ?? ''}
                onChange={(event) => handleFieldChange('description', event.target.value)}
                placeholder="Add a short property description for internal reference"
                maxLength={500}
              />
              <p className="mt-1 text-xs font-medium text-slate-500">{(formState.description ?? '').length}/500 characters</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              This module manages the current hotel profile only. It does not enable multi-property setup or switching.
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={handleReset} disabled={!hasChanges || updatePropertyProfile.isPending}>
                Reset
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={!hasChanges || updatePropertyProfile.isPending}>
                {updatePropertyProfile.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SnapshotField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function renderStarLevel(starLevel: number) {
  return `${'★'.repeat(starLevel)} (${starLevel} ${starLevel === 1 ? 'star' : 'stars'})`
}

function syncFormWithProfile(
  profile: PropertyProfile,
  setFormState: Dispatch<SetStateAction<UpdatePropertyProfileRequest>>,
) {
  setFormState({
    name: profile.name,
    starLevel: profile.starLevel,
    address: profile.address,
    description: profile.description ?? '',
  })
}
