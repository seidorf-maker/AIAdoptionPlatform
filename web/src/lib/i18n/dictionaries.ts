export const locales = ["en", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

export const en = {
  common: {
    demoFooter:
      "This is a demo environment — screens are seeded with sample data so you can explore the full product experience. No real accounts or company data are used here.",
  },
  nav: {
    tag: "AI, for the rest of us",
    ourMission: "Our Mission",
    pricing: "Pricing",
    login: "Log in",
    logout: "Log out",
  },
  login: {
    tag: "Welcome",
    heading: "Log in to OnRamp",
    oneLiner:
      "OnRamp certifies that non-technical employees can actually do their job with AI — not just that they watched a course.",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    signIn: "Sign In",
    signingIn: "Signing in…",
    demoNote: "Demo mode — any email signs you in as Denise Carter.",
  },
  landing: {
    tag: "A role-based AI adoption platform",
    heading: "AI, for the rest of us.",
    subhead:
      "OnRamp certifies that non-technical employees can actually do their job with AI — not just that they watched a course.",
    logIn: "Log In",
    seeItInAction: "See it in action",
    seeItInActionSub:
      "The real Prompt Coach and Competence Assessment, shown exactly as they work once you're signed in.",
    promptCoachTitle: "Prompt Coach",
    competenceAssessmentTitle: "Competence Assessment",
    principle1Title: "Sanctioned, not sneaky",
    principle1Body:
      "Every screen is approved and specific to your role — never an open catalog to guess your way through.",
    principle2Title: "Proof over participation",
    principle2Body:
      "Certifications require demonstrating a real task, evaluated against a rubric — not a completion badge.",
    principle3Title: "No public exposure by default",
    principle3Body:
      "Competing is always your choice. No one ever sees a result you didn't choose to show them.",
  },
  pricing: {
    tag: "For HR & L&D leaders",
    heading:
      "Prove your team can actually use AI — not just that they sat through a course.",
    subhead:
      "OnRamp certifies real, job-specific AI competence through scenario-based assessment, layered on top of the training tools you already pay for — LinkedIn Learning and the rest of your L&D stack. It doesn't ask you to rip anything out.",
    cta: "Talk to us about a pilot",
    roiPill: "Why this saves money",
    roiHeadline: "Even in 2026, fewer than 1 in 5 companies actually use AI in daily operations.",
    roiBody:
      "The Census Bureau's own May 2026 survey found only 19.8% of U.S. businesses report using AI in operations — 37% among large employers, still well under half. Gallup's Q2 2026 workforce survey found a similar shape at the employee level: 47% of employees say their company has rolled out AI, but a 2025 global study found only 42% actually use the tools their employer provides — most reach for free, unsanctioned tools instead. At typical enterprise L&D seat pricing (~$380/user/year for LinkedIn Learning Teams), a 4,200-employee company spends roughly $1.6M/year on training seats — even a conservative estimate that half of that isn't reaching employees in a governed, sanctioned way points to {{accent}} in spend that isn't converting into demonstrated, real-world skill. OnRamp doesn't ask you to spend more on top of that — it makes the spend you've already made actually work.",
    roiAccent: "~$800K a year",
    sourcesLabel: "Sources",
    sourcesCensus: "U.S. Census Bureau, May 2026",
    sourcesGallup: "Gallup, Q2 2026",
    sourcesMbs: "Melbourne Business School, 2025",
    sourcesLinkedin: "LinkedIn Learning pricing",
    sourcesFootnote:
      "The $800K figure is an illustrative estimate built on these sources, not an audited number for any specific company.",
    pricingHeading: "Pricing",
    pricingSub:
      "Priced per participating employee — the people actually enrolled in a track — not your full headcount. You only pay for who's using it.",
    starterEyebrow: "Under 500 employees",
    starterName: "Starter",
    starterBestFor: "A focused pilot in one team or department before a wider rollout.",
    growthEyebrow: "500–2,000 employees",
    growthName: "Growth",
    growthBestFor: "Rolling out across a full function or division — about $96/employee/year.",
    enterpriseEyebrow: "2,000–5,000+ employees",
    enterpriseName: "Enterprise",
    enterpriseBestFor: "Company-wide rollout, volume pricing, and dedicated onboarding support.",
    addOnEyebrow: "Optional add-on, any tier",
    addOnName: "Team Leaderboards",
    addOnPrice: "+$2",
    addOnUnit: "/ participating employee / mo",
    addOnBestFor:
      "Business-unit leaderboards for leadership tracking, plus opt-in individual leaderboards. Never shows a failed result — only positive achievement, and only for those who opt in.",
    perMonth: "/ participating employee / mo",
    custom: "Custom",
    contactForPricing: "contact us for pricing",
    contactUs: "Contact us",
    footnote:
      "This is illustrative, pilot-stage pricing — not a locked commercial rate card. Final terms are set per pilot agreement.",
  },
  about: {
    tag: "Our mission",
    heading: "AI, for the rest of us.",
    intro:
      "We built OnRamp because the people doing the actual work — not the tech team, not the early adopters — were being left to figure AI out on their own. That's not a training problem. It's a permission problem. OnRamp exists to give every employee a sanctioned, role-specific way in, and a real credential to show for it once they're there.",
    whyHeading: "Why we built this",
    whyP1:
      "We've watched a company spend enormous money trying to drive AI adoption — training programs, new tool licenses, leadership mandates from the top down. On paper, everything was in place. In practice, it wasn't going well. People weren't actually using the tools they'd been given.",
    whyP2:
      "Digging into why, the answer wasn't resistance. It was simpler and more fixable than that: a lot of employees genuinely didn't understand how to use the tools they already had access to. Nobody had shown them, in the specific terms of their own job, exactly where to start. So the spend sat there, mostly unconverted into real behavior change.",
    whyP3:
      "We think AI is genuinely valuable — not as a buzzword, but for a concrete reason: it can cut out the repetitive, manual parts of a job and free people up for the higher-value, more strategic work only they can do. That value was sitting unused. OnRamp is our answer to that gap — a way to turn tools a company already owns into skills people actually use.",
    statPill: "This isn't an isolated story",
    statHeadline: "Even in 2026, fewer than 1 in 5 U.S. businesses report actually using AI in daily operations.",
    statBody:
      "Among employees whose companies have rolled AI out, most still reach for free, unsanctioned tools instead of whatever their employer provides. That gap between quiet, ungoverned use and real, sanctioned skill is common enough that a single mid-size company can have roughly {{accent}} in training spend that never converts into demonstrated ability. We built OnRamp to close that gap — not by asking companies to spend more, but by making the investment they've already made actually work.",
    statAccent: "$800K a year",
    seeSourcing: "See the full sourcing on",
    seeSourcingLink: "our pricing page",
    whatHeading: "What we do about it",
    whatP1:
      "OnRamp certifies real, job-specific AI competence through scenario-based assessment — proof that someone can do a real task with AI, not a record that they clicked through a course. It sits on top of the tools and training a company already owns rather than replacing them, so there's nothing to rip out and nothing new to procure just to get started.",
    whatP2:
      "If you want the full picture of how the assessment works, or what it costs to bring to your team, that's covered in depth elsewhere on this site — this page is just the why.",
    tryDemo: "Try the demo",
    seePricing: "See pricing",
  },
};

export type Dictionary = typeof en;

export const es: Dictionary = {
  common: {
    demoFooter:
      "Este es un entorno de demostración — las pantallas contienen datos de ejemplo para que explores la experiencia completa del producto. No se usan cuentas reales ni datos de empresas aquí.",
  },
  nav: {
    tag: "IA, para el resto de nosotros",
    ourMission: "Nuestra misión",
    pricing: "Precios",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
  },
  login: {
    tag: "Bienvenido",
    heading: "Inicia sesión en OnRamp",
    oneLiner:
      "OnRamp certifica que empleados no técnicos realmente pueden hacer su trabajo con IA, no solo que vieron un curso.",
    emailLabel: "Correo laboral",
    emailPlaceholder: "tu@empresa.com",
    signIn: "Iniciar sesión",
    signingIn: "Iniciando sesión…",
    demoNote: "Modo demo — cualquier correo te inicia sesión como Denise Carter.",
  },
  landing: {
    tag: "Una plataforma de adopción de IA basada en roles",
    heading: "IA, para el resto de nosotros.",
    subhead:
      "OnRamp certifica que empleados no técnicos realmente pueden hacer su trabajo con IA, no solo que vieron un curso.",
    logIn: "Iniciar sesión",
    seeItInAction: "Véalo en acción",
    seeItInActionSub:
      "El verdadero Prompt Coach y la Evaluación de Competencia, tal como funcionan una vez que iniciaste sesión.",
    promptCoachTitle: "Prompt Coach",
    competenceAssessmentTitle: "Evaluación de Competencia",
    principle1Title: "Autorizado, no a escondidas",
    principle1Body:
      "Cada pantalla está aprobada y es específica para tu rol — nunca un catálogo abierto que tengas que adivinar.",
    principle2Title: "Prueba, no solo participación",
    principle2Body:
      "Las certificaciones requieren demostrar una tarea real, evaluada con una rúbrica — no una insignia de finalización.",
    principle3Title: "Sin exposición pública por defecto",
    principle3Body:
      "Competir siempre es tu elección. Nadie ve nunca un resultado que no elegiste mostrar.",
  },
  pricing: {
    tag: "Para líderes de RR. HH. y L&D",
    heading:
      "Demuestra que tu equipo realmente puede usar IA — no solo que tomó un curso.",
    subhead:
      "OnRamp certifica competencia real en IA, específica para cada puesto, mediante evaluaciones basadas en escenarios, sobre las herramientas de formación que ya pagas — LinkedIn Learning y el resto de tu stack de L&D. No te pide que elimines nada.",
    cta: "Hablemos de un piloto",
    roiPill: "Por qué esto ahorra dinero",
    roiHeadline: "Incluso en 2026, menos de 1 de cada 5 empresas usa realmente IA en sus operaciones diarias.",
    roiBody:
      "La propia encuesta de la Oficina del Censo de EE. UU. de mayo de 2026 encontró que solo el 19.8% de las empresas estadounidenses usan IA en sus operaciones — 37% entre los grandes empleadores, todavía muy por debajo de la mitad. La encuesta de Gallup del Q2 2026 encontró un patrón similar a nivel de empleados: el 47% dice que su empresa implementó IA, pero un estudio global de 2025 encontró que solo el 42% realmente usa las herramientas que su empleador provee — la mayoría recurre a herramientas gratuitas y no autorizadas. Con el precio típico de formación empresarial (~$380/usuario/año para LinkedIn Learning Teams), una empresa de 4,200 empleados gasta aproximadamente $1.6M/año en licencias de formación — incluso una estimación conservadora de que la mitad de eso no llega a los empleados de forma gobernada y autorizada apunta a {{accent}} en gasto que no se convierte en habilidad real y demostrada. OnRamp no te pide gastar más — hace que el gasto que ya hiciste realmente funcione.",
    roiAccent: "~$800K al año",
    sourcesLabel: "Fuentes",
    sourcesCensus: "Oficina del Censo de EE. UU., mayo 2026",
    sourcesGallup: "Gallup, 2.º trimestre 2026",
    sourcesMbs: "Melbourne Business School, 2025",
    sourcesLinkedin: "Precios de LinkedIn Learning",
    sourcesFootnote:
      "La cifra de $800K es una estimación ilustrativa basada en estas fuentes, no un número auditado de ninguna empresa específica.",
    pricingHeading: "Precios",
    pricingSub:
      "Con precio por empleado participante — las personas realmente inscritas en una ruta — no por tu plantilla completa. Solo pagas por quien lo usa.",
    starterEyebrow: "Menos de 500 empleados",
    starterName: "Starter",
    starterBestFor: "Un piloto enfocado en un equipo o departamento antes de una implementación más amplia.",
    growthEyebrow: "500–2,000 empleados",
    growthName: "Growth",
    growthBestFor: "Implementación en toda una función o división — unos $96/empleado/año.",
    enterpriseEyebrow: "2,000–5,000+ empleados",
    enterpriseName: "Enterprise",
    enterpriseBestFor: "Implementación en toda la empresa, precios por volumen y soporte de incorporación dedicado.",
    addOnEyebrow: "Complemento opcional, cualquier plan",
    addOnName: "Tablas de clasificación de equipo",
    addOnPrice: "+$2",
    addOnUnit: "/ empleado participante / mes",
    addOnBestFor:
      "Tablas de clasificación por unidad de negocio para seguimiento de liderazgo, más tablas individuales opcionales. Nunca muestra un resultado fallido — solo logros positivos, y solo para quienes lo eligen.",
    perMonth: "/ empleado participante / mes",
    custom: "Personalizado",
    contactForPricing: "contáctanos para precios",
    contactUs: "Contáctanos",
    footnote:
      "Estos son precios ilustrativos, en etapa piloto — no una tarifa comercial fija. Los términos finales se definen por acuerdo de piloto.",
  },
  about: {
    tag: "Nuestra misión",
    heading: "IA, para el resto de nosotros.",
    intro:
      "Creamos OnRamp porque las personas que hacen el trabajo real — no el equipo técnico, no quienes ya adoptan todo primero — se quedaban solas para descifrar la IA por su cuenta. Eso no es un problema de formación. Es un problema de permiso. OnRamp existe para darle a cada empleado una entrada autorizada y específica a su rol, y una credencial real que lo demuestre.",
    whyHeading: "Por qué creamos esto",
    whyP1:
      "Vimos a una empresa gastar muchísimo dinero tratando de impulsar la adopción de IA — programas de formación, nuevas licencias de herramientas, mandatos de liderazgo desde arriba. Sobre el papel, todo estaba en su lugar. En la práctica, no iba bien. La gente no estaba realmente usando las herramientas que se le habían dado.",
    whyP2:
      "Al investigar por qué, la respuesta no fue resistencia. Fue algo más simple y más fácil de resolver: muchos empleados genuinamente no entendían cómo usar las herramientas a las que ya tenían acceso. Nadie les había mostrado, en los términos específicos de su propio trabajo, exactamente por dónde empezar. Así que el gasto quedó ahí, en su mayoría sin convertirse en un cambio de comportamiento real.",
    whyP3:
      "Creemos que la IA es genuinamente valiosa — no como palabra de moda, sino por una razón concreta: puede eliminar las partes repetitivas y manuales de un trabajo y liberar a las personas para el trabajo más estratégico y de mayor valor que solo ellas pueden hacer. Ese valor estaba sin usar. OnRamp es nuestra respuesta a esa brecha — una forma de convertir las herramientas que una empresa ya tiene en habilidades que la gente realmente usa.",
    statPill: "Esto no es un caso aislado",
    statHeadline: "Incluso en 2026, menos de 1 de cada 5 empresas estadounidenses dice usar realmente IA en sus operaciones diarias.",
    statBody:
      "Entre los empleados cuyas empresas ya implementaron IA, la mayoría todavía recurre a herramientas gratuitas y no autorizadas en lugar de las que su empleador provee. Esa brecha entre el uso silencioso y no gobernado, y la habilidad real y autorizada, es tan común que una empresa mediana puede tener aproximadamente {{accent}} en gasto de formación que nunca se convierte en habilidad demostrada. Creamos OnRamp para cerrar esa brecha — no pidiendo a las empresas que gasten más, sino haciendo que la inversión que ya hicieron realmente funcione.",
    statAccent: "$800K al año",
    seeSourcing: "Consulta todas las fuentes en",
    seeSourcingLink: "nuestra página de precios",
    whatHeading: "Qué hacemos al respecto",
    whatP1:
      "OnRamp certifica competencia real en IA, específica para cada puesto, mediante evaluación basada en escenarios — prueba de que alguien puede hacer una tarea real con IA, no un registro de que vio un curso. Se apoya sobre las herramientas y formación que una empresa ya tiene en lugar de reemplazarlas, así que no hay nada que eliminar ni nada nuevo que adquirir para empezar.",
    whatP2:
      "Si quieres el panorama completo de cómo funciona la evaluación, o cuánto cuesta llevarlo a tu equipo, eso está cubierto en detalle en otra parte de este sitio — esta página es solo el porqué.",
    tryDemo: "Prueba la demo",
    seePricing: "Ver precios",
  },
};

export const fr: Dictionary = {
  common: {
    demoFooter:
      "Ceci est un environnement de démonstration — les écrans contiennent des données d'exemple pour explorer l'expérience complète du produit. Aucun compte réel ni donnée d'entreprise n'est utilisé ici.",
  },
  nav: {
    tag: "L'IA, pour nous tous",
    ourMission: "Notre mission",
    pricing: "Tarifs",
    login: "Se connecter",
    logout: "Se déconnecter",
  },
  login: {
    tag: "Bienvenue",
    heading: "Connectez-vous à OnRamp",
    oneLiner:
      "OnRamp certifie que des employés non techniques peuvent réellement faire leur travail avec l'IA — pas seulement qu'ils ont suivi un cours.",
    emailLabel: "Adresse e-mail professionnelle",
    emailPlaceholder: "vous@entreprise.com",
    signIn: "Se connecter",
    signingIn: "Connexion en cours…",
    demoNote: "Mode démo — n'importe quel e-mail vous connecte en tant que Denise Carter.",
  },
  landing: {
    tag: "Une plateforme d'adoption de l'IA par rôle",
    heading: "L'IA, pour nous tous.",
    subhead:
      "OnRamp certifie que des employés non techniques peuvent réellement faire leur travail avec l'IA — pas seulement qu'ils ont suivi un cours.",
    logIn: "Se connecter",
    seeItInAction: "Voir en action",
    seeItInActionSub:
      "Le vrai Prompt Coach et l'Évaluation de Compétence, présentés exactement comme ils fonctionnent une fois connecté.",
    promptCoachTitle: "Prompt Coach",
    competenceAssessmentTitle: "Évaluation de Compétence",
    principle1Title: "Autorisé, pas en cachette",
    principle1Body:
      "Chaque écran est approuvé et spécifique à votre rôle — jamais un catalogue ouvert où deviner par vous-même.",
    principle2Title: "Preuve plutôt que participation",
    principle2Body:
      "Les certifications exigent de démontrer une tâche réelle, évaluée selon une grille — pas un badge de complétion.",
    principle3Title: "Aucune exposition publique par défaut",
    principle3Body:
      "Participer à une compétition est toujours votre choix. Personne ne voit jamais un résultat que vous n'avez pas choisi de montrer.",
  },
  pricing: {
    tag: "Pour les responsables RH et L&D",
    heading:
      "Prouvez que votre équipe sait vraiment utiliser l'IA — pas seulement qu'elle a suivi un cours.",
    subhead:
      "OnRamp certifie une compétence IA réelle et spécifique au poste par une évaluation basée sur des scénarios, en complément des outils de formation que vous payez déjà — LinkedIn Learning et le reste de votre pile L&D. Rien à retirer.",
    cta: "Parlons d'un pilote",
    roiPill: "Pourquoi cela fait économiser de l'argent",
    roiHeadline: "Même en 2026, moins d'une entreprise sur 5 utilise réellement l'IA au quotidien.",
    roiBody:
      "L'enquête du Bureau du recensement américain de mai 2026 a révélé que seulement 19,8 % des entreprises américaines déclarent utiliser l'IA dans leurs opérations — 37 % chez les grands employeurs, toujours bien en dessous de la moitié. L'enquête Gallup du T2 2026 a révélé un schéma similaire au niveau des employés : 47 % déclarent que leur entreprise a déployé l'IA, mais une étude mondiale de 2025 a révélé que seulement 42 % utilisent réellement les outils fournis par leur employeur — la plupart se tournent plutôt vers des outils gratuits non autorisés. Au tarif habituel des sièges L&D en entreprise (~380 $/utilisateur/an pour LinkedIn Learning Teams), une entreprise de 4 200 employés dépense environ 1,6 M$/an en sièges de formation — même une estimation prudente selon laquelle la moitié de cette somme n'atteint pas les employés de manière encadrée et autorisée pointe vers {{accent}} de dépenses qui ne se traduisent pas en compétence réelle et démontrée. OnRamp ne vous demande pas de dépenser plus — cela fait enfin fonctionner ce que vous avez déjà payé.",
    roiAccent: "~800 000 $ par an",
    sourcesLabel: "Sources",
    sourcesCensus: "Bureau du recensement des É.-U., mai 2026",
    sourcesGallup: "Gallup, T2 2026",
    sourcesMbs: "Melbourne Business School, 2025",
    sourcesLinkedin: "Tarifs LinkedIn Learning",
    sourcesFootnote:
      "Le chiffre de 800 000 $ est une estimation illustrative basée sur ces sources, pas un chiffre audité pour une entreprise spécifique.",
    pricingHeading: "Tarifs",
    pricingSub:
      "Facturé par employé participant — les personnes réellement inscrites à un parcours — pas votre effectif complet. Vous ne payez que pour ceux qui l'utilisent.",
    starterEyebrow: "Moins de 500 employés",
    starterName: "Starter",
    starterBestFor: "Un pilote ciblé dans une équipe ou un service avant un déploiement plus large.",
    growthEyebrow: "500 à 2 000 employés",
    growthName: "Growth",
    growthBestFor: "Déploiement sur toute une fonction ou division — environ 96 $/employé/an.",
    enterpriseEyebrow: "2 000 à 5 000+ employés",
    enterpriseName: "Enterprise",
    enterpriseBestFor: "Déploiement à l'échelle de l'entreprise, tarifs dégressifs et accompagnement dédié.",
    addOnEyebrow: "Option complémentaire, tous plans",
    addOnName: "Classements d'équipe",
    addOnPrice: "+2 $",
    addOnUnit: "/ employé participant / mois",
    addOnBestFor:
      "Classements par unité commerciale pour le suivi par la direction, plus classements individuels optionnels. N'affiche jamais un résultat en échec — seulement les réussites positives, et seulement pour ceux qui y participent.",
    perMonth: "/ employé participant / mois",
    custom: "Sur mesure",
    contactForPricing: "contactez-nous pour un tarif",
    contactUs: "Nous contacter",
    footnote:
      "Il s'agit d'un tarif illustratif, en phase pilote — pas d'une grille tarifaire commerciale figée. Les conditions finales sont définies par accord de pilote.",
  },
  about: {
    tag: "Notre mission",
    heading: "L'IA, pour nous tous.",
    intro:
      "Nous avons créé OnRamp parce que les personnes qui font le vrai travail — pas l'équipe technique, pas les premiers adeptes — étaient laissées à elles-mêmes pour comprendre l'IA. Ce n'est pas un problème de formation. C'est un problème de permission. OnRamp existe pour donner à chaque employé une entrée autorisée et spécifique à son rôle, avec une vraie certification à la clé.",
    whyHeading: "Pourquoi nous avons créé ceci",
    whyP1:
      "Nous avons vu une entreprise dépenser énormément pour stimuler l'adoption de l'IA — programmes de formation, nouvelles licences d'outils, directives venues d'en haut. Sur le papier, tout était en place. En pratique, cela ne fonctionnait pas. Les gens n'utilisaient pas vraiment les outils qu'on leur avait donnés.",
    whyP2:
      "En cherchant pourquoi, la réponse n'était pas la résistance. C'était plus simple et plus facile à corriger : beaucoup d'employés ne comprenaient tout simplement pas comment utiliser les outils auxquels ils avaient déjà accès. Personne ne leur avait montré, en des termes propres à leur propre travail, exactement par où commencer. Alors les dépenses restaient là, sans vraiment se traduire en changement de comportement réel.",
    whyP3:
      "Nous pensons que l'IA a une valeur réelle — pas comme mot à la mode, mais pour une raison concrète : elle peut éliminer les tâches répétitives et manuelles d'un travail et libérer du temps pour le travail plus stratégique et à plus forte valeur que ces personnes sont les seules à pouvoir faire. Cette valeur restait inexploitée. OnRamp est notre réponse à cet écart — une façon de transformer des outils qu'une entreprise possède déjà en compétences réellement utilisées.",
    statPill: "Ce n'est pas un cas isolé",
    statHeadline: "Même en 2026, moins d'une entreprise américaine sur 5 déclare utiliser réellement l'IA au quotidien.",
    statBody:
      "Parmi les employés dont l'entreprise a déployé l'IA, la plupart se tournent encore vers des outils gratuits non autorisés plutôt que ceux fournis par leur employeur. Cet écart entre un usage discret et non encadré et une vraie compétence autorisée est si fréquent qu'une entreprise de taille moyenne peut avoir environ {{accent}} de dépenses de formation qui ne se traduisent jamais en compétence démontrée. Nous avons créé OnRamp pour combler cet écart — non pas en demandant aux entreprises de dépenser plus, mais en faisant enfin fonctionner l'investissement déjà réalisé.",
    statAccent: "800 000 $ par an",
    seeSourcing: "Consultez toutes les sources sur",
    seeSourcingLink: "notre page tarifs",
    whatHeading: "Ce que nous faisons pour y remédier",
    whatP1:
      "OnRamp certifie une compétence IA réelle et spécifique au poste par une évaluation basée sur des scénarios — la preuve que quelqu'un peut accomplir une vraie tâche avec l'IA, pas la preuve qu'il a suivi un cours. Cela s'appuie sur les outils et la formation qu'une entreprise possède déjà plutôt que de les remplacer, donc rien à retirer et rien de nouveau à acquérir pour commencer.",
    whatP2:
      "Si vous voulez le tableau complet du fonctionnement de l'évaluation, ou son coût pour votre équipe, c'est couvert en détail ailleurs sur ce site — cette page se concentre juste sur le pourquoi.",
    tryDemo: "Essayer la démo",
    seePricing: "Voir les tarifs",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, es, fr };
