import { gql } from '@apollo/client'

const CATEGORIES = gql`{
    categories
  }`

const SIGNUP = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password){
      email
    }
  }
`;

const SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email,  password: $password){
      accessToken
    }
  }
`;


const JOKE = gql`
  query joke($category: String!){
    joke(category: $category) {
      id,
      value,
      icon_url,
    }
  }
`;

export {
  SIGNUP,
  SIGNIN,
  JOKE,
  CATEGORIES

};
