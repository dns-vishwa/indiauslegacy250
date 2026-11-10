// Complete Poster Companion Data for Legacy 250 (Posters 1 - 20)
// Posters 1-10: Verbatim companion articles & extracted poster images from QR-Poster-Text.docx
// Posters 11-20: Exhibition panel companions structured for QR-code visitors

export const POSTERS_DATA = [
  {
    id: 1,
    number: "01",
    slug: "poster1",
    altSlugs: ["india-the-golden-bird", "golden-bird", "poster-1"],
    title: "INDIA: THE GOLDEN BIRD",
    subtitle: "The Wealth That Drew the World East",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster1.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    sections: [
      {
        heading: "1. Why Was India Called the “Golden Bird”?",
        paragraphs: [
          "The evocative phrase “Sone ki Chidiya” (golden bird) conveys the reputation of the Indian subcontinent as a land of abundance, accomplished artisans, sophisticated cities and prized merchandise. It is a cultural metaphor, not a precise historical ranking.",
          "Across many centuries, regions of the subcontinent were major centers of agricultural output, manufacturing and long-distance trade. Economic historians have estimated that the Indian subcontinent represented a substantial share of world production in some preindustrial periods. Such estimates depend on reconstructed populations, prices, boundaries and methods; they should not be read as exact measures of individual prosperity. Wealth was also distributed very unequally."
        ]
      },
      {
        heading: "2. The Goods That Attracted Distant Merchants",
        items: [
          {
            label: "TEXTILES",
            text: "Indian cotton cloth, muslins, calicoes, printed fabrics and silks were celebrated for their craftsmanship and variety. Textile-producing regions supplied markets from the Indian Ocean to Europe and beyond. In the early modern era, Indian cottons helped reshape global fashion and manufacturing."
          },
          {
            label: "SPICES AND AROMATICS",
            text: "Pepper from the Malabar Coast and other Indian commodities moved through complex commercial networks. Not every spice associated with the “spice trade” originated in India: cloves and nutmeg, for example, came principally from Southeast Asian islands. India was both a producer and a major trading crossroads."
          },
          {
            label: "GEMS AND PRECIOUS MATERIALS",
            text: "Indian diamond mines, notably in the Golconda trading sphere, supplied renowned stones before major discoveries elsewhere. Pearls, gemstones, metals and fine craftwork circulated through elite and commercial markets."
          },
          {
            label: "KNOWLEDGE AND IDEAS",
            text: "Indian mathematical traditions, including the development and transmission of place-value decimal notation and the use of zero, profoundly influenced global learning. Medical, astronomical, linguistic and philosophical traditions likewise developed over centuries through exchange and debate."
          }
        ]
      },
      {
        heading: "3. India at the Center of Connected Oceans",
        paragraphs: [
          "Indian ports were linked to East Africa, the Arabian Peninsula, the Persian Gulf, Southeast Asia and China through monsoon-based maritime routes. Merchants from many faiths and communities participated. Overland connections also carried goods and ideas through Central and West Asia.",
          "Rather than a single route controlled by one kingdom, these were changing networks of ports, intermediaries, states and seafarers. The poster’s ships symbolize this long history of international exchange."
        ]
      },
      {
        heading: "4. Why Europeans Sought New Routes to Asia",
        paragraphs: [
          "European consumers prized Asian spices, textiles and luxury goods. Portuguese and Spanish rulers also sought commercial advantage, political prestige and religious expansion. Navigational advances and competition for access to Asian markets encouraged voyages into the Atlantic and around Africa.",
          "In 1498 Vasco da Gama reached Calicut (Kozhikode) by sailing around the Cape of Good Hope, establishing a direct Portuguese sea connection with the Indian Ocean trade system. His arrival did not “discover” India or create its maritime commerce; thriving networks already existed."
        ]
      },
      {
        heading: "5. 1492: Columbus Sails West Seeking Asia",
        paragraphs: [
          "Christopher Columbus, sailing under the Spanish Crown, crossed the Atlantic in 1492 hoping to reach Asia by a westward route. He landed in the Caribbean, not India. He mistakenly understood the lands he encountered in relation to Asia and used terminology that contributed to the enduring mislabeling of Indigenous peoples as “Indians.”",
          "The Americas were not empty or unknown to their inhabitants. Diverse Indigenous peoples and civilizations had lived there for millennia. The voyage initiated sustained European colonization, with devastating consequences including disease, violence, displacement and enslavement."
        ]
      },
      {
        heading: "6. Amerigo Vespucci and the Idea of a “New World”",
        paragraphs: [
          "Amerigo Vespucci participated in Atlantic voyages around the turn of the sixteenth century. Accounts circulated under his name arguing that lands across the Atlantic were part of a vast landmass distinct from Asia. The authorship and reliability of some letters attributed to him remain debated.",
          "He did not single-handedly discover a continent; rather, the growing European recognition of its geography developed through many voyages, maps and encounters—and always against the background of Indigenous knowledge of those lands."
        ]
      },
      {
        heading: "7. 1507: How “America” Appeared on a Map",
        paragraphs: [
          "In 1507, the German cartographer Martin Waldseemüller and collaborators published a world map and accompanying geographical text that applied the name “America” to part of the newly depicted western lands, honoring Amerigo Vespucci. The name later expanded in usage to refer to the continents.",
          "The name’s history is one of cartographic choices, European intellectual networks and gradual adoption—not a single official act that instantly renamed the entire hemisphere."
        ]
      },
      {
        heading: "8. A Timeline Behind the Poster",
        timeline: [
          { period: "Before 1492", event: "For centuries, Indian merchants, producers and ports helped connect Africa, Asia and the Mediterranean world." },
          { period: "1492", event: "Columbus reached Caribbean islands while seeking a westward route to Asia." },
          { period: "1498", event: "Vasco da Gama arrived at Calicut by the route around southern Africa." },
          { period: "1499–1502", event: "Voyages and writings associated with Vespucci contributed to European debate about the geography of the western Atlantic." },
          { period: "1507", event: "Waldseemüller’s map used the name “America.”" }
        ]
      },
      {
        heading: "9. The Deeper India–America Connection",
        paragraphs: [
          "Long before the United States existed, European ambitions to reach India helped propel Atlantic exploration. That is one indirect but consequential link between Indian Ocean commerce and the history of the Americas. It should not obscure the agency of Indigenous Americans or the coercive history of colonization.",
          "Over later centuries, connections became direct: American ships traded with Indian ports, Indian and American thinkers exchanged ideas, and migration, education, science and entrepreneurship built enduring ties. Legacy 250 invites visitors to examine these intertwined histories with curiosity and care."
        ]
      },
      {
        heading: "10. Understanding the Poster’s Symbolism",
        items: [
          {
            label: "THE GOLDEN PEACOCK",
            text: "Represents abundance, artistry and the metaphor of the golden bird; it is an artistic emblem, not a documented ancient economic symbol."
          },
          {
            label: "THE TEMPLES, MARKETS AND PORTS",
            text: "Evoke India’s varied cities, faiths, craftsmanship and commercial life across different historical eras; they are a composite illustration, not one literal scene."
          },
          {
            label: "THE THREE PORTRAITS",
            text: "Trace a specific European narrative: Columbus’s search for Asia, Vespucci’s association with a separate landmass, and Waldseemüller’s use of the name America."
          },
          {
            label: "THE MAP AND SHIPS",
            text: "Connect Atlantic exploration to the older desire for access to Asian trade. The map is illustrative and should not be treated as a historically exact route chart."
          }
        ]
      }
    ],
    furtherReading: [
      "K. N. Chaudhuri, Trade and Civilisation in the Indian Ocean (1985).",
      "Sanjay Subrahmanyam, The Career and Legend of Vasco da Gama (1997).",
      "John H. Parry, The Age of Reconnaissance (1963).",
      "Library of Congress, resources on the 1507 Waldseemüller world map.",
      "Smithsonian National Museum of the American Indian, educational resources on Indigenous histories and European contact.",
      "Angus Maddison, historical estimates of world economic output (interpret estimates cautiously)."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "The pursuit of India’s celebrated goods helped change the map of the world. The fuller story is richer still: Indian ingenuity, interconnected oceans, Indigenous American civilizations, European ambition and the consequences of empire all belong in the history we share."
    },
    footerNote: "Legacy 250 • Celebrating 250 years of India–U.S. friendship, learning and innovation • www.IndiaUSLegacy250.org"
  },
  {
    id: 2,
    number: "02",
    slug: "poster2",
    altSlugs: ["columbus-sailed-for-india", "columbus-indians", "poster-2"],
    title: "Columbus Sailed for India, Missed It—and Called the Natives “Indians”",
    subtitle: "A voyage in search of Asia that changed the history of the Americas",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster2.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "The Question behind the poster",
      paragraphs: [
        "Why are Indigenous peoples of the Americas sometimes called “Indians” when their ancestral homelands are thousands of miles from India? The answer begins with a European search for Asian trade routes, a navigational miscalculation, and the names that explorers and colonizers imposed on peoples they encountered."
      ]
    },
    sections: [
      {
        heading: "1. Why did Columbus sail west?",
        paragraphs: [
          "In the late fifteenth century, European merchants prized Asian spices, fine textiles, precious stones, and other goods. India was a major commercial and manufacturing center within interconnected Indian Ocean trading networks. European rulers and navigators hoped to reach Asian markets by sea, bypassing costly or politically complicated overland routes. Columbus proposed a westward Atlantic crossing, believing Asia lay much closer than it actually did. His estimates underestimated the Earth’s circumference and the distance across the ocean."
        ]
      },
      {
        heading: "2. What happened in 1492?",
        paragraphs: [
          "With backing from the Spanish monarchs Ferdinand and Isabella, Christopher Columbus sailed from Spain in August 1492 with three ships: the Niña, the Pinta, and the Santa María. On October 12, his expedition reached an island in the Bahamas, already inhabited by Indigenous people. Columbus subsequently traveled among Caribbean islands, including Cuba and Hispaniola. He had not reached India or mainland Asia. The islands and peoples he encountered were part of the Americas, lands with long, complex histories and flourishing societies before his arrival."
        ]
      },
      {
        heading: "3. Why did he call people “Indians”?",
        paragraphs: [
          "Columbus believed he had reached islands associated with the Indies—a broad European geographical term for parts of Asia. Spanish sources consequently used “indios” for Indigenous inhabitants. This terminology persisted as European imperial systems spread across the Americas. The label did not reflect the peoples’ own diverse names, languages, nations, or identities. Nor did it mean that Indigenous Americans originated in India."
        ]
      },
      {
        heading: "4. What were “the Indies”?",
        paragraphs: [
          "The term “Indies” was not identical to today’s Republic of India. Europeans used it variably for regions of South and Southeast Asia and, after Columbus, distinguished the “West Indies” of the Caribbean from the “East Indies” of Asia. Thus the shorthand “Columbus sailed for India” captures the lure of Asian commerce but simplifies his broader geographical objective."
        ]
      },
      {
        heading: "5. How did the misunderstanding change maps?",
        paragraphs: [
          "Columbus continued to interpret his discoveries within an Asian geographical framework. Later voyages and geographical reports helped European mapmakers recognize that lands across the Atlantic were not simply the eastern edge of Asia. In 1507, Martin Waldseemüller’s world map applied the name “America” to the newly recognized landmass, honoring Amerigo Vespucci. This was a European naming process; Indigenous peoples already had their own geographical knowledge and names."
        ]
      },
      {
        heading: "6. The people who were already there",
        paragraphs: [
          "The Americas were populated for millennia before 1492. The Caribbean included Taíno and other Indigenous communities with established agriculture, trade, political relationships, and cultural traditions. Columbus’s arrival began sustained European colonization that brought forced labor, dispossession, violence, and devastating epidemics. A complete account of the voyage must include the perspectives and experiences of the peoples whose lands were entered."
        ]
      },
      {
        heading: "7. What words should we use today?",
        paragraphs: [
          "“Indigenous peoples,” “Native Americans,” “American Indians,” and specific tribal or national names are used in different contexts. Preferences vary among individuals and communities, and “American Indian” remains an established legal and self-identification term for some. When possible, use the specific nation or community name—such as Taíno, Diné, Cherokee, or Haudenosaunee—and respect the terminology people choose for themselves."
        ]
      },
      {
        heading: "8. A short historical timeline",
        timeline: [
          { period: "Before 1492", event: "Diverse Indigenous civilizations and societies flourish throughout the Americas." },
          { period: "1492", event: "Columbus reaches Caribbean islands while seeking a westward route to Asian trading regions." },
          { period: "1493–1504", event: "Subsequent voyages deepen European involvement in the Caribbean and mainland Americas." },
          { period: "1498", event: "Vasco da Gama reaches India by sailing around Africa, opening a direct Portuguese sea route." },
          { period: "1507", event: "Waldseemüller’s map uses the name “America,” associated with Amerigo Vespucci." },
          { period: "Following centuries", event: "The terms “Indies,” “West Indies,” and “Indians” persist in maps, laws, and everyday language." }
        ]
      },
      {
        heading: "9. India’s unexpected connection to an American name",
        paragraphs: [
          "India’s importance in world commerce helped inspire the age of European oceanic exploration. Columbus’s effort to reach Asian markets led him instead to the Caribbean, where a mistaken geographical identification helped produce a lasting, contested label for Indigenous peoples. The connection is real, but it is a history of European trade ambitions and naming—not evidence that India was the destination reached or that the inhabitants were Indian."
        ]
      },
      {
        heading: "10. A lesson for Legacy 250",
        paragraphs: [
          "The story reminds us that words carry history. Maps can record discovery from one perspective while obscuring knowledge from another. Understanding the quest for India, the encounter in the Caribbean, and the identities of Indigenous peoples helps us tell a more accurate and inclusive story of the world that shaped America."
        ]
      }
    ],
    furtherReading: [
      "Encyclopaedia Britannica, “Christopher Columbus” and “West Indies.”",
      "Library of Congress, collections on early exploration and historical maps.",
      "Smithsonian National Museum of the American Indian, resources on Native identity and terminology.",
      "Library of Congress, Waldseemüller 1507 world map.",
      "J. H. Elliott, Empires of the Atlantic World: Britain and Spain in America 1492–1830 (Yale University Press, 2006)."
    ],
    editorialNote: "The poster’s wording is deliberately concise. This companion article provides historical nuance, including the broad meaning of “the Indies” and the distinction between an explorer’s claims and Indigenous histories.",
    footerNote: "LEGACY 250 • Celebrating 250 years of India–U.S. connections, learning, and shared futures."
  },
  {
    id: 3,
    number: "03",
    slug: "poster3",
    altSlugs: ["from-boston-to-calcutta", "early-american-trade-with-india", "poster-3"],
    title: "From Boston to Calcutta: Early American Trade with India",
    subtitle: "How commerce connected a new American republic to the Indian Ocean world",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster3.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    sections: [
      {
        heading: "A new republic looks east",
        paragraphs: [
          "American independence in 1776 created opportunities for U.S. merchants to trade beyond the commercial networks of the British Empire. India—especially the great ports of the Indian Ocean and the Bay of Bengal—offered textiles, spices, indigo, and other commodities desired in Atlantic markets. Trade was not a sudden discovery: South Asian merchants and producers had participated in extensive international networks for centuries.",
          "In the 1780s American merchants began undertaking direct voyages to Asia. One celebrated milestone is the 1784 voyage of the ship Empress of China from New York to Canton (Guangzhou), China. The poster highlights a ship called Massachusetts and Calcutta in 1784; that precise claim should be independently checked against ship registers and port records before it is presented as an established first. The larger point is well supported: direct American commerce with India developed in the early post-independence decades."
        ]
      },
      {
        heading: "Why Calcutta mattered",
        paragraphs: [
          "Calcutta (now Kolkata) grew into a major British East India Company administrative and trading center in Bengal. Its river access linked inland producers and markets to ocean-going vessels. American ships encountered a complex commercial world shaped by Indian merchants, artisans, financiers, European trading companies, and colonial rules.",
          "Trade brought opportunity but also inequality. Much of this exchange occurred under East India Company rule and later British imperial control, and the economic benefits and burdens were not evenly shared."
        ]
      },
      {
        heading: "What American vessels carried",
        paragraphs: [
          "American exports to Asian ports varied by voyage and decade. Silver and other specie were often crucial to financing purchases; merchants also carried goods such as ginseng, furs, timber, and assorted manufactured products. Clocks and timepieces could circulate in long-distance trade, but should not be treated as the defining cargo of the earliest India voyages.",
          "The poster also depicts ice and rum. New England ice became a remarkable export to Calcutta only in the nineteenth century: Frederic Tudor’s famous ice shipment arrived in 1833, not in 1784. Rum was part of Atlantic commerce, including networks implicated in slavery, but individual cargo manifests are needed to establish what a particular ship took to India."
        ]
      },
      {
        heading: "What returned from India",
        paragraphs: [
          "Cotton textiles, including printed and woven fabrics, were among India’s most important global exports. Indigo dye, silk goods, spices, and other products also crossed oceans. Indian textiles influenced consumer tastes and manufacturing practices far beyond South Asia.",
          "The poster mentions Indian raw cotton as a foundation of American textile mills. This needs qualification: U.S. mills became heavily dependent on cotton grown in the American South, much of it produced through enslaved labor. Indian cotton and textile expertise were globally significant, but did not constitute the primary raw-cotton supply for early U.S. mills."
        ]
      },
      {
        heading: "Commerce, people, and cultural contact",
        paragraphs: [
          "Trade moved more than commodities. Ships carried information, maps, business relationships, letters, and encounters among sailors, interpreters, merchants, and port communities. These connections predated formal diplomatic relations between modern India and the United States.",
          "Commercial links also carried difficult histories: imperial power, coercive labor systems, and unequal trade terms. A full account honors both entrepreneurial exchange and the people whose work made that exchange possible."
        ]
      },
      {
        heading: "Timeline: from independence to the ice trade",
        timeline: [
          { period: "1776", event: "The United States declares independence." },
          { period: "1784", event: "The Empress of China sails to Canton, demonstrating early American ambitions in Asian commerce." },
          { period: "Late 1780s–early 1800s", event: "Direct U.S. trade with Indian ports expands." },
          { period: "1833", event: "Ice from New England reaches Calcutta, a landmark in long-distance refrigerated commodity trade." }
        ]
      },
      {
        heading: "Why this history matters",
        paragraphs: [
          "The India–America relationship began long before today’s technology partnerships and diplomatic summits. Its foundations included ports, ships, craftsmen, entrepreneurs, and consumers. Friendship may grow through commerce, but enduring partnership also requires reciprocity, respect, and a clear understanding of history."
        ]
      }
    ],
    furtherReading: [
      "Salem Maritime National Historical Park (U.S. National Park Service), materials on early American East Indies trade.",
      "Peabody Essex Museum collections on Salem and Asian commerce.",
      "Historical studies of the Empress of China voyage.",
      "Scholarship on Frederic Tudor and the 1833 Calcutta ice trade.",
      "Tirthankar Roy, The Economic History of India, for colonial-era commercial context."
    ],
    editorialNote: "The poster’s specific “Massachusetts reached Calcutta in 1784” claim and cargo list require verification from primary shipping records.",
    closingReflection: {
      title: "About this exhibition",
      text: "Legacy 250 explores the many connections between India and the United States across trade, ideas, education, migration, and civic life. This companion article adds context to the exhibition poster; illustrations are interpretive rather than documentary reproductions."
    }
  },
  {
    id: 4,
    number: "04",
    slug: "poster4",
    altSlugs: ["india-and-the-american-imagination", "emerson-and-thoreau", "poster-4"],
    title: "India and the American Imagination",
    subtitle: "EMERSON AND THOREAU: THE INTELLECTUAL BRIDGE",
    editionTag: "A Legacy 250 exhibition companion | Expanded historical interpretation for QR-code visitors",
    image: "/assets/posters/poster4.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Across Oceans of Thought",
      paragraphs: [
        "From the wisdom of India to the conscience of America, ideas crossed oceans and helped Americans rethink nature, selfhood, freedom, and moral responsibility."
      ]
    },
    sections: [
      {
        heading: "1. What this poster tells us",
        paragraphs: [
          "The poster brings together nineteenth-century American writers, later public intellectuals, political leaders, ships, books, temples, and the Statue of Liberty. Its central claim is not that India alone created American thought. Rather, Indian philosophical texts and ideas became part of a lively transatlantic exchange. Americans encountered them through translations, lectures, correspondence, travel, and reform movements; they interpreted those ideas through their own religious, literary, and political debates. The exchange was selective, sometimes romanticized, and rarely one-directional."
        ]
      },
      {
        heading: "2. How Indian books reached New England",
        paragraphs: [
          "By the early nineteenth century, European translations and scholarship had made portions of Sanskrit literature accessible to English-speaking readers. The Bhagavad Gita, Upanishads, Laws of Manu, and other texts circulated among scholars and reform-minded readers. British imperial trade and colonial scholarship shaped many of these channels, often through unequal power relationships. American Transcendentalists read these works alongside Plato, Christianity, German Idealism, and other traditions. Their engagement was an intellectual encounter rather than direct discipleship under Indian teachers."
        ]
      },
      {
        heading: "3. Ralph Waldo Emerson (1803–1882): the universal spirit",
        paragraphs: [
          "Emerson, a leading voice of American Transcendentalism, admired Hindu philosophical literature and drew on ideas of spiritual unity and the relation between the individual and the universal. His poem “Brahma” (1857) is a particularly visible literary example, adapting themes associated with the Bhagavad Gita and Vedantic thought. His journals and essays show continuing interest in Indian sources. Yet Emerson developed an original American philosophy; it would be misleading to reduce his thought to a single Indian text. The poster’s statement “I owe a magnificent day to India” should not be treated as a securely established verbatim quotation without a precise primary-source citation."
        ]
      },
      {
        heading: "4. Henry David Thoreau (1817–1862): the Gita at Walden",
        paragraphs: [
          "Thoreau’s Walden (1854) offers the most celebrated documentary link between Indian philosophy and early American environmental and contemplative writing. In the chapter “The Pond in Winter,” he writes: “In the morning I bathe my intellect in the stupendous and cosmogonal philosophy of the Bhagvat Geeta.” Thoreau explored simplicity, attention, self-reliance, and the ethical meaning of daily life. Indian writings were one source among several that nourished his experiments at Walden Pond. His later essay “Civil Disobedience” influenced twentieth-century nonviolent activists, though the relationship between Thoreau, Gandhi, and King developed through distinct historical contexts."
        ]
      },
      {
        heading: "5. Concord: a landscape of shared ideas",
        paragraphs: [
          "Concord, Massachusetts, provides a physical setting for this story. Emerson’s home, Walden Pond, the Concord Museum, and local literary collections help visitors connect books and ideas to lived places. Emerson and Thoreau read, debated, walked, wrote, and questioned conventional authority in this community. An educational visit can pair the landscape with excerpts from Walden, Emerson’s “Brahma,” and reliable accounts of the transmission of Indian literature."
        ]
      },
      {
        heading: "6. Mark Twain (1835–1910): India through a traveler’s eyes",
        paragraphs: [
          "Mark Twain traveled in India in 1896 during his worldwide lecture tour. His travel narrative Following the Equator (1897) describes a country that fascinated him through its history, religious diversity, cities, and human complexity. The poster reproduces a famous passage calling India the “cradle of the human race.” Such praise reflects Twain’s literary voice, not a scholarly assessment that every institution or civilization originated in India. Twain also wrote critically about imperialism and social inequalities. Reading him fully gives a more nuanced picture than a single celebratory quotation."
        ]
      },
      {
        heading: "7. Will Durant (1885–1981): the historian and India’s contribution",
        paragraphs: [
          "The American historian Will Durant visited India and wrote The Case for India (1930), a forceful critique of British colonial rule. He also treated Indian philosophy, mathematics, religion, and literature in his larger histories of civilization. The long quotation on the poster beginning “India gave the world its numbers” is frequently circulated online, but its exact wording and attribution should be checked against a specific edition and page before being presented as a verified direct quotation. India’s mathematical contributions, including the development and transmission of the decimal place-value tradition, are substantial and deserve careful historical explanation."
        ]
      },
      {
        heading: "8. Thomas Jefferson and the early republic",
        paragraphs: [
          "The poster includes Thomas Jefferson as a symbol of early American curiosity about civilizations beyond Europe. Jefferson’s documented intellectual world encompassed Enlightenment philosophy, classical antiquity, religion, and comparative inquiry. However, the poster’s line about “the ancient Hindus” and the soul is not established here as an authentic Jefferson quotation. Without a traceable letter, manuscript, or published source, it should be labeled unverified rather than used as evidence of his personal reading of Hindu texts."
        ]
      },
      {
        heading: "9. Abraham Lincoln and India",
        paragraphs: [
          "Abraham Lincoln appears on the poster as an American symbol of liberty and human dignity. There are meaningful comparative conversations to have about emancipation, social reform, and later Indian struggles for freedom."
        ]
      },
      {
        heading: "10. Gandhi, Martin Luther King Jr., and nonviolence",
        paragraphs: [
          "A more direct and well-documented bridge joins Mahatma Gandhi’s satyagraha with the American civil-rights movement. King learned about Gandhi through study, conversation, and the activism of Black American leaders; he visited India in 1959. King viewed Gandhian nonviolent resistance as a powerful method for confronting injustice while affirming human dignity. This was not a simple transfer: American Black churches, constitutional struggles, local organizing, and longstanding abolitionist traditions also shaped the movement. The poster’s attributed sentence about India’s “message of nonviolence” needs a source check before being quoted verbatim."
        ]
      },
      {
        heading: "11. Einstein, Kennedy, and later American admiration",
        paragraphs: [
          "Albert Einstein expressed admiration for Gandhi and engaged with ethical questions raised by nonviolence, science, and global responsibility. That is a clearer documented connection than the poster’s broad attributed statement about love, truth, beauty, and wisdom, whose wording requires verification. President John F. Kennedy presided over an important period in U.S.–India diplomatic relations, including cooperation and tensions during the Cold War. The poster’s quotation describing India as a great democratic and tolerant people likewise needs a dated speech or archival citation. Their inclusion can prompt study of later American engagement with India without implying that all quotations are authenticated."
        ]
      },
      {
        heading: "12. The intellectual bridge was reciprocal",
        paragraphs: [
          "The exchange did not end with American readings of ancient texts. Indian reformers, writers, and teachers studied Western literature, science, political thought, and democratic institutions. Vivekananda’s 1893 Chicago address and subsequent American lectures brought Indian religious voices directly into public discussion. Gandhi’s engagement with Thoreau, and King’s engagement with Gandhi, demonstrate how ideas could travel outward, return transformed, and cross the ocean again. Indian American scholars, artists, scientists, and communities continue to deepen this shared intellectual life."
        ]
      },
      {
        heading: "13. What visitors should remember",
        paragraphs: [
          "Three themes connect the images on the poster: books moved ideas across oceans; people adapted those ideas to new struggles and settings; and cross-cultural understanding is strongest when admiration is matched by accuracy. Indian traditions enriched American literature, spiritual experimentation, and the language of nonviolent action, while American thinkers responded in varied and sometimes contradictory ways. The Legacy 250 story celebrates these connections without erasing Indigenous America, African American intellectual leadership, European influences, or the complex history of empire."
        ]
      },
      {
        heading: "A short timeline",
        timeline: [
          { period: "Early 1800s", event: "English-language translations of Indian philosophical texts circulate among American readers." },
          { period: "1854", event: "Thoreau publishes Walden, with his celebrated reference to the Bhagavad Gita." },
          { period: "1857", event: "Emerson publishes “Brahma.”" },
          { period: "1893", event: "Vivekananda addresses the World’s Parliament of Religions in Chicago." },
          { period: "1896–1897", event: "Twain visits India and publishes Following the Equator." },
          { period: "1930", event: "Durant publishes The Case for India." },
          { period: "1959", event: "Martin Luther King Jr. visits India to study Gandhi’s legacy." },
          { period: "2026", event: "Legacy 250 commemorates 250 years of U.S. independence and centuries of India–America exchanges." }
        ]
      }
    ],
    furtherReading: [
      "Henry David Thoreau, Walden (1854), “The Pond in Winter” — Project Gutenberg: https://www.gutenberg.org/ebooks/205",
      "Ralph Waldo Emerson, “Brahma” (1857), and Emerson’s journals — Harvard/major scholarly editions.",
      "Mark Twain, Following the Equator (1897) — Project Gutenberg: https://www.gutenberg.org/ebooks/2895",
      "Will Durant, The Case for India (1930); The Story of Civilization, vol. 1, Our Oriental Heritage (1935).",
      "Martin Luther King Jr. Research and Education Institute, Stanford University — https://kinginstitute.stanford.edu/",
      "The Walden Woods Project — https://www.walden.org/",
      "Concord Museum — https://concordmuseum.org/",
      "The Papers of Thomas Jefferson, Founders Online — https://founders.archives.gov/"
    ],
    closingReflection: {
      title: "Legacy 250 | Closing reflection",
      text: "Ideas traveled. Minds connected. Civilizations enriched. The story of Emerson and Thoreau reminds us that a nation’s imagination grows through encounters beyond its borders. From the Upanishads and the Bhagavad Gita to Walden, from Gandhi to the American civil-rights movement, the India–America intellectual relationship is an enduring conversation—one that continues to inspire learning, freedom, and human connection."
    }
  },
  {
    id: 5,
    number: "05",
    slug: "poster5",
    altSlugs: ["from-ashrams-to-yoga-mats", "yoga-journey", "how-yoga-stretched-its-way-to-america", "poster-5"],
    title: "From Ashrams to Yoga Mats",
    subtitle: "How Yoga Stretched Its Way to America",
    editionTag: "An ancient Indian tradition. A universal gift. | Legacy 250 exhibition companion article",
    image: "/assets/posters/poster5.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Introduction: A Journey Across Oceans and Centuries",
      paragraphs: [
        "From the banks of the Ganges to studios, schools, hospitals, and community centers across the United States, yoga has traveled an extraordinary distance. Its American story is not simply the story of a fitness trend. It is a history of religious encounter, migration, translation, entrepreneurship, scientific inquiry, and cultural exchange.",
        "The word yoga comes from Sanskrit and is commonly associated with joining or disciplined integration. Indian yoga traditions encompass diverse paths of ethical living, meditation, devotion, philosophical inquiry, breath regulation, and physical postures. Modern posture-centered yoga represents one influential branch of this much wider heritage.",
        "This poster traces several major stages of that encounter. The dates mark broad developments rather than a single, uninterrupted progression; different teachers and communities often worked simultaneously."
      ]
    },
    sections: [
      {
        heading: "1893: Swami Vivekananda and the First Seeds",
        paragraphs: [
          "At the World’s Parliament of Religions in Chicago in September 1893, Swami Vivekananda introduced large American audiences to Hindu philosophical and spiritual ideas. His address became a landmark in the public history of India–America religious exchange.",
          "Vivekananda subsequently lectured and taught in the United States, discussing Vedanta, the potential divinity of the human being, religious pluralism, and paths of spiritual discipline. His 1896 book Raja Yoga helped make yogic philosophy and meditation accessible to English-language readers. His emphasis was not the modern sequence of studio postures, but the deeper philosophical and contemplative dimensions of yoga.",
          "His arrival did not mean that no Americans had encountered Indian thought before 1893. Earlier translations, Transcendentalists, and reformers had already created an intellectual context for its reception."
        ]
      },
      {
        heading: "1900s–1930s: Pioneers Build Communities",
        paragraphs: [
          "In the early twentieth century, Indian teachers established durable organizations and teaching networks. Paramahansa Yogananda arrived in the United States in 1920, addressed a religious congress in Boston, and later founded the Self-Realization Fellowship in Los Angeles. His teachings centered on meditation, Kriya Yoga, and spiritual self-realization; Autobiography of a Yogi (1946) became an enduringly influential book.",
          "Swami Ramakrishnananda, a direct disciple of Sri Ramakrishna, was an important leader of the Ramakrishna movement in India, but he is not generally documented as having established a New York Vedanta society in 1894. That milestone belongs to the broader Vedanta movement associated with Vivekananda and his successors. For this reason, the poster’s brief label should be read as a reference to the Ramakrishna–Vedanta lineage, not as a verified American itinerary for Ramakrishnananda.",
          "Yoga reached Americans through lectures, books, private study circles, meditation classes, and emerging spiritual institutions. This stage helped establish a vocabulary of karma, meditation, self-realization, and universal spirituality in American public culture."
        ]
      },
      {
        heading: "1940s–1950s: Yoga Takes Root",
        paragraphs: [
          "By the mid-twentieth century, yoga appeared increasingly in books, health-oriented instruction, and popular media. The physical side of yoga became more visible, even as meditation and Vedanta continued to attract students.",
          "Indra Devi, who studied with T. Krishnamacharya, opened a yoga studio in Hollywood in 1947. Her teaching helped introduce postural yoga to prominent entertainers and a wider American audience. The Hollywood story is one of several channels through which yoga became familiar—not the origin of yoga in the United States.",
          "Yoga’s American reception also reflected changing ideas about wellness, women’s exercise, psychology, and East–West spiritual dialogue."
        ]
      },
      {
        heading: "1960s–1970s: A Cultural Movement",
        paragraphs: [
          "The counterculture era brought renewed attention to Indian music, meditation, and spiritual practice. Maharishi Mahesh Yogi popularized Transcendental Meditation; his association with the Beatles made Indian meditation highly visible in popular culture.",
          "B. K. S. Iyengar’s Light on Yoga (1966) became a major international reference for detailed posture instruction. Pattabhi Jois’s Ashtanga Vinyasa method later attracted American students and influenced dynamic styles. These teachers worked within lineages connected in different ways to T. Krishnamacharya, whose twentieth-century teaching profoundly shaped modern postural yoga.",
          "Yoga’s spread was not without debate. Some practitioners sought religious liberation, others therapeutic benefit, personal transformation, or exercise. Those distinct goals continue to coexist."
        ]
      },
      {
        heading: "1980s–2000s: From Niche to Mainstream",
        paragraphs: [
          "Yoga studios multiplied and instruction spread to gyms, colleges, workplaces, hospitals, and homes. Teachers developed many styles, including alignment-focused, vigorous flow, restorative, and meditation-centered approaches. Teacher training programs, video instruction, and later online classes expanded access.",
          "As yoga became more commercial, questions arose about cultural attribution, the representation of Indian traditions, affordability, body image, and the balance between fitness and spiritual depth. A fuller history recognizes both yoga’s broad appeal and the communities that preserved and transmitted it."
        ]
      },
      {
        heading: "The Pioneers Featured on the Poster",
        items: [
          { label: "Swami Vivekananda (1863–1902)", text: "Brought Vedanta and Raja Yoga to prominent American audiences beginning in 1893; emphasized spiritual freedom and religious harmony." },
          { label: "Paramahansa Yogananda (1893–1952)", text: "Founded the Self-Realization Fellowship and helped establish a lasting American audience for Kriya Yoga and meditation." },
          { label: "Swami Ramakrishnananda (1863–1911)", text: "Disciple of Sri Ramakrishna and a significant organizer of the Ramakrishna Order in India; included here as part of the wider lineage, rather than as a documented U.S. yoga pioneer." },
          { label: "B. K. S. Iyengar (1918–2014)", text: "Advanced systematic, alignment-focused yoga instruction and authored Light on Yoga." },
          { label: "K. Pattabhi Jois (1915–2009)", text: "Promoted Ashtanga Vinyasa Yoga, which influenced many later vigorous posture practices." },
          { label: "Maharishi Mahesh Yogi (1918–2008)", text: "Expanded international awareness of mantra-based Transcendental Meditation." },
          { label: "Tirumalai Krishnamacharya (1888–1989)", text: "Indian scholar and teacher often called a father of modern yoga; trained several teachers whose students carried postural yoga worldwide. He did not himself become known through a U.S. teaching career." }
        ]
      },
      {
        heading: "What Yoga Offers Today",
        items: [
          { label: "Physical movement and flexibility", text: "Regular posture practice can improve mobility, balance, and strength, depending on the approach and individual." },
          { label: "Stress and emotional well-being", text: "Breathwork, mindful attention, and movement may help some people manage stress and improve perceived well-being. Evidence varies by condition and practice." },
          { label: "Focus and reflection", text: "Meditation and yoga can provide structured time for concentration and self-awareness." },
          { label: "Community and connection", text: "Yoga offers opportunities for intergenerational learning and cultural exchange. Claims that yoga treats specific diseases should be evaluated against clinical evidence; yoga complements rather than replaces appropriate medical care." }
        ]
      },
      {
        heading: "Yoga in America: Measuring Its Reach",
        paragraphs: [
          "Yoga is now a familiar part of American life. The poster states that more than 36 million Americans practice yoga; estimates vary significantly depending on the survey year, definitions, and methods. A widely cited 2016 Yoga in America study estimated 36.7 million U.S. practitioners. Newer surveys may yield different figures, so the poster’s number is best understood as a historical estimate, not a current census.",
          "The practice is visible in public schools, universities, hospitals, senior centers, sports programs, and corporate wellness offerings. Yet the most enduring contribution may be less easily counted: a widespread awareness that breathing, movement, attention, and personal discipline can be cultivated together."
        ]
      },
      {
        heading: "A Living India–America Legacy",
        paragraphs: [
          "Yoga’s history illustrates a two-way cultural encounter. Indian teachers brought knowledge, institutions, and living lineages; American students, scholars, physicians, artists, and community organizers helped translate, adapt, study, and spread the practices. These exchanges also generated new interpretations and difficult questions about ownership, authenticity, and cultural respect.",
          "For Legacy 250, the story offers a vivid example of the relationship between India and the United States extending beyond trade and diplomacy. Ideas cross oceans, find new homes, and change everyday life. Yoga is at once an Indian civilizational inheritance and a global practice whose origins deserve recognition."
        ]
      }
    ],
    furtherReading: [
      "Swami Vivekananda, Raja Yoga (1896); Complete Works, including addresses at the 1893 Parliament of Religions.",
      "Paramahansa Yogananda, Autobiography of a Yogi (1946); Self-Realization Fellowship historical materials.",
      "B. K. S. Iyengar, Light on Yoga (1966).",
      "Mark Singleton, Yoga Body: The Origins of Modern Posture Practice (Oxford University Press, 2010).",
      "Andrea Jain, Selling Yoga: From Counterculture to Pop Culture (Oxford University Press, 2014).",
      "National Center for Complementary and Integrative Health (NCCIH), “Yoga: What You Need To Know” (nccih.nih.gov).",
      "Yoga Alliance / Yoga Journal, 2016 Yoga in America Study (for the historical 36.7 million estimate)."
    ],
    editorialNote: "Verify the poster’s Iyengar quotation against a primary published source before reproducing it as a verbatim quotation on the website.",
    closingReflection: {
      title: "Legacy 250 Reflection",
      text: "One ancient tradition. One universal practice. One human family."
    },
    footerNote: "Prepared for the Legacy 250 historical exhibition • www.IndiaUSLegacy250.org"
  },
  {
    id: 6,
    number: "06",
    slug: "poster6",
    altSlugs: [
      "indian-thoughts-and-practices-and-the-modern-american-mind",
      "indian-thoughts-and-american-minds",
      "from-the-bhagavad-gita-to-mindfulness",
      "poster-6"
    ],
    title: "Indian Thoughts and Practices and the Modern American Mind",
    subtitle: "From the Bhagavad Gita to Mindfulness: A Two-Century Journey of Ideas",
    editionTag: "LEGACY 250 | EDUCATIONAL EXHIBITION COMPANION | QR-CODE WEB ARTICLE",
    image: "/assets/posters/poster6.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Introduction: A Dialogue Across Oceans",
      paragraphs: [
        "Ideas Cross Oceans. Wisdom Crosses Generations.",
        "American intellectual life has never developed in isolation. Over more than two centuries, Indian texts, teachers, reformers, and practices have entered American conversations about conscience, freedom, the self, religion, education, and well-being. These encounters did not produce a single “Indian influence”: they involved translations, selective readings, misunderstandings, genuine intellectual exchange, and adaptations to changing American circumstances.",
        "This exhibition follows several connected but distinct histories: early American curiosity about Asian religions; the Transcendentalists’ engagement with Indian scriptures; Swami Vivekananda’s presentation of Vedanta in Chicago in 1893; Gandhi’s influence on the philosophy of nonviolent civil resistance; and the spread of yoga, meditation, and contemporary mindfulness practices."
      ]
    },
    sections: [
      {
        heading: "I. The Founding Era: Early Curiosity",
        paragraphs: [
          "The founders of the United States inherited European Enlightenment debates about natural religion, religious liberty, reason, and moral philosophy. European translations and reports about South Asia circulated unevenly in the Atlantic world. Sir William Jones and other Orientalist scholars made Sanskrit literature more visible to European readers in the late eighteenth century; their work later helped shape American encounters with Indian ideas."
        ],
        items: [
          {
            label: "Thomas Jefferson (1743–1826)",
            text: "Jefferson championed religious liberty and studied comparative religion, but claims that Hindu scripture directly shaped his political philosophy require careful documentary evidence. His interests are best understood within a wider Enlightenment conversation, not as proof that he studied the Bhagavad Gita or the Upanishads closely."
          },
          {
            label: "Benjamin Franklin (1706–1790)",
            text: "Franklin emphasized self-improvement, practical ethics, public service, and tolerance. These concerns can be compared with themes in Indian philosophy, but similarity is not evidence of direct borrowing."
          }
        ]
      },
      {
        heading: "II. India Enters the American Soul: Emerson and Thoreau",
        items: [
          {
            label: "Ralph Waldo Emerson (1803–1882)",
            text: "Emerson read Indian religious and philosophical works through English-language translations and summaries. His essays and journals show sustained interest in Hindu thought, and his poem “Brahma” (1857) draws strikingly on ideas associated with the Bhagavad Gita and Vedanta. Emerson’s concept of the Over-Soul invites comparison with Indian understandings of ultimate reality, although it is not simply a translation of a single Vedantic doctrine. Emerson’s engagement belonged to the larger Transcendentalist effort to rethink inherited religious authority and emphasize intuition, nature, and spiritual unity. The line “I owe a magnificent day to India” is widely associated with Emerson, but the exact wording and source should be checked before displaying it as a verbatim quotation."
          },
          {
            label: "Henry David Thoreau (1817–1862)",
            text: "Thoreau read the Bhagavad Gita and other Indian texts, and he explicitly referred to them in Walden (1854). In the chapter “The Pond in Winter,” he wrote: “In the morning I bathe my intellect in the stupendous and cosmogonal philosophy of the Bhagvat Geeta.” His admiration for the text was part of a wider experiment in deliberate living, simplicity, moral independence, and reflection in nature. Walden Pond thus offers a tangible setting for discussing India–America intellectual exchange: a New England writer engaging a South Asian philosophical work while asking what constitutes a meaningful life. Thoreau’s later essay “Civil Disobedience” also became important to subsequent movements for justice, including Gandhi’s, though Gandhi developed his own distinctive ethical and political framework."
          }
        ]
      },
      {
        heading: "III. Vivekananda and America’s Spiritual Awakening",
        paragraphs: [
          "On September 11, 1893, Swami Vivekananda addressed the World’s Parliament of Religions in Chicago. His opening words, “Sisters and Brothers of America,” became emblematic of his reception. He spoke about religious tolerance, the dignity of different spiritual paths, and the universal aspirations of human beings. His subsequent lectures and teaching helped establish Vedanta study groups and institutions in the United States.",
          "Vivekananda presented Vedanta not merely as a system of metaphysics but as a practical vision of spiritual development and service. His work gave many American audiences a sustained encounter with Indian religious philosophy through an Indian teacher rather than only through European translations."
        ]
      },
      {
        heading: "IV. Indian Ideas and American Reform: Gandhi and King",
        paragraphs: [
          "Mahatma Gandhi developed satyagraha—often translated as “truth-force” or steadfast nonviolent resistance—through experiments in South Africa and India. His approach drew on multiple sources, including Hindu, Jain, and Christian ethical traditions, as well as political experience and conversations with other thinkers. Ahimsa, or non-harm, was central to his moral and political practice.",
          "Martin Luther King Jr. encountered Gandhi’s methods through American activists, theologians, and civil-rights organizers. King saw nonviolent direct action as both a moral commitment and an effective strategy against segregation. During his 1959 visit to India, he deepened his engagement with Gandhi’s legacy. King’s often-quoted formulation—“Christ furnished the spirit and motivation, while Gandhi furnished the method”—captures the relationship more reliably than many simplified versions circulated online.",
          "The connection was reciprocal and international: ideas and tactics moved among Indian anticolonial activists, African American freedom movements, Christian thinkers, labor organizers, and other advocates of justice."
        ]
      },
      {
        heading: "V. Influential Bridges of Thought",
        items: [
          {
            label: "American interpreters",
            text: "William Ellery Channing helped establish a liberal religious atmosphere in which comparative spirituality could be discussed. Amos Bronson Alcott and Walt Whitman explored forms of spiritual universalism and human unity, though their relationship to specific Indian texts varied. William James studied religious experience comparatively and helped establish the psychology of religion; his work should not be reduced to direct adoption of Indian teachings."
          },
          {
            label: "Indian teachers and movements",
            text: "Paramahansa Yogananda arrived in the United States in 1920 and popularized Kriya Yoga through teaching and his influential Autobiography of a Yogi (1946). Maharishi Mahesh Yogi brought Transcendental Meditation to international prominence in the mid-twentieth century. Sri Sri Ravi Shankar and the Art of Living movement, Sadhguru and the Isha Foundation, and Mata Amritanandamayi (“Amma”) have introduced large audiences to different forms of meditation, service, yoga, and spiritual practice. Their approaches are distinct and should not be treated as interchangeable."
          }
        ]
      },
      {
        heading: "VI. From Yoga to Mindfulness: A Living Legacy",
        paragraphs: [
          "Yoga entered American life through many channels: philosophical lectures, immigrant teachers, postural instruction, popular books, health movements, studios, and online classes. Today Americans practice yoga in schools, community centers, hospitals, workplaces, and homes. Research suggests that some yoga and meditation programs can help with stress, physical function, or well-being, but outcomes depend on the practice and individual; they are not substitutes for necessary medical care.",
          "Modern mindfulness has multiple lineages, especially Buddhist contemplative traditions and twentieth-century secular clinical adaptations. It should not be described as a direct or exclusive descendant of the Bhagavad Gita. The broader story is one of overlapping South Asian traditions that have been translated and adapted in American contexts."
        ]
      },
      {
        heading: "Timeless Threads: Key Ideas Explained",
        items: [
          { label: "Bhagavad Gita", text: "A dialogue within the Mahabharata about duty, action, devotion, knowledge, and spiritual freedom." },
          { label: "Upanishads", text: "A diverse body of philosophical texts exploring ultimate reality, consciousness, selfhood, and liberation." },
          { label: "Vedanta", text: "Traditions of interpreting the Upanishads, Brahma Sutras, and Bhagavad Gita; different schools understand the relation of self and ultimate reality differently." },
          { label: "Atman and Brahman", text: "Concepts of self and ultimate reality; their relationship is understood differently across Vedantic schools." },
          { label: "Ahimsa", text: "A commitment to non-harm found in several Indian religious traditions." },
          { label: "Satyagraha", text: "Gandhi’s practice of principled, nonviolent struggle grounded in truth and moral discipline." }
        ]
      },
      {
        heading: "A Brief Timeline",
        timeline: [
          { period: "Late 1700s–early 1800s", event: "Sanskrit scholarship and translations circulate more widely in the Atlantic intellectual world." },
          { period: "1830s–1850s", event: "Emerson and Thoreau engage Indian texts; Walden is published in 1854." },
          { period: "1893", event: "Vivekananda speaks at the World’s Parliament of Religions in Chicago." },
          { period: "1920", event: "Yogananda arrives in the United States." },
          { period: "1950s–1960s", event: "Gandhi’s methods help shape American civil-rights nonviolent organizing." },
          { period: "Late twentieth century–today", event: "Yoga, meditation, and mindfulness become increasingly visible in American culture." }
        ]
      }
    ],
    furtherReading: [
      "Henry David Thoreau, Walden (1854), especially “The Pond in Winter.”",
      "Ralph Waldo Emerson, “Brahma” (1857), essays and journals.",
      "Swami Vivekananda, addresses at the World’s Parliament of Religions (1893).",
      "Martin Luther King Jr., Stride Toward Freedom (1958) and accounts of his 1959 India visit.",
      "Philip Goldberg, American Veda: From Emerson and the Beatles to Yoga and Meditation (2010).",
      "National Center for Complementary and Integrative Health (NCCIH), resources on yoga and meditation."
    ],
    closingReflection: {
      title: "Legacy 250: Ideas Cross Oceans",
      text: "The 250th anniversary of American independence invites reflection on relationships that extend beyond diplomacy and commerce. India and the United States have shared a long, evolving conversation about freedom, conscience, spirituality, equality, and the pursuit of a meaningful life. The most enduring legacy is not that one civilization simply taught another, but that people across oceans continued to question, learn, adapt, and enrich one another."
    },
    footerNote: "LEGACY 250 — Celebrating 250 Years of India–U.S. Friendship, Learning, and Innovation"
  },
  {
    id: 7,
    number: "07",
    slug: "poster7",
    altSlugs: ["from-jeans-to-genes", "jeans-to-genes", "two-gifts-one-legacy", "poster-7"],
    title: "From Jeans to Genes",
    subtitle: "TWO GIFTS. ONE LEGACY. Innovation from India. Impact on the World.",
    editionTag: "US–India Legacy 250 (1776–2026) • Exhibition companion article for QR-code visitors",
    image: "/assets/posters/poster7.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Introduction: Two Threads of a Shared Human Story",
      paragraphs: [
        "A familiar pair of blue jeans and the invisible genetic code within our cells seem worlds apart. Yet both offer compelling ways to explore the movement of ideas, materials, people, and discoveries across borders. India’s textile traditions helped shape global commerce and the worldwide popularity of indigo-dyed cloth. Centuries later, Indian-born scientist Har Gobind Khorana made landmark contributions to understanding how genetic information is translated into proteins. These are not identical stories of invention; they are interconnected stories of knowledge traveling and changing the world."
      ]
    },
    sections: [
      {
        heading: "1. India’s Long Textile Heritage",
        paragraphs: [
          "For millennia, the Indian subcontinent has been an important center of cotton cultivation, spinning, weaving, dyeing, and textile commerce. Archaeological evidence from the Indus civilization attests to early cotton use. Later, fine muslins, printed cottons, calicoes, and sturdy fabrics from different Indian regions became sought-after goods across Asia, Africa, and Europe. Weavers, dyers, merchants, and artisans created varied regional techniques, rather than a single uniform textile tradition."
        ]
      },
      {
        heading: "2. Indigo: The Color That Crossed Oceans",
        paragraphs: [
          "Natural indigo is a deep blue dye derived from plants, including Indigofera species cultivated in South Asia and elsewhere. Indian indigo was a significant export in early modern global trade. European languages preserve traces of this association: the word 'indigo' ultimately derives from a term meaning 'Indian.' Indigo dyeing, however, also has histories in Africa, the Americas, and other parts of Asia. Its worldwide story is one of multiple communities and exchanges."
        ]
      },
      {
        heading: "3. From Indian Cloth to Denim and Blue Jeans",
        paragraphs: [
          "Indian cotton cloth and indigo dye helped create the global textile world in which denim and jeans eventually emerged. The history of denim itself is more complex than a direct invention in India: the name 'denim' is commonly linked to 'serge de Nîmes,' although the exact historical lineage of modern denim remains debated. In the United States, durable work trousers became associated with miners and laborers in the nineteenth century. In 1873, Jacob Davis and Levi Strauss received a U.S. patent for reinforcing pocket openings with rivets—a milestone in the development of modern blue jeans. Thus the poster's phrase 'India's blue denim' is best understood as a tribute to India's textile and dyeing influence, not a claim that India alone invented modern jeans."
        ]
      },
      {
        heading: "4. Cotton, Commerce, and America",
        paragraphs: [
          "Cotton fabrics linked India and the Atlantic world through trade, imitation, industrial competition, and colonial economic systems. Indian textiles influenced European consumer tastes and manufacturing, while the growth of American cotton production depended heavily on enslaved labor. Industrialization transformed where cloth was produced and who profited from it. A complete history of blue jeans should therefore recognize both the artistry of textile makers and the difficult human histories embedded in global cotton commerce."
        ]
      },
      {
        heading: "5. Har Gobind Khorana: A Life Across Continents",
        paragraphs: [
          "Har Gobind Khorana (1922–2011) was born in Raipur, in British India (now in Pakistan). He studied in Punjab and later pursued research and training in Britain, Switzerland, Canada, and the United States. His international scientific career illustrates the movement of knowledge across institutions and borders. He later worked at the University of Wisconsin–Madison and the Massachusetts Institute of Technology."
        ]
      },
      {
        heading: "6. What Is the Genetic Code?",
        paragraphs: [
          "DNA stores biological information in sequences of four chemical bases. Cells use an RNA copy of genetic instructions, and ribosomes interpret three-letter units called codons to assemble amino acids into proteins. Different codons specify different amino acids or signal the end of translation. Understanding this correspondence was one of the central scientific breakthroughs of the twentieth century. It is important to distinguish the genetic code from the discovery of genes or the structure of DNA, which involved other researchers and earlier milestones."
        ]
      },
      {
        heading: "7. Khorana’s Breakthrough and the 1968 Nobel Prize",
        paragraphs: [
          "Khorana developed powerful methods for making defined nucleic-acid sequences and used them to help determine how specific RNA sequences correspond to amino acids. Along with Marshall W. Nirenberg and Robert W. Holley, he received the 1968 Nobel Prize in Physiology or Medicine for interpreting the genetic code and its function in protein synthesis. Their complementary work helped turn a fundamental biological mystery into an experimentally understood system."
        ]
      },
      {
        heading: "8. From Genetic Code to Modern Biotechnology",
        paragraphs: [
          "The decoding of genetic information helped establish foundations for molecular biology and biotechnology. Today, researchers use these principles in genetic testing, engineered proteins, genomic medicine, vaccine development, and research on inherited disease. Such applications arose from the cumulative work of many scientists over decades; they should not be attributed to any one person. Khorana's later work on synthetic genes and biological membranes further extended his scientific legacy."
        ]
      },
      {
        heading: "9. Why These Two Stories Belong Together",
        paragraphs: [
          "Textiles and genetics connect the physical and the informational. Cotton threads become cloth through the skill of artisans; nucleotide sequences become proteins through the molecular machinery of life. Both histories show how innovation depends on accumulated knowledge, skilled experimentation, international exchange, and generations of contributors. One became part of everyday wardrobes; the other transformed our understanding of life."
        ]
      },
      {
        heading: "10. A Timeline of Exchange and Discovery",
        timeline: [
          { period: "Ancient era", event: "Cotton cultivation and textile production flourish in South Asia." },
          { period: "Early modern period", event: "Indian cotton fabrics and indigo circulate through expanding global trading networks." },
          { period: "Nineteenth century", event: "Industrial denim and riveted work trousers evolve in Europe and the United States." },
          { period: "1873", event: "Jacob Davis and Levi Strauss patent riveted work pants." },
          { period: "1922", event: "Har Gobind Khorana is born." },
          { period: "1960s", event: "Khorana and other scientists decipher key features of the genetic code." },
          { period: "1968", event: "Khorana, Nirenberg, and Holley share the Nobel Prize." },
          { period: "2011", event: "Khorana dies, leaving a major legacy in molecular biology." },
          { period: "2026", event: "Legacy 250 reflects on the centuries-long exchange of ideas and innovations between India and America." }
        ]
      },
      {
        heading: "11. Historical Notes on the Poster",
        items: [
          { label: "'India’s blue denim'", text: "Indian cotton and indigo are important to global textile history, but modern denim and jeans cannot be credited exclusively to India." },
          { label: "'Discovery of genes'", text: "Khorana did not discover genes; he helped decipher the genetic code and pioneered synthetic nucleic-acid research." },
          { label: "'In the 17th century, Indian weavers in Gujarat crafted blue denim'", text: "Indian artisans made cotton textiles and used indigo, but describing these fabrics as modern blue denim is anachronistic." },
          { label: "Attributed quotation", text: "The quotation attributed to Khorana—'The ultimate goal of my research is the good of mankind'—should not be presented as a verified direct quotation without a traceable primary source." }
        ]
      }
    ],
    furtherReading: [
      "The Nobel Prize, 'The Nobel Prize in Physiology or Medicine 1968' and Har Gobind Khorana biographical materials (nobelprize.org).",
      "United States Patent No. 139,121 (May 20, 1873), Jacob W. Davis, assigned in part to Levi Strauss.",
      "Smithsonian National Museum of American History, collections and essays on blue jeans and American clothing.",
      "Victoria and Albert Museum, resources on Indian textiles and indigo.",
      "Encyclopaedia Britannica, entries on denim, indigo, and Har Gobind Khorana.",
      "MIT News and institutional memorials on H. Gobind Khorana."
    ],
    closingReflection: {
      title: "Closing Reflection: Different Paths, Shared Humanity",
      text: "From India's looms to the laboratories of modern genetics, these histories demonstrate that innovation rarely belongs to one place alone. Ideas and materials travel; people build on earlier discoveries; knowledge becomes a shared inheritance. Legacy 250 celebrates these connections and invites us to imagine what India and the United States can discover and create together in the next 250 years."
    }
  },
  {
    id: 8,
    number: "08",
    slug: "poster8",
    altSlugs: ["when-vedanta-met-power", "swami-vivekananda-science-and-philanthropy", "poster-8"],
    title: "When Vedanta Met Power",
    subtitle: "Swami Vivekananda, Science, and Philanthropy in America",
    editionTag: "THE LURE OF CIVILIZATIONS | LEGACY 250 EDUCATIONAL EXHIBITION COMPANION",
    image: "/assets/posters/poster8.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Crossing Boundaries of Thought",
      paragraphs: [
        "In September 1893, a young Indian monk spoke at the World’s Parliament of Religions in Chicago and became one of the most recognizable voices of religious universalism in the United States. Swami Vivekananda (1863–1902) did not arrive as a scientist, industrialist, or political leader. Yet his conversations and teachings crossed the boundaries separating religion, philosophy, science, and social reform. This article examines what is documented, what remains uncertain, and why his American legacy endures."
      ]
    },
    sections: [
      {
        heading: "1. Chicago, 1893: A new voice at the Parliament",
        paragraphs: [
          "The World’s Parliament of Religions convened alongside the World’s Columbian Exposition. Vivekananda’s opening address, beginning “Sisters and Brothers of America,” is remembered for its warm reception. His speeches championed religious tolerance, mutual respect, and the possibility of spiritual insight across traditions. He opposed sectarian hostility and argued that humanity could benefit from genuine engagement among religions.",
          "His appearance was significant but not the first American encounter with Indian religious thought. Translations of the Bhagavad Gita and Upanishads had already circulated among American readers, including Transcendentalists. Vivekananda gave these ideas a compelling living representative and subsequently lectured across the United States."
        ]
      },
      {
        heading: "2. What Vedanta meant in Vivekananda’s teaching",
        paragraphs: [
          "Vedanta is a family of Indian philosophical traditions rooted in the Upanishads, the Bhagavad Gita, and the Brahma Sutras. Vivekananda drew especially on Advaita Vedanta, emphasizing the spiritual potential of every person and the underlying unity of existence. He taught that spiritual life need not be confined to ritual or monastic withdrawal: work, devotion, meditation, and inquiry could all become paths of development.",
          "His emphasis on the divinity of the soul, dignity of persons, and service to others appealed to Americans exploring alternatives to inherited religious divisions. Still, Vedanta is a philosophical and spiritual tradition, not an experimentally established scientific theory."
        ]
      },
      {
        heading: "3. Nikola Tesla: Science, energy, and an intriguing conversation",
        paragraphs: [
          "Nikola Tesla (1856–1943), the inventor and electrical engineer, moved in overlapping late-nineteenth-century intellectual circles with Vivekananda. Vivekananda referred in correspondence to Tesla’s interest in the Sanskrit concepts of prana (vital force) and akasha (often rendered as ether or space), and to Tesla’s hope of showing a relationship between matter and energy. This is an important historical connection between an Indian religious teacher and an American-based inventor.",
          "However, claims that Tesla derived his inventions from Vedanta, scientifically proved Vedantic cosmology, or uttered the poster’s line “If you want to find the secrets of the universe, think in terms of energy, frequency and vibration” as a response to Vivekananda are not supported by reliable contemporary documentation. That widely circulated quotation should not be presented as a verified Tesla statement.",
          "The meaningful legacy of their encounter is intellectual curiosity: a dialogue across different systems of explanation, not proof that ancient metaphysics and modern electromagnetism are equivalent."
        ]
      },
      {
        heading: "4. John D. Rockefeller: Philanthropy and the limits of the evidence",
        paragraphs: [
          "A popular account recounts Vivekananda telling John D. Rockefeller (1839–1937) that wealth carried an obligation to serve others. Versions of this story appear in later Vivekananda reminiscences and biographies, but the details and its causal impact on Rockefeller’s philanthropy are difficult to verify from independent contemporary records.",
          "Rockefeller’s charitable giving and Baptist philanthropic commitments predated the reported encounter. His later large-scale philanthropy included support for medical research, education, and public health. It would therefore be misleading to say that Vivekananda originated Rockefeller’s philanthropy. The story is best presented as a remembered encounter that expresses Vivekananda’s ideal of wealth as a responsibility, rather than as an established turning point in Rockefeller’s life."
        ]
      },
      {
        heading: "5. William James: Psychology, religious experience, and Vedanta",
        paragraphs: [
          "William James (1842–1910), the Harvard philosopher and pioneering psychologist, was interested in religious experience, mysticism, and comparative approaches to consciousness. He knew of Vivekananda and engaged with Indian religious thought in a period when American intellectuals were rethinking the boundaries of psychology and religion.",
          "James’s The Varieties of Religious Experience (1902) treated spiritual experiences as phenomena worthy of serious inquiry, without assuming that every religious interpretation was scientifically demonstrated. His relationship to Vivekananda is more nuanced than simple discipleship."
        ]
      },
      {
        heading: "6. The larger American network",
        paragraphs: [
          "Vivekananda formed relationships with students, patrons, and hosts, including Sara Chapman Bull, Josephine MacLeod, and members of the Hale family. His lectures and classes helped establish Vedanta study communities and institutions in the United States. The Vedanta Society of New York traces its origins to his work in 1894, and his broader movement created durable connections between Indian spiritual traditions and American audiences.",
          "His influence was not confined to famous individuals. Public lectures, private study groups, correspondence, and institutional teaching brought ideas about meditation, universal religion, self-discipline, and service into American cultural life."
        ]
      },
      {
        heading: "7. Science and spirituality: Dialogue without false equivalence",
        paragraphs: [
          "The late nineteenth century was an era of dramatic scientific change. Electricity, industrial technology, evolutionary biology, and emerging psychology prompted fresh questions about matter, life, and mind. Vivekananda spoke confidently about the compatibility of rational inquiry and spiritual exploration, but scientific hypotheses must still be judged through evidence and experiment.",
          "Words such as “energy,” “force,” and “consciousness” can have different meanings in physics and Vedanta. Similar vocabulary does not make two theories identical. The enduring value of the conversation is the willingness to ask large questions while respecting the methods and limits of each discipline."
        ]
      },
      {
        heading: "8. Service as a spiritual ideal",
        paragraphs: [
          "For Vivekananda, spiritual development was inseparable from concern for others. He advocated education, social uplift, self-reliance, and practical service. In India, this vision contributed to the formation of the Ramakrishna Mission in 1897, whose work has included education, health care, and disaster relief.",
          "In the American setting, these teachings offered a moral counterpoint to the immense wealth and rapid industrial expansion of the Gilded Age. Vivekananda’s call was not merely to admire spiritual wisdom but to translate conviction into responsible action."
        ]
      },
      {
        heading: "9. A brief historical timeline",
        timeline: [
          { period: "1863", event: "Narendranath Datta, later Swami Vivekananda, is born in Calcutta." },
          { period: "1893", event: "Vivekananda addresses the World’s Parliament of Religions in Chicago." },
          { period: "1894", event: "Early Vedanta Society activity develops in New York." },
          { period: "1895–1896", event: "Vivekananda lectures and teaches in America and Europe; correspondence discusses Tesla’s interest in Vedantic concepts." },
          { period: "1897", event: "The Ramakrishna Mission is established in India." },
          { period: "1902", event: "Vivekananda dies; William James publishes The Varieties of Religious Experience." },
          { period: "20th–21st centuries", event: "Vedanta centers, interfaith dialogue, and Indian philosophical studies continue in the United States." }
        ]
      },
      {
        heading: "10. A note on the famous exhortation",
        paragraphs: [
          "“Arise! Awake! and stop not till the goal is reached” is strongly associated with Vivekananda’s teaching, drawing on the Katha Upanishad’s call to arise and awaken. English wording varies across translations and editions."
        ]
      },
      {
        heading: "11. Legacy 250: Why this history matters",
        paragraphs: [
          "The encounter between Vivekananda and American intellectual life is one chapter in a longer India–U.S. story of exchange. It shows how ideas travel through people, lectures, letters, institutions, and friendships. A monk from colonial India could address American audiences, challenge assumptions about religion and civilization, and participate in conversations with people whose lives centered on invention, wealth, or academic inquiry.",
          "The lasting lesson is not that one civilization supplied every answer. It is that openness to unfamiliar ideas can enrich both societies. Vivekananda’s American story remains a vivid example of cultural exchange, mutual learning, and the possibility of linking personal conviction with public service."
        ]
      }
    ],
    furtherReading: [
      "Swami Vivekananda, The Complete Works of Swami Vivekananda, especially the Chicago addresses, letters, and lectures (Advaita Ashrama editions).",
      "World’s Parliament of Religions, 1893 proceedings, edited by John Henry Barrows (contemporary record).",
      "Marie Louise Burke, Swami Vivekananda in the West: New Discoveries (multi-volume historical study).",
      "William James, The Varieties of Religious Experience (1902).",
      "Ramakrishna-Vivekananda archival publications and Vedanta Society historical collections.",
      "Rockefeller Archive Center, resources on John D. Rockefeller’s philanthropy and chronology."
    ],
    editorialNote: "The quotations and anecdotes reproduced on the exhibition poster should be checked against primary texts before being published as verbatim historical testimony. This companion article deliberately avoids treating uncertain quotations as established fact.",
    footerNote: "LEGACY 250 | Exploring the past. Inspiring the future. | www.IndiaUSLegacy250.org"
  },
  {
    id: 9,
    number: "09",
    slug: "poster9",
    altSlugs: ["they-came-to-america", "they-came-to-america-they-returned-to-change-india", "poster-9"],
    title: "They Came to America. They Returned to Change India.",
    subtitle: "Students, reformers, revolutionaries, and the transnational making of modern India",
    editionTag: "QR-code exhibition companion • Suggested webpage: indiauslegacy250.org/they-came-to-america",
    image: "/assets/posters/poster9.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "America as a classroom—and a crossroads",
      paragraphs: [
        "In the late nineteenth and early twentieth centuries, Indian students, journalists, reformers, and political activists crossed the Pacific and Atlantic in search of education, work, allies, and new political ideas. Their American experiences were diverse. Some remained abroad for years; others returned to India; still others built movements spanning both countries.",
        "Their stories connect American universities, immigrant communities, freedom struggles, and India’s later democratic development. They should not be reduced to one narrative: not every person profiled returned immediately, and their political ideas sometimes differed sharply."
      ]
    },
    sections: [
      {
        heading: "Taraknath Das: scholar and anti-colonial organizer",
        paragraphs: [
          "Taraknath Das (1884–1958) reached North America in the early twentieth century and became an important voice for Indian independence abroad. He published the journal Free Hindusthan and worked among South Asian migrant communities on the Pacific coast. He later pursued scholarship and taught at Columbia University.",
          "Das exemplifies the movement of ideas between immigrant organizing, university study, and the struggle against colonial rule."
        ]
      },
      {
        heading: "Lala Har Dayal: radical intellectual and Ghadar organizer",
        paragraphs: [
          "Lala Har Dayal (1884–1939) was a prominent figure in the revolutionary networks that developed among Indians in the United States. He helped inspire the Ghadar movement, founded in 1913 in the San Francisco Bay Area, which sought to end British rule in India.",
          "The movement drew on the experience of migrant workers, students, and intellectuals. Its history also reflects surveillance, wartime geopolitics, and the risks borne by anti-colonial activists."
        ]
      },
      {
        heading: "B. R. Ambedkar: education, equality, and constitutionalism",
        paragraphs: [
          "Bhimrao Ramji Ambedkar (1891–1956) began graduate study at Columbia University in 1913. His education exposed him to debates about democracy, economics, social reform, and political philosophy; John Dewey was among the scholars who influenced him.",
          "Ambedkar later became a leading campaigner against caste oppression and chaired the Drafting Committee of India’s Constituent Assembly. His American education was one formative influence, alongside his extensive work and study in India and Britain."
        ]
      },
      {
        heading: "Lala Lajpat Rai: India’s cause before American audiences",
        paragraphs: [
          "Lala Lajpat Rai (1865–1928) lived in the United States during part of the First World War. In New York he helped establish the Indian Home Rule League of America in 1917, advocating Indian self-government and building international awareness of colonial conditions.",
          "His American years combined political writing, public advocacy, and engagement with reform circles."
        ]
      },
      {
        heading: "Jayaprakash Narayan: work, study, and social thought",
        paragraphs: [
          "Jayaprakash Narayan (1902–1979) spent much of the 1920s in the United States, working to support himself while studying at several institutions, including the University of Wisconsin. His encounter with socialist thought helped shape his subsequent political development.",
          "After returning to India, he joined the independence movement and became an influential advocate of democratic and social transformation. His later “Total Revolution” campaign belongs to a different historical period and should not be presented as a direct product of his American studies alone."
        ]
      },
      {
        heading: "Gobind Behari Lal: science journalism across borders",
        paragraphs: [
          "Gobind Behari Lal (1889–1982) was an Indian-born journalist and science writer who worked in the United States. He shared the 1937 Pulitzer Prize for Reporting as part of a San Francisco Chronicle team. His career illustrates the contribution of Indian-origin professionals to American public life.",
          "Some biographical summaries associate him with Berkeley and Indian nationalist circles; specific degree claims and organizational roles should be checked against archival biographies before publication."
        ]
      },
      {
        heading: "A wider story than six portraits",
        paragraphs: [
          "These figures were part of a larger transnational world. Indian students and activists found inspiration in American democratic ideals, while also confronting racial exclusion, immigration restrictions, and unequal treatment. The Ghadar movement, for example, arose partly among South Asian migrants experiencing discrimination in North America.",
          "The exchange was never one-directional: Indians debated and transformed ideas encountered abroad, and their activism helped bring India’s demand for freedom into American public discussion."
        ]
      },
      {
        heading: "Timeline of encounters",
        timeline: [
          { period: "1906", event: "Taraknath Das is active in North America." },
          { period: "1913", event: "Ambedkar begins studies at Columbia; the Ghadar movement takes shape in California." },
          { period: "1917", event: "Lajpat Rai establishes the Indian Home Rule League of America." },
          { period: "1922–1929", event: "Jayaprakash Narayan studies and works in the United States." },
          { period: "1937", event: "Gobind Behari Lal shares a Pulitzer Prize." },
          { period: "1947", event: "India achieves independence." },
          { period: "1950", event: "India’s Constitution comes into effect." }
        ]
      },
      {
        heading: "What the poster teaches",
        paragraphs: [
          "These six lives reveal how education, migration, journalism, and political organizing helped connect two societies. American institutions provided opportunities and ideas; Indian reformers adapted, challenged, and reworked them for their own circumstances. The result was not imitation but creative exchange."
        ]
      }
    ],
    furtherReading: [
      "Columbia University materials on B. R. Ambedkar and John Dewey.",
      "Encyclopaedia Britannica biographies of Ambedkar, Lajpat Rai, and Jayaprakash Narayan.",
      "Scholarship on the Ghadar movement and South Asian migration in North America.",
      "Pulitzer Prize archives for the 1937 Reporting award.",
      "Archival collections concerning Taraknath Das and Lala Har Dayal."
    ],
    editorialNote: "Portraits are artistic representations. Exact educational credentials and individual dates should be checked against institutional records before public launch.",
    closingReflection: {
      title: "About this exhibition",
      text: "Legacy 250 explores the many connections between India and the United States across trade, ideas, education, migration, and civic life. This companion article adds context to the exhibition poster; illustrations are interpretive rather than documentary reproductions."
    }
  },
  {
    id: 10,
    number: "10",
    slug: "poster10",
    altSlugs: [
      "when-modern-physics-remembered-ancient-india",
      "when-ancient-india-met-modern-science",
      "modern-physics-ancient-india",
      "poster-10"
    ],
    title: "When Modern Physics Remembered Ancient India",
    subtitle: "A Story of Equations, Consciousness, and Old Wisdom",
    editionTag: "LEGACY 250 | THE LURE OF CIVILIZATIONS | Educational companion to the exhibition poster",
    image: "/assets/posters/poster10.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Introduction: A meeting of different ways of knowing",
      paragraphs: [
        "In the twentieth century, relativity and quantum mechanics transformed scientists’ understanding of space, time, matter, and measurement. Several influential physicists also read or discussed Indian philosophical traditions, including the Upanishads and Bhagavad Gita. Their encounters are a fascinating chapter in intellectual history—but they should not be mistaken for evidence that Indian scriptures predicted the equations of modern physics. The two traditions ask overlapping questions at times, yet they use very different methods and standards of proof."
      ]
    },
    sections: [
      {
        heading: "1. The ancient Indian philosophical background",
        paragraphs: [
          "The Upanishads, composed over centuries in ancient India, investigate selfhood, ultimate reality, knowledge, and liberation. Some Vedanta traditions interpret Atman (self) and Brahman (ultimate reality) as fundamentally nondual; others offer different accounts of their relationship. The Isha Upanishad opens with the Sanskrit phrase “īśāvāsyam idaṃ sarvam,” often interpreted as teaching that all this is pervaded by the divine or Lord. Translation and interpretation vary across schools.",
          "The Bhagavad Gita, embedded in the Mahabharata, explores action, duty, disciplined understanding, devotion, and liberation. Its philosophical scope is wider than any analogy to atomic physics. Terms such as consciousness, unity, and reality also carry different meanings in Sanskrit philosophical schools and in contemporary science."
        ]
      },
      {
        heading: "2. Erwin Schrödinger: a genuine intellectual engagement",
        paragraphs: [
          "Erwin Schrödinger (1887–1961), a founder of wave mechanics, expressed a sustained interest in Indian thought, especially Upanishadic conceptions of the self. In works such as What Is Life? and Mind and Matter, he considered the apparent plurality of individual minds and argued toward a unity of consciousness. His philosophical reflections were not experimental results derived from the Schrödinger equation.",
          "The poster attributes several statements to Schrödinger, including praise for the Bhagavad Gita and an assertion about Brahman. Their exact wording and original sources should be checked before publication as verbatim quotations. His documented discussion of the Upanishadic tradition provides the stronger historical basis for the exhibit."
        ]
      },
      {
        heading: "3. J. Robert Oppenheimer: the Bhagavad Gita and scientific responsibility",
        paragraphs: [
          "J. Robert Oppenheimer (1904–1967), scientific director of the Manhattan Project’s Los Alamos Laboratory, studied Sanskrit with Arthur W. Ryder at the University of California, Berkeley, and read the Bhagavad Gita in the original language. He famously recalled a verse from the Gita in connection with the 1945 Trinity nuclear test, usually rendered “Now I am become Death, the destroyer of worlds.” The Sanskrit term kāla can also be translated as Time, a reminder that translations differ.",
          "Oppenheimer’s reading of the Gita was personal and intellectually meaningful, but it did not supply the technical foundations of nuclear physics. The poster’s statements about Buddhism, Hindu thought, and access to the Vedas require source verification if presented in quotation marks."
        ]
      },
      {
        heading: "4. Werner Heisenberg and Rabindranath Tagore",
        paragraphs: [
          "Werner Heisenberg (1901–1976) developed matrix mechanics and the uncertainty principle. He visited India in 1929 and met Rabindranath Tagore, the poet, philosopher, and Nobel laureate. Later accounts describe how discussions of Indian thought helped Heisenberg think about philosophical questions raised by modern physics. The details and phrasing of these recollections depend on the source; they do not establish that quantum theory was derived from Vedanta.",
          "Tagore himself engaged Western scientists and thinkers on questions of truth, human experience, and reality. His recorded 1930 conversation with Einstein is a particularly valuable primary text for comparing philosophical outlooks without forcing an artificial agreement."
        ]
      },
      {
        heading: "5. Niels Bohr and Albert Einstein: dialogue, not simple equivalence",
        paragraphs: [
          "Niels Bohr (1885–1962) emphasized complementarity in quantum physics: apparently incompatible experimental descriptions can both be necessary to account for physical phenomena. Comparisons with Asian philosophies have appeared in later commentary, but the poster’s quotation “I go into the Upanishads to ask questions” should not be treated as verified without an identifiable primary source.",
          "Albert Einstein (1879–1955) revolutionized physics through relativity and made fundamental contributions to quantum theory. His dialogue with Tagore is documented, yet the widely circulated claim that he said everything else seemed superfluous after reading the Bhagavad Gita lacks a reliable primary citation. It should not be reproduced as a verified Einstein quotation."
        ]
      },
      {
        heading: "6. Max Planck: science and its philosophical limits",
        paragraphs: [
          "Max Planck (1858–1947) introduced the quantum hypothesis and wrote extensively about science, religion, and the limits of scientific knowledge. He believed scientific inquiry and broader questions of meaning could coexist, while remaining distinct."
        ]
      },
      {
        heading: "7. Brian Josephson: contemporary explorations of mind",
        paragraphs: [
          "Brian D. Josephson (born 1940), awarded the 1973 Nobel Prize in Physics for work on superconducting tunneling, later explored questions concerning consciousness, mind, and unconventional scientific ideas. His interest illustrates how a scientist may pursue philosophical and speculative inquiries beyond an established field."
        ]
      },
      {
        heading: "8. What quantum physics actually says",
        paragraphs: [
          "Quantum mechanics is a mathematically precise, experimentally tested theory of microscopic phenomena. Its central concepts include quantum states, probabilities of measurement outcomes, superposition, interference, and entanglement. The Schrödinger equation describes the evolution of a quantum state in many nonrelativistic systems; E = mc² expresses mass–energy equivalence in special relativity."
        ]
      },
      {
        heading: "9. Why these encounters mattered",
        paragraphs: [
          "The most important historical story is not that modern science “proved” ancient Indian wisdom. It is that leading thinkers crossed intellectual and cultural boundaries. Indian philosophical texts became part of wider conversations about unity and plurality, the observer and the observed, ethical responsibility, and the limits of knowledge. These conversations enriched public reflection even when they produced no new physics."
        ]
      },
      {
        heading: "10. India–United States connections and Legacy 250",
        paragraphs: [
          "The story also belongs in a broader India–America exhibition. Oppenheimer’s Sanskrit studies at Berkeley and the growing American readership of Indian texts exemplify the movement of ideas through universities, translations, immigration, and cultural exchange. Today, Indian and American researchers collaborate in physics, computing, medicine, and the study of consciousness—fields where careful scholarship and intellectual openness both matter."
        ]
      },
      {
        heading: "A short timeline",
        timeline: [
          { period: "Late 18th–19th centuries", event: "Translations and studies of Sanskrit texts expand in Europe and North America." },
          { period: "1900", event: "Planck introduces the quantum hypothesis." },
          { period: "1905", event: "Einstein publishes foundational papers on relativity and light quanta." },
          { period: "1925–1926", event: "Heisenberg and Schrödinger develop central formulations of quantum mechanics." },
          { period: "1929", event: "Heisenberg visits India and meets Tagore." },
          { period: "1930", event: "Einstein and Tagore discuss the nature of reality." },
          { period: "1945", event: "Oppenheimer associates the Trinity test with a verse of the Bhagavad Gita." },
          { period: "1973", event: "Josephson receives the Nobel Prize in Physics." }
        ]
      }
    ],
    furtherReading: [
      "Erwin Schrödinger, Mind and Matter (1958), and My View of the World (English translation).",
      "J. Robert Oppenheimer, published interviews and biographies discussing his Sanskrit studies; consult the Bhagavad Gita, chapter 11, with translation notes.",
      "Albert Einstein and Rabindranath Tagore, “On the Nature of Reality” (1930 conversation, published 1931).",
      "Werner Heisenberg, Physics and Beyond: Encounters and Conversations (1971 English translation).",
      "Max Planck, Scientific Autobiography and Other Papers (English translation).",
      "Stanford Encyclopedia of Philosophy entries on quantum mechanics, the measurement problem, and Vedanta for scholarly context.",
      "NobelPrize.org biographical and prize materials for Schrödinger, Heisenberg, Planck, and Josephson."
    ],
    closingReflection: {
      title: "Conclusion: curiosity across civilizations",
      text: "Modern physics and Indian philosophy remain distinct intellectual traditions, but their encounters remind us that curiosity is not bounded by geography. Scientists may find philosophical questions in ancient texts; philosophers may find new challenges in scientific discoveries. The enduring legacy is a spirit of inquiry: respect for evidence, openness to other civilizations, and humility before questions that remain unanswered."
    },
    footerNote: "Legacy 250 — Exploring the Past. Inspiring the Future. Celebrating 250 Years of India–U.S. Friendship, Learning, and Innovation."
  },
  {
    id: 11,
    number: "11",
    slug: "poster11",
    altSlugs: ["boston-tea-party", "poster-11"],
    title: "The Boston Tea Party and the East India Company",
    subtitle: "How Imperial Commerce in South Asia Sparked Resistance in Colonial Boston",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster11.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Two Continents, One Imperial Monopoly",
      paragraphs: [
        "On December 16, 1773, American colonists boarded ships in Boston Harbor and threw 342 chests of tea into the water. While the tea itself had been grown in China, the corporate power at the center of the crisis was the British East India Company—the same mercantile and military monopoly then expanding its rule across Bengal and the Indian subcontinent."
      ]
    },
    sections: [
      {
        heading: "1. Why the East India Company Needed a Bailout in 1773",
        paragraphs: [
          "Following the conquest of Bengal and the devastating Bengal famine of 1770, the East India Company faced severe financial distress in London, with millions of pounds of unsold tea sitting in British warehouses. Parliament passed the Tea Act of 1773 to allow the Company to ship tea directly to North America while retaining the Townshend duty.",
          "American colonists feared that if the East India Company secured a monopoly on colonial trade, they would face the same unchecked corporate and imperial domination that they read about in British parliamentary debates over Bengal."
        ]
      },
      {
        heading: "2. Shared Warnings in the Atlantic Press",
        paragraphs: [
          "Pamphleteers in Boston, Philadelphia, and New York explicitly cited the East India Company’s actions in India as a warning to American colonists. Writers signing themselves 'Rusticus' and 'Hampden' argued that permitting the Company to tax and monopolize American ports would reduce free citizens to subjects of an unaccountable trading corporation."
        ]
      },
      {
        heading: "3. Historical Timeline",
        timeline: [
          { period: "1757–1765", event: "The East India Company consolidates political and revenue control in Bengal." },
          { period: "May 1773", event: "Parliament passes the Tea Act to aid the financially troubled East India Company." },
          { period: "December 16, 1773", event: "The Boston Tea Party destroys East India Company tea cargoes in Boston Harbor." },
          { period: "1776", event: "The Thirteen Colonies declare independence from the British Crown." }
        ]
      }
    ],
    furtherReading: [
      "Benjamin L. Carp, Defiance of the Patriots: The Boston Tea Party and the Making of America (Yale University Press, 2010).",
      "Nick Robins, The Corporation That Changed the World: How the East India Company Shaped the Modern Multinational (2006).",
      "Boston Tea Party Ships & Museum historical archives."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "The road to 1776 passed through global networks of empire. By resisting the East India Company’s monopoly in 1773, American patriots linked their struggle for self-government to the wider history of British imperial power in South Asia."
    }
  },
  {
    id: 12,
    number: "12",
    slug: "poster12",
    altSlugs: ["tea-empire-and-the-irony-of-freedom", "tea-and-empire", "poster-12"],
    title: "Tea, Empire, and the Irony of Freedom",
    subtitle: "How the Global Struggle Against Colonial Rule Connected America and India",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster12.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Diverging Paths in the Late Eighteenth Century",
      paragraphs: [
        "As the thirteen American colonies won their independence from Britain between 1775 and 1783, the British Empire pivoted eastward, consolidating its territorial and commercial hold over the Indian subcontinent. This historical paradox—freedom won in the West while empire deepened in the East—bound the two regions in global history."
      ]
    },
    sections: [
      {
        heading: "1. Empire’s Pivot Eastward",
        paragraphs: [
          "The loss of the American colonies prompted British statesmen to reorganize imperial administration. Through Pitt’s India Act of 1784 and subsequent charters, the British Crown and Parliament took tighter oversight of East India Company territories, turning India into the centerpiece of the 'Second British Empire.'"
        ]
      },
      {
        heading: "2. From Colonial Subjects to Constitutional Republics",
        paragraphs: [
          "Over the next 170 years, the American Declaration of Independence and constitutional experiment remained a reference point for Indian reformers and nationalists challenging British rule—culminating when India achieved independence in 1947 and adopted its republican Constitution in 1950."
        ]
      }
    ],
    furtherReading: [
      "P. J. Marshall, The Making and Unmaking of Empires: Britain, India, and America c.1750–1783 (Oxford University Press, 2005).",
      "Maya Jasanoff, Edge of Empire: Lives, Culture, and Conquest in the East, 1750–1850 (2005)."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "Understanding how empire linked the fates of North America and South Asia helps illuminate why both nations later championed constitutional democracy and self-determination."
    }
  },
  {
    id: 13,
    number: "13",
    slug: "poster13",
    altSlugs: ["yorktown", "mysore-to-yorktown", "poster-13"],
    title: "Yorktown: The Global War for American Independence",
    subtitle: "How Conflict in India and the Indian Ocean Shaped the 1781 Victory",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster13.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "A Two-Ocean War",
      paragraphs: [
        "The American Revolutionary War became a global conflict after France entered the war in 1778. While George Washington and French forces besieged Lord Cornwallis at Yorktown, Virginia, in 1781, Britain was simultaneously fighting Hyder Ali and Tipu Sultan of Mysore alongside French naval forces in India."
      ]
    },
    sections: [
      {
        heading: "1. The Second Anglo-Mysore War (1780–1784)",
        paragraphs: [
          "In 1780, Hyder Ali and his son Tipu Sultan inflicted a severe defeat on British forces at the Battle of Pollilur. The war in southern India demanded British ships, troops, and financial resources at the very moment Britain was struggling to hold the American colonies."
        ]
      },
      {
        heading: "2. Cornwallis: From Yorktown to Bengal",
        paragraphs: [
          "After surrendering at Yorktown in October 1781, General Charles Cornwallis was not disgraced in Britain. Instead, he was appointed Governor-General and Commander-in-Chief in India in 1786, where he led British forces against Tipu Sultan and instituted the Permanent Settlement in Bengal."
        ]
      },
      {
        heading: "3. Echoes in American Memory",
        paragraphs: [
          "Americans followed news of the Mysore wars closely. In 1781, Pennsylvania commissioned a warship named the Hyder-Ally in tribute to the Indian ruler fighting the same British adversary."
        ]
      }
    ],
    furtherReading: [
      "P. J. Marshall, The Making and Unmaking of Empires: Britain, India, and America c.1750–1783 (2005).",
      "C. A. Bayly, Imperial Meridian: The British Empire and the World, 1780–1830 (1989)."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "The victory at Yorktown belonged to a worldwide strategic struggle in which Indian battlefields and Atlantic campaigns were unexpectedly intertwined."
    }
  },
  {
    id: 14,
    number: "14",
    slug: "poster14",
    altSlugs: ["madras-to-yale", "from-madras-to-yale", "poster-14"],
    title: "From Madras to Yale",
    subtitle: "How Fortunes Made in Seventeenth-Century India Helped Name an American University",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster14.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "A Transoceanic Origin Story",
      paragraphs: [
        "Decades before the American Revolution, the Collegiate School of Connecticut sought support from Boston-born Elihu Yale (1649–1721), who had amassed great wealth while serving as Governor of the East India Company’s settlement at Fort St. George in Madras (now Chennai)."
      ]
    },
    sections: [
      {
        heading: "1. Elihu Yale in Madras (1672–1699)",
        paragraphs: [
          "Born in Boston and raised in England, Elihu Yale traveled to India in 1672 and rose to become President and Governor of Fort St. George (Madras) in 1687. Through East India Company service and private trade in textiles, diamonds, and spices, he accumulated a substantial fortune—A history that also involved the coercive commercial practices of seventeenth-century colonial trade."
        ]
      },
      {
        heading: "2. The 1718 Gift to New Haven",
        paragraphs: [
          "At the urging of Cotton Mather and Jeremiah Dummer, Yale sent bales of East India textiles, books, and a portrait of King George I to the struggling Connecticut school in 1718. The sale of the Indian goods funded the college’s new building in New Haven, and the trustees renamed the institution Yale College."
        ]
      },
      {
        heading: "3. Three Centuries of Academic Exchange",
        paragraphs: [
          "From those complex colonial beginnings, Yale became one of the earliest American universities to establish Sanskrit and Indological studies in the nineteenth century (under Edward Elbridge Salisbury and William Dwight Whitney) and today partners extensively with Indian scholars and institutions."
        ]
      }
    ],
    furtherReading: [
      "Yale University Library & Yale and Slavery Research Project archival histories on Elihu Yale and Fort St. George.",
      "Romita Ray and historical studies on Elihu Yale’s collections and the East India trade."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "Even before the United States was founded, goods and wealth from Indian ports helped build enduring educational institutions in New England."
    }
  },
  {
    id: 15,
    number: "15",
    slug: "poster15",
    altSlugs: ["boston-brahmins", "the-boston-brahmins", "poster-15"],
    title: "The Boston Brahmins",
    subtitle: "Maritime Wealth, Sanskrit Scholarship, and New England’s Cultural Elite",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster15.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "How an Indian Term Entered the American Vocabulary",
      paragraphs: [
        "In 1860, the physician and writer Oliver Wendell Holmes Sr. coined the phrase 'the Brahmin caste of New England' in The Atlantic Monthly to describe Boston’s old scholarly and merchant families—whose fortunes and libraries were often tied to the India trade."
      ]
    },
    sections: [
      {
        heading: "1. Merchant Ships and New England Fortunes",
        paragraphs: [
          "Families in Salem and Boston—such as the Cabots, Lowells, Peabodys, and Forbeses—built substantial maritime fortunes trading with Calcutta, Bombay, and Madras. Profits from Asian commerce helped finance New England universities, libraries, hospitals, and museums, including the Peabody Essex Museum."
        ]
      },
      {
        heading: "2. Metaphor Versus Reality",
        paragraphs: [
          "Holmes used 'Brahmin' as a literary metaphor for a bookish, hereditary intellectual class in New England. While the usage reflected nineteenth-century American fascination with India, it borrowed a term from India’s complex social and religious order and applied it loosely to American class hierarchy."
        ]
      }
    ],
    furtherReading: [
      "Oliver Wendell Holmes Sr., Elsie Venner / The Atlantic Monthly (1860).",
      "Peabody Essex Museum, collections on the East India Marine Society (founded 1799)."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "From Salem harbor to Harvard Yard, early New England’s commercial and intellectual life was deeply shaped by its encounters with India."
    }
  },
  {
    id: 16,
    number: "16",
    slug: "poster16",
    altSlugs: ["vivekananda-4th-of-july", "vivekananda-4th", "fourth-of-july", "poster-16"],
    title: "Swami Vivekananda and the Fourth of July",
    subtitle: "A Poem of Liberty and a Final Day of Meditation (1898–1902)",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster16.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "To the Fourth of July",
      paragraphs: [
        "While traveling in Kashmir with American disciples on July 4, 1898, Swami Vivekananda composed the poem 'To the Fourth of July,' celebrating the anniversary of American independence as a symbol of human emancipation and spiritual freedom. Exactly four years later—on July 4, 1902—he entered mahasamadhi (passed away) at Belur Math in Bengal."
      ]
    },
    sections: [
      {
        heading: "1. Kashmir, July 4, 1898",
        paragraphs: [
          "Accompanied by American friends including Josephine MacLeod and Sara Chapman Bull, Vivekananda prepared a surprise Fourth of July breakfast celebration in Srinagar and read aloud his poem invoking the 'Sun of Freedom' to shine upon all nations, including his own homeland."
        ]
      },
      {
        heading: "2. July 4, 1902: Final Day at Belur Math",
        paragraphs: [
          "On the Fourth of July in 1902, Vivekananda taught Sanskrit grammar to pupils, meditated for three hours in the morning, walked along the Ganges, and passed away peacefully that evening after meditation—linking the date forever in the memory of his followers in India and the United States."
        ]
      }
    ],
    furtherReading: [
      "Swami Vivekananda, 'To the Fourth of July' (1898), in The Complete Works of Swami Vivekananda.",
      "Marie Louise Burke, Swami Vivekananda in the West: New Discoveries."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "Vivekananda saw political liberty and spiritual freedom as twin aspirations of humanity—a vision that continues to unite India and America."
    }
  },
  {
    id: 17,
    number: "17",
    slug: "poster17",
    altSlugs: ["bose-to-bose", "indian-scientific-genius", "poster-17"],
    title: "From Bose to Bose: Indian Scientific Genius and Global Discovery",
    subtitle: "Jagadish Chandra Bose, Satyendra Nath Bose, and the Frontiers of Modern Physics",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster17.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Pioneers of Waves and Quantum Statistics",
      paragraphs: [
        "Two pioneering scientists from Bengal—Sir Jagadish Chandra Bose (1858–1937) and Satyendra Nath Bose (1894–1974)—transformed global telecommunications, biophysics, and quantum mechanics, laying foundations that power modern American and global science."
      ]
    },
    sections: [
      {
        heading: "1. Jagadish Chandra Bose: Millimeter Waves and Semiconductor Junctions",
        paragraphs: [
          "In the 1890s in Calcutta, J. C. Bose demonstrated wireless millimeter-wave signaling and invented galena crystal radio detectors. Supported by American friend Sara Chapman Bull, Bose filed a U.S. patent in 1901 (granted in 1904, U.S. Patent No. 755,840) for a detector of electrical disturbances—recognized by the IEEE as a milestone in wireless and semiconductor history."
        ]
      },
      {
        heading: "2. Satyendra Nath Bose: Bose–Einstein Statistics and the Boson",
        paragraphs: [
          "In 1924, physicist Satyendra Nath Bose sent Albert Einstein a paper deriving Planck’s quantum radiation law without classical electrodynamics. Einstein translated and extended the work, giving rise to Bose–Einstein statistics, Bose–Einstein condensates (first created experimentally in the U.S. in 1995), and the naming of fundamental force-carrying particles as 'bosons.'"
        ]
      }
    ],
    furtherReading: [
      "IEEE Milestones in Electrical Engineering: J. C. Bose’s millimeter-wave experiments (1895) and U.S. Patent 755,840 (1904).",
      "S. N. Bose, 'Plancks Gesetz und Lichtquantenhypothese' (1924); Nobel Prize in Physics 2001 background on Bose–Einstein Condensation."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "From the first semiconductor radio detectors patented in the United States to quantum condensates studied in American laboratories, Indian scientific breakthroughs have long been integral to global innovation."
    }
  },
  {
    id: 18,
    number: "18",
    slug: "poster18",
    altSlugs: ["saund-to-state-house", "dalip-singh-saund", "poster-18"],
    title: "From Saund to the State House",
    subtitle: "Dalip Singh Saund and the Rise of Indian American Civic Leadership",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster18.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Breaking Barriers in American Democracy",
      paragraphs: [
        "Born in Punjab in 1899, Dalip Singh Saund came to the United States in 1920 to study at the University of California, Berkeley, earning a Ph.D. in mathematics. At a time when federal law barred South Asians from naturalized U.S. citizenship, Saund organized to change the law—and within a decade of becoming a citizen, was elected to the United States Congress in 1956."
      ]
    },
    sections: [
      {
        heading: "1. The Fight for Citizenship: The Luce–Celler Act of 1946",
        paragraphs: [
          "Following the 1923 Supreme Court decision in United States v. Bhagat Singh Thind, Indian immigrants were denied naturalization. Saund alongside J. J. Singh and the India League of America campaigned tirelessly for the Luce–Celler Act of 1946, which restored naturalization rights to Indians and Filipinos."
        ]
      },
      {
        heading: "2. First Asian American and Indian American in Congress (1957–1963)",
        paragraphs: [
          "Representing California’s Imperial and Riverside counties for three terms, Congressman Saund served on the House Foreign Affairs Committee and traveled to India as an official U.S. representative—pioneering a path later followed by generations of Indian American public servants across local, state, and federal government."
        ]
      }
    ],
    furtherReading: [
      "Dalip Singh Saund, Congressman from India (E. P. Dutton, 1960).",
      "Office of the Historian, U.S. House of Representatives, biographical profile of Dalip Singh Saund."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "Dalip Singh Saund’s journey from disenfranchised immigrant mathematician to United States Congressman embodies the resilience and democratic promise connecting India and America."
    }
  },
  {
    id: 19,
    number: "19",
    slug: "poster19",
    altSlugs: ["indian-philosophy-in-cinema", "cinema-and-philosophy", "poster-19"],
    title: "Indian Philosophy in Cinema",
    subtitle: "How Concepts of Dharma, Maya, and Consciousness Entered Modern Film",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster19.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "Storytelling Across Civilizations",
      paragraphs: [
        "From the mythological studies of Joseph Campbell that helped inspire Star Wars to the Upanishadic and Buddhist philosophical motifs in The Matrix, Avatar, and Interstellar, Indian ideas about duty (dharma), illusion and reality (maya), and interconnected consciousness have left a vivid mark on American and global cinema."
      ]
    },
    sections: [
      {
        heading: "1. Joseph Campbell, Indology, and the Hero’s Journey",
        paragraphs: [
          "American mythologist Joseph Campbell collaborated closely with Indologist Heinrich Zimmer, editing Zimmer’s works on Indian art and philosophy before publishing The Hero with a Thousand Faces (1949). George Lucas acknowledged Campbell’s synthesis of comparative mythology—deeply informed by Sanskrit epics and Vedantic themes—in shaping the spiritual vocabulary of Star Wars."
        ]
      },
      {
        heading: "2. Maya, Avatar, and Sanskrit Motifs in Contemporary Film",
        paragraphs: [
          "Modern science-fiction films frequently draw on Sanskrit terminology and philosophical questions: The Matrix closes its trilogy with choral verses from the Brhadaranyaka Upanishad ('Asato Ma Sadgamaya'), while James Cameron’s Avatar adapts the Sanskrit concept of avatāra (descent or incarnation) into an exploration of ecological and spiritual interconnectedness."
        ]
      }
    ],
    furtherReading: [
      "Joseph Campbell, The Hero with a Thousand Faces (1949) and editing of Heinrich Zimmer’s Philosophies of India (1951).",
      "Rachel Dwyer, Filming the Gods: Religion and Indian Cinema (2006)."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "Cinema has become one of the most popular bridges through which ancient philosophical questions reach global audiences."
    }
  },
  {
    id: 20,
    number: "20",
    slug: "poster20",
    altSlugs: ["democracies", "two-great-democracies", "oldest-and-largest-democracies", "poster-20"],
    title: "Two Great Democracies: Shared Ideals, Shared Future",
    subtitle: "Constitutionalism, Pluralism, and 250 Years of India–U.S. Partnership",
    editionTag: "Legacy 250 | Educational companion to the exhibition poster | Webpage / QR-code edition",
    image: "/assets/posters/poster20.webp",
    keySource: {
      title: "Threads of Freedom: India and America – 250 Years of Shared Destiny, Volume I",
      url: "https://www.amazon.com/dp/B0HKFWGK93"
    },
    intro: {
      heading: "We the People",
      paragraphs: [
        "Both the Constitution of the United States (1787) and the Constitution of India (1949/1950) open with the words 'We, the People'—anchoring sovereignty in citizens rather than monarchs or empires, and uniting the world’s oldest continuous constitutional republic with the world’s largest democracy."
      ]
    },
    sections: [
      {
        heading: "1. Constitutional Dialogue (1946–1950)",
        paragraphs: [
          "As India’s Constituent Assembly drafted the nation’s Constitution under the chairmanship of Columbia-educated Dr. B. R. Ambedkar, framers studied global constitutional models. From the U.S. experience, India drew inspiration for a written Bill of Fundamental Rights, an independent Supreme Court with judicial review, and federal governance adapted to India’s parliamentary system."
        ]
      },
      {
        heading: "2. The Next 250 Years",
        paragraphs: [
          "Today, 4.5 million Indian Americans, 200,000+ students, and deep collaborations in space exploration (NISAR), clean energy, medicine, and technology form a living bridge between the two democracies as the United States marks its 250th anniversary in 2026."
        ]
      }
    ],
    furtherReading: [
      "Granville Austin, The Indian Constitution: Cornerstone of a Nation (Oxford University Press, 1966).",
      "Constituent Assembly Debates of India (1946–1949) and U.S. National Archives Charters of Freedom."
    ],
    closingReflection: {
      title: "A Legacy 250 Reflection",
      text: "Two republics born from struggles against empire—one in 1776, one in 1947—now stand together to shape a freer, more innovative, and more connected world."
    }
  }
];

export const findPosterBySlug = (rawPath) => {
  if (!rawPath) return null;
  const clean = rawPath
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^posters?\//, "poster");

  // Match poster1 .. poster20 directly or via altSlugs
  for (const poster of POSTERS_DATA) {
    if (poster.slug.toLowerCase() === clean) return poster;
    if (poster.altSlugs && poster.altSlugs.some((s) => s.toLowerCase() === clean)) {
      return poster;
    }
  }

  // Also check if rawPath without leading slash matches any altSlug
  const rawClean = rawPath.toLowerCase().replace(/^\/+|\/+$/g, "");
  for (const poster of POSTERS_DATA) {
    if (poster.slug.toLowerCase() === rawClean) return poster;
    if (poster.altSlugs && poster.altSlugs.some((s) => s.toLowerCase() === rawClean)) {
      return poster;
    }
  }

  return null;
};

