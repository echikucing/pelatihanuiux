#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
#include "DHT.h"

// Inisialisasi
DHT dht(15, DHT22);
//Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);
//const int PIEZO_PIN = 32;
//const int MQ_PINS[] = {33, 34, 35, 36, 39, 14}; // Pin MQ Series

void setup() {
  Serial.begin(115200);
  dht.begin();
  //accel.begin();
}

void loop() {
  //sensors_event_t event; 
  //accel.getEvent(&event);

  Serial.println("--- DATA LAB STAS-RG ---");
  // 1. DHT22
  Serial.print("Suhu: "); Serial.print(dht.readTemperature()); Serial.println(" C");
  
  // 2. ADXL345
  //Serial.print("Kemiringan X: "); Serial.println(event.acceleration.x);

  // 3. Piezoelektrik
  //Serial.print("Getaran: "); Serial.println(analogRead(PIEZO_PIN));

  // 4. MQ Series
  for(int i = 0; i < 6; i++) {
    //Serial.print("Gas MQ-"); Serial.print(i); 
    //Serial.print(": "); Serial.println(analogRead(MQ_PINS[i]));
  }
  
  Serial.println("------------------------");
  delay(2000);
}
