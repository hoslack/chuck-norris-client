import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm, Resolver } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { SIGNUP } from '../queries';
import AuthContext from '../context/AuthContext';
import {
  SubmitButton,
  PasswordInput,
  EmailInput,
  FormHeader,
  FormContainer,
} from './SignIn';

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
  const { register, handleSubmit, errors } = useForm<FormValues>({ resolver });
  const [signUp, {}] = useMutation(SIGNUP);
  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const response = await signUp({ variables: { email, password } });
      toast.success(
        `Welcome ${response.data.signUp.email} Sign Up was successful, please login`
      );
      setAuth(false);
      setTimeout(() => {
        history.push('/signin');
      }, 3000);
    } catch (err) {
      toast.error(err.message);
    }
  });

  if (isAuth) {
    history.push('/categories');
  }

  return (
    <div>
      <ToastContainer />
      <FormContainer>
        <FormHeader>Sign Up</FormHeader>
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

export default SignIn;
