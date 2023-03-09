import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function Page() {
  const Auth = useSelector((state) => state.Auth.Auth);

  return (
    <View>
      <Text>{Auth}</Text>
    </View>
  );
}
