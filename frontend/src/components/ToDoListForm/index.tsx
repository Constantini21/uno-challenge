import { useRef, useState } from 'react'
import { FaTrashAlt, FaEdit, FaChevronDown, FaSearch, FaSave } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { getOperationName } from '@apollo/client/utilities'

import {
  ADD_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
  GET_TODO_LIST
} from '../../queries'

import * as Styles from './styles'
import Modal from '../Modal'

export default function ToDoListForm() {
  const toDoInputRef = useRef<HTMLInputElement>(null)
  const updateToDoInputRef = useRef<HTMLInputElement>(null)

  const [editingItem, setEditingItem] = useState<{ id: number; name: string } | null>(null)
  const [itemToDelete, setItemToDelete] = useState<{ id: number; name: string } | null>(null)
  const { data, fetchMore } = useQuery<{ todoList: { id: number; name: string }[] }>(GET_TODO_LIST)

  const [addItem] = useMutation(ADD_ITEM_MUTATION)
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION)
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.nativeEvent as SubmitEvent
    const button = target.submitter as HTMLButtonElement
    const action = button.getAttribute('data-action') as 'filter' | 'save' | 'edit'

    if (toDoInputRef.current?.value && ['filter', 'save'].includes(action)) {
      if (action === 'filter') {
        await onFilter()
      } else if (action === 'save') {
        await addItem({
          variables: {
            values: {
              name: toDoInputRef.current?.value
            }
          },
          awaitRefetchQueries: true,
          refetchQueries: [getOperationName(GET_TODO_LIST) as string]
        })

        toDoInputRef.current.value = ''
      }
    } else if (action === 'edit' && updateToDoInputRef.current?.value) {
      await updateItem({
        variables: {
          values: {
            id: editingItem?.id,
            name: updateToDoInputRef.current.value
          }
        },
        awaitRefetchQueries: true,
        refetchQueries: [getOperationName(GET_TODO_LIST) as string]
      })

      updateToDoInputRef.current.value = ''
      setEditingItem(null)
    }
  }

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteItem({
        variables: { id: itemToDelete.id },
        awaitRefetchQueries: true,
        refetchQueries: [getOperationName(GET_TODO_LIST) as string]
      })
      setItemToDelete(null)
    }
  }

  const onDelete = (item: { id: number; name: string }) => {
    setItemToDelete(item)
  }

  const onUpdate = (item: { id: number; name: string }) => {
    setEditingItem(item)
  }

  const onFilter = async () => {
    await fetchMore({
      variables: {
        filter: {
          name: toDoInputRef.current?.value
        }
      },
      updateQuery: (_prevQuery, newQuery) => newQuery.fetchMoreResult
    })
  }

  const closeEditModal = () => {
    setEditingItem(null)
    if (toDoInputRef.current) {
      toDoInputRef.current.value = ''
    }
  }

  return (
    <Styles.Container>
      <Styles.Title>TODO LIST</Styles.Title>

      <Styles.ContainerList>
        <Styles.ContainerTop onSubmit={onSubmit}>
          <input
            ref={toDoInputRef}
            onChange={async event => {
              if (!event.target.value) {
                await onFilter()
              }
            }}
            id='item'
            type='text'
            placeholder='Digite aqui'
            className='border-b-2 p-2 outline-none rounded'
          />

          <div className='flex space-x-2'>
            <button
              onClick={onFilter}
              className='bg-blue-500 text-white py-2 px-4 rounded w-full flex items-center justify-center'
              type='submit'
              data-action='filter'
            >
              <FaSearch className='mr-2' /> Filtrar
            </button>

            <button
              className='bg-green-500 text-white py-2 px-4 rounded w-full flex items-center justify-center'
              type='submit'
              data-action='save'
            >
              <FaSave className='mr-2' /> Salvar
            </button>
          </div>
        </Styles.ContainerTop>

        {!!data && !!data.todoList.length && (
          <Styles.ContainerListItem>
            <div className='flex flex-col'>
              {data.todoList.map(value => (
                <li
                  key={value.id}
                  className='flex justify-between items-center p-2 mt-2 mb-2 rounded border border-gray-200'
                >
                  <span>{value?.name}</span>
                  <div className='flex space-x-4'>
                    <FaEdit
                      onClick={() => onUpdate(value)}
                      className='cursor-pointer text-blue-500'
                    />
                    <FaTrashAlt
                      onClick={() => onDelete(value)}
                      className='cursor-pointer text-red-500'
                    />
                  </div>
                </li>
              ))}
            </div>
          </Styles.ContainerListItem>
        )}

        {!!data && data.todoList.length > 6 && (
          <div className='flex justify-center items-center mt-2'>
            <FaChevronDown className='text-gray-500 animate-bounce' />
          </div>
        )}
      </Styles.ContainerList>

      <Modal openned={!!editingItem} onClose={closeEditModal}>
        {!!editingItem && (
          <>
            <h2 className='text-lg font-semibold'>Editar Item</h2>
            <form onSubmit={onSubmit}>
              <input
                ref={updateToDoInputRef}
                type='text'
                defaultValue={editingItem.name}
                className='border-b-2 p-2 outline-none'
              />
              <div className='flex space-x-3 mt-4'>
                <button
                  type='submit'
                  className='bg-green-500 text-white py-2 px-4 rounded'
                  data-action='edit'
                >
                  Salvar
                </button>

                <button
                  type='button'
                  className='bg-red-500 text-white py-2 px-4 rounded'
                  onClick={closeEditModal}
                >
                  Fechar
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>

      <Modal openned={!!itemToDelete} onClose={() => setItemToDelete(null)}>
        {!!itemToDelete && (
          <>
            <h2 className='text-lg font-semibold'>Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir "{itemToDelete.name}"?</p>
            <div className='flex space-x-3 mt-4'>
              <button
                type='button'
                className='bg-red-500 text-white py-2 px-4 rounded'
                onClick={confirmDelete}
              >
                Excluir
              </button>

              <button
                type='button'
                className='bg-gray-500 text-white py-2 px-4 rounded'
                onClick={() => setItemToDelete(null)}
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </Modal>
    </Styles.Container>
  )
}
