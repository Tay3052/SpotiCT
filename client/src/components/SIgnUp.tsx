import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Heading,
  Input,
  Center,
  Select,
  Option,
} from "@yamada-ui/react";
import { registerWithEmailAndPassword } from "../auth/FirebaseAuth";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("男");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      await registerWithEmailAndPassword(email, password);
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
        />
        <label htmlFor="email">メールアドレス</label>
        <InputForm
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">パスワード</label>
        <InputForm
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password2">パスワード確認</label>
        <InputForm
          type="password"
          name="password2"
          placeholder="Password Config"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
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
        />
        <label htmlFor="gender">性別</label>
        <Select
          placeholder="性別を選択"
          name="gender"
          value={gender}
          onChange={setGender}
          style={{ margin: "0 0 20px 0" }}>
          <Option value="男">Man</Option>
          <Option value="女">Woman</Option>
          <Option value="その他">Other</Option>
        </Select>
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
