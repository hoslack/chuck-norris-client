import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm, Resolver } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { SIGNIN } from '../queries';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'Email is required',
          },
        }
      : {},
  };
};

const SignIn: React.FC = () => {
  let history = useHistory();
  const { isAuth, setAuth } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm<FormValues>({ resolver })
  const [signIn] = useMutation(SIGNIN)
  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const response = await signIn({ variables: { email, password } })
      toast.success('Sign In was successful')
      await window.localStorage.setItem(
        'token',
        response.data.signIn.accessToken
      );
      setTimeout(() => {
        setAuth(true);
        history.push('/categories');
      }, 3000);
    } catch (err) {
      toast.error(err.message);
      history.push('/signin');
    }
  });
  if (isAuth) {
    history.push('/categories');
  }

  return (
    <div>
      <ToastContainer />
      <FormContainer>
        <FormHeader>Sign In</FormHeader>
        <form onSubmit={onSubmit}>
          <EmailInput name="email" placeholder="email" ref={register} />
          {errors?.email && <p>{errors.email.message}</p>}
          <PasswordInput
            name="password"
            type="password"
            placeholder="password"
            ref={register}
          />
          <SubmitButton type="submit" />
        </form>
      </FormContainer>
    </div>
  );
};

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 400px;
  height: 400px;
  margin: 7em auto;
  padding: 10px;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
`;
export const FormHeader = styled.p`
  display: flex;
  align-self: center;
  padding-top: 40px;
  margin-bottom: 40px;
  color: #4caf50;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 23px;
`;

export const EmailInput = styled.input`
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: 'Ubuntu', sans-serif;
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.18) !important;
  }
`;

export const PasswordInput = styled.input`
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: 'Ubuntu', sans-serif;
  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.18) !important;
  }
`;
export const SubmitButton = styled.input`
  cursor: pointer;
  border-radius: 5em;
  color: #fff;
  background: linear-gradient(to right, #4caf50, #81c784);
  border: 0;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-family: 'Ubuntu', sans-serif;
  margin-left: 35%;
  font-size: 13px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
`;

export default SignIn;
