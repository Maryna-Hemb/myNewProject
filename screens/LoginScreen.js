import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isShown, setIsShown] = useState(true);
  const [focusColorLogin, setfocusColorLogin] = useState("#E8E8E8");
  const [focusColorEmail, setfocusColorEmail] = useState("#E8E8E8");
  const [focusColorPasword, setfocusColorPasword] = useState("#E8E8E8");
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeigth, setWindowHeigth] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShown(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShown(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const onChangeWindow = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const heigth = Dimensions.get("window").height;
      setWindowHeigth(heigth);
      console.log("width:", windowWidth);
      console.log("heigth:", windowHeigth);
    };
    Dimensions.addEventListener("change", onChangeWindow);
    return () => {
      Dimensions.removeEventListener("change", onChangeWindow);
    };
  }, []);

  const inputHandlerEmail = (text) => {
    setEmail(text.trim());
  };
  const inputHandlerPassword = (text) => {
    setPasword(text.trim());
  };

  const pressWindow = () => {
    setIsShown(true);
    Keyboard.dismiss();
  };

  const submit = () => {
    setIsShown(true);
    Keyboard.dismiss();
    // console.log(email);
    // console.log(password);
    setEmail("");
    setPasword("");
  };
  const secureText = () => {
    setSecureTextEntry(false);
  };

  return (
    <TouchableWithoutFeedback onPress={pressWindow}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgimage}
          source={require("../assets/images/bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "heigth"}
          >
            <View
              style={{
                ...styles.loginContainer,
                paddingBottom: isShown ? 144 : 32,
              }}
            >
              <View
                style={{
                  ...styles.form,
                  width: windowWidth - 16 * 2,
                }}
              >
                <Text style={styles.title}>Log into</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focusColorEmail,
                  }}
                  placeholder="E-mail address"
                  value={email}
                  onFocus={() => {
                    setfocusColorEmail("#FF6C00");
                  }}
                  onBlur={() => {
                    setfocusColorEmail("#E8E8E8");
                  }}
                  onChangeText={inputHandlerEmail}
                  selectionColor={"#FF6C00"}
                />
                <View style={styles.inputPassword}>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: 0,
                      borderColor: focusColorPasword,
                    }}
                    placeholder="Password"
                    value={password}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => {
                      setfocusColorPasword("#FF6C00");
                    }}
                    onBlur={() => {
                      setfocusColorPasword("#E8E8E8");
                    }}
                    onChangeText={inputHandlerPassword}
                    selectionColor={"#FF6C00"}
                  />
                  <TouchableOpacity style={styles.showBtn}>
                    <Text style={styles.text} onPress={secureText}>
                      Show
                    </Text>
                  </TouchableOpacity>
                </View>
                {isShown && (
                  <View>
                    <TouchableOpacity style={styles.SubmitBtn} onPress={submit}>
                      <Text style={styles.textBtn}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit}>
                      <Text style={styles.text}>
                        Do not have an account? Sign up
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#fff",
  },
  bgimage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginContainer: {
    position: "relative",
    // marginTop: 230,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {
    marginTop: 32,
  },
  title: {
    fontFamily: "Roboto-Medium",
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputPassword: {
    position: "relative",
  },
  showBtn: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    color: "#1B4371",
  },
  SubmitBtn: {
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 42,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    textAlign: "center",
  },
  textBtn: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
