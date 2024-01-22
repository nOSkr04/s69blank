/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "../context/ctx";

export let store: any;

export const connectStore = () => {
  const { session } = useSession();
  store = session;
};
