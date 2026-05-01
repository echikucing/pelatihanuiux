#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
#include "DHT.h"

DHT dht(15, DHT22); // Pin 15 untuk DHT
//Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

void setup() {
  Serial.begin(115200);
  dht.begin();
  //accel.begin();
}

void loop() {
  //sensors_event_t event; 
  //accel.getEvent(&event);
  Serial.print("Suhu: "); Serial.println(dht.readTemperature());
  //Serial.print(" | Accel X: "); Serial.println(event.acceleration.x);
  delay(300);
}