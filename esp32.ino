void setup() {
  pinMode(2, OUTPUT); // Pin 2 adalah LED internal ESP32
  pinMode(14, OUTPUT); // Pin 2 adalah LED internal ESP32
  
}

void loop() {
  digitalWrite(2, HIGH); // Nyalakan LED
  delay(1000);           // Tunggu 1 detik
  digitalWrite(2, LOW);  // Matikan LED
  delay(1000);
  digitalWrite(14, HIGH); // Nyalakan LED
  delay(1000);           // Tunggu 1 detik
  digitalWrite(14, LOW);  // Matikan LED
  delay(1000);
}