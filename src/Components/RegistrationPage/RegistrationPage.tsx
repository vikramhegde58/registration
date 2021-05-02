import React from "react";
import { RouteComponentProps } from "react-router";
import RegistrationForm from "./RegistrationForm";
import styled from "styled-components";
import { primaryColors } from "../../colorUtility";
import { useRegisterUser } from "../../Hooks/useRegisterUser";

const Container = styled.div<{ colorKey?: string }>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  ${({ colorKey }) => colorKey && `background:  ${primaryColors[colorKey]}`};
`;

function RegistrationPage({ match }: RouteComponentProps<{ place?: string }>) {
  const place = match.params.place;
  const [userCard, register] = useRegisterUser();
  return (
    <>
      {userCard}
      <Container colorKey={place}>
        <RegistrationForm title={place} onSubmit={register} />
      </Container>
    </>
  );
}

export default RegistrationPage;
