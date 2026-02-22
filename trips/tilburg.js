// Tilburg trip data
export default {
    id: 'tilburg',
    name: 'Tilburg',
    subtitle: 'Textielstad met karakter',
    dates: 'Nog te plannen',
    banner: '/assets/banner-tilburg.png',
    mapCenter: [51.5600, 5.0840],
    mapZoom: 14,
    categories: [
        {
            type: 'hotel',
            icon: 'bed-double',
            label: 'Hotels',
            color: '#A68A73', // Zacht terracotta/beige
            places: [
                {
                    name: 'Hotel Central Tilburg',
                    description: 'Boutique hotel in Art Deco pand uit 1932. Elke kamer is uniek ingericht, geïnspireerd op De Stijl of Dadaïsme. Prachtige glas-in-lood ramen en marmeren trap.',
                    address: 'Spoorlaan 422, 5038 CH Tilburg',
                    coords: [51.5595, 5.0820],
                    link: 'https://hotelcentraltilburg.nl',
                    tags: ['art deco', 'De Stijl', 'centrum'],
                    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800&h=500', // Boutique hotel room (working link)
                },
                {
                    name: 'Auberge du Bonheur',
                    description: 'Viersterren boutique hotel in de bosrijke Oude Warande. Kamers met eerbetoon aan Tilburgs textielverleden. Combinatie van natuur en stad.',
                    address: 'Bredaseweg 441, 5036 NA Tilburg',
                    coords: [51.5517, 5.0647],
                    link: 'https://aubergedubonheur.nl',
                    tags: ['boutique', 'bos', 'textielgeschiedenis'],
                    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800&h=500', // Luxury forest hotel
                },
                {
                    name: 'De Posthoorn',
                    description: 'Historisch monumentaal pand getransformeerd tot stijlvol hotel & venue. Centraal gelegen bij het station.',
                    address: 'Stationsstraat 40, 5038 ED Tilburg',
                    coords: [51.5606, 5.0839],
                    link: 'https://deposthoorntilburg.nl',
                    tags: ['monumentaal', 'centrum', 'station'],
                    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800&h=500', // Classic architecture hotel
                },
            ],
        },
        {
            type: 'cocktail',
            icon: 'martini',
            label: 'Cocktailbars',
            color: '#D4A3A3', // Gedempt roze
            places: [
                {
                    name: 'Studio',
                    description: 'Stijlvolle cocktailbar aan de Korte Heuvel. Uitgebreide kaart met creatieve cocktails. Geeft ook cocktailworkshops!',
                    address: 'Korte Heuvel 7, 5011 DV Tilburg',
                    coords: [51.5574, 5.0880],
                    link: null,
                    tags: ['cocktails', 'workshops', 'centrum'],
                    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800&h=500', // Stylish cocktail making
                },
                {
                    name: 'Doloris\' Rooftopbar',
                    description: 'Rooftopbar met spectaculair uitzicht over Tilburg. Cocktails met een eigen twist, zoals hun Pornstar Martini met witte chocolade en mandarijn.',
                    address: 'Spoorzone, Tilburg',
                    coords: [51.5620, 5.0761],
                    link: 'https://doloris.nl',
                    tags: ['rooftop', 'uitzicht', 'creatief'],
                    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800&h=500', // Sunset drinks
                },
                {
                    name: 'Noir',
                    description: 'Frans georiënteerd café met excellente cocktails. In de zomer een prachtige verborgen tuin. Intiem en sfeervol.',
                    address: 'Willem II-straat 59, 5038 BD Tilburg',
                    coords: [51.5575, 5.0863],
                    link: null,
                    tags: ['Frans', 'tuin', 'intiem'],
                    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800&h=500', // Dark moody cocktail
                },
                {
                    name: 'Gin Fizz',
                    description: 'Gezellige cocktailbar gespecialiseerd in premium gin-cocktails. Warme sfeer en deskundige bartenders.',
                    address: 'Korte Heuvel 3, 5011 DV Tilburg',
                    coords: [51.5573, 5.0877],
                    link: null,
                    tags: ['gin', 'premium', 'gezellig'],
                    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=800&h=500', // Gin and tonic
                },
            ],
        },
        {
            type: 'restaurant',
            icon: 'utensils',
            label: 'Restaurants',
            color: '#D19C5B', // Warm oker/karamel
            places: [
                {
                    name: 'Eetbar De Wagon',
                    description: 'Dineren in twee authentieke treincoupés uit 1900 in de hippe Spoorzone. Creatieve menukaart met veel vegetarische opties. Absoluut uniek!',
                    address: 'Burgemeester Brokxlaan 1, 5041 SB Tilburg',
                    coords: [51.5633, 5.0752],
                    link: 'https://eetbardewagon.nl',
                    tags: ['uniek', 'treincoupé', 'Spoorzone'],
                    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800&h=500', // Cozy restaurant interior
                },
                {
                    name: 'Gist',
                    description: 'Een van de beste restaurants van Tilburg (Volkskrant: 8,5). Seizoensgebonden deelgerechten met lokale ingrediënten. Groenten in de hoofdrol. Klein en snel volgeboekt!',
                    address: 'Willem II-straat 1, 5038 BA Tilburg',
                    coords: [51.5581, 5.0853],
                    link: null,
                    tags: ['fine dining', 'lokaal', 'seizoensgebonden'],
                    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800&h=500', // Fine dining plating
                },
                {
                    name: 'Sarban',
                    description: 'Afghaans restaurant, een begrip in Tilburg sinds 2010. Probeer de Afghaanse proeverij voor een compleet smaakavontuur. Op loopafstand van het station.',
                    address: 'Koestraat 138, 5014 EG Tilburg',
                    coords: [51.5548, 5.0886],
                    link: null,
                    tags: ['Afghaans', 'proeverij', 'populair'],
                    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800&h=500', // Middle eastern food spread
                },
                {
                    name: 'Nomadas',
                    description: 'Verborgen parel in een woonwijk. Chefs combineren invloeden van Lanzarote, Ecuador en Madrid. Intiem tasting menu met verrassende smaken.',
                    address: 'Gasthuisring 55, 5041 DT Tilburg',
                    coords: [51.5628, 5.0905],
                    link: null,
                    tags: ['tasting menu', 'verborgen', 'internationaal'],
                    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800&h=500', // Modern elegant tasting menu
                },
            ],
        },
        {
            type: 'culture',
            icon: 'ticket',
            label: 'Cultuur',
            color: '#8BAA99', // Matcha / Saliegroen
            places: [
                {
                    name: 'Cinecitta',
                    description: 'Filmtheater met arthouse films, bijzondere vertoningen en een gezellige bar. De filmervaring die je zoekt, geen standaard bioscoop.',
                    address: 'Willem II-straat 29, 5038 BA Tilburg',
                    coords: [51.5569, 5.0857],
                    link: null,
                    tags: ['arthouse', 'filmtheater', 'bar'],
                    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800&h=500', // Cinema seats
                },
                {
                    name: 'De NWE Vorst',
                    description: 'Theater in een prachtige oude villa midden in het centrum. Platform voor nieuw talent en verrassende voorstellingen.',
                    address: 'Willem II-straat 49, 5038 BD Tilburg',
                    coords: [51.5573, 5.0860],
                    link: 'https://denwevorst.nl',
                    tags: ['theater', 'villa', 'nieuw talent'],
                    image: 'https://images.unsplash.com/photo-1507676184212-d0330a15673c?auto=format&fit=crop&q=80&w=800&h=500', // Theater stage
                },
                {
                    name: 'Theaters Tilburg',
                    description: 'De Schouwburg en Concertzaal in één. Breed programma: cabaret, dans, klassiek, musicals. Meer dan 300 voorstellingen per seizoen.',
                    address: 'Louis Bouwmeesterplein 1, 5038 TN Tilburg',
                    coords: [51.5590, 5.0818],
                    link: 'https://theaterstilburg.nl',
                    tags: ['schouwburg', 'concertzaal', 'breed programma'],
                    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=800&h=500', // Concert venue
                },
                {
                    name: 'Poppodium 013',
                    description: 'Legendarisch poppodium voor live muziek en dancenights. Een van de beste poppodia van Nederland.',
                    address: 'Veemarktstraat 44, 5038 CV Tilburg',
                    coords: [51.5590, 5.0860],
                    link: 'https://013.nl',
                    tags: ['live muziek', 'poppodium', 'dans'],
                    image: 'https://images.unsplash.com/photo-1470229722913-7c090be5c520?auto=format&fit=crop&q=80&w=800&h=500', // Live band crowd
                },
            ],
        },
    ],
};
