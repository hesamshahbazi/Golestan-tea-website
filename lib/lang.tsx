"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "EN" | "DE";

// ─────────────────────────────────────────────────────────────────────────────
// Translation tables
// ─────────────────────────────────────────────────────────────────────────────

const translations = {
  EN: {
    navbar: {
      tagline: "Fine Persian Tea",
      collection: "Collection",
      heritage: "Heritage",
      story: "Story",
    },

    hero: {
      phase1: {
        subtitle: "Est. MMXXIV · Golestan",
        line1: "Where Ritual Meets",
        line2: "Refinement",
      },
      phase2: {
        subtitle: "Persian Heritage",
        line1: "Born From the",
        line2: "Gardens of Golestan",
      },
      phase3: {
        subtitle: "Three Centuries of Mastery",
        line1: "Steeped in",
        line2: "Ancient Tradition",
      },
      phase4: {
        subtitle: "The Collection",
        line1: "Discover",
        line2: "Pure Luxury",
      },
      scrollPrompt: "Scroll to Explore",
    },

    productsSection: {
      eyebrow: "Golestan · The Collection",
      heading: "The Collection",
    },

    productCard: {
      explore: "Explore",
    },

    products: {
      "earl-grey": {
        subtitle: "Signature Blend",
        name: "Earl Grey",
        origin: "Darjeeling, India",
        ingredients: ["Bergamot", "Cornflower", "Silver Tips"],
        description:
          "A luminous first-flush Darjeeling scented with cold-pressed Calabrian bergamot and garnished with dried cornflower petals.",
      },
      "ceylon-gold": {
        subtitle: "Reserve Collection",
        name: "Ceylon Gold",
        origin: "Nuwara Eliya, Sri Lanka",
        ingredients: ["Golden Tips", "Honey", "Citrus"],
        description:
          "High-grown at 2,000m elevation, this luminous amber liquor carries notes of warm honey and bright citrus with a long, silky finish.",
      },
      "premium-indian": {
        subtitle: "Artisan Edition",
        name: "Premium Indian",
        origin: "Assam, India",
        ingredients: ["Cardamom", "Saffron", "Rose"],
        description:
          "A bold Assam base infused with hand-ground cardamom and rare Kashmiri saffron threads — a tribute to Persian tea ceremony.",
      },
    },

    heritage: {
      eyebrow: "Golestan · Heritage",
      headingLine1: "Where Every Cup",
      headingLine2: "Carries History",
      subheading:
        "A story rooted in the ancient trade routes of Persia, the misty terraces of the Caspian coast, and the hands of families who have tended the same land for generations.",
      backgroundText: "HERITAGE",
      chapters: [
        {
          number: "01",
          label: "The Persian Tradition",
          headline: "Three Thousand Years of Ritual",
          body: [
            "Tea arrived in Persia through the ancient Silk Road, carried by Chinese merchants across the Caspian steppes. By the time of the Safavid dynasty in the 16th century, the chai-khaneh — the Persian teahouse — had become the cultural heartbeat of every city from Isfahan to Tabriz.",
            "Rulers held court over tea. Merchants sealed agreements with it. Poets wrote odes to the amber cup. No act of hospitality was complete without the glass of chai placed before a guest — dark, sweet, and steaming. This was not custom. It was devotion.",
          ],
          pull: "No act of hospitality was complete without the glass of chai placed before a guest.",
        },
        {
          number: "02",
          label: "The Caspian Coast",
          headline: "Where Fog Meets Fertile Ground",
          body: [
            "The provinces of Gilan and Mazandaran, bordering the Caspian Sea, are Iran's only tea-growing regions. The landscape is extraordinary: ancient forests pressing against the sea, rainfall that rivals the tropics, and morning mist that lingers until noon across the hillside terraces.",
            "It was here, in the early 1900s, that Mohammad Mirza — a Persian diplomat who had studied horticulture in India — smuggled tea seeds from Kolkata wrapped in cloth and planted them in the red clay soil above Lahijan. Within a decade, Iran had its first commercial tea harvest.",
          ],
          pull: "The landscape is extraordinary — ancient forests pressing against the sea, mist that lingers until noon.",
        },
        {
          number: "03",
          label: "The Golestan Story",
          headline: "A Garden at the Edge of the Mountains",
          body: [
            "Our name comes from the northernmost province — Golestan, meaning Garden of Flowers. In this lush corridor between the Alborz Mountains and the Caspian Sea, we found the finest estates and the most committed growers in Iran — families who have tended the same terraced plots for four generations.",
            "Golestan was founded on the conviction that Persian tea culture deserved a global stage. Not as a curiosity, but as a luxury. We set out to source, blend, and present teas with the same rigour applied to the great estates of Darjeeling and Ceylon.",
          ],
          pull: "Persian tea culture deserves a global stage — not as a curiosity, but as a luxury.",
        },
        {
          number: "04",
          label: "Sourcing & Craft",
          headline: "Direct from the Estate, Season by Season",
          body: [
            "We work with family estates whose relationships with the land span three and four generations. Our sourcing is direct — no intermediaries, no commodity auctions. Each harvest is agreed upon by name, by hand, season by season.",
            "Every blend in our collection is developed through months of cupping, tasting across elevations, harvest dates, and processing methods before a single gram enters a tin. We blend in small batches. We pack by hand. We name every tea by its origin.",
          ],
          pull: "Every blend is developed through months of cupping before a single gram enters a tin.",
        },
      ],
    },

    story: {
      eyebrow: "Golestan · Our Story",
      headingLine1: "The Ritual",
      headingLine2Gold: "Presence",
      backgroundText: "STORY",
      pullQuote:
        "Every cup begins in soil. Every ritual begins in intention. Between the two lies everything that matters.",
      pullAttribution: "— Hesam Shahbazi, Founder",
      pillars: [
        {
          number: "I",
          label: "Mission",
          headline: "The Act of Making Tea Deserves Reverence",
          body: "In a world optimised for speed, we chose craft. Golestan was founded on a single conviction: that the ritual of tea — from the first flush harvest to the moment you pour — deserves to be approached with intention, with care, and with an awareness of what the cup carries.",
        },
        {
          number: "II",
          label: "The Founder",
          headline: "Born Between Two Cultures",
          body: "Hesam Shahbazi spent years working across luxury hospitality in London and Tehran before founding Golestan. Sitting between two cultures — one that built the chai-khaneh, another that built the tea room — he saw an opportunity not to choose, but to synthesise. Golestan is that synthesis: Persian warmth expressed through the language of global luxury.",
        },
        {
          number: "III",
          label: "Sustainability",
          headline: "The Land That Gives Must Be Replenished",
          body: "We source only from estates that practise traditional, chemical-free cultivation. Our estate partnerships prioritise fair-trade agreements, fair wages, and seasonal respect — we do not push growers to over-harvest. Our packaging uses recycled kraft board, plant-based inks, and a metal tin designed to be refilled, not discarded.",
        },
        {
          number: "IV",
          label: "The Ritual",
          headline: "Tea Is the Medium, Not the Message",
          body: "In Persian culture, tea is never drunk alone. It is the medium of hospitality, of unhurried conversation, of welcome extended to a stranger. The samovar stays warm for hours — because you do not know when a guest will arrive, and you do not want them to wait. When you open a tin of Golestan, you are not just buying tea. You are entering a ritual that has no beginning and no end.",
        },
      ],
      stats: [
        { value: "4", label: "Estate Partners" },
        { value: "3", label: "Growing Regions" },
        { value: "100%", label: "Chemical-Free" },
        { value: "MMXXIV", label: "Est. Golestan" },
      ],
    },

    footer: {
      tagline: "Where the art of Persian tea culture meets modern refinement.",
      navigateLabel: "Navigate",
      links: [
        { label: "Collection", href: "#collection" },
        { label: "Heritage", href: "#heritage" },
        { label: "Story", href: "#story" },
        { label: "Contact", href: "#contact" },
      ],
      followUs: "Follow Us",
      quote: "In every cup, a story.",
      allRightsReserved: "All rights reserved.",
      crafted: "Crafted with intention · Est. MMXXIV",
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  DE: {
    navbar: {
      tagline: "Feiner persischer Tee",
      collection: "Kollektion",
      heritage: "Erbe",
      story: "Geschichte",
    },

    hero: {
      phase1: {
        subtitle: "Gegr. MMXXIV · Golestan",
        line1: "Wo Ritual auf",
        line2: "Verfeinerung trifft",
      },
      phase2: {
        subtitle: "Persisches Erbe",
        line1: "Entsprungen den",
        line2: "Gärten Golestans",
      },
      phase3: {
        subtitle: "Drei Jahrhunderte der Meisterschaft",
        line1: "Verwurzelt in",
        line2: "Uralter Tradition",
      },
      phase4: {
        subtitle: "Die Kollektion",
        line1: "Entdecke",
        line2: "Reinen Luxus",
      },
      scrollPrompt: "Scrollen zum Entdecken",
    },

    productsSection: {
      eyebrow: "Golestan · Die Kollektion",
      heading: "Die Kollektion",
    },

    productCard: {
      explore: "Entdecken",
    },

    products: {
      "earl-grey": {
        subtitle: "Signature-Mischung",
        name: "Earl Grey",
        origin: "Darjeeling, Indien",
        ingredients: ["Bergamotte", "Kornblume", "Silberspitzen"],
        description:
          "Ein leuchtender Erstpflückungs-Darjeeling, aromatisiert mit kaltgepresstem kalabrischen Bergamott und garniert mit getrockneten Kornblumenblüten.",
      },
      "ceylon-gold": {
        subtitle: "Reserve-Kollektion",
        name: "Ceylon Gold",
        origin: "Nuwara Eliya, Sri Lanka",
        ingredients: ["Goldspitzen", "Honig", "Zitrus"],
        description:
          "In 2.000 m Höhe angebaut, trägt dieser leuchtende Bernsteinsud warme Honigtöne und frische Zitrusnoten mit einem langen, seidigen Abgang.",
      },
      "premium-indian": {
        subtitle: "Handwerker-Edition",
        name: "Premium Indisch",
        origin: "Assam, Indien",
        ingredients: ["Kardamom", "Safran", "Rose"],
        description:
          "Eine kräftige Assam-Basis, verfeinert mit handgemahlenem Kardamom und seltenen kaschmirischen Safranfäden — eine Hommage an die persische Teezeremonie.",
      },
    },

    heritage: {
      eyebrow: "Golestan · Erbe",
      headingLine1: "Jede Tasse",
      headingLine2: "Trägt Geschichte",
      subheading:
        "Eine Geschichte verwurzelt in den alten Handelsrouten Persiens, den nebeligen Terrassen der Kaspischen Küste und den Händen von Familien, die dasselbe Land seit Generationen pflegen.",
      backgroundText: "ERBE",
      chapters: [
        {
          number: "01",
          label: "Die Persische Tradition",
          headline: "Dreitausend Jahre des Rituals",
          body: [
            "Der Tee gelangte über die alte Seidenstraße nach Persien, von chinesischen Kaufleuten über die kaspischen Steppen getragen. Zur Zeit der Safaviden-Dynastie im 16. Jahrhundert war das Chai-Khane — das persische Teehaus — zum kulturellen Herzschlag jeder Stadt von Isfahan bis Tabriz geworden.",
            "Herrscher hielten Hof beim Tee. Kaufleute besiegelten Abkommen damit. Dichter schrieben Oden an die bernsteinfarbene Tasse. Kein Akt der Gastfreundschaft war vollständig ohne das Glas Chai, das einem Gast gereicht wurde — dunkel, süß und dampfend. Dies war kein Brauch. Es war Hingabe.",
          ],
          pull: "Kein Akt der Gastfreundschaft war vollständig ohne das Glas Chai, das einem Gast gereicht wurde.",
        },
        {
          number: "02",
          label: "Die Kaspische Küste",
          headline: "Wo Nebel auf fruchtbaren Boden trifft",
          body: [
            "Die Provinzen Gilan und Mazandaran, die an das Kaspische Meer grenzen, sind Irans einzige Teeanbaugebiete. Die Landschaft ist außergewöhnlich: alte Wälder, die ans Meer drängen, Niederschläge, die den Tropen ebenbürtig sind, und Morgennebel, der bis Mittag über den Hangterrassen hängt.",
            "Hier, Anfang des 20. Jahrhunderts, schmuggelte Mohammad Mirza — ein persischer Diplomat, der in Indien Gartenbau studiert hatte — in Tuch gewickelte Teesamen aus Kalkutta und pflanzte sie in den roten Lehmboden oberhalb von Lahijan. Innerhalb eines Jahrzehnts hatte Iran seine erste kommerzielle Teeernte.",
          ],
          pull: "Die Landschaft ist außergewöhnlich — alte Wälder, die ans Meer drängen, Nebel, der bis Mittag hält.",
        },
        {
          number: "03",
          label: "Die Geschichte Golestans",
          headline: "Ein Garten am Rand der Berge",
          body: [
            "Unser Name stammt aus der nördlichsten Provinz — Golestan, was Blumengarten bedeutet. In diesem üppigen Korridor zwischen dem Alborz-Gebirge und dem Kaspischen Meer fanden wir die feinsten Güter und die engagiertesten Anbauer Irans — Familien, die dieselben Terrassengrundstücke seit vier Generationen pflegen.",
            "Golestan wurde in der Überzeugung gegründet, dass die persische Teekultur eine globale Bühne verdient. Nicht als Kuriosität, sondern als Luxus. Wir machten uns daran, Tees mit derselben Sorgfalt zu beschaffen, zu mischen und zu präsentieren, die den großen Gütern von Darjeeling und Ceylon gewidmet wird.",
          ],
          pull: "Die persische Teekultur verdient eine globale Bühne — nicht als Kuriosität, sondern als Luxus.",
        },
        {
          number: "04",
          label: "Beschaffung & Handwerk",
          headline: "Direkt vom Gut, Saison für Saison",
          body: [
            "Wir arbeiten mit Familienbetrieben zusammen, deren Beziehung zum Land drei und vier Generationen umspannt. Unsere Beschaffung ist direkt — keine Zwischenhändler, keine Warenbörsen. Jede Ernte wird namentlich, von Hand, Saison für Saison vereinbart.",
            "Jede Mischung in unserer Kollektion wird durch monatelanges Cupping entwickelt — Verkosten nach Höhe, Erntedatum und Verarbeitungsmethode, bevor ein einziges Gramm in eine Dose gelangt. Wir mischen in kleinen Chargen. Wir verpacken per Hand. Wir benennen jeden Tee nach seiner Herkunft.",
          ],
          pull: "Jede Mischung wird durch monatelanges Cupping entwickelt, bevor ein einziges Gramm in eine Dose gelangt.",
        },
      ],
    },

    story: {
      eyebrow: "Golestan · Unsere Geschichte",
      headingLine1: "Das Ritual",
      headingLine2Gold: "Präsenz",
      backgroundText: "GESCHICHTE",
      pullQuote:
        "Jede Tasse beginnt im Boden. Jedes Ritual beginnt in der Intention. Zwischen beiden liegt alles, was zählt.",
      pullAttribution: "— Hesam Shahbazi, Gründer",
      pillars: [
        {
          number: "I",
          label: "Mission",
          headline: "Das Teekochen verdient Ehrfurcht",
          body: "In einer auf Geschwindigkeit optimierten Welt wählten wir das Handwerk. Golestan wurde auf einer einzigen Überzeugung gegründet: dass das Ritual des Tees — vom Erstpflückungs-Erntetag bis zum Moment des Einschenkens — mit Absicht, Sorgfalt und dem Bewusstsein dessen, was die Tasse trägt, angegangen werden sollte.",
        },
        {
          number: "II",
          label: "Der Gründer",
          headline: "Zwischen zwei Kulturen geboren",
          body: "Hesam Shahbazi arbeitete Jahre im Luxushospitality-Bereich in London und Teheran, bevor er Golestan gründete. Zwischen zwei Kulturen sitzend — einer, die das Chai-Khane schuf, einer anderen, die das Teezimmer schuf — sah er eine Möglichkeit, nicht zu wählen, sondern zu synthetisieren. Golestan ist diese Synthese: persische Wärme, ausgedrückt in der Sprache des globalen Luxus.",
        },
        {
          number: "III",
          label: "Nachhaltigkeit",
          headline: "Das Land, das gibt, muss erneuert werden",
          body: "Wir beziehen nur von Gütern, die traditionellen, chemiefreien Anbau praktizieren. Unsere Gut-Partnerschaften priorisieren faire Handelsabkommen, faire Löhne und saisonalen Respekt — wir drängen Anbauer nicht zur Überproduktion. Unsere Verpackung verwendet recycelten Kraftkarton, pflanzenbasierte Tinten und eine Metalldose, die zum Nachfüllen, nicht zum Wegwerfen gedacht ist.",
        },
        {
          number: "IV",
          label: "Das Ritual",
          headline: "Tee ist das Medium, nicht die Botschaft",
          body: "In der persischen Kultur wird Tee niemals alleine getrunken. Er ist das Medium der Gastfreundschaft, des ungestörten Gesprächs, des Willkommens, das einem Fremden entgegengebracht wird. Der Samowar bleibt stundenlang warm — weil man nicht weiß, wann ein Gast eintrifft, und man nicht möchte, dass er wartet. Wenn Sie eine Dose Golestan öffnen, kaufen Sie nicht nur Tee. Sie treten in ein Ritual ein, das keinen Anfang und kein Ende hat.",
        },
      ],
      stats: [
        { value: "4", label: "Gut-Partner" },
        { value: "3", label: "Anbauregionen" },
        { value: "100%", label: "Chemiefrei" },
        { value: "MMXXIV", label: "Gegr. Golestan" },
      ],
    },

    footer: {
      tagline: "Wo die Kunst der persischen Teekultur auf moderne Verfeinerung trifft.",
      navigateLabel: "Navigation",
      links: [
        { label: "Kollektion", href: "#collection" },
        { label: "Erbe", href: "#heritage" },
        { label: "Geschichte", href: "#story" },
        { label: "Kontakt", href: "#contact" },
      ],
      followUs: "Folgen Sie uns",
      quote: "In jeder Tasse eine Geschichte.",
      allRightsReserved: "Alle Rechte vorbehalten.",
      crafted: "Mit Sorgfalt gefertigt · Gegr. MMXXIV",
    },
  },
} as const;

export type Translations = (typeof translations)["EN"];

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "EN",
  setLang: () => {},
  t: translations.EN,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("golestan-lang") as Lang | null;
    if (saved === "EN" || saved === "DE") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("golestan-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
