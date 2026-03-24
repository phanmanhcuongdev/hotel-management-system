import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-5xl',
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Use createPortal to render the modal at the end of document.body
  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto font-sans">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop (Mask) - Now definitely covering EVERYTHING because it's at the body level */}
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Container */}
        <div
          className={`relative w-full ${sizeStyles[size]} bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/40 transform transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 overflow-hidden`}
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-600 to-primary-400" />

          {/* Header */}
          <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50">
            <div>
              <h3 className="text-2xl font-black italic tracking-tight text-slate-900 uppercase">{title}</h3>
              <div className="mt-1 h-1 w-12 bg-primary-600 rounded-full" />
            </div>
            <button
              onClick={onClose}
              className="group flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500 hover:rotate-90"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="px-10 py-8 max-h-[80vh] overflow-y-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
