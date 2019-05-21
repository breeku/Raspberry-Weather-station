#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "Adafruit_Sensor.h"
#include "Adafruit_AM2320.h"

const char* WIFI_SSID = "ENTER_SSID";
const char* WIFI_PASS = "ENTER_PASS";

const char* nodeIP = "http://x.x.x.x:3001/sensors";

float temp = 0;
float humi = 0;

Adafruit_AM2320 am2320 = Adafruit_AM2320();

void connect() {
  // Connect to Wifi.
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);

  //WiFi.begin(WIFI_SSID, WIFI_PASS);

  // WiFi fix: https://github.com/esp8266/Arduino/issues/2186
  WiFi.persistent(false);
  WiFi.mode(WIFI_OFF);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  unsigned long wifiConnectStart = millis();

  while (WiFi.status() != WL_CONNECTED) {
    // Check to see if
    if (WiFi.status() == WL_CONNECT_FAILED) {
      Serial.println("Failed to connect to WiFi. Please verify credentials: ");
      delay(10000);
    }

    delay(500);
    Serial.println("...");
    // Only try for 5 seconds.
    if (millis() - wifiConnectStart > 15000) {
      Serial.println("Failed to connect to WiFi");
      return;
    }
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  Serial.println();
  Serial.println("Posting sensordata...");

  postSensors();

  Serial.println("");

}

void postSensors() {
  while (isnan(am2320.readTemperature()) && isnan(am2320.readHumidity())) {
      Serial.println(am2320.readTemperature());
  }
  temp = am2320.readTemperature();
  humi = am2320.readHumidity();
  
  StaticJsonDocument<200> doc; // placeholder size
  doc["temperature"] = temp;
  doc["humidity"] = humi;

  serializeJson(doc, Serial);
  Serial.println("");
  String jsonPOST = "";
  serializeJson(doc, jsonPOST);

  HTTPClient http;    //Declare object of class HTTPClient
    
  http.begin(nodeIP);      //Specify request destination
  http.addHeader("Content-Type", "application/json");  //Specify content-type header
  http.addHeader("Access-Control-Allow-Origin", "*");
    
  int httpCode = http.POST(jsonPOST);   //Send the request
  String payload = http.getString();    //Get the response payload
    
  Serial.println(httpCode);   //Print HTTP return code
  Serial.println(payload);    //Print request response payload
    
  http.end();  //Close connection 
}

void setup() {
  Serial.begin(115200);
  Serial.setTimeout(2000);

  while(!Serial){}

  am2320.begin();
  connect();

  Serial.println("Going to deep sleep for 300s");
  ESP.deepSleep(300e6);
}

void loop() {

}
