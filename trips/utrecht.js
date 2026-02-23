const utrecht = {
    id: 'utrecht',
    name: 'Utrecht',
    subtitle: 'Grachtenstad met verborgen pareltjes',
    dates: 'Nog te plannen',
    banner: './assets/banner-utrecht.png',
    mapCenter: [52.0907, 5.1214],
    mapZoom: 14,
    categories: [
        {
            type: 'hotel',
            icon: 'bed-double',
            label: 'Hotels',
            color: '#A68A73',
            places: [
                {
                    name: 'Mother Goose Hotel',
                    description: 'Intiem boutique hotel in een voormalig pakhuis aan de Ganzenmarkt. Vier unieke kamers met exposed brick, houten balken en uitzicht op de Domtoren.',
                    address: 'Ganzenmarkt 26, 3512 GE Utrecht',
                    coords: [52.0924941, 5.1197592],
                    link: 'https://www.mothergoosehotel.com/',
                    tags: ['boutique', 'historisch pand', 'Domtoren view'],
                    image: 'https://www.mothergoosehotel.com/upload/heading/image-900x1300_1.jpg',
                    priceLevel: 3,
                    rating: 4.6,
                    openingHours: '24/7 bereikbaar',
                    reviews: [
                        { text: 'A fabulous little boutique hotel that feels more like staying in a stylish private Airbnb than a traditional hotel. The location is brilliant, right in the centre, with a lovely street view of the Dom Tower.', author: 'K L' },
                        { text: 'My favourite hotel in Utrecht. Small but lovely rooms, well set up with good coffee and toiletries. In a great spot close to everything and very comfortable large beds.', author: 'Colin Fuller' },
                        { text: 'A small, cozy boutique hotel located in the heart of the city. The bed was super comfortable. The staff were genuinely lovely, warm, friendly, and happy to help with anything.', author: 'Elsa Perez' }
                    ]
                },
                {
                    name: 'Eye Hotel',
                    description: 'Persoonlijk designhotel in een monumentaal pand bij de Wijde Begijnestraat. Ruime kamers, gratis koffie in de lounge en een warm welkom.',
                    address: 'Wijde Begijnestraat 1-3, 3512 AW Utrecht',
                    coords: [52.0954403, 5.1218645],
                    link: 'https://www.eyehotel.nl/',
                    tags: ['design', 'boutique', 'lounge'],
                    image: 'https://www.eyehotel.nl/upload/gallery/eye-hotel.jpg',
                    priceLevel: 2,
                    rating: 4.5,
                    openingHours: '24/7 bereikbaar',
                    reviews: [
                        { text: 'I truly fell in love with this hotel! The staff is exceptionally friendly and caring, always with a smile on their faces. Top-notch service!', author: 'mindia gujaraidze' },
                        { text: 'Unique hotel in Utrecht with well appointed spacious rooms. Staff very friendly and helpful. Excellent location for restaurants and markets.', author: 'Michael Macgillivray' },
                        { text: 'Small but personal hotel with great staff and service. A nice lounge to hang out in with free coffee. Perfectly located in city centre.', author: 'Robert Hammenrudh' }
                    ]
                },
                {
                    name: 'Hotel Beijers',
                    description: 'Slapen in een 17e-eeuws stadspaleis naast de Domtoren. Veertien unieke kamers ingericht met bijzondere antiek en gedurfde kleurcombinaties. Tuin op de binnenplaats.',
                    address: 'Achter Sint Pieter 140, 3512 HT Utrecht',
                    coords: [52.091322, 5.1235711],
                    link: 'https://www.hotelbeijers.com/',
                    tags: ['stadspaleis', '17e eeuw', 'Domtoren'],
                    image: 'https://hotelbeijers.com/images/beijersslider.png',
                    priceLevel: 2,
                    rating: 4.5,
                    openingHours: '24/7 bereikbaar',
                    reviews: [
                        { text: 'Beautiful interior. The shower is amazing. There is some sound from rooms next to you or church bells but this did not bother me at all.', author: 'Anja Zwarts' },
                        { text: 'We had a wonderful stay! The room was clean, spacious, and very comfortable. The staff were exceptionally welcoming and helpful. Access to a lovely garden was a highlight.', author: 'Maureen GY Lin' },
                        { text: 'Cute B&B style historic hotel centrally located in Utrecht. The decor is unique and gorgeous. The desk staff are friendly and helpful.', author: 'Sarah Warren' }
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
                    name: 'Sumventure Flightbar',
                    description: 'Cocktail flights als concept: proef je door creatieve combinaties van spirits en cocktails. Huisgemaakte ingrediënten, duurzaam en met passie bereid.',
                    address: 'Willem van Noortstraat 65, 3514 GC Utrecht',
                    coords: [52.1012687, 5.1211863],
                    link: 'https://sumventure.nl/',
                    tags: ['cocktail flights', 'craft', 'intiem'],
                    image: 'https://sumventure.nl/wp-content/uploads/2025/01/Januari24-34.jpg',
                    priceLevel: 2,
                    rating: 4.9,
                    openingHours: 'Ma, Do - Za: 17:00 - 00:00, Zo: 15:30 - 22:00',
                    reviews: [
                        { text: 'Little hidden gem of a cocktail bar in Utrecht. The service here is excellent with the bartenders taking time to explain the wines and cocktails.', author: 'Carl Thomas' },
                        { text: 'This is an amazing place for cocktails, they have a lot of unique and fun drinks, the presentation is also really nice. Our bartender was super friendly.', author: 'Sar Cat' },
                        { text: 'We chose the First Class Cocktail Flight and it was amazing from presentation, to explanations and inspiration of each drink! Decor is comfy and cozy with perfectly dimmed lighting.', author: 'Patrick De Langhe' }
                    ]
                },
                {
                    name: 'Mr. Finch',
                    description: 'Stijlvolle cocktailbar tussen Centraal Station en de Dom. Creatieve cocktails in bijzondere glazen, met bartenders die off-menu meesterwerken maken.',
                    address: 'Drieharingstraat 5, 3511 BH Utrecht',
                    coords: [52.0921313, 5.1160613],
                    link: 'https://mr-finch.nl/',
                    tags: ['craft cocktails', 'sfeer', 'centrum'],
                    image: 'https://mr-finch.nl/wp-content/uploads/2025/09/BANNER_GENERAL.jpeg',
                    priceLevel: 2,
                    rating: 4.6,
                    openingHours: 'Di - Wo: 16:00 - 01:00, Do - Za: 15:00 - 02:00, Zo: 15:00 - 23:30',
                    reviews: [
                        { text: 'A wonderful place for drinks, snacks and atmosphere. Very friendly staff who will make anything you ask for. If you\'re going to one bar in Utrecht make it this one.', author: 'Zoe' },
                        { text: 'Mr. Finch may be the best place for cocktails in Utrecht. I really liked how for one of the cocktails you could choose in which fun glass you\'d prefer your drink in.', author: 'labrini c' },
                        { text: 'Great cocktail bar! Fantastic variety of cocktails and they are happy to help you choose. Make sure to reserve because it\'s quite small.', author: 'Florencia Abinzano' }
                    ]
                },
                {
                    name: 'Koenraad\'s Bovenkamer',
                    description: 'Speakeasy boven restaurant Koenraad aan de Voorstraat. Donkere academia-sfeer met intieme hoekjes, seizoensgebonden gerechten en uitstekende cocktails en negroni\'s.',
                    address: 'Voorstraat 14, 3512 AN Utrecht',
                    coords: [52.0941575, 5.1189184],
                    link: 'https://www.koenraadutrecht.nl/',
                    tags: ['speakeasy', 'dark academia', 'negroni'],
                    image: 'https://koenraadutrecht.nl/wp-content/uploads/2025/03/2025-02-15_Koenraad_070-faceless-scaled.jpg',
                    priceLevel: 2,
                    rating: 4.7,
                    openingHours: 'Ma - Zo: 17:30 - 23:00 (vr-za tot 00:00)',
                    reviews: [
                        { text: 'Fell in love with the dark academia almost middle age dimmed interior and vibe. ALL the dishes were so well balanced in terms of flavor profiles.', author: 'Chana' },
                        { text: 'Cozy restaurant in the middle of town with delicious food. Smaller menu of seasonal dishes. Great negroni made up for everything.', author: 'Pavol' },
                        { text: 'Great place with a varied menu and extensive wine list. The team is super friendly and takes into account any food restrictions you may have.', author: 'noba' }
                    ]
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
                    name: 'Restaurant Maeve',
                    description: 'Michelin-ster fine dining aan de Kromme Nieuwegracht. Verrassingsmenu van 6 gangen met Nederlandse wijnen en speelse presentaties in een casual-chique sfeer.',
                    address: 'Kromme Nieuwegracht 18, 3512 HH Utrecht',
                    coords: [52.0923992, 5.1242603],
                    link: 'https://www.restaurantmaeve.nl/',
                    tags: ['Michelin ster', 'fine dining', 'tasting menu'],
                    image: '',
                    priceLevel: 3,
                    rating: 4.8,
                    openingHours: 'Di - Do: 18:30 - 23:30, Vr - Za: 12:00 - 16:30 & 18:30 - 23:30',
                    reviews: [
                        { text: 'We had the pleasure of enjoying a 6-course dinner with wine pairing. Each dish was beautifully presented and filled with surprising flavors. Among our favorites in Utrecht!', author: 'Jurian Russchenberg' },
                        { text: 'One word: Perfection. The food, the wine, the atmosphere, the staff. All the combinations of textures, the subtle flavour nuances, it all came together perfectly.', author: 'Jonna Lehto' },
                        { text: 'Playful presentation of flavors, in-between formal and cosy atmosphere. Quality selection of wine! Do ask the sommelier to recommend some Dutch local wines.', author: 'SucksItSucks YourMusicTaste' }
                    ]
                },
                {
                    name: 'Restaurant Hemel & Aarde',
                    description: 'Gastronomisch hoogtepunt met seizoensgebonden 5- of 7-gangenmenu. Lokale ingrediënten, ruim interieur met grote ramen en een indrukwekkende Nederlandse wijnkaart.',
                    address: 'Keistraat 8, 3512 HA Utrecht',
                    coords: [52.09235, 5.123005],
                    link: 'https://www.hemel-aarde.nl/',
                    tags: ['fine dining', 'seizoensgebonden', 'Nederlandse wijnen'],
                    image: '',
                    priceLevel: 3,
                    rating: 4.8,
                    openingHours: 'Wo: 18:00 - 00:00, Do - Za: 12:00 - 15:00 & 18:00 - 00:00',
                    reviews: [
                        { text: 'Genuine, friendly, with a stellar cuisine with insane value for money. We got to taste no less than a dozen dishes, each absolutely stunning with a unique identity.', author: 'Louise Melin' },
                        { text: 'The five course tasting menu was a mix of modern, handcrafted delights based on fresh, often locally sourced ingredients. Their Dutch Riesling was especially well balanced.', author: 'Andras Heczey' },
                        { text: 'The venue is beautiful and spacious. The staff are wonderful, polite, warm and professional. The food surpassed my expectations — a very clear and beautiful artistry at work.', author: 'William Caldwell' }
                    ]
                },
                {
                    name: 'Restaurant Fico',
                    description: 'Modern Italiaans geïnspireerd fine dining aan de Veilinghaven. Zescourses set menu met uitzicht over het water. Uitstekende wijnpairing.',
                    address: 'Veilinghavenkade 14, 3521 AK Utrecht',
                    coords: [52.0826997, 5.1068452],
                    link: 'https://www.ficoutrecht.nl/',
                    tags: ['Italiaans', 'set menu', 'waterlocatie'],
                    image: 'https://ficoutrecht.nl/wp-content/uploads/2025/08/FICO-terras-_-Hapjes_71-683x1024.jpg',
                    priceLevel: 3,
                    rating: 4.5,
                    openingHours: 'Ma - Za: 17:30 - 00:00, Zo: 12:00 - 21:00',
                    reviews: [
                        { text: 'Creative and tasty dishes! A great selection of various wine, service was very good too! Definitely a must visit spot for food lovers!', author: 'Hsu June' },
                        { text: 'Amazing fine dining spot in Utrecht. I highly recommend going with the set menu. The wines are amazing and the staff is great at pairing.', author: 'Timo Nazari' },
                        { text: 'Wonderful dining experience. The atmosphere was very nice overlooking the water. The food was excellent, creative and well executed.', author: 'Jeremy Dixon' }
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
                    name: 'Slachtstraat Filmtheater',
                    description: 'Intiem arthouse filmtheater met niche programmering en een stijlvol café op de begane grond. Kleine zalen, voetensteun op de voorste rij en een huiskat.',
                    address: 'Slachtstraat 5, 3512 BC Utrecht',
                    coords: [52.0931125, 5.1196573],
                    link: 'https://www.slachtstraat.nl/',
                    tags: ['arthouse', 'filmtheater', 'café'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Slachtstraat_Filmtheater.jpg',
                    priceLevel: 1,
                    rating: 4.6,
                    openingHours: 'Ma - Do: 11:00 - 00:00, Vr - Za: 11:00 - 01:00, Zo: 11:00 - 00:00',
                    reviews: [
                        { text: 'My favourite art house cinema in Utrecht! The different rooms are perfectly cozy, the employees always nice and helpful, and the drinks in the café absolutely delicious!', author: 'Valerie Happy' },
                        { text: 'Cinema heaven! Really cute place with innovative things. The movie review book is such a clever idea. Thanks to the friendly staff and the cat that paid me a visit.', author: 'Jaron Meier' },
                        { text: 'A hidden gem — niche arthouse programming and a bar with timeless class. I love that the front row seats have foot stools.', author: 'Minke Havelaar' }
                    ]
                },
                {
                    name: 'Louis Hartlooper Complex',
                    description: 'Film- en cultuurcentrum in een voormalig politiebureau uit 1927 aan de Tolsteegbrug. Arthouse films, een grand café en een sfeervolle locatie in de Museumwijk.',
                    address: 'Tolsteegbrug 1, 3511 ZN Utrecht',
                    coords: [52.0816948, 5.1242104],
                    link: 'https://www.hartlooper.nl/',
                    tags: ['filmtheater', 'cultuurcentrum', 'grand café'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Louis_Hartlooper_Complex%2C_Utrecht_Ledig_Erf.jpg',
                    priceLevel: 1,
                    rating: 4.5,
                    openingHours: 'Ma - Wo: 11:00 - 23:00, Do - Vr: 11:00 - 00:00, Za: 10:00 - 00:00, Zo: 10:00 - 23:00',
                    reviews: [
                        { text: 'I discovered this film house and it is beautiful! The facilities are perfect, to have a drink or eat something, it has different areas to sit. Definitely recommendable.', author: 'Marisol González Bolívar' },
                        { text: 'Great atmosphere and a good selection of drinks.', author: 'Mitchell van Stenis' },
                        { text: 'The LHC is a film and culture center housed in a former police station from around 1927 on the Tolsteeg Bridge in the Museum Quarter.', author: 'Ed Bouwman' }
                    ]
                },
                {
                    name: 'Centraal Museum',
                    description: 'Het oudste stedelijk museum van Nederland met een eclectische collectie van oude meesters tot Dick Bruna. Wisselende tentoonstellingen, tuin met terras en een museumcafé.',
                    address: 'Agnietenstraat 1, 3512 XA Utrecht',
                    coords: [52.083748, 5.12591],
                    link: 'https://www.centraalmuseum.nl/',
                    tags: ['museum', 'kunst', 'Dick Bruna'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Exterieur_Centraal_Museum.jpg',
                    priceLevel: 1,
                    rating: 4.2,
                    openingHours: 'Di - Zo: 11:00 - 17:00',
                    reviews: [
                        { text: 'A unique, eerie, and thought-provoking museum. Stepping into Dick Bruna\'s atelier felt unexpectedly wholesome. A truly memorable visit.', author: 'K A' },
                        { text: 'Loved this Museum, old & new pieces together. Interactive displays — such an uplifting experience. Lovely café with outdoor terrace too.', author: 'Debbie F' },
                        { text: 'It\'s an interesting museum that incorporates various genres of arts. And some uniqueness deliberately engineered by the curator.', author: 'Yulan Zhou' }
                    ]
                },
                {
                    name: 'Museum Speelklok',
                    description: 'Uniek museum van zelfspelende muziekinstrumenten in de middeleeuwse Buurkerk. Van muziekdozen tot draaiorgels — alles speelt nog. De rondleiding is een must.',
                    address: 'Steenweg 6, 3511 JP Utrecht',
                    coords: [52.0908267, 5.1195937],
                    link: 'https://www.museumspeelklok.nl/',
                    tags: ['muziek', 'interactief', 'Buurkerk'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Buurkerk_en_Dom.jpg',
                    priceLevel: 1,
                    rating: 4.5,
                    openingHours: 'Di - Zo: 10:00 - 17:00',
                    reviews: [
                        { text: 'A truly charming and unique museum! The guided tour was fantastic: knowledgeable, funny, and clearly passionate. Hearing the clocks and organs come to life was magical!', author: 'Kampa Gittim Gelicem' },
                        { text: 'Amazing museum. The tour is highly recommended. They give it in both English and Dutch. The museum staff are very friendly. A lot of collection on musical items.', author: 'Nirupam Banerjee' },
                        { text: 'Wonderful collection of autoplaying music equipment including huge organs and small music boxes. Very interesting museum, I will visit again!', author: 'Chen Li' }
                    ]
                }
            ]
        }
    ]
};

export default utrecht;
