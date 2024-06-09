import { Platform } from "react-native";

// const API_URL = "http://localhost:8080/";
const API_URL = Platform.OS == "web" ? "" : "http://localhost:8080/"; // Empty so browser will know to use the same domain as the one that served the page

export { API_URL };
