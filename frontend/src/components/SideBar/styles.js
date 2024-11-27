import styled from 'styled-components';

export const Container = styled.div`
  background-color: #019d85;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width:250px;
  animation: showSidebar .4s;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 250px;
    }
  }

  .divLogo, svg {
    display: flex;
    justify-content: flex-start;
    > svg {
    /* position: fixed; */
    color: white;
    height: 30px;
    margin-top: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 250px;
    }
   }
  }
  div img {
    /* width: 6rem; */
  }
  img {
    margin-top: 12px;
    height: 90px;
    width: 120px;
  }


`;

export const Content = styled.div`
  margin-top: 50px;
`;