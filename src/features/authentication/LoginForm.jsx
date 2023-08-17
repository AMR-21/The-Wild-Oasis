import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import { useUser } from "./useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import { getCurrentUser } from "../../services/apiAuth";

function LoginForm() {
  const [email, setEmail] = useState("amrlfc2001@gmail.com");
  const [password, setPassword] = useState("testabcd");
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();
  const { isAuthenticated, isLoading: isLoadingUser } = useUser();

  useEffect(
    function () {
      if (isAuthenticated && !isLoadingUser) navigate("/", { replace: true });
    },
    [isAuthenticated, isLoadingUser, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  getCurrentUser();

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoading ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
