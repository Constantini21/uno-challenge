import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dcdcdc;
  border-radius: 5px;
  padding: 60px;
  width: 100%;
  max-width: 600px;
  margin: 10px;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
`

export const ContainerTop = styled.form`
  display: flex;
  background-color: #dcdcdc;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
`

export const ContainerList = styled.div`
  display: flex;
  width: 100%;
  background-color: #dcdcdc;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
`

export const ContainerListItem = styled.div`
  background-color: #efefef;
  padding: 10px;
  border-radius: 5px;
  max-height: 400px;
  overflow: auto;
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`
