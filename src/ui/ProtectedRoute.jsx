import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
  height: 100dvh;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1 Get auth status
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      // 3 If not authenticated redirect to login
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 2 While loading return spinner in full page
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4 If authenticated return protected route
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
