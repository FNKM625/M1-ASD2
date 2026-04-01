# Płatek Kocha - Wizualizacja i Animacja Algorytmiczna

![Wersja](https://img.shields.io/badge/version-1.0-blue)
![Technologia](https://img.shields.io/badge/p5.js-Library-ED225D)

[Demo:](https://fnkm625.github.io/M1-ASD2)https://fnkm625.github.io/M1-ASD2/

## 📖 O projekcie
Projekt zrealizowany w ramach przedmiotu Algorytmy i Struktury Danych 2 (ASD2) na Uniwersytecie w Białymstoku w Wilnie (UwB). 
Jest to interaktywna aplikacja internetowa służąca do wizualizacji i animacji fraktala matematycznego znanego jako **Krzywa/Płatek Kocha**.

## ✨ Główne funkcjonalności
* **Dwa tryby renderowania:** * **Tryb Obrót:** Obracający się, pełny Płatek Kocha (3 połączone krzywe).
  * **Tryb Statyczny:** Pojedyncza Krzywa Kocha z unikalną animacją krokową (stopniowe zanikanie środka i wyrastanie nowych wierzchołków).
* **Interaktywność:** Płynna zmiana poziomu rekurencji oraz prędkości obrotu za pomocą suwaków.
* **Monitorowanie wydajności:** Wbudowany na żywo licznik klatek na sekundę (FPS) oraz dynamiczny kalkulator ilości rysowanych odcinków (od kilkunastu do ponad 12 000 linii).
* **UI / UX:** * Przełącznik motywu (Jasny/Ciemny).
  * Zabezpieczenie przed przerwaniem trwającej animacji (State Machine).
  * Wizualny *feedback* na przyciskach w trakcie ciężkich obliczeń.

## 🛠️ Technologie
* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **Silnik Graficzny:** [p5.js](https://p5js.org/) (Canvas 2D API)

### 🚀 Uruchomienie
1. **Pobierz kod:** Sklonuj repozytorium za pomocą polecenia:
   `git clone https://github.com/FNKM625/M1-ASD2.git`
   *(Alternatywnie: Kliknij zielony przycisk "Code" na GitHubie i wybierz "Download ZIP", a następnie wypakuj archiwum).*
2. **Otwórz folder:** Wejdź do głównego katalogu pobranego projektu.
3. **Uruchom:** Kliknij dwukrotnie plik `index.html`. Aplikacja otworzy się automatycznie w Twojej domyślnej przeglądarce internetowej i jest od razu gotowa do działania.
