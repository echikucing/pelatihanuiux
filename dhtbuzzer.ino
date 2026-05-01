#include "DHT.h"

#define DHTPIN 15       // Pin data DHT22

#define LED_PIN 2
#define BUZZER_PIN 4

DHT dht(15, DHT22);

void setup() {
  Serial.begin(115200);
  
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  
  dht.begin();
}

void loop() {
  float suhu = dht.readTemperature(); // Baca suhu dalam Celcius

  // Cek apakah pembacaan berhasil
  if (isnan(suhu)) {
    Serial.println("Gagal membaca dari DHT!");
    delay(2000);
    return;
  }

  Serial.print("Suhu: ");
  Serial.print(suhu);
  Serial.println(" °C");

  if (suhu > 30.0) {
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
  }

  delay(2000); // Delay 2 detik
}