import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useState } from "react";

const weatherImages = {
  Clear: require("./assets/avobee.png"),
  Snow: require("./assets/snow.gif"),
  Rain: require("./assets/rain.gif"),
  Clouds: require("./assets/clouds.png"),
  Mist: require("./assets/avocloud.png"),
};
const weatherIcons = {
  Clear: require("./assets/avosummer.png"),
  Snow: require("./assets/avofinger.png"),
  Rain: require("./assets/avorain.png"),
  Thunderstorm: require("./assets/avothunder.png"),
  Drizzle: require("./assets/avoangry.png"),
  Clouds: require("./assets/avocloud.png"),
};

export default function App() {
  const [text, setText] = useState("");
  const [weather, setWeather] = useState();
  const imgUrl = weather && weatherImages[weather.weather[0].main];
  const iconUrl = weather && weatherIcons[weather.weather[0].main];
  const [isCelsius, setIsCelsius] = useState(true);
  const [temperature, setTemperature] = useState();
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };
  const convertTemperature = () => {
    let convertedTemperature = temperature - 273;
    if (!isCelsius) {
      convertedTemperature = temperature;
    }
    return (
      <Text>
        {Math.round(convertedTemperature)}°{isCelsius ? "C" : "F"}
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      {!weather && (
        <View>
          <Text style={styles.title}>WeaderCado</Text>
          <Image
            source={require("./assets/familywalk2.gif")}
            style={{ width: 300, height: 300, marginTop: 60, marginLeft: 30 }}
          />
        </View>
      )}
      {imgUrl && (
        <Image
          source={imgUrl}
          style={[
            weather?.weather[0].main === "Snow"
              ? styles.snowImg
              : styles.normal,
            weather?.weather[0].main === "Rain"
              ? styles.rainImg
              : styles.normal,
            weather?.weather[0].main === "Clouds"
              ? styles.cloudImg
              : styles.normal,
            weather?.weather[0].main === "Clear"
              ? styles.clearImg
              : styles.normal,
          ]}
        />
      )}
      {iconUrl && (
        <View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{convertTemperature()}</Text>
            <Text style={styles.temperatureName}>{weather.name}</Text>
            <Text style={styles.temperatureWeather}>
              {weather.weather[0].main}
            </Text>
          </View>
          <Image
            source={iconUrl}
            style={[
              weather?.weather[0].main === "Snow"
                ? styles.snowIcons
                : styles.normal,
              weather?.weather[0].main === "Rain"
                ? styles.rainIcons
                : styles.normal,
              weather?.weather[0].main === "Clouds"
                ? styles.clouds
                : styles.normal,
              weather?.weather[0].main === "Clear"
                ? styles.clearIcon
                : styles.normal,
            ]}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Write a city"
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if (text !== "") {
              return fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${`91f56e00e39805ff79afb198e30b28bf`}`
              )
                .then((res) => res.json())
                .then((result) => {
                  setWeather(result);
                  setTemperature(result.main.temp);
                  setText("");
                  console.log(result);
                  console.log(result.weather[0]);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          }}
        >
          <Text style={styles.buttonText}> Search </Text>
        </TouchableOpacity>
      </View>
      {weather && (
        <TouchableOpacity onPress={toggleTemperatureUnit} style={styles.button}>
          <Text style={styles.temperatureToggle}>
            <Text>{isCelsius ? `press for °F` : `press for °C`}</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(210,248,210)",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    color: "rgb(160,82,45)",
    fontSize: 50,
    fontWeight: "bold",
    margin: 20,
  },
  snowImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  snowIcons: {
    width: 230,
    height: 360,
    top: 50,
    left: 100,
    margin: 40,
  },
  rainImg: {
    position: "absolute",
    top: 5,
    width: "90%",
    height: "80%",
  },
  rainIcons: {
    width: 330,
    height: 530,
    bottom: 30,
    marginBottom: 80,
  },
  clouds: {
    width: 290,
    height: 570,
    left: 50,
    bottom: 190,
  },
  cloudImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  clearImg: {
    position: "absolute",
    width: "50%",
    height: "30%",
    bottom: 200,
    right: 160,
    zIndex: 1,
  },
  clearIcon: {
    width: 350,
    height: 400,
    bottom: 80,
    margin: 60,
  },
  temperatureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    marginTop: 70,
  },
  temperature: {
    fontSize: 70,
    color: "rgb(160,82,45)",
  },
  temperatureName: {
    fontSize: 30,
    color: "rgb(160,82,45)",
  },
  temperatureWeather: {
    fontSize: 20,
    color: "rgb(160,82,45)",
  },
  temperatureToggle: {
    color: "rgb(160,82,45)",
    top: 25,
  },
  button: {
    zIndex: 2,
    bottom: 40,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    borderStyle: "solid",
    borderColor: "rgb(136 19 55)",
    borderWidth: 2,
    padding: 8,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: "center",
    backgroundColor: "rgb(160,82,45)",
    borderRadius: 20,
    width: 200,
    bottom: 90,
    position: "absolute",
  },
  searchButton: {
    borderStyle: "solid",
    borderColor: "rgb(136 19 55)",
    borderWidth: 2,
    padding: 10,
    PaddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgb(160,82,45)",
    borderRadius: 20,
    width: 100,
    bottom: 40,
    position: "absolute",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
