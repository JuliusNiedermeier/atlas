import { Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";

export default function Index() {
  return (
    <>
      <SystemBars style="auto" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </>
  );
}
