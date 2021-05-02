import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  witdh: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const RouteButton = styled.div`
  cursor: pointer;
  padding: 50px 80px;
  border-radius: 50px;
  background: #f7f7f7;
  box-shadow: 20px 20px 60px #d2d2d2, -20px -20px 60px #ffffff;
  :hover {
    background: #eeeeee;
  }
`;

function Home({ history }: RouteComponentProps) {
  return (
    <Container>
      <RouteButton onClick={() => history.push("/ocean/register")}>
        Ocean
      </RouteButton>
      <RouteButton onClick={() => history.push("/forest/register")}>
        Forest
      </RouteButton>
      <RouteButton onClick={() => history.push("/desert/register")}>
        Desert
      </RouteButton>
    </Container>
  );
}

export default Home;
