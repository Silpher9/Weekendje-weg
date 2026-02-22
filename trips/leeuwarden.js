export default {
    id: 'leeuwarden',
    name: 'Leeuwarden',
    subtitle: 'Culturele hoofdstad met Friese eigenzinnigheid',
    dates: 'Nog te plannen',
    banner: './assets/banner-leeuwarden.png',
    mapCenter: [53.2012, 5.7970],
    mapZoom: 15,
    categories: [
        {
            type: 'hotel',
            icon: 'bed-double',
            label: 'Hotels',
            color: '#A68A73',
            places: [
                {
                    name: 'Boutique Hotel Catshuis',
                    description: 'Intiem boutique hotel in een monumentaal pand aan de gracht. Vijf unieke kamers, een prachtig ontbijt en persoonlijke service in het hart van Leeuwarden.',
                    address: 'Nieuwestad 49, 8911 CJ Leeuwarden',
                    coords: [53.2016089, 5.791993],
                    link: 'https://www.catshuisleeuwarden.nl/',
                    tags: ['boutique', 'gracht', 'monumentaal'],
                    image: 'https://www.catshuisleeuwarden.nl/wp-content/uploads/2023/08/c9e4e1eb9bf21aafc205f29cf0c9f9a4-scaled.jpeg',
                    priceLevel: 3,
                    rating: 4.6,
                    openingHours: 'Dagelijks: 08:30 - 23:00',
                    reviews: [
                        { text: 'The hotel is located in the very centre of the town with location right next to a canal with beautiful surroundings. The staff were very friendly, kind and helpful.', author: 'Dávid Žuffa' },
                        { text: 'The perfect place in the historical center of Leeuwarden. Very cozy atmosphere, nice and quiet rooms, awesome food.', author: 'dessislava agayna' },
                        { text: 'This may have been my most positive hotel experience ever. Room was large and super comfy, breakfast was amazing.', author: 'Jennifer Nycz' }
                    ]
                },
                {
                    name: 'Post-Plaza Hotel & Grand Café',
                    description: 'Design hotel in het voormalige postkantoor van Leeuwarden. Monumentale sfeer met spa, grand café en een toplocatie op de Tweebaksmarkt.',
                    address: 'Tweebaksmarkt 27, 8911 KW Leeuwarden',
                    coords: [53.2014, 5.8005],
                    link: 'https://www.post-plaza.nl/',
                    tags: ['design', 'monumentaal', 'spa'],
                    image: 'https://www.post-plaza.nl/upload/heading/image-800x600_1.jpg',
                    priceLevel: 3,
                    rating: 4.5,
                    openingHours: 'Ma - Vr: 07:00 - 23:30, Za - Zo: 08:00 - 23:30',
                    reviews: [
                        { text: 'The best Hotel in the North of the Nederlands. Service is impeccable. Quality is always present in every detail. Perfectly Located.', author: 'Stacia Salmon' },
                        { text: 'Very lovely hotel. Great staff and located right in the center of Leeuwarden. Especially the breakfast stood out.', author: 'Kaja Wolffers' },
                        { text: 'We had the best stay at Post-Plaza. The 3 course meal was fantastic. The decor was fantastic, and the rooms were spacious.', author: 'Tara Meekma' }
                    ]
                },
                {
                    name: 'Hotel Vie Via',
                    description: 'Modern design hotel met een uniek self-service concept. Stijlvolle kamers met hoge plafonds in een voormalig museumgebouw, midden in het centrum.',
                    address: 'Tweebaksmarkt 23, 8911 KW Leeuwarden',
                    coords: [53.2020, 5.8009],
                    link: 'https://www.hotelvievia.nl/',
                    tags: ['design', 'modern', 'self-service'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Ljouwert_Leeuwarden_Tweebaksmarkt_23_Telefoonkantoor_PTT_15082021.jpg',
                    priceLevel: 2,
                    rating: 4.6,
                    openingHours: '24/7 bereikbaar (self-service)',
                    reviews: [
                        { text: 'This place is hip and love the concept of honest and self service. Nice staff and like the decoration and design.', author: 'Rene Lansink' },
                        { text: 'Beautifully decorated, nicely designed. A great hotel! Very beautiful and clean rooms!', author: 'Athanasios Sdrakas' },
                        { text: 'Excellent value, far better than a lot of establishments that I have paid many times more for.', author: 'Nick Chapman' }
                    ]
                }
            ]
        },
        {
            type: 'cocktail',
            icon: 'martini',
            label: 'Cocktailbars',
            color: '#D4A3A3',
            places: [
                {
                    name: 'Dr. Watson',
                    description: 'Speakeasy bar in een kelder aan de Eewal. Zoek het gouden 221B-bordje, daal af en beland in de roaring twenties. Ambachtelijke cocktails in een intieme, mysterieuze sfeer.',
                    address: 'Kelder, Eewal 50, 8911 GT Leeuwarden',
                    coords: [53.2026372, 5.7970745],
                    link: 'https://drwatson.frl/',
                    tags: ['speakeasy', 'kelder', 'ambachtelijk'],
                    image: 'https://drwatson.frl/wp-content/uploads/2024/11/20171103-IMG_0175-1024x682-1.jpeg',
                    priceLevel: 2,
                    rating: 4.8,
                    openingHours: 'Wo - Do: 20:00 - 01:00, Vr - Za: 19:00 - 02:00',
                    reviews: [
                        { text: 'Amazing cocktails and shared platter. The prices are decent (around €8 per cocktail) and the taste is awesome!', author: 'Traveling Gal' },
                        { text: 'Loved the cocktails, but my favorite part was the service and the atmosphere. This is a pretty hidden bar in the city, but lovely!', author: 'Rita Raimundo' },
                        { text: 'Best cocktails in town, the staff are visibly pros and the atmosphere is just amazing!', author: 'Zuzana Rudyová' }
                    ]
                },
                {
                    name: 'ROAST',
                    description: 'Restaurant en cocktailbar aan de gracht met een industrieel interieur. Creatieve cocktails, een goede wijnkaart en een terras met uitzicht over het water.',
                    address: 'Nieuwestad 63, 8911 CK Leeuwarden',
                    coords: [53.2013205, 5.7927071],
                    link: 'https://www.roastleeuwarden.nl/',
                    tags: ['cocktails', 'gracht', 'industrieel'],
                    image: 'https://roastleeuwarden.nl/wp-content/uploads/2025/02/cocktailbar-leeuwarden-kelder65-image24s-1024x683.jpg',
                    priceLevel: 2,
                    rating: 4.4,
                    openingHours: 'Wo: 11:00 - 23:00, Do: 11:00 - 01:00, Vr - Za: 10:00 - 01:00, Zo: 11:00 - 23:00',
                    reviews: [
                        { text: 'The wine we chose was accompanied by a story of its origin. The food was most definitely tasteful.', author: 'Pieter van der Werf' },
                        { text: 'Fantastic staff and AMAZING Food made this our favorite restaurant during our stay in Leeuwarden.', author: 'sue hathcock' },
                        { text: 'What a lovely place! The scenery is genuinely Dutch, next to a canal. Excellent attention, reasonable prices.', author: 'Maria Mancini' }
                    ]
                },
                {
                    name: 'Cafe YAI',
                    description: 'Klein, warm café met een inclusieve sfeer en verrassend goede drankjes. Eigenaar Andreis verwelkomt je persoonlijk — intiem en ongedwongen.',
                    address: 'Weerd 13, 8911 HL Leeuwarden',
                    coords: [53.2015909, 5.7948574],
                    link: 'https://cafeyai.nl/',
                    tags: ['intiem', 'inclusief', 'persoonlijk'],
                    image: '',
                    priceLevel: 1,
                    rating: 5.0,
                    openingHours: 'Wo - Do: 17:00 - 00:00, Vr - Za: 17:00 - 02:00',
                    reviews: [
                        { text: 'I was immediately given a warm welcome by owner Andreis. The time flew by speaking with a friendly regular client.', author: 'Mike V' },
                        { text: 'You can meet the most wonderful and diverse crowd. The staff is amazing, the vibe is always lovely. Feels like home!', author: 'Aleksandar Kranjcevic' },
                        { text: 'A great place in Leeuwarden! And it\'s so beautiful inside! Friendly owner and staff, they really make you feel welcome.', author: 'M' }
                    ],
                    isWildcard: true
                }
            ]
        },
        {
            type: 'restaurant',
            icon: 'utensils',
            label: 'Restaurants',
            color: '#D19C5B',
            places: [
                {
                    name: 'Restaurant STEEF',
                    description: 'Fine dining op topniveau. Chef Steffan serveert een verrassend tasting menu vanuit een open keuken. Creatief, artistiek en op weg naar een ster.',
                    address: 'Tweebaksmarkt 47, 8911 KW Leeuwarden',
                    coords: [53.2010103, 5.8002965],
                    link: 'https://restaurant-steef.nl/',
                    tags: ['fine dining', 'tasting menu', 'open keuken'],
                    image: 'https://restaurant-steef.nl/wp-content/uploads/2024/12/Website_Restaurant_STEEF_205-1-1024x683.jpg',
                    priceLevel: 3,
                    rating: 4.9,
                    openingHours: 'Wo - Vr: 18:00 - 00:00, Za: 12:00 - 16:00',
                    reviews: [
                        { text: 'The most amazing culinary experience — completely over the top exquisite, beautiful, thoughtful. A Chef of this caliber willing to share his process.', author: 'Liz Steinberger' },
                        { text: 'Loved the taste and the experience. Amazing place. Makes you wonder when it will get a star!', author: 'E Terpstra' },
                        { text: 'Outstanding doesn\'t cover it! Truly fine dining. Eclectic and sometimes whimsical combinations that work. Oh, how they work.', author: 'Bryan Blaylock' }
                    ]
                },
                {
                    name: 'Restaurant Wannee',
                    description: 'Farm-to-table restaurant met een eigen moestuin. Studenten van de hotelschool serveren een prachtig tasting menu. Topkwaliteit voor een eerlijke prijs.',
                    address: 'Rengerslaan 8, 8917 DD Leeuwarden',
                    coords: [53.2102759, 5.7958548],
                    link: 'https://www.restaurantwannee.nl/',
                    tags: ['farm-to-table', 'tasting menu', 'moestuin'],
                    image: 'https://www.restaurantwannee.nl/upload/heading/home-1600x1000_6.jpg',
                    priceLevel: 2,
                    rating: 4.5,
                    openingHours: 'Ma - Vr: 12:00 - 14:00 & 17:00 - 21:00, Za - Zo: 17:00 - 21:00',
                    reviews: [
                        { text: 'The food was refreshingly different, made with such detail, every dish was a treat. The students are friendly, attentive and enthusiastic!', author: 'Claire Lamoureux' },
                        { text: 'A delicious lunch here. The experience was similar to that of a very expensive restaurant for a better price.', author: 'Frank De' },
                        { text: 'From the unexpected ingredient combinations to the outstanding presentation, every bite was a delightful adventure.', author: 'Celina' }
                    ]
                },
                {
                    name: 'Proefverlof',
                    description: 'Eten en drinken in de voormalige gevangenis van Leeuwarden. Robuust interieur met koper, beton en hout, terras aan het water. Chef Willem Schaafsma kookt met lokale ingrediënten.',
                    address: 'Blokhuisplein 40, 8911 LJ Leeuwarden',
                    coords: [53.1995867, 5.8012748],
                    link: 'https://www.proefverlof.frl/',
                    tags: ['gevangenis', 'lokaal', 'unieke locatie'],
                    image: 'https://www.proefverlof.frl/previews/2025/12/27/media_983_758190_w800_h700_crop_ce.jpg',
                    priceLevel: 2,
                    rating: 4.3,
                    openingHours: 'Di - Za: 11:00 - 23:00, Zo: 11:00 - 18:00',
                    reviews: [
                        { text: 'The location is fantastic — right by the canal, a perfect spot to relax and watch as people stop by on their private boats.', author: 'Pj Dhaliwal' },
                        { text: 'Adorable place with simply relaxing music, extraordinary attention, excellent drinks and attractive menu.', author: 'Maria Mancini' },
                        { text: 'A charming spot with a unique vibe and beautiful views. Definitely worth a visit, especially in good weather!', author: 'Pj Dhaliwal' }
                    ]
                }
            ]
        },
        {
            type: 'culture',
            icon: 'ticket',
            label: 'Cultuur',
            color: '#8BAA99',
            places: [
                {
                    name: 'Slieker Film',
                    description: 'Arthouse filmtheater in het Fries Museum-gebouw. Van cult classics tot de nieuwste arthouse releases, met een gezellige bar voor en na de film.',
                    address: 'Wilhelminaplein 92, 8911 BS Leeuwarden',
                    coords: [53.1995682, 5.7941922],
                    link: 'https://www.sliekerfilm.nl/',
                    tags: ['arthouse', 'filmtheater', 'cultuur'],
                    image: 'https://files.friesmuseum.nl/files/9/5/9/1/slieker-film.jpg',
                    priceLevel: 1,
                    rating: 4.4,
                    openingHours: 'Ma: 19:00 - 22:00, Di - Do: 14:00 - 22:00, Vr: 15:00 - 22:00, Za: 12:30 - 22:00, Zo: 10:15 - 21:30',
                    reviews: [
                        { text: 'Great selection of movies. Friendly staff and good technical installation. The best place to watch movies in Leeuwarden.', author: 'Jurgen van der Wal' },
                        { text: 'Art house movie theatre, part of the Fries Museum building. Nice and comfortable chairs.', author: 'Linda' },
                        { text: 'The cinema itself was actually quite cozy and small. The staff made up for it with their friendliness! They even announced the film personally.', author: 'Krampus het Kerstmonster' }
                    ]
                },
                {
                    name: 'Fries Museum',
                    description: 'Het verhaal van Friesland in een modern gebouw. Van prehistorie tot Mata Hari, met wisselende tentoonstellingen en meer dan 200.000 objecten.',
                    address: 'Wilhelminaplein 92, 8911 BL Leeuwarden',
                    coords: [53.1995198, 5.7945743],
                    link: 'https://www.friesmuseum.nl/',
                    tags: ['museum', 'geschiedenis', 'Mata Hari'],
                    image: 'https://files.friesmuseum.nl/files/4/0/0/2/1/LR%20-%20Fries%20Museum%2010%20jaar-19.jpg?width=360&height=240&mode=crop',
                    priceLevel: 2,
                    rating: 4.4,
                    openingHours: 'Di - Zo: 11:00 - 17:00',
                    reviews: [
                        { text: 'Plan to spend at least 3–4 hours here — there\'s so much to see. The paintings are absolutely mesmerizing.', author: 'Таня Лига Крупенникова' },
                        { text: 'Very interesting and nice museum that sheds light on historical facts, events of Friesland and its important figures.', author: 'Cagatay Murat Nesimioglu' },
                        { text: 'I especially liked the Mata Hari exhibition. The ladies at the front desk are really friendly.', author: 'Naomi Hellman' }
                    ]
                },
                {
                    name: 'Keramiekmuseum Princessehof',
                    description: 'Nationaal keramiekmuseum in een 18e-eeuws stadspaleis — het geboortehuis van M.C. Escher. De grootste Chinese porseleincollectie van Nederland.',
                    address: 'Grote Kerkstraat 9, 8911 DZ Leeuwarden',
                    coords: [53.2029088, 5.7917456],
                    link: 'https://www.princessehof.nl/',
                    tags: ['museum', 'keramiek', 'Escher'],
                    image: 'https://files.friesmuseum.nl/files/8/8/2/3/lr--princessehof--voor-en-achterkant--foto-ruben-van-vliet-5.jpg',
                    priceLevel: 2,
                    rating: 4.4,
                    openingHours: 'Di - Zo: 11:00 - 17:00',
                    reviews: [
                        { text: 'We thought we would spend just one hour here but stuck till closing. This house was a birthplace of M.C. Escher!', author: 'Dima Krieger' },
                        { text: 'Such a cute museum with a rich history of ceramics. The staff is very helpful. Highly recommend!', author: 'Sophia Chen' },
                        { text: 'A great museum with a wide range of Ceramics from all over the planet. There\'s also a great Escher exhibition in the basement.', author: 'Rene Pot' }
                    ]
                },
                {
                    name: 'Blokhuispoort',
                    description: 'Voormalige gevangenis uit 1580, nu een bruisend cultureel complex. Winkeltjes, ateliers, een bibliotheek, museum en restaurant — allemaal achter de oude gevangenismuren.',
                    address: 'Blokhuisplein 40, 8911 LJ Leeuwarden',
                    coords: [53.1998108, 5.8002343],
                    link: 'https://www.blokhuispoort.frl/',
                    tags: ['gevangenis', 'cultureel complex', 'historisch'],
                    image: 'https://blokhuispoort.frl/wp-content/uploads/2024/09/hero.jpg',
                    priceLevel: 1,
                    rating: 4.4,
                    openingHours: 'Ma: 08:00 - 23:00, Di - Za: 08:00 - 01:00, Zo: 10:00 - 01:00',
                    reviews: [
                        { text: 'A former prison transformed into cultural gem. Small entrepreneurs, shops, art projects, a library and restaurants all in one. Magnificent!', author: 'Valentine' },
                        { text: 'There\'s a café, a museum, a hostel, and several small shops — altogether it makes this place feel unique and a bit special.', author: 'Таня Лига Крупенникова' },
                        { text: 'This place was developed with love. Hard work was done to create this interesting place, I highly recommend to visit it at least once!', author: 'Liubov Shperova' }
                    ]
                }
            ]
        }
    ]
};
