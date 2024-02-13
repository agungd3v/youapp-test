import { Provider } from "react-redux";
import { store } from "../lib/store";

interface XProps {
  children: React.ReactNode;
}

export default function ReduxProvider({children}: XProps) {
  return <Provider store={store}>{children}</Provider>;
}