import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { toast } from 'react-toastify'
import { SIGNUP } from '../queries'


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

const  SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormValues>({ resolver });
  const [signUp, {loading, error, data}] = useMutation(SIGNUP)
  const onSubmit = handleSubmit(async ({email, password }) => {
    try{
    await signUp({ variables: { email, password } });
    console.log(data)
    }  catch(err){
        toast.error(err.message)
        console.log(err.message);
    }
});

  return (
    <form onSubmit={onSubmit}>
      <input name="email" placeholder="email" ref={register} />
      {errors?.email && <p>{errors.email.message}</p>}
      
      <label>Password</label>
      <input name="password" type='password' ref={register} />

      <input type="submit" />
    </form>
  );
}

export default SignIn
