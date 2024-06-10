import { Platform } from "react-native";

// const API_URL = "http://localhost:8080/";
const API_URL = Platform.OS == "web" ? "/api/" : "http://localhost:8080/api/"; // Empty so browser will know to use the same domain as the one that served the page

export { API_URL };
