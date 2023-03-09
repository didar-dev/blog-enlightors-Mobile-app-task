import { Slot } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
export default function AppLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
