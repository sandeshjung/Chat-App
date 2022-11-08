import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login, register } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 690px;
  max-width: 100%;
  min-height: 500px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [signIn, toggle] = useState(true);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error: registerError, userInfo: registerUserInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { error: loginError, userInfo: loginUserInfo } = userLogin;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")[1]
    : "/chat";

  useEffect(() => {
    if (loginUserInfo || registerUserInfo) {
      navigate(redirect);
    }
  }, [navigate, loginUserInfo, registerUserInfo, redirect]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const signupHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <Container>
        <SignUpContainer signinIn={signIn}>
          <Form onSubmit={signupHandler}>
            <Title>Create Account</Title>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {message && <Message variant="danger">{message}</Message>}
            {registerError && (
              <Message variant="danger">{registerError}</Message>
            )}

            <Button>Sign Up</Button>
          </Form>
        </SignUpContainer>

        <SignInContainer signinIn={signIn}>
          <Form onSubmit={loginHandler}>
            <Title>Sign in</Title>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {message && <Message variant="danger">{message}</Message>}
            {loginError && <Message variant="danger">{loginError}</Message>}
            <Anchor href="#">Forgot your password?</Anchor>
            <Button>Sigin In</Button>
          </Form>
        </SignInContainer>

        <OverlayContainer signinIn={signIn}>
          <Overlay signinIn={signIn}>
            <LeftOverlayPanel signinIn={signIn}>
              <Title style={{ color: "#fff" }}>Welcome Back!</Title>
              <Paragraph>
                To keep connected with your friends please login with your
                personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signinIn={signIn}>
              <Title style={{ color: "#fff" }}>Hello!</Title>
              <Paragraph>
                Enter Your personal details and start chatting
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sigin Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </>
  );
};

export default LoginScreen;
