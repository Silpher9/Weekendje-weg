---
description: Hoe een nieuwe stad toevoegen en onderzoeken inclusief Google Maps checks
---

# Nieuwe Stad Toevoegen Workflow

Gebruik deze workflow ALTIJD wanneer de gebruiker vraagt om een nieuwe stad te onderzoeken of toe te voegen aan de Weekendje Weg app.

## Context & Smaakprofiel

**Weekendje Weg** is een persoonlijke reisplanner (mobile-first web app) voor weekendtrips met partner. De app verzamelt handgepickte plekken per stad — geen standaard toeristische lijstjes, maar plekken die passen bij een specifieke smaak.

### Smaak

| Categorie | Voorkeur |
|-----------|----------|
| **Sfeer** | Intimate & craft — kleine zaken, eigenaar achter de bar, handwerk, aandacht voor detail. Chique mag ook: sterrenrestaurants en fine dining zijn welkom |
| **Hotels** | Boutique, design hotel, B&B met karakter. Nooit ketens |
| **Cocktailbars / Avondplekken** | Ambachtelijke cocktailbars hebben voorkeur — creatieve cocktails, intiem interieur, liever een verborgen bar dan een druk café. **Maar**: leuke cafés, bars met een goede drankenkaart, of restaurant/bar combo's waar je 's avonds gezellig een drankje kunt doen zijn ook welkom als fallback. Het gaat om de avondervaring, niet strikt om cocktails |
| **Restaurants** | Lokaal, seizoensgebonden, liefst deelgerechten of tasting menu. Sterrenrestaurants zijn een pluspunt zolang ze niet stijf zijn — Michelin-ster = bonus |
| **Cultuur** | Prioriteit: **1. Filmtheaters** (arthouse), **2. Musea** (kunst/design/fotografie), **3. Theater** (kleinschalig, nieuw talent). Zie ook de uitschietersregel hieronder |
| **Budget** | Middenklasse met uitschieters — €€ als basis, €€€ voor iets speciaals |

### Cultuur: uitschietersregel

Zoek naast de standaard cultuurcategorieën altijd ook naar plekken die *kenmerkend* zijn voor de stad. Als een stad een iconische brouwerij, een beroemde markthal, een bijzonder park of een ander cultureel fenomeen heeft dat er echt uitspringt (hoge rating, veel reviews, breed aanbevolen), neem het dan op — ook als het buiten de standaard categorieën valt. De stad dicteert wat bijzonder is, niet de vaste lijst.

### Schrijfstijl voor beschrijvingen

Beschrijvingen zijn **kort** (1-2 zinnen), in het **Nederlands**, wervend maar niet overdreven. Focus op wat de plek *uniek* maakt — niet op generieke superlatieven.

**Voorbeelden van goede beschrijvingen:**
- *"Dineren in twee authentieke treincoupés uit 1900 in de hippe Spoorzone. Creatieve menukaart met veel vegetarische opties. Absoluut uniek!"*
- *"Verborgen parel in een woonwijk. Chefs combineren invloeden van Lanzarote, Ecuador en Madrid. Intiem tasting menu met verrassende smaken."*
- *"Filmtheater met arthouse films, bijzondere vertoningen en een gezellige bar. De filmervaring die je zoekt, geen standaard bioscoop."*

---

## Stap 1: Onderzoek de stad

Zoek via **web search** naar de beste cocktailbars, restaurants en culturele plekken in de betreffende stad. Streef naar **minimaal 3 plekken per categorie**. Gebruik het smaakprofiel hierboven om te bepalen welke plekken het beste passen.

### Hotels: meervoudige zoekstrategie

Hotels worden in **drie rondes** gezocht om te voorkomen dat niche-pareltjes (boutique hotels, design hotels) gemist worden:

1. **Ronde 1 — Brede search**: "beste hotels [stad]"
2. **Ronde 2 — Gerichte searches**: "boutique hotel [stad]", "design hotel [stad]", "unieke B&B [stad]"
3. **Ronde 3 — Maps radius search**: Gebruik `maps_search_places` met query "boutique hotel" + locatie stadscentrum (radius 5000m). Dit vangt plekken die wel op Google Maps staan maar niet in top-10 lijstjes verschijnen.

Voeg de resultaten van alle rondes samen en verifieer elke kandidaat met de MCP-checks hieronder.

### Stap 1b: Verifieer met Google Maps MCP

Gebruik de **Google Maps MCP server** (geconfigureerd in `.mcp.json`) om elke gevonden plek te verifiëren.

#### Efficiëntie: paralleliseer MCP-calls

- **`maps_search_places`** geeft al coördinaten én rating terug — `maps_geocode` is vaak overbodig.
- Doe ALLE `maps_search_places` calls voor alle kandidaten in één batch (parallel tool calls).
- Doe daarna ALLE `maps_place_details` calls parallel voor de plekken die door de eerste screening kwamen.
- Typisch zijn **2 rondes** MCP-calls genoeg in plaats van 3 per plek:
  1. **Ronde 1**: Alle `maps_search_places` parallel → filter op rating, open-status, keten
  2. **Ronde 2**: Alle `maps_place_details` parallel voor geselecteerde plekken → details, reviews, openingstijden

### Kwaliteitscriteria per locatie

Controleer met de MCP-resultaten het volgende:

| Check | Eis | Actie bij falen |
|-------|-----|-----------------|
| Open-status | Moet daadwerkelijk open zijn (niet permanent gesloten) | **Sla over**, zoek een alternatief |
| Beoordeling | Minimaal **4 sterren** op Google Maps | **Sla over**, zoek een alternatief |
| Aantal reviews | Meer dan **10 reviews** | Mag als **Wildcard** als de score ≥ 4.5 is (zet `isWildcard: true`) |
| Uniek / Onafhankelijk | Bij voorkeur lokaal en onafhankelijk — geen ketens (Mercure, Hilton, ibis, Van der Valk, Fletcher, McDonald's, Starbucks, Leonardo Hotels, Best Western, NH Hotels, Marriott, Holiday Inn, Accor, Bastion, Hampshire, Golden Tulip, WestCord, Postillion, Apollo, etc.). **Nuance**: als een keten-hotel écht uniek is (bijzonder historisch pand, uitzonderlijk interieur, iconisch gebouw), mag het wél worden opgenomen — vermeld dan expliciet waarom het een uitzondering verdient. Controleer altijd de volledige naam in `maps_search_places` — ketens rebranden regelmatig lokale hotels (bijv. "Oranje Hotel" → "Leonardo Oranje Hotel"). | **Sla over** tenzij het een beargumenteerde uitzondering is |
| B&B karakter | B&B's moeten een eigen identiteit hebben (historisch pand, bijzonder interieur, thema) én op loop-/fietsafstand van het centrum liggen | **Sla over** — een logeerkamer in een reguliere woonwijk voldoet niet |

**BELANGRIJK**: Als een locatie niet voldoet, breek dan NIET het proces af. Sla de locatie over en zoek een vervangende plek in dezelfde categorie. Ga pas verder naar Stap 2 als je minimaal 3 plekken per categorie hebt.

### Kleinere steden (< 100.000 inwoners)

Bij kleinere steden is het aanbod in sommige categorieën beperkt, met name cocktailbars. In dat geval:
- **2 sterke plekken** is acceptabel als er echt geen derde is
- Een bar die ook cocktails serveert (restaurant/bar combo) telt mee
- Leuke cafés of plekken waar je 's avonds nog een drankje kunt doen zijn goede fallbacks
- Gebruik de wildcard-optie voor veelbelovende nieuwkomers met weinig reviews
- Vermeld aan de gebruiker als een categorie dun bezet is in de stad

### Prioriteitstermen (hotels)

Plekken met deze termen krijgen voorrang bij de selectie:

| Term | Gewicht | Betekenis |
|------|---------|-----------|
| **boutique** | Hoog | Altijd meenemen als de plek voldoet aan de basiscriteria (≥ 4.0, open, onafhankelijk) |
| **design hotel** | Hoog | Idem |
| **B&B** | Voorwaardelijk | Alleen meenemen als de B&B voldoet aan de karakter-eis hierboven |

### Diversiteitsregel (hotels)

Streef naar minimaal **1 boutique of design hotel** in de selectie, mits beschikbaar in de stad. Vermijd dat alle hotels hetzelfde type zijn (bijv. niet 3× B&B of 3× budget).

### Te verzamelen gegevens (uit MCP + web search)
- Naam, adres, coördinaten (uit `maps_place_details` / `maps_geocode`)
- Openingstijden (uit `maps_place_details`)
- Rating (uit `maps_place_details`) — wordt weergegeven op de kaart, sla op als `rating` veld
- Aantal reviews (uit `maps_place_details`)
- Officiële website URL (uit `maps_place_details`, indien beschikbaar)
- Korte beschrijving (zelf schrijven op basis van web search)

## Stap 2: Zoek echte sfeerfoto's

Zoek per plek een echte foto. Gebruik directe afbeeldings-URLs voor de `image` eigenschap (resolutie circa 800x500 is ideaal, `object-fit` handelt de aspect ratio af).

### Foto-richtlijnen per categorie

| Categorie | Voorkeur foto | Toelichting |
|-----------|--------------|-------------|
| **Hotels / B&B's** | **Gevel / exterieur** | Facade-foto's helpen het gebouw te herkennen bij aankomst. Zoek op de website naar "buitenaanzicht", "exterior" of de headerfoto — dit is meestal een gevelfoto. |
| **Cocktailbars** | Interieur / sfeer | Laat de sfeer en inrichting zien |
| **Restaurants** | Interieur of gerecht | Sfeer of signature dish |
| **Cultuur** | Exterieur of zaal | Herkenbaar gebouw of de binnenzaal |

### Fallback-keten voor foto's (in volgorde)

Probeer de volgende bronnen in volgorde. Besteed **maximaal ~2 minuten per plek** aan foto's zoeken — als het niet lukt, ga door.

1. **Officiële website** — Bezoek de website van de plek en zoek naar directe afbeeldings-URLs
2. **Booking.com / TripAdvisor / Skyscanner** — Zoek de plek op deze sites via `WebFetch` en probeer een foto-URL te vinden van de fotopagina
3. **Wikimedia Commons API** — Zoek rechtenvrije foto's:
   ```
   curl -sL "https://commons.wikimedia.org/w/api.php?action=query&list=search
   &srsearch=[straat]+[nummer]+[stad]&srnamespace=6&srlimit=5&format=json"
   ```
   Haal daarna de directe URL op:
   ```
   curl -sL "https://commons.wikimedia.org/w/api.php?action=query
   &titles=File:[bestandsnaam]&prop=imageinfo&iiprop=url|size&format=json"
   ```
   De directe URL staat in `imageinfo[0].url` (format: `upload.wikimedia.org/...`).
   **Let op**: Wikimedia heeft rate limiting. Gebruik `sleep 10` tussen requests bij een 429.
4. **Gebruiker vragen** — Als geen van de bovenstaande bronnen een foto oplevert, vraag de gebruiker of zij zelf een foto willen plaatsen. Ga door met het `image` veld leeg.

### URL-validatie

Controleer voor elke foto-URL:
- Moet een **absolute URL** zijn (begint met `https://`)
- Moet een **echt domein** zijn (geen template-domeinen als `*.yourhotelwebsite.com` of `*.placeholder.com`)
- Bij twijfel: laat het `image` veld leeg — een fallback is beter dan een broken image

Gebruik GEEN stockfoto's van Unsplash of vergelijkbare sites.

## Stap 3: Verzamel reviews

Haal reviews op via `maps_place_details` (deze bevat Google Maps reviews).

**Fallback bronnen** (als MCP geen reviews retourneert):
1. Web search naar "[naam plek] reviews"
2. TripAdvisor reviews
3. Reviews op de eigen website van de locatie

Selecteer **3 korte, positieve reviews** per locatie van echte bezoekers.

- **Filter**: Kies reviews met rating ≥ 4 sterren.
- **Voorkeur**: Reviews die iets specifieks noemen (sfeer, een gerecht, de service) boven generieke "great place!" reviews.
- **Taal**: Engelse of Nederlandse reviews. Vertaal niet — gebruik de originele tekst.
- **Negatieve reviews**: Als een plek overwegend negatieve reviews heeft, neem dan ook **1 informatieve negatieve review** mee zodat het beeld eerlijk is. Kies de meest constructieve/specifieke negatieve review.
- **Als er minder dan 3 positieve reviews zijn**: Gebruik wat er is. Als een plek overwegend negatief scoort, heroverweeg de selectie van die plek.

**Als reviews niet vindbaar zijn**: laat het `reviews` veld weg. De app handelt dit correct af.

## Stap 4: Maak het stadsbestand aan

Maak in `/home/damonbot/.gemini/antigravity/scratch/Weekendje-weg/trips/` een nieuw `.js` bestand aan met de naam van de stad (bijv. `amsterdam.js`). Gebruik `tilburg.js` als referentie voor de structuur.

### Verplichte velden per locatie

```javascript
{
  name: 'Naam van de plek',
  description: 'Aantrekkelijke omschrijving van 1-2 zinnen',
  address: 'Volledig adres met postcode',
  coords: [51.1234, 5.6789],          // [latitude, longitude]
  link: 'https://website.nl',          // null als er geen website is
  tags: ['trefwoord1', 'trefwoord2'],  // 2-4 korte tags
  image: 'https://directe-foto-url',   // laat weg als geen foto beschikbaar
  priceLevel: 2,                        // 1 = goedkoop, 2 = gemiddeld, 3 = duur
  rating: 4.5,                          // Google Maps rating (uit maps_search_places of maps_place_details)
  openingHours: 'Di - Zo: 17:00 - 23:00', // korte string
  reviews: [                            // laat weg als geen reviews vindbaar
    { text: 'Review tekst', author: 'Naam' }
  ],
  isWildcard: false                     // true als <10 reviews maar hoge kwaliteit
}
```

### Verplichte categorieën

| Categorie | `type` | `icon` (Lucide) | `color` |
|-----------|--------|-----------------|---------|
| Hotels | `hotel` | `bed-double` | `#A68A73` |
| Cocktailbars | `cocktail` | `martini` | `#D4A3A3` |
| Restaurants | `restaurant` | `utensils` | `#D19C5B` |
| Cultuur | `culture` | `ticket` | `#8BAA99` |

## Stap 4b: Banner-afbeelding

Zoek een kenmerkende stadsfoto (gracht, skyline, herkenbaar plein) voor de banner. Banners zijn **640×640 pixels** (vierkant) en worden opgeslagen als `public/assets/banner-[stadsnaam].png`.

### Bronnen (in volgorde van voorkeur):
1. **Wikimedia Commons** — zoek op "[stad] canal/gracht/centrum" via de Wikimedia API (zie Stap 2)
2. **Officiële toerismewebsite** (bijv. visitleeuwarden.com, visitutrecht.com)

### Verwerking:
Download de foto en crop/resize naar 640×640 met Python PIL:
```python
from PIL import Image
img = Image.open('input.jpg')
w, h = img.size
s = min(w, h)
left, top = (w - s) // 2, (h - s) // 2
img.crop((left, top, left + s, top + s)).resize((640, 640), Image.LANCZOS) \
   .save('public/assets/banner-[stad].png', 'PNG')
```

## Stap 5: Voeg de stad toe aan de hoofdapplicatie

Bewerk `/home/damonbot/.gemini/antigravity/scratch/Weekendje-weg/main.js`:

1. Importeer de nieuwe stad bovenaan bij de andere imports:
   ```javascript
   import amsterdam from './trips/amsterdam.js';
   ```
2. Voeg deze toe aan de `trips` array:
   ```javascript
   const trips = [tilburg, amsterdam];
   ```

## Stap 6: Lokale Verificatie

Test de app op `localhost:5173`. Controleer of:
- De nieuwe tab verschijnt en correct schakelt
- Alle markers op de kaart verschijnen
- De foto's correct inladen (of de fallback-letter toont bij ontbrekende foto's)
- De prijsniveaus (€€€) correct worden weergegeven (goud = actief, grijs = inactief)
- De openingstijden onder het adres staan met een klokicoontje
- De reviews-accordion correct openklapt (indien reviews aanwezig)
- De "Route" knop naar Google Maps navigatie linkt
- Wildcard kaarten een gouden rand hebben (indien van toepassing)

Pas indien nodig `mapCenter` en `mapZoom` aan zodat de kaart goed schaalt.

## Stap 7: Commit

Maak een commit met een duidelijke message (bijv. `✨ Feature: Add [stadsnaam] trip`). **Push NIET automatisch** — laat dit aan de gebruiker over.

## Foutafhandeling

Als het proces halverwege faalt:
- Verwijder het aangemaakte trip-bestand als het incompleet is
- Draai wijzigingen in `main.js` terug
- Meld aan de gebruiker wat er misgegaan is en wat er nog ontbreekt
