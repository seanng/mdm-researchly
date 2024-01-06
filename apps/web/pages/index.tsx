import { GetServerSideProps } from "next";

export default function Landing() {
  return (
    <div className="flex justify-center px-8 pt-8">
      <div className="w-full max-w-s">The landing page goes here.</div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: { destination: `/login` },
    props: {},
  };
};
