namespace RetroKits.Database.Seeder
{
    public class Seeder
    {
        private readonly MyDbContext _dbContext;
        public Seeder(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            Product[] products = new Product[]
            {
                new Product
                {
                    Name = "1973 VIBERTI -  Camiseta fútbol retro ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/17.jpg",
                    Price = "59,99",
                    Stock = 7,
                    Long_description = "El 30 de noviembre de 1969 Sebastián Humberto Viberti Irazoki se estrenaba en el C.D. Málaga tras su fichaje procedente de Huracán. Sus cinco temporadas como jugador malaguista y las tres como entrenador dejaron una huella imborrable para Viberti, el Club y la ciudad costasoleña."
                },
                new Product
                {
                    Name = "1970 BRAZIL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/2.jpg",
                    Price = "49,99",
                    Stock = 3,
                    Long_description = "La selección brasileña del año 1970 consiguió situarse como uno de los mejores equipos en la historia del fútbol. Con un equipo que deslumbró al mundo, Brasil conquistó su tercer título mundial en México tras derrotar a Italia en la final, habiendo ganado todos sus partidos en la competición. Con jugadores icónicos como Clodoaldo, Gérson, Rivelino, Tostao, Jairzinho, Pelé y Carlos Alberto, Brasil se convirtió en el equipo definitivo, un conjunto que trascenderá el paso del tiempo."
                },
                new Product
                {
                    Name = "1993 MARCEL SABOU - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/3.jpg",
                    Price = "59,99",
                    Stock = 9,
                    Long_description = "Marcel Sabou es un nombre que evoca grandes recuerdos en los aficionados del Real Sporting de Gijón. Durante su tiempo en el Club, se convirtió en uno de los futbolistas más queridos por la grada de El Molinón. Sin embargo, la ELA cambió su vida en 2013. A pesar de la enfermedad, su legado perdura inspirando solidaridad y esperanza como símbolo de la lucha contra esta enfermedad. En Gijón, su nombre sigue resonando con admiración y cariño."
                },
                new Product
                {
                    Name = "1909 REAL SOCIEDAD  - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "/Images/4.jpg",
                    Price = "49,99",
                    Stock = 2,
                    Long_description = "Los éxitos de la Real Sociedad de San Sebastián comenzaron en la temporada 1979/80, en la que el equipo dirigido por el mítico Alberto Ormaetxea consiguió el subcampeonato de Liga y permaneció 32 jornadas invicto. La temporada 1980/81 el Club, con un equipo plagado de gente de la casa, logró adjudicarse el título de Liga. Este triunfo es especialmente recordado por todos. La Real se jugaba la Liga ante el Sporting e iba por debajo en el marcador (2-1). Todo parecía perdido hasta que en los últimos instantes del partido, Jesús Mari Zamora consiguió el que sería el gol más importante en la historia del Club."
                },
                new Product
                {
                    Name = "1982 CHINA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/5.jpg",
                    Price = "39,99",
                    Stock = 5,
                    Long_description = "En el año 1982, la selección china de fútbol se encontraba en plena efervescencia. Tras terminar terceros en la Copa Asiática de 1976, las expectativas eran altas para clasificar al Mundial de España 1982. Sin embargo, la fortuna no estuvo del lado chino, y perdieron en el partido de desempate, quedando a un paso de su primera aparición en una Copa del Mundo. A pesar de la decepción, este periodo marcó la consolidación de la primera gran generación del fútbol chino."
                },
                new Product
                {
                    Name = "1982 ARGELIA - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/6.jpg",
                    Price = "39,99",
                    Stock = 1,
                    Long_description = "La participación de la selección argelina en la Copa del Mundo de 1982 marcó un momento histórico que quedó grabado en la historia del país. Su debut en el torneo, celebrado en España, estuvo lleno de sorpresas para cualquier aficionado al fútbol, viniendo de un novato en la competición. El partido inaugural fue un enfrentamiento contra Alemania, el vigente campeón europeo. Contra todo pronóstico, los argelinos lograron una victoria por 2-1, demostrando su talento y el orgullo de todo un país en el terreno de juego. Este triunfo resonó en todo el mundo del fútbol y puso de manifiesto el potencial de la selección argelina."
                },
                new Product
                {
                    Name = "1986 ARGENTINA World Cup ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/7.jpg",
                    Price = "59,99",
                    Stock = 8,
                    Long_description = "“...ahí la tiene Maradona, lo marcan dos, pisa la pelota Maradona, arranca por la derecha el genio del fútbol mundial, deja el tendal y va a tocar para Burruchaga... ¡Siempre Maradona! ¡Genio! ¡Genio! ¡Genio! Ta-ta-ta-ta-... Gooooool... Gooooool... ¡Quiero llorar! ¡Dios Santo, viva el fútbol! ¡Golaaazooo! ¡Diegoooool! ¡Maradona! Es para llorar, perdónenme... Maradona, en recorrida memorable, en la jugada de todos los tiempos... Barrilete cósmico....”\n\nAsí narró Víctor Hugo Morales el mejor gol de la historia de los Mundiales, conseguido en el partido de cuartos de final disputado entre Argentina e Inglaterra del Mundial de México 1986."
                },
                new Product
                {
                    Name = "1970 ATLÉTICO DE MADRID Home",
                    Description = "Retrokits",
                    ImageUrl = "/Images/8.jpg",
                    Price = "59,99",
                    Stock = 0,
                    Long_description = "El Atlético de Madrid vivió un período de gloria durante la década de 1970, y consolidó su reputación como uno de los mejores clubes de fútbol de España. Durante estos años, el club ganó tres títulos de Liga (1970, 1973 y 1977), además de la Copa del Generalísimo del 72 y 76. Durante esa década, el equipo contó con grandes figuras en el banquillo como Marcel Domingo o Max Merkel, pero la que más destaca es el inicio de la etapa como técnico de Luis Aragonés. Con una plantilla repleta de talento, destacaron jugadores emblemáticos como Adelardo, Luiz Pereira, José Eulogio Gárate, Rubén Ayala y el habilidoso extremo Ufarte.\n\nPersonas como Luis Aragonés y recientemente Simeone, ambos jugadores y entrenadores del Atletico de Madrid, cimentaron su leyenda: sentimiento y rebeldía. Los atléticos siempre se levantan. Eso les ha hecho ganarse el respeto de todos los demás clubes, convirtiendo a su afición en una de las más fieles de toda España."
                },
                new Product
                {
                    Name = "1899 BLAUGRANA - Camiseta fútbol ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/9.jpg",
                    Price = "39,99",
                    Stock = 6,
                    Long_description = "Fue fundado el 29 de noviembre de 1899 por un grupo de doce aficionados al fútbol, convocados por el suizo Hans Gamper (conocido posteriormente como Joan Gamper) mediante un anuncio publicado en la revista Los Deportes. Entre los fundadores había seis españoles, tres suizos, dos ingleses y un alemán. El nombre original escogido fue «Foot-ball Club Barcelona», en inglés, siendo el suizo Walter Wild el primer presidente del club.\n\nHablar de este equipo, es hacerlo de uno de los 5 equipos más importantes de la historia del fútbol, tanto por títulos obtenidos como por seguidores."
                },
                new Product
                {
                    Name = "1908 INTER NERAZZURRI - Camiseta ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/10.jpg",
                    Price = "39,99",
                    Stock = 4,
                    Long_description = "Ser nerazzurri supone en sí mismo un acto de rebeldía, tal y como hicieron 44 integrantes del principal club de la ciudad, el A.C. Milan, el 9 de marzo de 1908, que, disconformes con la política del club de jugar sólo con italianos, fundaron un club en el que todo el mundo, fuera del país que fuera, tuviera cabida. Una squadra internazionale.\n\nYa desde su fundación, los colores del Inter fueron azul y negro, y en 1910 consigue su primer “scudetto”. En 1955 Angelo Moratti compra el club y lo lleva a su periodo de mayor grandeza (“El Gran Inter”), los años 60, dirigidos por Helenio Herrera y capitaneados por el gran Suarez, Facchetti, Mazzola, Da Costa y Picchi.\n\nEntre 2005-2010, logra 5 títulos consecutivos y la culminación de la Champions League bajo la dirección de Jose Mourinho."
                },
                new Product
                {
                    Name = "1892 REDS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/11.jpg",
                    Price = "49,99",
                    Stock = 2,
                    Long_description = "La historia del Liverpool FC no puede entenderse sin la figura de Bill Shankly. Shankly se hizo cargo del Liverpool FC en 2ª división, consiguiendo el ascenso en su segundo año y estableciendo su estilo tanto en el terreno de juego como en las normas del club en los años posteriores. Con Shankly el club ganó 3 campeonatos de liga inglesa, 2 FA Cups, 4 Community Shields y 1 Copa de la UEFA, posteriormente dimitió tras la final de la FA Cup en 1974.\n\nCuenta con una de las aficiones más reconocidas del mundo. The Kop, grada sur de Anfield y cuna de la estética casual en los 70, fue cultivando un código de honor característico: aplaudir al rival, animar siempre al Liverpool, quedando prohibidos los cantos racistas, las banderas inglesas y los insultos. Su conocido eslogan: \"You´ll Never Walk Alone\"."
                },
                new Product
                {
                    Name = "1982 ITALY - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/12.jpg",
                    Price = "49,99",
                    Stock = 10,
                    Long_description = "Durante el Mundial de España 1982, la Italia de Zoff y el brillante Paolo Rossi, fue de menos a más. Venció a Argentina, Brasil, Polonia y a Alemania en la final disputada en el estadio Santiago Bernabeu, consiguiendo así su tercera estrella.\n\nEl Mundial de España 1982 contó nada menos que con 17 sedes. Aunque, una vez más, los equipos se dividieron en grupos (6 de 4), se reinstauró la figura de la semifinal. Se considera uno de los mejores Mundiales por su elenco."
                },
                new Product
                {
                    Name = "1974 GRANADA CF - Camiseta fútbol",
                    Description = "Retrokits",
                    ImageUrl = "/Images/13.jpg",
                    Price = "49,99",
                    Stock = 7,
                    Long_description = "A principios de los 70 el Club era conocido como ‘’Matagigantes’’. En esa época, el estadio de Los Cármenes se transformó en un fortín. En ese mismo estadio por el que han pasado como rivales jugadores de la talla de Di Stefano, Puskas, Paco Gento o Kubala. Momentos imborrables que se han vivido dentro de esas gradas.\n\nA pesar de momentos duros en divisiones inferiores, la historia del Granada se escribe en Primera División y en un Nuevo Los Cármenes, donde toda la ciudad se reúne para ver a su Club codearse con los mejores equipos de Europa."
                },
                new Product
                {
                    Name = "1982 FRANCE - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/14.jpg",
                    Price = "59,99",
                    Stock = 5,
                    Long_description = "Para la selección francesa, el Mundial de España 82 es uno de los más espectaculares de su historia. Fue el mundial donde se dió a conocer el “Cuadrado Mágico”, esa alineación en la medular formada exclusivamente por cuatro jugadores de carácter ofensivo: Genghini, Tigana, Giresse y Platini.Y también por vivir uno de los partidos más recordados de la historia: la semifinal ante la República Federal de Alemania."
                },
                new Product
                {
                    Name = "1958 PELE Santos Away - Camiseta",
                    Description = "Retrokits",
                    ImageUrl = "/Images/15.jpg",
                    Price = "49,99",
                    Stock = 3,
                    Long_description = "\"O Rei Pelé\" es un mito. Para muchos, es el mejor futbolista de todos los tiempos. Jugando únicamente en dos clubs (Santos y Cosmos) y en la selección brasileña, anotó 1.282 goles en 1.366 partidos (1956-77).\n\nCon la selección de Brasil lo ganó casi todo: tres de las cuatro Copas del Mundo en que participó: Suecia 58, Chile 62 y México 70. Con el equipo de sus amores, el legendario Santos de Brasil, de 1956 a 1974 triunfó igualmente ganando un gran número de trofeos."
                },
                new Product
                {
                    Name = "1935 BOCA JUNIORS M/CORTA ",
                    Description = "Retrokits",
                    ImageUrl = "/Images/16.jpg",
                    Price = "39,99",
                    Stock = 9,
                    Long_description = "Hacía casi cuarenta años que se practicaba el fútbol en Argentina y catorce años desde la creación de la liga amateur, pero el 3 de abril de 1905 es una fecha clave en la historia del futbol. Seis adolescentes, hijos de inmigrantes italianos y vecinos de La Boca, barrio de trabajadores y de fuerte identidad genovesa (“xeneize” en dialecto), sentados en un banco del Parque Solís de Buenos Aires, fundaron el Club Atlético Boca Juniors.\n\nEl Boca Juniors tomó al azar los colores de un barco sueco que arribó al puerto de Buenos Aires, y se convirtió en uno de los mejores equipos de la historia que ha tenido en el gran Diego Armando Maradona a su jugador más conocido a nivel mundial."
                },
                new Product
                {
                    Name = "1946 ISIDRO LÁNGARA. Camiseta Real Oviedo",
                    Description = "Retrokits",
                    ImageUrl = "/Images/18.jpg",
                    Price = "49,99",
                    Stock = 6,
                    Long_description = "Isidro Lángara Galarraga (Pasajes, Guipúzcoa, 25 de mayo de 1912 - Andoáin, Guipúzcoa, 21 de agosto de 1992) fue un futbolista español y es uno de los máximos goleadores de la historia del fútbol, con 525 goles en partidos oficiales. Ostenta numerosos récords goleadores.\n\nA nivel de clubes jugó en varios equipos: el Real Oviedo, del que es su máximo goleador histórico con 257 goles, el R. C. España de México y San Lorenzo de Argentina. Tiene el mejor promedio goleador de la Primera División española con 1,16 goles por partido, también es el único jugador que ha logrado encadenar tres hat tricks consecutivos en dicho campeonato y además es el único jugador de la historia en haber alcanzado la cifra de 100 goles y haber sido máximo goleador en tres campeonatos de Primera División distintos."
                },
                new Product
                {
                    Name = "1982 SPAIN - Jersey Fútbol Retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/19.jpg",
                    Price = "49,99",
                    Stock = 8,
                    Long_description = "España fue la escogida para albergar el Mundial de 1982. La ilusión que ya había mostrado el país por el fútbol en los últimos años y el aperturismo tras la dictadura, fueron clave para su elección.\n\nEspaña partía como favorita al título por su condición de anfitriona y por su gran victoria en Wembley un año antes."
                },
                new Product
                {
                    Name = "1966 PORTUGAL - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/20.jpg",
                    Price = "49,99",
                    Stock = 0,
                    Long_description = "Inglaterra fue elegida sede de la VIII edición del Mundial, disputada entre el 11 y 30 de julio de 1966. Estuvo marcada por el juego violento y los escándalos arbitrales. Portugal quedó encuadrada en un grupo bastante complicado. Sin embargo, los portugueses vencieron 3-1 y 3-0 a Hungría y Bulgaria respectivamente. El último encuentro de la fase de grupos fue contra Brasil. Contra todo pronóstico los lusos vencieron 3-1, lo que la convirtió en un serio candidato al título. Los portugueses se encontraron en cuartos con la debutante del torneo, Corea del Norte, que había eliminado sorpresivamente a Italia en la fase de grupos. El mundo entero, incrédulo, vio cómo los asiáticos iban ganando 3-0 a los 24 minutos."
                },
                new Product
                {
                    Name = "1968 RED DEVILS - Camiseta fútbol retro",
                    Description = "Retrokits",
                    ImageUrl = "/Images/21.jpg",
                    Price = "49,99",
                    Stock = 4,
                    Long_description = "Descripción no disponible."
                }
            };

            _dbContext.Products.AddRange(products);
            _dbContext.SaveChanges();
        }
    }
}
