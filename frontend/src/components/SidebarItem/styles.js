import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #019d85; 
  font-size: 16px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom:20px;
  > svg {
    margin: 0 15px;
  }
  &:hover {
    background-color: #fff;
    color:#162044
  }
`;