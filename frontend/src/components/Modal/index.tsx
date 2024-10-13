interface ModalProps {
  openned: boolean
  children: React.ReactNode
}

export default function Modal({ openned, children }: ModalProps) {
  if (!openned) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 gap-6'>
      <div
        className='flex flex-col items-center justify-center gap-4 bg-white p-6 rounded shadow-lg '
        style={{
          width: '30rem',
          height: '25rem',
          margin: '10px'
        }}
      >
        {children}
      </div>
    </div>
  )
}
