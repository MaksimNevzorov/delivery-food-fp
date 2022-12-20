import { initializeApp } from "firebase/app";
import { API_KEY, APP_ID } from "../constants/envValues";

export class CloudServices {
  constructor() {
    this.config = {
      apiKey: API_KEY,
      authDomain: "delivery-project-fe9d2.firebaseapp.com",
      projectId: "delivery-project-fe9d2",
      storageBucket: "delivery-project-fe9d2.appspot.com",
      messagingSenderId: "332099284578",
      appId: APP_ID,
    };

    this.app = initializeApp(this.config);
  }
}

export const cloudService = new CloudServices();
