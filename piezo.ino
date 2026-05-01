const int piezoPin = 34;   // pin analog
const int ledPin   = 2;    // pin LED
const int buzzer = 4;

int threshold = 500;      // nilai batas (sesuaikan)

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(piezoPin);

  Serial.print("Nilai Piezo: ");
  Serial.println(sensorValue);

  if (sensorValue > threshold) {
    digitalWrite(ledPin, HIGH); // LED nyala
    digitalWrite(buzzer, HIGH);
  } else {
    digitalWrite(ledPin, LOW);  // LED mati
    digitalWrite(buzzer, LOW);
  }

  delay(50);
}