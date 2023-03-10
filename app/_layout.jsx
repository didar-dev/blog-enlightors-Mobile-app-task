import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function AppLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ff9c0c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Provider>
  );
}
