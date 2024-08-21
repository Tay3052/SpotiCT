import { loginWithEmailAndPassword } from "../auth/FirebaseAuth";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Heading, Center, Button } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import { getData } from "../database/dbFunc";
import { setCookieSession } from "../auth/Session";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ id: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("users", "email", "==", email);
      setData(data);
    };

    fetchData();
  }, [email]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトのフォーム送信動作を防ぐ
    setLoading(true);
    setError(null);

    try {
      const login = await loginWithEmailAndPassword(email, password);
      if (login.uid === data[0].id) {
        setCookieSession("uid", login.uid);
      } else {
        setError("ユーザーが存在しません");
      }
      console.log(login);
      console.log(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <SignInContainer>
      <Center>
        <Heading style={{ margin: "0 0 20px 0" }}>Sign In</Heading>
      </Center>

      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <InputForm
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <InputForm
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Center>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </Center>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </SignInContainer>
  );
};

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const InputForm = styled(Input)`
  margin: 0 0 20px 0;
`;
