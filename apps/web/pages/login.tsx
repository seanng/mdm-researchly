import { AuthForm } from "components";
import { LOGIN } from "shared/constants";
import { GetServerSideProps } from "next";
import cookie from "cookie";

function Login(props) {
  return <AuthForm type={LOGIN} {...props} />;
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedCookies = cookie.parse(context.req.headers?.cookie ?? "");
  const token = parsedCookies[process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME] ?? null;
  return { props: { token } };
};
