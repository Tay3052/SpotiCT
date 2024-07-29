import React, { useState } from "react";
import styled from "styled-components";
import { Button, Heading, Input, Center } from "@yamada-ui/react";
import { registerWithEmailAndPassword } from "../auth/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { createUser } from "../database/addUserInfo";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトのフォーム送信動作を防ぐ

    setLoading(true);
    setError(null);

    if (password !== password2) {
      setError("パスワードが一致しません");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("パスワードは6文字以上である必要があります");
      setLoading(false);
      return;
    }

    try {
      const userInfo = await registerWithEmailAndPassword(email, password);
      const detail = {
        id: userInfo.uid,
        email: email,
        username: username,
        age: age,
        createdAt: new Date(),
      };
      await createUser(detail);
      console.log("User info created:", detail);

      setUsername("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setAge(0);
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpContainer>
      <Center>
        <Heading style={{ margin: "0 0 20px 0" }}>Sign Up</Heading>
      </Center>

      <form onSubmit={handleSignUp}>
        <label htmlFor="username">ユーザー名</label>
        <InputForm
          type="text"
          name="username"
          placeholder="UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <label htmlFor="email">メールアドレス</label>
        <InputForm
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <label htmlFor="password">パスワード</label>
        <InputForm
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <label htmlFor="password2">パスワード確認</label>
        <InputForm
          type="password"
          name="password2"
          placeholder="Password Config"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required={true}
        />
        <label htmlFor="age">年齢</label>
        <InputForm
          type="number"
          name="age"
          placeholder="Age"
          value={age !== null ? age.toString() : ""}
          onChange={(e) =>
            setAge(e.target.value !== "" ? parseInt(e.target.value) : 0)
          }
          required={true}
        />
        <Center>
          <Button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "SIgn Up"}
          </Button>
        </Center>
      </form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
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
