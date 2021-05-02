import { useCallback, useMemo, useState } from "react";
import { RegistrationFormValues } from "../Components/RegistrationPage/RegistrationForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

type UserType = RegistrationFormValues & {
  picture: string;
};

const Text = styled.h5`
  margin: 0;
`;

const Body = styled.div`
  border-radius: 5px;
  padding: 20px;
  background: white;
`;

const Content = styled.div`
  display: flex;
`;

const Picture = styled.img`
  margin-right: 20px;
  padding: 10px;
`;

const CloseButton = styled.div`
  text-align: center;
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
  padding: 5px 0;
  border-radius: 1px;
  background: #f7f7f7;
  box-shadow: 5px 5px 1px #f0f0f0, -5px -5px 1px #fefefe;
  :hover {
    background: #eeeeee;
  }
`;

const UserCard = styled.div`
  height: 100vh;
  width: 100vw;
  background: #000000c7;
  position: absolute;
  align-items: center;
  display: flex;
  justify-content: center;
  z-index: 1050;
`;

export const useRegisterUser = () => {
  const [user, setUser] = useState<UserType>();
  const toggleModal = useCallback(() => {
    setUser(undefined);
  }, []);
  const register = useCallback(async (values: RegistrationFormValues) => {
    try {
      const userData = await fetch("http://13.235.55.43/test/api/create_user", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => res.json());
      toast.success(`USER ${userData.STATUS} SUCCESSFULLY`, {
        hideProgressBar: true,
        autoClose: 5000,
      });
      setUser(userData.data);
    } catch (error) {
      toast.error("Error occured while creating user", {
        hideProgressBar: true,
        autoClose: 5000,
      });
    }
  }, []);
  const userCard = useMemo(() => {
    return (
      <>
        {user && (
          <UserCard>
            <Body>
              <Content>
                <Picture src={user?.picture} alt="user-pic" />
                <div>
                  <Text>First Name: {user?.first_name}</Text>
                  <Text>Last Name: {user?.last_name}</Text>
                  <Text>Email: {user?.email}</Text>
                  <Text>Phone Number: {user?.phone}</Text>
                  <Text>
                    LinkedIn Profile:{" "}
                    <a
                      href={user?.linkedInProfile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user?.linkedInProfile}
                    </a>
                  </Text>
                </div>
              </Content>
              <CloseButton onClick={toggleModal}>Close</CloseButton>
            </Body>
          </UserCard>
        )}
        <ToastContainer />
      </>
    );
  }, [toggleModal, user]);
  return [userCard, register] as const;
};
