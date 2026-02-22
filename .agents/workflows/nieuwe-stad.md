---
description: Hoe een nieuwe stad toevoegen en onderzoeken inclusief Google Maps checks
---

# Nieuwe Stad Toevoegen Workflow

Gebruik deze workflow ALTIJD wanneer de gebruiker vraagt om een nieuwe stad te onderzoeken of toe te voegen aan de Weekendje Weg app.

## Stap 1: Onderzoek de stad & Verifieer op Google Maps
Zoek naar leuke hotels, cocktailbars, restaurants en culturele plekken in de betreffende stad. 
**CRUCIAAL**: Gebruik de browser (Google Maps) om voor élke locatie het volgende te controleren:
- **Open-status**: Voeg **alleen** plekken toe die daadwerkelijk open en actief zijn (geen permanent gesloten locaties).
- **Beoordelingen Criteria**: De plek *moet* minimaal **4 sterren** hebben op Google Maps én meer dan **10 reviews**.
- **Wildcard Uitzondering**: Scoort een plek erg goed (bijv. 5 sterren) maar heeft deze *minder* dan 10 reviews? Dan mag je hem toevoegen als een speciale **"Wildcard"**.
- Verzamel direct de coördinaten (latitude, longitude), het adres, openingstijden, en een korte beschrijving.

## Stap 2: Zoek echte sfeerfoto's
Bezoek de officiële websites van de gevonden plekken en zoek naar echte foto's van het interieur of exterieur. Gebruik deze directe afbeeldings-URLs voor de `image` eigenschap (resolutie circa 800x500 is ideaal, maar object-fit handelt de aspect ratio af).

## Stap 3: Maak het stadsbestand aan
Maak in de map `/home/damonbot/.gemini/antigravity/scratch/Weekendje-weg/trips/` een nieuw `.js` bestand aan met de naam van de stad (bijv. `amsterdam.js`). Kopieer de structuur van `tilburg.js`.

Gegevens om per plaats in te vullen:
- `name`: Naam van de plek
- `description`: Aantrekkelijke omschrijving
- `address`: Volledige adres
- `coords`: [latitude, longitude]
- `link`: URL van de officiële website
- `tags`: Array met kleine trefwoorden (bijv. `['cocktails', 'centrum']`)
- `image`: URL naar de officiële foto
- `priceLevel`: Getal 1, 2 of 3 (1 = goedkoop, 3 = duur).
- `openingHours`: Korte string of array met openingstijden (bijv. `"Di - Zo: 17:00 - 23:00"`).
- `reviews`: Array met 3 goed gewaardeerde, korte reviews van echte bezoekers (bijv. `[{text: "Geweldige cocktails!", author: "Jan"}]`). Verzamel deze van Google Maps.
- `isWildcard`: Optionele boolean (true) ALS de locatie minder dan 10 reviews heeft maar toch is toegevoegd wegens de hoge kwaliteit.

## Stap 4: Categorie Iconen Toevoegen
Zorg ervoor dat de in het bestand gebruikte categorieën een geldige [Lucide Icon naam](https://lucide.dev/icons/) hebben onder de `icon` property. (bijv. `bed-double` voor hotel, `utensils` voor restaurant, `martini` voor cocktailbars, `ticket` voor cultuur).

## Stap 5: Voeg de stad toe aan de hoofdapplicatie
Bewerk `/home/damonbot/.gemini/antigravity/scratch/Weekendje-weg/main.js`:
1. Importeer de nieuwe stad bovenaan:
   `import amsterdam from './trips/amsterdam.js';`
2. Voeg deze toe aan de `trips` array:
   `const trips = [tilburg, amsterdam];`

## Stap 6: Lokale Verificatie
Test de app in je interne browser (localhost:5173). Controleer of de nieuwe tab werkt, de markers op de kaart verschijnen, de foto's inladen met een hoogte van 180px, en of de Lucide iconen geselecteerd zijn. Pas indien nodig de `mapCenter` en `mapZoom` van de nieuwe stad aan zodat de kaart goed schaalt.

## Stap 7: Commit & Push
Zodra de stad compleet is overgezet en gecheckt, push de nieuwe code naar GitHub met een strakke commit message.
