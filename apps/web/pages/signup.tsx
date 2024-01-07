import { AuthForm } from 'components';
import { SIGNUP } from 'shared/constants';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

function Signup(props) {
  return <AuthForm type={SIGNUP} {...props} />;
}

export default Signup;

/**
 * Parses the cookie from the server side, and passes it to the AuthForm component.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedCookies = cookie.parse(context.req.headers?.cookie ?? '');
  const token = parsedCookies[process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME] ?? null;
  return { props: { token } };
};
