import { GetServerSideProps } from "next";
import axios from "lib/axios";
import { InvitePrompt } from "components/InvitePrompt";
import cookie from "cookie";
import { useState } from "react";
import { DisplayMode } from "shared/types";

interface Props {
  success: boolean;
  collectionName: string;
  collectionId: string;
  token: string;
  setToken: (t: string) => void;
  displayMode: DisplayMode;
}

export default function Invite({
  success,
  collectionName,
  collectionId,
  token,
  displayMode: initialDisplayMode,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayMode, setDisplayMode] = useState(initialDisplayMode);

  const handleJoin = async () => {
    try {
      setIsSubmitting(true);
      const endpoint = `/collections/${collectionId}/join`;
      await axios.post(endpoint, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!chrome?.runtime) {
        setDisplayMode(DisplayMode.success);
        setIsSubmitting(false);
        return;
      }
      chrome.runtime.sendMessage(
        process.env.NEXT_PUBLIC_EXTENSION_ID,
        {
          message: "W_COLLECTION_JOIN",
        },
        () => {
          setDisplayMode(DisplayMode.success);
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      if (error.response?.status === 409) {
        setDisplayMode(DisplayMode.exists);
      }
    }
  };

  if (!success) {
    // TODO: Needs design.
    return (
      <div className="flex justify-center px-8 pt-8">Invite not found.</div>
    );
  }

  return (
    <InvitePrompt
      isSubmitting={isSubmitting}
      onJoin={handleJoin}
      collectionName={collectionName}
      mode={displayMode}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionId } = context.params;
  const parsedCookies = cookie.parse(context.req.headers?.cookie ?? "");
  const token =
    parsedCookies?.[process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME] ?? null;

  const props = {
    token,
    collectionId,
    success: true,
    collectionName: "",
    path: context.resolvedUrl,
    displayMode: DisplayMode.initial,
  };

  if (!token) {
    props.success = false;
    return {
      redirect: { destination: `/login?cb=${context.resolvedUrl}` },
      props,
    };
  }

  // if token, get cookie from context.req.headers.cookie, and attach to Authorization Bearer.
  // future: get invite details from server?
  try {
    const { data } = await axios.get(`/collections/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.collection.users.find((u) => u.userId === data.userId)) {
      props.displayMode = DisplayMode.exists;
    }
    props.collectionName = data.collection.name;
    return { props };
  } catch (error) {
    props.success = false;
    return { props };
  }
};
