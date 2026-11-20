import type { TopicData } from "@/lib/hp1000/types";

const data: TopicData = {
  id: "personality",
  sections: [
    {
      title: "What is personality?",
      points: [
        {
          term: "Personality",
          text: "The unique and relatively stable ways in which people think, feel, and behave. Includes temperament and character.",
        },
        {
          term: "Temperament",
          text: "The innate and enduring characteristics with which each person is born.",
          eg: "From the day she was born, baby Lea startled and cried at every loud noise, while her brother barely reacted.",
        },
        {
          term: "Character",
          text: "Value judgements made about a person's moral or ethical behaviour.",
          eg: "Neighbours describe Mr Tan as 'honest and decent' after he returns a lost wallet.",
        },
        {
          term: "Dispositional approach (describe)",
          text: "Dispositions: relatively stable personality characteristics — temperaments, traits and (perhaps) types.",
        },
        {
          term: "Process approach (explain)",
          text: "Internal mental processes, development, and social interactions — the psychodynamic, behavioural and social cognitive, and humanistic perspectives.",
        },
      ],
      table: [
        ["", "Dispositional approach", "Process approach"],
        ["Aim", "Describe", "Explain"],
        ["Focus", "Relatively stable characteristics", "Internal mental processes, development, social interactions"],
        ["Includes", "Temperaments, traits, types (?)", "Psychodynamic; behavioural and social cognitive; humanistic"],
      ],
    },
    {
      title: "Temperaments and traits",
      points: [
        {
          term: "Temperaments as basis for personality",
          text: "Usually apparent in early childhood (e.g., high reactivity to external stimulation vs. low reactivity). May stem from differences in brain functions, structures, and balance of neurotransmitters. Can appear to change due to learning to self-regulate (e.g., shyness).",
        },
        {
          term: "Trait theories",
          text: "Theories that endeavour to describe the characteristics that make up human personality so as to predict future behaviour.",
        },
        {
          term: "Traits",
          text: "Consistent, enduring ways of thinking, feeling, or behaving. Multi-dimensional, and built upon the foundation of temperament.",
        },
        {
          term: "Gordon Allport",
          text: "Developed a list of about 200 personality traits thought to be wired into the nervous system.",
        },
        {
          term: "Surface traits (Cattell)",
          text: "Aspects of personality that can easily be seen by other people in the outward actions of a person (e.g., shyness).",
        },
        {
          term: "Source traits (Cattell)",
          text: "The more basic traits that underlie the surface traits, forming the core of personality (e.g., introversion).",
        },
        {
          term: "16 Personality Factor (16PF) Questionnaire",
          text: "Raymond Cattell perceived personality as a composite of 16 basic dimensions or factors (source traits), found using a statistical technique called factor analysis. Each is a bipolar scale, with opposite traits at each end.",
        },
        {
          term: "Five-Factor Model (Big Five)",
          text: "Personality is composed of 5 key dimensions: openness, conscientiousness, extraversion, agreeableness and neuroticism (OCEAN). Not inherently good or bad (depends on context); present across cultures. Measured with the Big Five Inventory (BFI-2-S) (Soto & John, 2017).",
        },
        {
          term: "Agreeableness",
          text: "Big Five factor: e.g., someone described as good-natured, trusting and helpful scores high.",
        },
        {
          term: "Openness",
          text: "Big Five factor: e.g., someone described as creative, imaginative, curious, artistic and nonconforming scores high.",
        },
      ],
    },
    {
      title: "Measuring traits: personality inventories",
      points: [
        {
          term: "Personality inventory",
          text: "Paper-and-pencil or computerised test that consists of statements that require a specific, standardised response from the person taking the test.",
        },
        { term: "Strength of inventories", text: "Has standardised administration and scoring." },
        {
          term: "Limitation of inventories",
          text: "Survey responses may involve lying or distorted truths (e.g., social desirability bias).",
          eg: "On a job-screening questionnaire, Zul ticks 'I never lose my temper' to look like a better candidate.",
        },
        {
          term: "Reliability",
          text: "Extent to which repeated measurements are consistent.",
          eg: "A test gives Hana almost the same score every time she takes it.",
        },
        {
          term: "Validity",
          text: "Extent to which an instrument measures exactly what it is intended to measure.",
          eg: "A 'leadership' test that really just measures reading speed has low validity.",
        },
        {
          term: "Minnesota Multiphasic Personality Inventory (MMPI-2)",
          text: "Typically used in clinical settings; designed to detect abnormal behaviour or thinking patterns in personality. Measures 10 clinical traits to assess tendencies towards serious psychological disorders. Can be used for vocational guidance/job screening.",
        },
        {
          term: "Other credible inventories",
          text: "Neuroticism/Extraversion/Openness Personality Inventory (NEO-PI); HEXACO Personality Inventory (Honesty-Humility, Emotionality, eXtraversion, Agreeableness (versus Anger), Conscientiousness, Openness to Experience); Eysenck Personality Questionnaire (EPQ); California Psychological Inventory (CPI).",
        },
      ],
      table: [
        ["", "Reliability", "Validity"],
        ["Question", "Are repeated measurements consistent?", "Does it measure exactly what it is intended to measure?"],
      ],
    },
    {
      title: "Types, genetics and evaluating the dispositional approach",
      points: [
        {
          term: "Personality types",
          text: "Similar to traits, but are thought of as categories rather than dimensions.",
        },
        {
          term: "Myers-Briggs Type Indicator (MBTI)",
          text: "A type measure based on Carl Jung's personality typology.",
        },
        {
          term: "Behavioural genetics",
          text: "Field of study devoted to discovering genetic bases for personality characteristics.",
        },
        {
          term: "Heritability",
          text: "How much some trait within a population can be attributed to genetic influences. Kandler et al. (2010) compared the traits of twin 1 and twin 2 to show that some aspects of personality are genetically influenced.",
        },
        {
          term: "Strengths of the dispositional approach",
          text: "Evidence from studies of temperament and heritability of adult personality traits; can explain individual differences given similar environment growing up; ability to predict behaviour in common situations (e.g., in jobs).",
        },
        {
          term: "Limitations of the dispositional approach",
          text: "Considers personality as fixed and static vs. dynamic with developmental changes; oversimplifies by describing personality with only a handful of dimensions; describes behaviour but does not fully explain it; dangers of self-fulfilling prophecy.",
        },
      ],
      table: [
        ["", "Traits", "Types"],
        ["Thought of as", "Dimensions", "Categories"],
        ["Example measure", "16PF, Big Five (BFI-2-S), NEO-PI", "MBTI (based on Jung)"],
      ],
    },
    {
      title: "Psychodynamic perspective: Freud",
      points: [
        {
          term: "Psychodynamic perspective (Sigmund Freud)",
          text: "Main tenets: people change over time; past experiences shape who we are; we are not always aware of why we do the things we do. Focuses on unconscious motives and emotions, and development of abnormal behaviour and psychological disorders.",
        },
        {
          term: "Psychoanalysis",
          text: "An insight therapy based on the theory of Freud, emphasising the revealing of unconscious conflicts; Freud's term for both the theory of personality and the therapy based on it.",
        },
        {
          term: "Psychic determinism",
          text: "Assumption that all human behaviour is determined by unconscious memories, desires, and conflicts.",
        },
        {
          term: "Id",
          text: "Part of personality that contains basic biological drives and focuses on immediate gratification and survival.",
          eg: "Starving after a long shift, Ali's first urge is to grab a stranger's fries off the next table.",
        },
        {
          term: "Superego",
          text: "Part of the personality that acts as a moral centre and contains the conscience that provides a sense of right and wrong.",
          eg: "Ali then feels guilty just for thinking about taking someone else's food.",
        },
        {
          term: "Ego",
          text: "('I') Part of the personality that develops out of a need to deal with reality.",
          eg: "Ali decides to queue and buy his own fries — a realistic way to satisfy his hunger.",
        },
        {
          term: "Psychological defence mechanisms",
          text: "Unconscious distortion of a person's perception of reality to reduce stress and anxiety.",
        },
      ],
    },
    {
      title: "Psychological defence mechanisms",
      intro: "Each one is an unconscious way of reducing anxiety. Examples are the slides' own.",
      points: [
        {
          term: "Denial",
          text: "Refusing to accept real events because they are unpleasant.",
          eg: "Kaila refuses to admit she has an alcohol problem although she cannot go a day without drinking excessively.",
        },
        {
          term: "Displacement",
          text: "Transferring inappropriate urges or behaviours onto a more acceptable or less threatening target.",
          eg: "Mark is angry at his older brother but is verbally abusive to the server instead.",
        },
        {
          term: "Projection",
          text: "Attributing unacceptable desires to others.",
          eg: "Chris often cheats on her boyfriend because she suspects he is already cheating on her.",
        },
        {
          term: "Rationalisation",
          text: "Justifying behaviours by substituting acceptable reasons for less-acceptable real reasons.",
          eg: "Kim failed because he did not study, but tells his roommates the professor didn't like him.",
        },
        {
          term: "Reaction formation",
          text: "Reducing anxiety by adopting beliefs contrary to your own beliefs.",
          eg: "Nadia is angry at coworker Beth for partying, but is nice to Beth and calls the partying 'cool'.",
        },
        {
          term: "Regression",
          text: "Returning to coping strategies of less mature stages of development.",
          eg: "After failing his exams, Giorgio spends days in bed cuddling his childhood toy.",
        },
        {
          term: "Repression",
          text: "Suppressing painful memories and thoughts.",
          eg: "LaShea cannot remember her grandfather's fatal heart attack although she was present.",
        },
        {
          term: "Sublimation",
          text: "Redirecting unacceptable desires through socially acceptable channels.",
          eg: "Jerome's desire for revenge on a drunk driver is channelled into a support group.",
        },
        {
          term: "Identification",
          text: "Trying to become like someone else to deal with one's anxiety.",
          eg: "Sophia struggles with self-esteem but emulates a famous influencer's lifestyle, dressing and hobbies to feel more confident.",
        },
        {
          term: "Compensation (substitution)",
          text: "Trying to make up for areas in which a lack is perceived by becoming superior in some other area.",
          eg: "Tom has difficulty maintaining romantic relationships, so he channels his efforts into becoming a highly successful entrepreneur.",
        },
      ],
      table: [
        ["Look-alikes", "Key difference"],
        ["Projection vs displacement", "Projection: you see YOUR unacceptable desire in someone else. Displacement: you take your urge out on a safer target."],
        ["Displacement vs sublimation", "Displacement: urge goes to a less threatening target (still inappropriate). Sublimation: urge goes into a socially acceptable channel."],
        ["Repression vs denial", "Repression: painful memory/thought is pushed out of awareness. Denial: refusing to accept a real, unpleasant event."],
        ["Rationalisation vs reaction formation", "Rationalisation: an acceptable excuse replaces the real reason. Reaction formation: acting/believing the opposite of what you feel."],
        ["Identification vs compensation", "Identification: becoming like someone else. Compensation: becoming superior in a different area to make up for a lack."],
      ],
    },
    {
      title: "Projective tests and psychosexual development",
      points: [
        {
          term: "Projective tests",
          text: "Personality assessments that present ambiguous visual stimuli to an individual and ask the individual to respond with whatever comes to mind. Aim to probe innermost feelings, motives, desires, and conflicts via the defence mechanism of projection. E.g., Rorschach Inkblot Test; Thematic Apperception Test (TAT: What is the character thinking or feeling? What led up to this situation? How would the situation end?).",
        },
        {
          term: "Concerns with projective tests",
          text: "Subjective: concepts and impressions valid only within a particular person's perception, which may be influenced by biases, prejudice and personal experiences. With no standard grading scales, projective tests are low in reliability and validity.",
        },
        {
          term: "Psychosexual stages",
          text: "Five stages of personality development proposed by Freud and tied to the sexual development of the child.",
        },
        {
          term: "Erogenous zone",
          text: "Area of the body that produces pleasurable feelings, becomes important and can become the source of conflicts.",
        },
        {
          term: "Fixation",
          text: "A disorder in which the person does not fully resolve the conflict in a particular psychosexual stage, resulting in personality traits and behaviour associated with that earlier stage.",
          eg: "An adult who constantly overeats and talks non-stop might be described as orally fixated.",
        },
      ],
      table: [
        ["Stage", "Age (years)", "Erogenous zone", "Major challenge", "Adult fixation examples"],
        ["Oral", "0–1", "Mouth", "Weaning off breast or bottle", "Smoking, overeating, talkativeness"],
        ["Anal", "1–3", "Anus", "Toilet training", "Neatness, stubborn, stingy ('anal')"],
        ["Phallic", "3–6", "Genitals", "Awakening of sexual curiosity (castration anxiety, Oedipus complex, Electra complex, penis envy)", "Vanity, overambition"],
        ["Latency", "6–~12", "None", "None", "None"],
        ["Genital", "Puberty onward", "Genitals", "Sexual relationship with partner", "Immature love or indiscriminate hate; uncontrollable working or inability to work"],
      ],
    },
    {
      title: "Neo-Freudian Carl Jung and evaluating the psychodynamic perspective",
      points: [
        {
          term: "Carl Jung",
          text: "Retained the idea that motivational energy drives personality, but saw spirituality as as strong a drive as the sexual drive. Expanded the unconscious mind.",
        },
        {
          term: "Personal unconscious",
          text: "Jung's name for the unconscious mind as described by Freud (similar to Freud's id).",
        },
        {
          term: "Collective unconscious",
          text: "Reservoir for instinctive knowledge and 'ancestral memories' that are shared by all members of the human species.",
        },
        {
          term: "Archetypes",
          text: "Universal, ancient model images in the collective unconscious, e.g., a mother figure, wise man figure. They manifest as symbols or themes in religion, dreams, literature, and art across cultures.",
          eg: "Films from many different countries all feature a wise old mentor who guides the young hero.",
        },
        {
          term: "Strengths of the psychodynamic perspective",
          text: "Current research supports that the unconscious mind can influence conscious behaviour, defence mechanisms, and the importance of early childhood experiences. Deals with challenging aspects of human life (e.g., internal conflicts, anxiety, and guilt).",
        },
        {
          term: "Limitations of the psychodynamic perspective",
          text: "Some (neo-)Freudian concepts cannot be scientifically studied (e.g., dream interpretation, free association); overemphasis of the unconscious and sexuality; overemphasis of unhealthy personalities; questions about limits of applicability.",
        },
      ],
    },
    {
      title: "Behavioural and social cognitive perspectives",
      points: [
        {
          term: "Behavioural perspective (Watson and Skinner)",
          text: "Emphasises personality as a set of learnt responses, habits, and/or behaviours (i.e., well-learned responses that have become automatic).",
          eg: "A child chats with guests (response to stimulus), gets praise and attention (reinforcement), generalises this to other social scenarios and develops a habit of extraversion.",
        },
        {
          term: "Evaluating the behavioural perspective",
          text: "Strengths: a clear and measurable scientific framework through observable behaviours; useful in developing effective behaviour-based therapies. Limitation: ignores mental processes and underestimates social influences on learning.",
        },
        {
          term: "Social cognitive perspective (Bandura and Rotter)",
          text: "Emphasises the influences of other people's behaviour and a person's own expectancies on learning.",
        },
        {
          term: "Reciprocal determinism (Bandura)",
          text: "Explanation of how the factors of environment, personal or cognitive characteristics, and behaviour can interact to determine future behaviour.",
          eg: "A curious student (personal) joins the school science club (environment), where sharing ideas and doing experiments (behaviour) makes her even more curious.",
        },
        {
          term: "Self-efficacy (Bandura)",
          text: "Individual's expectancy of how effective his or her efforts to accomplish a goal will be in any particular circumstance.",
          eg: "Faiz is confident his practice will help him pass his driving test, so he books it early.",
        },
        {
          term: "Rotter's social learning theory",
          text: "Personality as a stable collection of potential responses to different situations.",
        },
        {
          term: "Expectancy (Rotter)",
          text: "A person's subjective feeling that a particular behaviour will lead to a reinforcing consequence.",
        },
        {
          term: "Locus of control (Rotter)",
          text: "Tendency for people to assume that they either have control or do not have control over events and consequences in their lives.",
          eg: "After failing, Jo says 'I didn't revise enough', while Ken says 'the exam was just bad luck'.",
        },
        {
          term: "Assessing the social cognitive perspective",
          text: "Strengths: integrates social and mental processes with behaviour (addressing the limitations of behaviourism); concepts are testable under scientific conditions; emphasises how expectancies can influence mood regulation and behaviour. Limitations: personality may be too complex to explain fully through interactions of cognitions and stimuli; risk of overgeneralisation — e.g., locus of control may vary with gender, socioeconomic status or ethnicity.",
        },
      ],
    },
    {
      title: "Humanistic perspective and final thoughts",
      points: [
        {
          term: "Humanistic perspective",
          text: "Main tenets: free will and development of self. People have potential for growth; negative development stems from unhealthy situations rather than unhealthy individuals.",
        },
        {
          term: "Self-actualising tendency (Carl Rogers)",
          text: "The striving to fulfil one's innate capacities and capabilities.",
        },
        {
          term: "Self-concept",
          text: "The image of oneself that develops from interactions with important, significant people in one's life.",
        },
        {
          term: "Real self",
          text: "One's perception of actual characteristics, traits, and abilities that form the basis of the striving for self-actualisation.",
        },
        {
          term: "Ideal self",
          text: "One's perception of whom one should be or would like to be.",
        },
        {
          term: "Positive regard",
          text: "Warmth, affection, love and respect that comes from significant others in one's life.",
        },
        {
          term: "Unconditional positive regard",
          text: "Positive regard that is given without conditions or strings attached.",
          eg: "Whether Ray tops the class or fails, his grandmother hugs him and tells him she is proud of him.",
        },
        {
          term: "Conditional positive regard",
          text: "Positive regard that is given only when the person is doing what the providers of positive regard wish.",
          eg: "Jess's father only praises her when she scores an A.",
        },
        {
          term: "Fully functioning person",
          text: "A person who is in touch with and trusting of their deepest, innermost urges and feelings.",
        },
        {
          term: "Hierarchy of needs and self-actualising personality (Abraham Maslow)",
          text: "Self-actualising personality: a healthy individual whose basic and psychological needs are met, and who is free to be creative to pursue other needs to fulfil one's potential.",
        },
        {
          term: "Evaluating the humanistic approach",
          text: "Strengths: gives insights into development of healthy personalities; provides some guidelines for developing one's full 'potential'. Limitations: picture may be too optimistic; fuzzy concepts and some aspects are difficult to test scientifically; 'self'-centredness may apply more to individualistic ('I') cultures than collectivistic ('we') cultures.",
        },
        {
          term: "Halo effect",
          text: "Bias in which a positive evaluation on one specific dimension of a person or thing is used to make an overall judgement, or judgement of other specific dimensions, of that person or thing.",
          eg: "Because the new hire is very good-looking, the manager assumes he must also be clever and hardworking.",
        },
        {
          term: "Horn effect",
          text: "Bias in which a negative evaluation on one specific dimension of a person or thing is used to make an overall judgement, or judgement of other specific dimensions, of that person or thing.",
          eg: "Because a student's handwriting is messy, the tutor assumes he is also lazy and careless.",
        },
        {
          term: "Growth mindset vs fixed mindset (Carol Dweck)",
          text: "People differ on whether they perceive traits to be fixed or malleable, which may influence how we perceive and treat ourselves and others.",
        },
      ],
    },
  ],
  flashcards: [
    {
      id: "personality-c01",
      scenario:
        "From birth, baby Arjun reacted strongly to every new sound and face, while his twin sister stayed calm. Their mother says they were 'just born that way'. Which term describes these inborn characteristics?",
      answer: "Temperament",
      why: "Temperament = the innate and enduring characteristics with which each person is born. Character is a moral value judgement, which is not involved here.",
    },
    {
      id: "personality-c02",
      scenario:
        "After Mrs Kaur hands back extra change the cashier mistakenly gave her, the cashier remarks that she is 'a person of real integrity'. Which aspect of personality is the cashier commenting on?",
      answer: "Character",
      why: "Character = value judgements made about a person's moral or ethical behaviour. The giveaway is the moral judgement 'integrity'.",
    },
    {
      id: "personality-c03",
      scenario:
        "Everyone at the party notices that Ben keeps to the corner and hardly speaks. In Cattell's terms, what kind of trait is this outwardly visible shyness?",
      answer: "Surface trait",
      why: "Surface traits can easily be seen by others in a person's outward actions (e.g., shyness). The underlying core trait (e.g., introversion) would be a source trait.",
    },
    {
      id: "personality-c04",
      scenario:
        "A psychologist argues that Ben's quietness at parties, his preference for working alone and his love of solo hobbies all stem from one deeper, core trait: introversion. In Cattell's terms, introversion is a what?",
      answer: "Source trait",
      why: "Source traits are the more basic traits that underlie surface traits, forming the core of personality (e.g., introversion).",
    },
    {
      id: "personality-c05",
      scenario:
        "Rosaria's friends call her good-natured, trusting and always ready to help. Which Big Five factor is she probably high on?",
      answer: "Agreeableness",
      why: "Good-natured, trusting and helpful describe agreeableness in the Big Five (official practice answer).",
    },
    {
      id: "personality-c06",
      scenario:
        "Kai is always trying new cuisines, writes poetry, paints, questions traditions and loves exploring unusual ideas. Which Big Five factor is he probably high on?",
      answer: "Openness",
      why: "Creative, imaginative, curious, artistic and nonconforming describe openness (official practice answer).",
    },
    {
      id: "personality-c07",
      scenario:
        "When completing a personality test for a job application, Priya agrees with 'I am never rude to anyone' even though she knows it is not true, because she wants to look good. Which limitation of personality inventories is this?",
      answer: "Social desirability bias",
      why: "A limitation of inventories is that responses may involve lying or distorted truths, e.g., social desirability bias. The giveaway is answering to look good.",
    },
    {
      id: "personality-c08",
      scenario:
        "Dr Ong gives the same anxiety questionnaire to a group of students three times over a month and gets nearly identical scores each time. Which attribute of a good test does this show?",
      answer: "Reliability",
      why: "Reliability = the extent to which repeated measurements are consistent. It does not show the test measures anxiety (that would be validity).",
    },
    {
      id: "personality-c09",
      scenario:
        "A new 'creativity' test turns out to really measure how fast people can read, not how creative they are. Which attribute of a good test is it lacking?",
      answer: "Validity",
      why: "Validity = the extent to which an instrument measures exactly what it is intended to measure. A test can give consistent scores (reliable) and still not be valid.",
    },
    {
      id: "personality-c10",
      scenario:
        "A hospital psychologist uses a personality inventory that measures 10 clinical traits to check whether a patient has tendencies towards serious psychological disorders. Which inventory is she most likely using?",
      answer: "Minnesota Multiphasic Personality Inventory (MMPI-2)",
      why: "The MMPI-2 is typically used in clinical settings to detect abnormal behaviour or thinking patterns and measures 10 clinical traits.",
    },
    {
      id: "personality-c11",
      scenario:
        "Tara's company puts each employee into one of a set of categories (for example, an 'introvert-thinker' type) using a test based on Carl Jung's typology, rather than scoring them on dimensions. Which test is this?",
      answer: "Myers-Briggs Type Indicator (MBTI)",
      why: "The MBTI treats personality as types (categories rather than dimensions) and is based on Carl Jung's personality typology.",
    },
    {
      id: "personality-c12",
      scenario:
        "Researchers compare the trait scores of twins to work out how much of the differences in extraversion across a population can be put down to genes. What concept are they estimating?",
      answer: "Heritability",
      why: "Heritability = how much some trait within a population can be attributed to genetic influences. The wider field searching for genetic bases of personality is behavioural genetics.",
    },
    {
      id: "personality-c13",
      scenario:
        "A therapist tells Lucas that his habit of forgetting his mother's birthday is not an accident: it is caused by unconscious memories and conflicts about her. Which assumption is the therapist making?",
      answer: "Psychic determinism",
      why: "Psychic determinism = all human behaviour is determined by unconscious memories, desires and conflicts. The giveaway is 'not an accident' plus unconscious causes.",
    },
    {
      id: "personality-c14",
      scenario:
        "At a buffet, three-year-old Mia grabs cake off another child's plate the moment she sees it, wanting it immediately. Which part of personality is in control?",
      answer: "Id",
      why: "The id contains basic biological drives and focuses on immediate gratification. There is no sign of moral guilt (superego) or realistic planning (ego).",
    },
    {
      id: "personality-c15",
      scenario:
        "Walking past an unattended handbag, Yusof briefly thinks about taking the cash but immediately feels guilty and tells himself, 'That is wrong.' Which part of personality is producing the guilt?",
      answer: "Superego",
      why: "The superego is the moral centre containing the conscience that provides a sense of right and wrong.",
    },
    {
      id: "personality-c16",
      scenario:
        "Hungry and with no cash, Rina decides to walk to an ATM first and then buy lunch rather than taking food without paying. Which part of personality is finding this realistic solution?",
      answer: "Ego",
      why: "The ego develops out of a need to deal with reality, finding realistic ways to satisfy drives. The id would grab the food; the superego would focus on guilt.",
    },
    {
      id: "personality-c17",
      scenario:
        "Despite a doctor's warnings and test results, Ahmad insists that his heart is perfectly healthy and keeps eating fried food every day. Which defence mechanism?",
      answer: "Denial",
      why: "Denial = refusing to accept real events because they are unpleasant. He is not forgetting anything (repression); he refuses to accept the facts.",
    },
    {
      id: "personality-c18",
      scenario:
        "Jun is furious with his boss for criticising him but says nothing at work. When he gets home, he shouts at his younger brother for leaving shoes at the door. Which defence mechanism?",
      answer: "Displacement",
      why: "Displacement = transferring inappropriate urges onto a less threatening target (brother instead of boss). It is not projection, since he is not accusing anyone of having his feelings.",
    },
    {
      id: "personality-c19",
      scenario:
        "Clara secretly dislikes her new colleague, but she keeps telling everyone, 'I think she really hates me.' Which defence mechanism?",
      answer: "Projection",
      why: "Projection = attributing your own unacceptable desires to others. Clara sees her own dislike in her colleague. Displacement would be taking it out on a safer target.",
    },
    {
      id: "personality-c20",
      scenario:
        "Wei was rejected from a scholarship because his essay was weak. He tells his friends, 'I didn't really want it anyway; it would have tied me to the company for years.' Which defence mechanism?",
      answer: "Rationalisation",
      why: "Rationalisation = substituting an acceptable reason for the less-acceptable real reason (a weak essay). He is not acting the opposite of his feelings (reaction formation).",
    },
    {
      id: "personality-c21",
      scenario:
        "Daniel is deeply jealous of his best friend's promotion, yet he throws him a big party and keeps telling everyone how thrilled he is about it. Which defence mechanism?",
      answer: "Reaction formation",
      why: "Reaction formation = reducing anxiety by adopting beliefs contrary to your own. Jealousy is replaced with an exaggerated show of delight.",
    },
    {
      id: "personality-c22",
      scenario:
        "After a bad break-up, 25-year-old Hui Ling starts sucking her thumb and asks her mother to tuck her into bed every night. Which defence mechanism?",
      answer: "Regression",
      why: "Regression = returning to coping strategies of less mature stages of development. It is a temporary return under stress, not a long-standing fixation from an unresolved stage.",
    },
    {
      id: "personality-c23",
      scenario:
        "Ten years after a frightening house fire, Ravi has no memory of that night at all, even though his family says he was there and saw everything. Which defence mechanism?",
      answer: "Repression",
      why: "Repression = suppressing painful memories and thoughts. Denial would mean refusing to accept that the fire happened, rather than not remembering it.",
    },
    {
      id: "personality-c24",
      scenario:
        "As a teenager, Sean often wanted to start fights. Now he channels that aggression into competitive boxing at a licensed club. Which defence mechanism?",
      answer: "Sublimation",
      why: "Sublimation = redirecting unacceptable desires through socially acceptable channels (boxing). Displacement would redirect the urge onto another target, still inappropriately.",
    },
    {
      id: "personality-c25",
      scenario:
        "Feeling insecure in her new school, Amira starts copying the way the most popular girl talks, dresses and styles her hair. Which defence mechanism?",
      answer: "Identification",
      why: "Identification = trying to become like someone else to deal with one's anxiety. She is not excelling in another area to make up for a lack (compensation).",
    },
    {
      id: "personality-c26",
      scenario:
        "Kevin has always felt he is bad at sports, so he throws himself into chess and becomes the top-ranked player in the country. Which defence mechanism?",
      answer: "Compensation (substitution)",
      why: "Compensation = making up for a perceived lack (sports) by becoming superior in some other area (chess). Not identification, since he is not copying another person.",
    },
    {
      id: "personality-c27",
      scenario:
        "Shown an ambiguous ink blot, Marcus says it looks like 'two people arguing'. The psychologist uses his answer to probe his inner feelings and conflicts. What kind of test is this?",
      answer: "Projective test (Rorschach Inkblot Test)",
      why: "Projective tests present ambiguous visual stimuli and ask for whatever comes to mind, probing feelings via projection. The inkblot is the Rorschach; a picture story would be the TAT.",
    },
    {
      id: "personality-c28",
      scenario:
        "Jasmine is shown a picture of a woman staring out of a window and asked what she is feeling, what led up to the scene and how it will end. Which test is this?",
      answer: "Thematic Apperception Test (TAT)",
      why: "The TAT asks what the character is thinking or feeling, what led up to the situation and how it will end. It is a projective test, like the Rorschach, but uses pictures of scenes.",
    },
    {
      id: "personality-c29",
      scenario:
        "Gerald, 40, is extremely neat, stubborn and stingy with money. According to Freud, he may not have fully resolved the conflict of an earlier psychosexual stage. Which concept is this, and which stage?",
      answer: "Fixation (anal stage)",
      why: "Fixation = not fully resolving the conflict of a psychosexual stage, leaving traits from that stage. Neatness, stubbornness and stinginess are anal stage (toilet training) fixations.",
    },
    {
      id: "personality-c30",
      scenario:
        "Lena constantly snacks, smokes and talks non-stop. A Freudian therapist links this to problems with weaning. Which psychosexual stage is she said to be fixated in?",
      answer: "Oral stage",
      why: "The oral stage (0–1 years; mouth; weaning) is linked to adult fixations such as smoking, overeating and talkativeness.",
    },
    {
      id: "personality-c31",
      scenario:
        "Between about age 6 and puberty, 9-year-old Tim shows no particular erogenous focus and simply spends his time on school and friends. Which psychosexual stage is he in?",
      answer: "Latency stage",
      why: "The latency stage (6–~12) has no erogenous zone and no major challenge. The genital stage starts at puberty.",
    },
    {
      id: "personality-c32",
      scenario:
        "A storyteller notes that cultures that never had contact with each other all tell myths about a caring mother figure and a wise old man. Jung would say these images come from where?",
      answer: "Collective unconscious (archetypes)",
      why: "The collective unconscious is a reservoir of instinctive knowledge and 'ancestral memories' shared by all humans; archetypes are its universal model images (mother figure, wise man).",
    },
    {
      id: "personality-c33",
      scenario:
        "Ella was praised whenever she chatted with guests as a toddler. She began chatting with everyone, everywhere, and is now a very outgoing adult. Which perspective on personality explains this?",
      answer: "Behavioural perspective",
      why: "The behavioural perspective (Watson and Skinner) sees personality as learnt responses and habits shaped by reinforcement. No thoughts or expectancies are mentioned (social cognitive).",
    },
    {
      id: "personality-c34",
      scenario:
        "Naomi enjoys coding (personal), so she joins a hackathon club (environment). Building apps there (behaviour) makes her even keener on coding, and she then signs up for more competitions. Which concept explains how these factors work together?",
      answer: "Reciprocal determinism",
      why: "Bandura's reciprocal determinism: environment, personal/cognitive characteristics and behaviour interact to determine future behaviour.",
    },
    {
      id: "personality-c35",
      scenario:
        "Before his first marathon, Isaac tells his coach, 'I've trained properly, so I'm confident my effort will get me across the finish line.' Which concept describes his belief?",
      answer: "Self-efficacy",
      why: "Self-efficacy = an individual's expectancy of how effective their efforts to accomplish a goal will be in a particular circumstance. It is about his own effectiveness, not about control over life in general (locus of control).",
    },
    {
      id: "personality-c36",
      scenario:
        "After losing his job, Hamid says, 'Nothing I do matters; whether I get hired just depends on luck and who the boss likes.' Which of Rotter's concepts does this show?",
      answer: "Locus of control",
      why: "Locus of control = the tendency to assume that one either has control or does not have control over events and consequences. Hamid assumes he has no control.",
    },
    {
      id: "personality-c37",
      scenario:
        "Lily raises her hand in class because she feels that answering will probably earn praise from her teacher. Which of Rotter's concepts is this subjective feeling?",
      answer: "Expectancy",
      why: "Expectancy = a person's subjective feeling that a particular behaviour will lead to a reinforcing consequence (praise).",
    },
    {
      id: "personality-c38",
      scenario:
        "Whether Darren wins or loses his football matches, his parents always hug him and tell him they love him just as he is. What is this called in Rogers' theory?",
      answer: "Unconditional positive regard",
      why: "Positive regard given without conditions or strings attached. If the love came only when he won, it would be conditional positive regard.",
    },
    {
      id: "personality-c39",
      scenario:
        "Chloe's mother is warm and affectionate only when Chloe practises the piano; when she skips practice, her mother is cold to her. What is this called in Rogers' theory?",
      answer: "Conditional positive regard",
      why: "Positive regard given only when the person does what the providers wish. The warmth depends on piano practice.",
    },
    {
      id: "personality-c40",
      scenario:
        "Sam sees himself as an average student who is shy, but he believes he should be a confident top scorer like his cousin. In Rogers' theory, the confident top scorer Sam thinks he should be is his what?",
      answer: "Ideal self",
      why: "Ideal self = one's perception of whom one should be or would like to be. His view of himself as average and shy is his real self.",
    },
    {
      id: "personality-c41",
      scenario:
        "Interviewers rate a candidate as 'smart, reliable and a good leader' mainly because she is very attractive and well-dressed. Which bias is this?",
      answer: "Halo effect",
      why: "Halo effect = a positive evaluation on one dimension (looks) used to judge other dimensions. A negative one would be the horn effect.",
    },
    {
      id: "personality-c42",
      scenario:
        "Because a new student arrives late on the first day, his teacher decides he must also be lazy, rude and weak at maths. Which bias is this?",
      answer: "Horn effect",
      why: "Horn effect = a negative evaluation on one dimension (lateness) used to make an overall judgement. The positive version is the halo effect.",
    },
    {
      id: "personality-c43",
      scenario:
        "Zoe believes her personality and abilities can change with effort, so she sees failing a test as a chance to improve. Which mindset does she have?",
      answer: "Growth mindset",
      why: "Dweck: people differ on whether they see traits as fixed or malleable. Seeing them as changeable is a growth mindset; seeing them as unchangeable is a fixed mindset.",
    },
  ],
  questions: [
    // ---------- Official practice questions ----------
    {
      id: "personality-m01",
      kind: "mcq",
      sub: "Freud's personality structure",
      official: true,
      prompt:
        "Derrick is an executive with a large financial firm. Whenever his investments do poorly, he throws temper tantrums and breaks things. Then he starts barking orders at his secretary. Which personality structure would Freud say is exerting control?",
      options: ["id", "superego", "ego", "preconscious"],
      answer: 0,
      explain:
        "Tantrums and breaking things are driven by basic drives seeking immediate gratification, which is the id. The ego would deal with reality sensibly; the superego would bring guilt.",
    },
    {
      id: "personality-m02",
      kind: "mcq",
      sub: "Humanistic perspective",
      official: true,
      prompt:
        "Carl Rogers emphasized accepting people for what they are, not for what you would like them to be. This acceptance is termed ____.",
      options: ["unconditional self-esteem", "conditional positive regard", "unconditional positive regard", "self-actualization"],
      answer: 2,
      explain:
        "Unconditional positive regard is positive regard given without conditions or strings attached. Conditional positive regard is given only when the person does what others wish.",
    },
    {
      id: "personality-m03",
      kind: "mcq",
      sub: "Trait perspective",
      official: true,
      prompt: "What are the Big Five personality traits?",
      options: [
        "conscientiousness, openness, agreeableness, extraversion, dominance",
        "extraversion, openness, conscientiousness, agreeableness, and neuroticism",
        "sensation seeking, conscientiousness, openness, agreeableness, dominance",
        "narcissism, openness, introversion, agreeableness, and conscientiousness",
      ],
      answer: 1,
      explain:
        "The Big Five are openness, conscientiousness, extraversion, agreeableness and neuroticism (OCEAN). Dominance, sensation seeking and narcissism are not among them.",
    },
    {
      id: "personality-f01",
      kind: "fill",
      sub: "Personality inventories",
      official: true,
      prompt:
        "Dr. Heinz has designed a new test for assessing depression. He has found that repeated administrations of the test have had consistent results across his sample subjects. We could say that his test has high ____.",
      answers: [["reliability"]],
      explain:
        "Reliability is the extent to which repeated measurements are consistent. Validity would mean the test measures exactly what it is intended to measure (depression).",
    },
    {
      id: "personality-f02",
      kind: "fill",
      sub: "Defence mechanisms",
      official: true,
      prompt:
        "Jeromy has been having an affair with another woman. One afternoon his wife came home later than usual and Jeromy became angry—accusing his wife of infidelity. The defense mechanism behind Jeromy's accusation is ____.",
      answers: [["projection"]],
      explain:
        "Projection is attributing your own unacceptable desires to others: Jeromy is the unfaithful one but accuses his wife. It is not displacement, which is redirecting an urge onto a safer target.",
    },
    {
      id: "personality-f03",
      kind: "fill",
      sub: "Freud's personality structure",
      official: true,
      prompt: "In Sigmund Freud's theory, the ____ operates according to the pleasure principle.",
      answers: [["id"]],
      explain:
        "The id contains basic biological drives and focuses on immediate gratification, i.e., pleasure. The ego deals with reality; the superego is the moral centre.",
    },
    {
      id: "personality-f04",
      kind: "fill",
      sub: "Trait perspective",
      official: true,
      prompt:
        "If Rosaria is described as good-natured, trusting, and helpful, then she probably is fairly high on the Big Five factor known as ____.",
      answers: [["agreeableness"]],
      explain:
        "Good-natured, trusting and helpful describe agreeableness. Openness would be creative, imaginative and curious.",
    },
    {
      id: "personality-f05",
      kind: "fill",
      sub: "Trait perspective",
      official: true,
      prompt:
        "Jazmyn has been described as creative, imaginative, curious, artistic, and nonconforming. She is likely to obtain an elevated score on a questionnaire designed to measure ____.",
      answers: [["openness", "openness to experience"]],
      explain:
        "Creative, imaginative, curious, artistic and nonconforming describe openness. Agreeableness would be good-natured, trusting and helpful.",
    },

    // ---------- Fill-in-the-blank ----------
    {
      id: "personality-f06",
      kind: "fill",
      sub: "What is personality?",
      prompt:
        "The unique and relatively stable ways in which people think, feel and behave are called ____.",
      answers: [["personality"]],
      explain: "Personality is the unique and relatively stable ways in which people think, feel and behave; it includes temperament and character.",
    },
    {
      id: "personality-f07",
      kind: "fill",
      sub: "What is personality?",
      prompt:
        "Baby Owen has been calm and hard to startle since birth, while his cousin cried at every loud noise from day one. These innate and enduring characteristics are their ____.",
      answers: [["temperament", "temperaments"]],
      explain:
        "Temperament = the innate and enduring characteristics each person is born with, e.g., high vs low reactivity. Character is a moral judgement instead.",
    },
    {
      id: "personality-f08",
      kind: "fill",
      sub: "What is personality?",
      prompt:
        "Calling someone 'honest', 'kind' or 'dishonourable' is a value judgement about their moral or ethical behaviour, which psychologists call ____.",
      answers: [["character"]],
      explain: "Character = value judgements made about a person's moral or ethical behaviour.",
    },
    {
      id: "personality-f09",
      kind: "fill",
      sub: "Trait perspective",
      prompt:
        "Classmates can easily see that Nicole is shy because she rarely speaks in group work. For Cattell, her shyness is a ____ trait.",
      answers: [["surface"]],
      explain:
        "Surface traits can easily be seen by others in a person's outward actions. The deeper trait underlying it (e.g., introversion) is a source trait.",
    },
    {
      id: "personality-f10",
      kind: "fill",
      sub: "Trait perspective",
      prompt:
        "Cattell called the more basic traits that underlie surface traits and form the core of personality, such as introversion, ____ traits.",
      answers: [["source"]],
      explain: "Source traits form the core of personality; Cattell's 16PF measures 16 of them.",
    },
    {
      id: "personality-f11",
      kind: "fill",
      sub: "Trait perspective",
      prompt:
        "Raymond Cattell identified 16 source traits using a statistical technique called ____.",
      answers: [["factor analysis"]],
      explain: "Cattell's 16PF was built using factor analysis, giving 16 bipolar dimensions (source traits).",
    },
    {
      id: "personality-f12",
      kind: "fill",
      sub: "Trait perspective",
      prompt:
        "Gordon Allport developed a list of about ____ personality traits thought to be wired into the nervous system.",
      answers: [["200", "two hundred"]],
      explain: "Allport listed about 200 traits. Cattell reduced personality to 16 source traits; the Big Five uses 5 dimensions.",
    },
    {
      id: "personality-f13",
      kind: "fill",
      sub: "Personality inventories",
      prompt:
        "On a workplace personality questionnaire, Marcus agrees with 'I always finish my work on time' to impress his boss, although it is not true. This limitation of personality inventories is called social ____ bias.",
      answers: [["desirability"]],
      explain:
        "Social desirability bias: responses may involve lying or distorted truths to look good. It is the main limitation of inventories listed on the slides.",
    },
    {
      id: "personality-f14",
      kind: "fill",
      sub: "Personality inventories",
      prompt:
        "A 'leadership' questionnaire is found to measure only how confident people are about public speaking, not leadership. The questionnaire is low in ____.",
      answers: [["validity"]],
      explain:
        "Validity = the extent to which an instrument measures exactly what it is intended to measure. Reliability is about consistency across repeated measurements.",
    },
    {
      id: "personality-f15",
      kind: "fill",
      sub: "Personality inventories",
      prompt:
        "A clinical psychologist wants an inventory that measures 10 clinical traits to assess a patient's tendencies towards serious psychological disorders. She would use the ____.",
      answers: [["MMPI-2", "MMPI", "Minnesota Multiphasic Personality Inventory", "MMPI 2"]],
      explain:
        "The MMPI-2 is typically used in clinical settings to detect abnormal behaviour or thinking patterns. The MBTI sorts people into types instead.",
    },
    {
      id: "personality-f16",
      kind: "fill",
      sub: "Types and genetics",
      prompt:
        "Unlike traits, which are dimensions, personality ____ are thought of as categories, as in the Myers-Briggs Type Indicator.",
      answers: [["types", "type"]],
      explain: "Types are similar to traits but are categories rather than dimensions. The MBTI is based on Carl Jung's typology.",
    },
    {
      id: "personality-f17",
      kind: "fill",
      sub: "Types and genetics",
      prompt:
        "Researchers estimate how much the differences in neuroticism within a population can be attributed to genetic influences. They are estimating the trait's ____.",
      answers: [["heritability"]],
      explain:
        "Heritability = how much some trait within a population can be attributed to genetic influences. Behavioural genetics is the overall field of study.",
    },
    {
      id: "personality-f18",
      kind: "fill",
      sub: "Types and genetics",
      prompt:
        "The field of study devoted to discovering genetic bases for personality characteristics is called ____.",
      answers: [["behavioural genetics", "behavioral genetics"]],
      explain: "Behavioural genetics looks for genetic bases of personality; heritability is the measure of how much a trait is due to genes.",
    },
    {
      id: "personality-f19",
      kind: "fill",
      sub: "Psychodynamic perspective",
      prompt:
        "Freud assumed that all human behaviour, even a 'slip of the tongue', is determined by unconscious memories, desires and conflicts. This assumption is called psychic ____.",
      answers: [["determinism"]],
      explain:
        "Psychic determinism = all human behaviour is determined by unconscious memories, desires and conflicts. Not reciprocal determinism, which is Bandura's.",
    },
    {
      id: "personality-f20",
      kind: "fill",
      sub: "Freud's personality structure",
      prompt:
        "Tempted to copy a friend's assignment, Hui Wen feels a strong sense that it would be wrong and that she would feel guilty. According to Freud, this moral centre containing the conscience is the ____.",
      answers: [["superego", "super ego", "super-ego"]],
      explain:
        "The superego acts as a moral centre and contains the conscience. The id would want the easy marks; the ego deals with reality.",
    },
    {
      id: "personality-f21",
      kind: "fill",
      sub: "Freud's personality structure",
      prompt:
        "Hungry during a lecture, Aiden decides to wait until the break and then buy a sandwich. According to Freud, the part of personality that develops out of a need to deal with reality is the ____.",
      answers: [["ego"]],
      explain: "The ego deals with reality and finds realistic ways to meet drives. The id would demand food immediately.",
    },
    {
      id: "personality-f22",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "After a stressful week, Lina, 30, curls up with her childhood blanket and asks her mother to feed her soup like she did when Lina was little. This defence mechanism is ____.",
      answers: [["regression"]],
      explain:
        "Regression = returning to coping strategies of less mature stages of development. Fixation is a long-standing result of an unresolved stage, not a temporary return under stress.",
    },
    {
      id: "personality-f23",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Furious with his teacher for a low grade, Kelvin goes home and kicks his bedroom door. Transferring his urge onto a less threatening target is called ____.",
      answers: [["displacement"]],
      explain:
        "Displacement = transferring inappropriate urges onto a more acceptable or less threatening target. Sublimation would channel it into something socially acceptable, like sport.",
    },
    {
      id: "personality-f24",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Bella's strong urge to be aggressive is channelled into training hard as a competitive martial artist. Redirecting unacceptable desires through socially acceptable channels is called ____.",
      answers: [["sublimation"]],
      explain:
        "Sublimation redirects unacceptable desires into socially acceptable channels. Displacement merely moves the urge onto a safer target.",
    },
    {
      id: "personality-f25",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Isaac skipped training all season and lost the final. He tells his team the referee was biased. Justifying behaviour by substituting an acceptable reason for the real reason is called ____.",
      answers: [["rationalisation", "rationalization"]],
      explain:
        "Rationalisation substitutes acceptable reasons for less-acceptable real reasons (not training). It is not projection, as he is not attributing his own desires to the referee.",
    },
    {
      id: "personality-f26",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Grace secretly resents her new stepmother, yet she is extremely sweet to her and tells everyone how much she adores her. This defence mechanism is ____.",
      answers: [["reaction formation"]],
      explain:
        "Reaction formation = reducing anxiety by adopting beliefs contrary to your own. Her resentment is replaced by exaggerated affection.",
    },
    {
      id: "personality-f27",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Although she witnessed a serious accident as a child, Mei has no memory of it at all. Suppressing painful memories and thoughts like this is called ____.",
      answers: [["repression"]],
      explain:
        "Repression = suppressing painful memories and thoughts. Denial is refusing to accept that an unpleasant event is real, rather than not remembering it.",
    },
    {
      id: "personality-f28",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Even after receiving three letters saying his company has gone bankrupt, Mr Low keeps going to the office and insists that business is fine. This defence mechanism is ____.",
      answers: [["denial"]],
      explain:
        "Denial = refusing to accept real events because they are unpleasant. He remembers the letters, so it is not repression.",
    },
    {
      id: "personality-f29",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Feeling anxious about fitting in at university, Jamal starts dressing, talking and joking exactly like the most popular senior in his hall. This defence mechanism is ____.",
      answers: [["identification"]],
      explain:
        "Identification = trying to become like someone else to deal with one's anxiety. Compensation would be excelling in a different area to make up for a lack.",
    },
    {
      id: "personality-f30",
      kind: "fill",
      sub: "Defence mechanisms",
      prompt:
        "Rachel feels she is not attractive, so she works extremely hard to become the top student in her cohort. Making up for a perceived lack by becoming superior in another area is called ____.",
      answers: [["compensation", "substitution"]],
      explain:
        "Compensation (substitution) = making up for areas of perceived lack by becoming superior in some other area. Not sublimation, which is about redirecting unacceptable desires.",
    },
    {
      id: "personality-f31",
      kind: "fill",
      sub: "Projective tests",
      prompt:
        "A psychologist shows Tom a series of ambiguous inkblots and asks him to say whatever comes to mind. This projective test is the ____ Inkblot Test.",
      answers: [["rorschach"]],
      explain:
        "The Rorschach Inkblot Test is a projective test using ambiguous inkblots. The Thematic Apperception Test uses pictures of scenes instead.",
    },
    {
      id: "personality-f32",
      kind: "fill",
      sub: "Psychosexual development",
      prompt:
        "Freud would say an adult who smokes heavily, overeats and talks constantly has a(n) ____ fixation, linked to problems with weaning.",
      answers: [["oral"]],
      explain:
        "The oral stage (0–1, mouth, weaning) is linked to adult smoking, overeating and talkativeness. Neatness and stinginess would be anal.",
    },
    {
      id: "personality-f33",
      kind: "fill",
      sub: "Psychosexual development",
      prompt:
        "In Freud's theory, not fully resolving the conflict in a psychosexual stage, so that traits from that earlier stage remain, is called ____.",
      answers: [["fixation"]],
      explain: "Fixation = an unresolved conflict at a psychosexual stage, leaving traits and behaviour associated with that stage.",
    },
    {
      id: "personality-f34",
      kind: "fill",
      sub: "Psychosexual development",
      prompt:
        "In Freud's ____ stage (about age 1–3), the major challenge is toilet training.",
      answers: [["anal"]],
      explain: "Anal stage: ages 1–3, anus, toilet training; adult fixations include neatness, stubbornness and stinginess.",
    },
    {
      id: "personality-f35",
      kind: "fill",
      sub: "Carl Jung",
      prompt:
        "Jung's reservoir of instinctive knowledge and 'ancestral memories' shared by all members of the human species is the ____ unconscious.",
      answers: [["collective"]],
      explain:
        "The collective unconscious is shared by all humans. The personal unconscious is Jung's name for Freud's unconscious mind.",
    },
    {
      id: "personality-f36",
      kind: "fill",
      sub: "Carl Jung",
      prompt:
        "The 'wise old mentor' who guides the hero appears in stories, dreams and religions across many cultures. Jung would call such universal, ancient model images ____.",
      answers: [["archetypes", "archetype"]],
      explain: "Archetypes are universal model images in the collective unconscious (e.g., mother figure, wise man) that appear as symbols across cultures.",
    },
    {
      id: "personality-f37",
      kind: "fill",
      sub: "Social cognitive perspective",
      prompt:
        "Sara is outgoing (personal), so she joins the drama club (environment). Performing on stage (behaviour) makes her even more confident and outgoing. Bandura called this interaction ____ determinism.",
      answers: [["reciprocal"]],
      explain:
        "Reciprocal determinism: environment, personal/cognitive characteristics and behaviour interact to determine future behaviour. Psychic determinism is Freud's idea.",
    },
    {
      id: "personality-f38",
      kind: "fill",
      sub: "Social cognitive perspective",
      prompt:
        "Before her piano exam, Tina believes, 'With the practice I've done, my efforts will definitely pay off on the day.' Her expectancy about how effective her efforts will be is called ____.",
      answers: [["self-efficacy", "self efficacy"]],
      explain:
        "Self-efficacy = an individual's expectancy of how effective their efforts to accomplish a goal will be. Locus of control is about whether one has control over life events generally.",
    },
    {
      id: "personality-f39",
      kind: "fill",
      sub: "Social cognitive perspective",
      prompt:
        "Whenever something goes wrong, Derek says it was fate or bad luck, while his sister says it was due to her own choices. According to Rotter, they differ in ____.",
      answers: [["locus of control"]],
      explain:
        "Locus of control = the tendency to assume that one either has control or does not have control over events and consequences in one's life.",
    },
    {
      id: "personality-f40",
      kind: "fill",
      sub: "Social cognitive perspective",
      prompt:
        "Jake volunteers to help clean up because he has a subjective feeling that doing so will earn his manager's approval. In Rotter's theory, this feeling is called ____.",
      answers: [["expectancy"]],
      explain:
        "Expectancy = a person's subjective feeling that a particular behaviour will lead to a reinforcing consequence. Self-efficacy is about how effective one's efforts will be.",
    },
    {
      id: "personality-f41",
      kind: "fill",
      sub: "Humanistic perspective",
      prompt:
        "Carl Rogers called the striving to fulfil one's innate capacities and capabilities the ____ tendency.",
      answers: [["self-actualising", "self-actualizing", "self actualising", "self actualizing", "self-actualisation"]],
      explain: "The self-actualising tendency is the striving to fulfil one's innate capacities and capabilities.",
    },
    {
      id: "personality-f42",
      kind: "fill",
      sub: "Humanistic perspective",
      prompt:
        "Leo sees himself as a disorganised, average student, but he believes he should be a calm, organised top scorer. According to Rogers, the top scorer he would like to be is his ____ self.",
      answers: [["ideal"]],
      explain:
        "Ideal self = one's perception of whom one should be or would like to be. His perception of himself as disorganised and average is his real self.",
    },
    {
      id: "personality-f43",
      kind: "fill",
      sub: "Humanistic perspective",
      prompt:
        "Kara's father shows her affection only when she wins swimming races and is cold whenever she loses. Rogers would call this ____ positive regard.",
      answers: [["conditional"]],
      explain:
        "Conditional positive regard is given only when the person does what the providers wish. Unconditional positive regard has no strings attached.",
    },
    {
      id: "personality-f44",
      kind: "fill",
      sub: "Humanistic perspective",
      prompt:
        "According to Rogers, a person who is in touch with and trusting of their deepest, innermost urges and feelings is a ____ person.",
      answers: [["fully functioning", "fully-functioning"]],
      explain: "A fully functioning person is in touch with and trusting of their deepest, innermost urges and feelings.",
    },
    {
      id: "personality-f45",
      kind: "fill",
      sub: "Understanding others",
      prompt:
        "Because the new intern is very friendly, his supervisor assumes he must also be intelligent and hardworking. This bias is the ____ effect.",
      answers: [["halo"]],
      explain:
        "The halo effect uses a positive evaluation on one dimension to judge other dimensions. The horn effect is the negative version.",
    },
    {
      id: "personality-f46",
      kind: "fill",
      sub: "Understanding others",
      prompt:
        "Because a job applicant has a weak handshake, the interviewer decides she is also unmotivated and incompetent. This bias is the ____ effect.",
      answers: [["horn", "horns"]],
      explain:
        "The horn effect uses a negative evaluation on one dimension to make an overall judgement. The halo effect is the positive version.",
    },
    {
      id: "personality-f47",
      kind: "fill",
      sub: "Understanding others",
      prompt:
        "Ivan believes he is 'just not a maths person' and that this will never change. In Carol Dweck's terms, he has a ____ mindset.",
      answers: [["fixed"]],
      explain:
        "A fixed mindset sees traits as unchangeable; a growth mindset sees them as malleable.",
    },

    // ---------- MCQ ----------
    {
      id: "personality-m04",
      kind: "mcq",
      sub: "Approaches to personality",
      prompt:
        "A psychologist focuses on internal mental processes, development and social interactions to EXPLAIN personality. Which approach is she using?",
      options: ["Dispositional approach", "Process approach", "Trait approach", "Type approach"],
      answer: 1,
      explain:
        "The process approach explains personality through internal processes, development and social interactions (psychodynamic, behavioural/social cognitive, humanistic). The dispositional approach (traits, types, temperaments) describes it.",
    },
    {
      id: "personality-m05",
      kind: "mcq",
      sub: "Trait perspective",
      prompt:
        "Cattell's 16PF Questionnaire measures 16 basic dimensions of personality. These dimensions are:",
      options: ["surface traits", "source traits", "archetypes", "erogenous zones"],
      answer: 1,
      explain:
        "Cattell saw personality as a composite of 16 source traits, found by factor analysis. Surface traits are the visible behaviours (e.g., shyness) that source traits underlie.",
    },
    {
      id: "personality-m06",
      kind: "mcq",
      sub: "Personality inventories",
      prompt: "Which is a STRENGTH of personality inventories, according to the lecture?",
      options: [
        "They probe innermost feelings via projection",
        "They have standardised administration and scoring",
        "Responses cannot involve lying",
        "They need no reliability or validity",
      ],
      answer: 1,
      explain:
        "Inventories have standardised administration and scoring. Their limitation is that responses may involve lying or distorted truths (e.g., social desirability bias). Probing via projection describes projective tests.",
    },
    {
      id: "personality-m07",
      kind: "mcq",
      sub: "Types and genetics",
      prompt:
        "A company sorts every employee into one of several personality categories using a test based on Carl Jung's typology. The test is most likely the:",
      options: ["MMPI-2", "NEO-PI", "Myers-Briggs Type Indicator (MBTI)", "16PF"],
      answer: 2,
      explain:
        "The MBTI treats personality as types (categories) and is based on Jung's typology. The 16PF, NEO-PI and MMPI-2 measure dimensions or clinical traits.",
    },
    {
      id: "personality-m08",
      kind: "mcq",
      sub: "Dispositional approach",
      prompt: "Which is a LIMITATION of the dispositional approach to personality?",
      options: [
        "It cannot predict behaviour in common situations such as jobs",
        "It has no evidence from heritability studies",
        "It describes behaviour but does not fully explain it",
        "It overemphasises the unconscious and sexuality",
      ],
      answer: 2,
      explain:
        "The dispositional approach describes but does not fully explain behaviour, treats personality as fixed and oversimplifies it. Overemphasising the unconscious and sexuality is a criticism of the psychodynamic perspective.",
    },
    {
      id: "personality-m09",
      kind: "mcq",
      sub: "Defence mechanisms",
      prompt:
        "Ahmad is attracted to his friend's girlfriend but cannot admit it. Instead, he keeps telling his friend, 'She's always flirting with me.' Which defence mechanism is this?",
      options: ["Displacement", "Projection", "Reaction formation", "Sublimation"],
      answer: 1,
      explain:
        "Projection is attributing your own unacceptable desires to others — Ahmad attributes his attraction to her. Displacement would mean redirecting an urge onto a safer target.",
    },
    {
      id: "personality-m10",
      kind: "mcq",
      sub: "Defence mechanisms",
      prompt:
        "Melissa is angry at her strict mother but cannot show it. She goes to her room and yells at her cat for scratching the sofa. Which defence mechanism is this?",
      options: ["Displacement", "Projection", "Regression", "Denial"],
      answer: 0,
      explain:
        "Displacement transfers the urge onto a less threatening target (the cat). Projection would mean accusing her mother of being angry with her.",
    },
    {
      id: "personality-m11",
      kind: "mcq",
      sub: "Projective tests",
      prompt: "Why are projective tests such as the Rorschach criticised?",
      options: [
        "They use standard grading scales",
        "They are subjective and low in reliability and validity",
        "They only measure 10 clinical traits",
        "They rely on factor analysis",
      ],
      answer: 1,
      explain:
        "With no standard grading scales, projective tests are subjective and low in reliability and validity. The 10 clinical traits describe the MMPI-2.",
    },
    {
      id: "personality-m12",
      kind: "mcq",
      sub: "Psychosexual development",
      prompt:
        "A 35-year-old man is extremely vain and overambitious. According to Freud, he is most likely fixated in which psychosexual stage?",
      options: ["Oral", "Anal", "Phallic", "Latency"],
      answer: 2,
      explain:
        "Vanity and overambition are adult fixations of the phallic stage (3–6). Oral fixations are smoking, overeating and talkativeness; anal ones are neatness, stubbornness and stinginess.",
    },
    {
      id: "personality-m13",
      kind: "mcq",
      sub: "Behavioural and social cognitive",
      prompt: "Which is a limitation of the BEHAVIOURAL perspective on personality?",
      options: [
        "Its concepts cannot be measured",
        "It ignores mental processes and underestimates social influences on learning",
        "It is too optimistic about human nature",
        "It overemphasises unhealthy personalities",
      ],
      answer: 1,
      explain:
        "Behaviourism ignores mental processes and underestimates social influences, which the social cognitive perspective addresses. Being too optimistic is a criticism of the humanistic approach.",
    },
    {
      id: "personality-m14",
      kind: "mcq",
      sub: "Social cognitive perspective",
      prompt:
        "After failing a test, Shan says, 'It's my fault — I'll plan my revision better next time.' Her friend says, 'Tests are just luck; nothing I do changes the result.' Which concept explains their difference?",
      options: ["Self-efficacy", "Locus of control", "Reciprocal determinism", "Self-actualising tendency"],
      answer: 1,
      explain:
        "Locus of control is the tendency to assume one either has or does not have control over events and consequences. Self-efficacy is about how effective one's efforts toward a specific goal will be.",
    },
    {
      id: "personality-m15",
      kind: "mcq",
      sub: "Humanistic perspective",
      prompt: "Which is a limitation of the humanistic approach?",
      options: [
        "It ignores mental processes",
        "Its 'self'-centredness may apply more to individualistic than collectivistic cultures",
        "It is based on Freud's psychosexual stages",
        "It treats personality as a set of learnt responses",
      ],
      answer: 1,
      explain:
        "The humanistic approach may be too optimistic, has fuzzy concepts, and its focus on the self may fit individualistic ('I') cultures more than collectivistic ('we') ones. Ignoring mental processes is a criticism of behaviourism.",
    },
    {
      id: "personality-m16",
      kind: "mcq",
      sub: "Understanding others",
      prompt:
        "A teacher assumes a student who is excellent at football must also be good at maths and very well-behaved. This is an example of the:",
      options: ["horn effect", "halo effect", "self-fulfilling prophecy", "fixed mindset"],
      answer: 1,
      explain:
        "The halo effect uses a positive evaluation on one dimension (football) to judge other dimensions. The horn effect would start from a negative evaluation.",
    },
    {
      id: "personality-m17",
      kind: "mcq",
      sub: "Carl Jung",
      prompt: "Jung's 'personal unconscious' is most similar to which Freudian concept?",
      options: ["Ego", "Superego", "Id", "Psychic determinism"],
      answer: 2,
      explain:
        "Jung used 'personal unconscious' for the unconscious mind as Freud described it, compared on the slides to Freud's id. His own addition was the collective unconscious.",
    },

    // ---------- Written ----------
    {
      id: "personality-w01",
      kind: "written",
      sub: "Defence mechanisms",
      prompt:
        "After being dropped from the school basketball team for poor fitness, Kenji tells his parents the coach 'only picks his favourites'. That evening he snaps at his little sister for borrowing his charger. Weeks later, he starts volunteering as a referee for primary school games.\nIdentify THREE defence mechanisms Kenji shows and explain each using details from the scenario.",
      marks: 3,
      points: [
        "Rationalisation: he justifies being dropped by substituting an acceptable reason (the coach picks favourites) for the less-acceptable real reason (poor fitness).",
        "Displacement: he transfers his anger about being dropped onto a less threatening target, his little sister.",
        "Sublimation: he redirects his frustration through a socially acceptable channel, volunteering as a referee.",
      ],
      explain:
        "Each mechanism is an unconscious distortion of reality to reduce anxiety. Snapping at his sister is displacement, not projection, because he is not attributing his own desires to her.",
    },
    {
      id: "personality-w02",
      kind: "written",
      sub: "Social cognitive perspective",
      prompt:
        "Aisha is naturally curious about technology. She joins her school's robotics club, where she builds robots and shares ideas with other members, which makes her even more interested in engineering. She is confident that if she keeps practising she will win the national competition, and she believes her results depend on her own effort rather than luck.\nExplain how (a) reciprocal determinism, (b) self-efficacy and (c) locus of control apply to Aisha.",
      marks: 3,
      points: [
        "(a) Reciprocal determinism (Bandura): her personal characteristic (curiosity), environment (robotics club) and behaviour (building robots, sharing ideas) interact to determine her future behaviour (greater interest in engineering).",
        "(b) Self-efficacy (Bandura): her expectancy that her efforts (continued practice) will be effective in reaching the goal of winning the national competition.",
        "(c) Locus of control (Rotter): she assumes she has control over events and consequences in her life, believing her results depend on her own effort rather than luck.",
      ],
      explain:
        "All three are social cognitive concepts. Self-efficacy is about effort towards a specific goal, while locus of control is about whether outcomes in life are under one's control.",
    },
    {
      id: "personality-w03",
      kind: "written",
      sub: "Humanistic perspective",
      prompt:
        "Ryan's parents only show him warmth and affection when he gets top grades. Ryan sees himself as an average student who loves drawing, but he believes he should be a straight-A medical student. He feels unhappy and anxious.\nUsing Carl Rogers' theory, explain Ryan's situation, referring to (a) the type of positive regard he receives, (b) his real self and ideal self, and (c) what his parents could do differently.",
      marks: 4,
      points: [
        "(a) Conditional positive regard: warmth and affection are given only when Ryan does what his parents wish (top grades).",
        "(b) Real self: his perception of his actual characteristics and abilities — an average student who loves drawing.",
        "(b) Ideal self: his perception of whom he should be — a straight-A medical student. His self-concept has developed from interactions with significant people (his parents), whose regard depends on grades.",
        "(c) His parents could give unconditional positive regard (warmth without conditions or strings attached), supporting his self-actualising tendency to fulfil his own innate capacities.",
      ],
      explain:
        "Rogers' self-concept develops from interactions with significant others. Regard that depends on grades is conditional; regard with no strings attached is unconditional.",
    },
    {
      id: "personality-w04",
      kind: "written",
      sub: "Freud's personality structure",
      prompt:
        "Lena is on a strict budget. At a mall she sees expensive shoes and immediately wants to buy them on credit. She then feels that overspending would be wrong and irresponsible. Finally she decides to save a little each month and buy them in three months.\nIdentify which part of Freud's personality structure is shown at each stage and explain using details from the scenario.",
      marks: 3,
      points: [
        "Id: her immediate urge to buy the shoes on credit reflects basic drives focused on immediate gratification.",
        "Superego: feeling that overspending would be wrong reflects the moral centre and conscience providing a sense of right and wrong.",
        "Ego: deciding to save and buy them later is the part of personality that deals with reality, finding a realistic solution.",
      ],
      explain:
        "Id = immediate gratification, superego = conscience, ego = dealing with reality. Look for wanting it now, feeling it is wrong, and making a realistic plan.",
    },
  ],
};

export default data;
