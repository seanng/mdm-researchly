import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { PrimaryButtonWide, NavLink, Input, Logo } from 'ui';
import { EMAIL_REGEX, LOGIN, SIGNUP } from 'shared/constants';
import { setAuthCookie } from 'utils/helpers';
import axios from 'lib/axios';

const texts = {
  heading: {
    [LOGIN]: 'Sign in',
    [SIGNUP]: 'Sign up',
  },
  submitButton: {
    [LOGIN]: 'Sign in',
    [SIGNUP]: 'Sign up',
  },
  switchViewPrompt: {
    [LOGIN]: 'No account yet?',
    [SIGNUP]: 'Already have an account?',
  },
  switchViewLink: {
    [LOGIN]: 'Sign up',
    [SIGNUP]: 'Sign in',
  },
  postRoute: {
    [LOGIN]: '/auth/login',
    [SIGNUP]: '/auth/signup',
  },
};

/**
 * This is the main component, used by the Login and Signup screens.
 * It uses the react-hook-form library for form validation and submission.
 */
export function AuthForm({ type = LOGIN, token }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  const authCallback = (resolve) => {
    const { searchParams } = new URL(window.location.href);
    if (searchParams.get('cb')) {
      router.push(searchParams.get('cb'));
      resolve(null);
      return;
    }
    setIsAuthenticated(true);
    resolve(null);
  };

  /**
   * When the form is submitted, we make a POST request to the backend and transmit a message to the popup extension.
   */
  const onSubmit = async (input: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const { data } = await axios.post(texts.postRoute[type], {
        email: input.email,
        password: input.password,
      });
      setAuthCookie(data.token);
      // Promisify background response so isSubmitting stays true
      await new Promise((resolve) => {
        if (!chrome?.runtime) {
          console.log('Chrome runtime could not be found!');
          authCallback(resolve);
          return;
        }
        console.log(
          'Chrome runtime found. Extension ID: ',
          process.env.NEXT_PUBLIC_EXTENSION_ID
        );
        chrome.runtime.sendMessage(
          process.env.NEXT_PUBLIC_EXTENSION_ID,
          {
            message: 'W_USER_AUTHENTICATE',
            data: { token: data.token },
          },
          () => authCallback(resolve)
        );
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        setError('email', {
          type: 'manual',
          message: 'Email and password do not match',
        });
      } else if (e?.response?.status === 409) {
        setError('email', {
          type: 'manual',
          message: 'This email is already registered',
        });
      } else {
        console.log('error in authenticate', e?.response);
        throw e;
      }
    }
  };

  return isAuthenticated ? (
    <AuthenticatedView />
  ) : (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <style jsx global>{`
        body {
          background-color: #f9fafb;
        }
      `}</style>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900 leading-7">
          {texts.heading[type]}
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              inputType="email"
              name="email"
              error={errors.email}
              label="Email"
              inputProps={{
                placeholder: 'hello@example.com',
                ...register('email', {
                  required: true,
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Enter a valid email address',
                  },
                }),
              }}
            />
            <Input
              inputType="password"
              name="password"
              label="Password"
              error={errors.password}
              inputProps={{
                placeholder: 'At least 8 characters',
                ...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                }),
              }}
            />
            {type === SIGNUP && (
              <Input
                inputType="password"
                name="passwordConfirm"
                error={errors.passwordConfirm}
                label="Confirm password"
                inputProps={{
                  ...register('passwordConfirm', {
                    required: true,
                    validate: (v) =>
                      v === password || 'The passwords do not match',
                  }),
                }}
              />
            )}
            {/* {type === LOGIN && (
              <div className="flex items-center justify-end">
                <NavLink href="#">Forgot your password?</NavLink>
              </div>
            )} */}
            <PrimaryButtonWide type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="loader ease-linear rounded-full border-2 border-gray-200 h-5 w-5" />
              ) : (
                texts.submitButton[type]
              )}
            </PrimaryButtonWide>
          </form>
          <div className="mt-6">
            {/* Uncomment for Social Logins */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <FacebookButton />
              <GoogleButton />
            </div> */}
            <div className="mt-6 flex justify-center text-sm font-normal text-gray-900">
              {texts.switchViewPrompt[type]}
              <span>
                <NavLink
                  href={type === LOGIN ? '/signup' : '/login'}
                  className="ml-2"
                >
                  {texts.switchViewLink[type]}
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthenticatedView() {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <style jsx global>{`
        body {
          background-color: #f9fafb;
        }
      `}</style>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900 leading-7">
          You're signed in!
        </h2>
        <div className="mt-4 text-center text-sm font-normal">
          You may close this page and continue on the extension pop-up.
        </div>
      </div>
    </div>
  );
}
