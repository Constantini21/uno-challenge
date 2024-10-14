import { FaTimes } from 'react-icons/fa'

interface ModalProps {
  openned: boolean
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ openned, children, onClose }: ModalProps) {
  if (!openned) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 gap-6'>
      <div
        className='relative flex flex-col items-center justify-center gap-4 bg-white p-6 rounded shadow-lg'
        style={{
          width: '30rem',
          height: '25rem',
          margin: '10px'
        }}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-black'
          aria-label='Close modal'
        >
          <FaTimes size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}
