import type { TopicData } from "@/lib/hp1000/types";

const data: TopicData = {
  id: "disorders",
  sections: [
    {
      title: "What is abnormality?",
      intro: "How abnormality has been understood over time, and the three ways of judging whether thinking or behaviour is abnormal.",
      points: [
        {
          term: "Psychopathology",
          text: "The scientific study of abnormal behaviour and psychological dysfunction. Aims to characterise symptoms, understand aetiology (i.e., causes/origins) and develop effective treatments.",
        },
        {
          term: "Changing understanding of abnormality",
          text: "Ancient world: supernatural powers, possession by demons and spirits (trephining). 400 B.C.: biological causes — Hippocrates: imbalance of four vital fluids or 'humours' (blood, phlegm, black bile and yellow bile). Middle Ages (5th–15th centuries): possession, exorcism. Renaissance (14th–17th centuries): possession and witchcraft, put to death. Present: medical model (disorders are diseases of the mind) and other psychological models.",
        },
        {
          term: "Statistical or social norm deviance",
          text: "Is the thinking or behaviour unusual? Does it go against social norms? Can depend on context, social environment, etc.",
          eg: "Walking into a lecture dressed in a full Halloween costume in March is unusual and goes against social norms.",
        },
        {
          term: "Subjective discomfort",
          text: "Does the thinking or behaviour cause the person significant subjective discomfort, i.e., emotional distress or pain?",
          eg: "Ken looks fine to everyone at work, but privately feels constant emotional pain.",
        },
        {
          term: "Inability to function normally",
          text: "Does the thinking or behaviour result in an inability to function normally (i.e., maladaptive)? Does it cause the person to be dangerous to self or others?",
          eg: "Priya's worry is so severe she can no longer attend her classes or keep her part-time job.",
        },
        {
          term: "Psychological disorder (working definition)",
          text: "Any pattern of behaviour or thinking that causes people significant distress, causes them to harm themselves or others, or harms their ability to function in daily life. Psychological disorders are ordinary variations in human behaviour taken to an extreme (from absence to severe).",
        },
      ],
      table: [
        ["Period", "Explanation of abnormality"],
        ["Ancient world", "Supernatural powers; possession by demons and spirits"],
        ["400 B.C.", "Biological causes; Hippocrates' four humours"],
        ["Middle Ages (5th–15th c.)", "Possession by demons and spirits; exorcism"],
        ["Renaissance (14th–17th c.)", "Possession and witchcraft; put to death"],
        ["Present", "Medical model; other psychological models"],
      ],
    },
    {
      title: "Models of abnormality",
      points: [
        {
          term: "Biological/medical model",
          text: "Psychological disorders have biological or medical causes, e.g., biological changes in the chemical, structural, or genetic systems of the body. They are diagnosed according to symptoms, and have an aetiology, a course and a prognosis.",
        },
        { term: "Aetiology", text: "Origin, cause, or set of causes of a disorder." },
        { term: "Course", text: "A path, or way in which a disorder develops or progresses." },
        { term: "Prognosis", text: "Likely course, duration, and outcomes of a disorder." },
        {
          term: "Psychodynamic view",
          text: "Abnormal thinking and behaviour stems from repressed conflicts and urges that are fighting to become conscious.",
        },
        { term: "Behaviourism", text: "Abnormal thinking and behaviour is learnt." },
        {
          term: "Cognitive perspective",
          text: "Abnormal thinking and behaviour stems from irrational beliefs and illogical patterns of thought.",
        },
        {
          term: "Sociocultural perspective",
          text: "Abnormal thinking and behaviour is the product of family, social, and cultural influences.",
        },
        {
          term: "Cultural relativity",
          text: "The need to consider the unique characteristics of the culture in which behaviour takes place.",
        },
        { term: "Cultural syndromes", text: "Disorders found only in particular cultures." },
        {
          term: "Biopsychosocial perspective",
          text: "Incorporates biology, psychology, and culture influences in explaining abnormal thinking and behaviour comprehensively.",
        },
      ],
    },
    {
      title: "Diagnosing and classifying disorders",
      points: [
        {
          term: "Rosenhan experiment",
          text: "\"Being sane in insane places\" — a study shown in lecture on diagnosing psychological disorders.",
        },
        {
          term: "DSM",
          text: "Diagnostic and Statistical Manual of Mental Disorders: DSM-5 (2013) and DSM-5-TR (2022). Includes specific criteria for diagnosis of more than 250 disorders. Provides practitioners with a common language and standardisation of symptoms and criteria for diagnoses (labels). Classification is by symptoms, NOT by underlying causes.",
        },
        {
          term: "ICD",
          text: "International Classification of Diseases: ICD-11 (2019). Used worldwide, especially for insurance coding purposes. Indexes both mental and physical illnesses. Not identical to DSM-5 in terms of criteria for diagnosis.",
        },
        {
          term: "Lifetime prevalence by country income level",
          text: "Lifetime prevalence rates of disorders were compared across low-/lower-middle-, upper-middle- and high-income countries using the WHO World Mental Health Surveys (Scott et al., 2018).",
        },
        {
          term: "Mental health in Singapore",
          text: "2022–2023 National Youth Mental Health Survey: the first national survey on youth mental health (aged 15–35). Young people were more likely to report symptoms if they had experienced cyber bullying, had moderate to severe concerns about their body shape, or spent more than three hours daily on social media. About two in three of those with severe or extremely severe symptoms sought help, mainly from family and friends.",
        },
      ],
    },
    {
      title: "Disorders of mood",
      points: [
        { term: "Affect", text: "A term indicating 'emotion' or 'mood'." },
        {
          term: "Mood disorders (affective disorders)",
          text: "Disturbances in emotion. Mood is disordered when it lasts for long periods of time, persists across life events, and often has no identifiable source.",
        },
        {
          term: "Major depressive disorder",
          text: "Severe depression that comes on suddenly and seems to have no external cause, or is too severe for current circumstances. May have thoughts of death or suicide.",
        },
        {
          term: "ICD-11 depressive episode",
          text: "Concurrent presence of at least 5 symptoms, most of the day, nearly every day, for at least 2 weeks. One must be depressed mood or markedly diminished interest or pleasure in activities. Others: reduced concentration or marked indecisiveness; low self-worth or excessive/inappropriate guilt; hopelessness about the future; recurrent thoughts of death or suicidal ideation or attempted suicide; significantly disrupted or excessive sleep; significant changes in appetite or weight; psychomotor agitation or retardation; reduced energy or fatigue.",
        },
        {
          term: "Bipolar disorder",
          text: "Characterised by periods of mood that may range from normal to manic, with or without episodes of depression.",
        },
        { term: "Manic", text: "Having the quality of excessive excitement, energy, and elation or irritability." },
        { term: "Bipolar I", text: "Mood spans from normal to manic, with or without episodes of depression." },
        {
          term: "Bipolar II",
          text: "Spans of normal mood interspersed with episodes of major depression and episodes of hypomania.",
        },
        { term: "Hypomania", text: "Elevated mood but at a lower level than full mania." },
        {
          term: "Causes of disordered mood",
          text: "Behavioural theories link depression to learned helplessness. Cognitive theories see depression as the result of negative, distorted, illogical thinking. Biological explanations look at the function of serotonin, norepinephrine and dopamine systems. Genetic origins may play a role. Gender differences in response to sadness and seeking help. Kendler (2019) compiled 37 potential causes of major depression from the psychiatric literature.",
        },
      ],
      table: [
        ["", "Bipolar I", "Bipolar II"],
        ["High phase", "Full mania", "Hypomania (lower than full mania)"],
        ["Depression", "With or without episodes of depression", "Episodes of major depression"],
      ],
    },
    {
      title: "Disorders of anxiety, trauma and stress",
      points: [
        {
          term: "Anxiety disorders",
          text: "Class of disorders in which the primary symptom is excessive or unrealistic anxiety.",
        },
        { term: "Fear", text: "A reaction to perceived imminent threat in the present." },
        {
          term: "Anxiety",
          text: "Anticipation of some future threat, often associated with worry, vigilance, and muscle tension. Can be specific to a particular object or situation, or free-floating.",
        },
        { term: "Phobia", text: "An irrational, persistent fear of an object, situation, or social activity." },
        {
          term: "Social anxiety disorder (social phobia)",
          text: "Fear of interacting with others or being in social situations that might lead to a negative evaluation.",
          eg: "Sam skips every tutorial presentation because he dreads being judged by classmates.",
        },
        {
          term: "Specific phobia",
          text: "Fear of objects or specific situations or events. Claustrophobia: fear of being in a small, enclosed space. Acrophobia: fear of heights.",
        },
        {
          term: "Agoraphobia",
          text: "Fear of being in a place or situation from which escape is difficult or impossible.",
          eg: "Mrs Goh stays home because she fears being trapped in a crowded MRT train with no way out.",
        },
        {
          term: "Panic attack",
          text: "Sudden onset of intense panic in which multiple physical symptoms of stress occur, often with feelings that one is dying.",
        },
        {
          term: "Panic disorder",
          text: "Panic attacks occur frequently enough to cause the person difficulty in adjusting to daily life.",
        },
        {
          term: "Generalised anxiety disorder",
          text: "Disorder in which a person has feelings of dread and doom along with physical symptoms of stress, which lasts 6 months or more. Anxiety about numerous events or activities (such as work or school performance); no particular source; one cannot control the feelings.",
        },
        {
          term: "Obsessive-compulsive disorder (OCD)",
          text: "Intruding, recurring thoughts or obsessions create anxiety that is relieved by performing a repetitive, ritualistic behaviour or mental act (compulsion). E.g., obsession = fear of contamination, compulsion = repeated handwashing; obsession = fear of harm to self or others, compulsion = repeated checking.",
        },
        {
          term: "Acute stress disorder (ASD)",
          text: "A disorder resulting from exposure to a major, traumatic stressor. Symptoms include anxiety, dissociation, recurring nightmares, sleep disturbances, problems in concentration, and moments of reliving the event in dreams and flashbacks. Lasts as long as one month after the event.",
        },
        {
          term: "Posttraumatic stress disorder (PTSD)",
          text: "Disorder in which the symptoms associated with acute stress disorder last for more than one month.",
        },
        {
          term: "Causes of anxiety, trauma and stress disorders",
          text: "Behavioural: anxious behavioural reactions are learnt (e.g., phobias). Cognitive: anxiety is the result of illogical, irrational thought processes (e.g., magnification, all-or-none thinking, overgeneralisation and minimisation). Biological: dysfunction in several neurotransmitter systems (e.g., serotonin, GABA) and/or difference in brain activation. Cultural: anxiety disorders are found around the world but particular forms vary across cultures.",
        },
      ],
      table: [
        ["", "Acute stress disorder", "Posttraumatic stress disorder"],
        ["Cause", "Exposure to a major, traumatic stressor", "Exposure to a major, traumatic stressor"],
        ["Duration", "As long as one month after the event", "Symptoms last more than one month"],
      ],
    },
    {
      title: "Dissociative disorders",
      points: [
        {
          term: "Dissociative disorders",
          text: "Disorders in which there is a break in conscious awareness, memory, the sense of identity, or some combination. Dissociative symptoms can appear in other disorders (e.g., PTSD, borderline personality disorder), but in dissociative disorders the dissociation is much more pronounced or involuntary.",
        },
        {
          term: "Dissociative amnesia",
          text: "Loss of memory for personal information, either partial or complete.",
        },
        {
          term: "Dissociative fugue",
          text: "Travelling away from familiar surroundings with amnesia for the trip and possible amnesia for personal information.",
        },
        {
          term: "Dissociative identity disorder (DID)",
          text: "Disorder occurring when a person seems to have two or more distinct personalities within one body.",
        },
        {
          term: "Causes of dissociative disorders",
          text: "Psychodynamic: repression of thoughts and behaviour is the primary defence mechanism and reduces emotional pain. Cognitive and behavioural: trauma-related thought avoidance is negatively reinforced by reduction in anxiety and emotional pain. Biological: lower than normal activity levels in areas responsible for body awareness.",
        },
      ],
    },
    {
      title: "Eating disorders",
      points: [
        {
          term: "Anorexia nervosa",
          text: "A condition in which a person reduces eating to the point that their body weight is significantly low, or less than minimally expected. In adults, likely associated with a BMI below 18.5. At 40 percent or more below expected normal weight, dehydration, severe body chemistry dysfunction and possible organ damage may result.",
        },
        {
          term: "Bulimia nervosa",
          text: "A condition in which a person develops a cycle of 'binging', or overeating enormous amounts of food at one sitting, and then using unhealthy methods to avoid weight gain.",
        },
        {
          term: "Binge-eating disorder",
          text: "Also involves uncontrolled binge eating but differs from bulimia primarily in that individuals with binge-eating disorder do not purge.",
        },
        {
          term: "Causes of eating disorders",
          text: "Greatest risk factors: being an adolescent or young adult female. Genetic components appear to be significant (about 40–60% heritable). Found in both Western and non-Western cultures.",
        },
      ],
      table: [
        ["Disorder", "Binges?", "Avoids weight gain / purges?", "Body weight"],
        ["Anorexia nervosa", "—", "Reduces eating", "Significantly low (adult BMI < 18.5)"],
        ["Bulimia nervosa", "Yes", "Yes, unhealthy methods", "—"],
        ["Binge-eating disorder", "Yes, uncontrolled", "No purging", "—"],
      ],
    },
    {
      title: "Personality disorders",
      points: [
        {
          term: "Personality disorders",
          text: "Disorders in which a person adopts a persistent, rigid, and maladaptive pattern of behaviour that interferes with normal social interactions. They affect every aspect of a person's life and are not always lifelong in nature as once believed.",
        },
        {
          term: "Paranoid personality disorder",
          text: "The person exhibits pervasive and widespread distrust and suspiciousness of others.",
        },
        {
          term: "Antisocial personality disorder",
          text: "The person has no morals or conscience and often behaves in an impulsive manner without regard for the consequences of that behaviour.",
        },
        {
          term: "Borderline personality disorder",
          text: "Maladaptive personality pattern in which the person is moody and unstable, lacks a clear sense of identity, and often clings to others.",
        },
        {
          term: "Dependent personality disorder",
          text: "The person is clingy, submissive, fearful of separation, requires constant reassurance, feels helpless when alone, and has others assume responsibility for most areas of life.",
        },
        {
          term: "Causes of personality disorders",
          text: "Cognitive-behavioural theorists suggest a set of learnt behaviours over time via reinforcement, shaping and modelling. Biological explanations look at genetic factors and stress hormones. Other possible causes: disturbances in family communications, childhood abuse and neglect, overly strict or overly protective parenting, parental rejection.",
        },
      ],
      table: [
        ["Cluster", "Thinking and behaviour", "Disorders"],
        ["A", "Odd or eccentric", "Paranoid, Schizoid, Schizotypal"],
        ["B", "Very dramatic, emotional, or erratic", "Antisocial, Borderline, Histrionic, Narcissistic"],
        ["C", "Predominantly anxious or fearful", "Avoidant, Dependent, Obsessive-Compulsive"],
      ],
    },
    {
      title: "Schizophrenia",
      points: [
        {
          term: "Schizophrenia",
          text: "Severe psychotic disorder in which the person suffers from disordered thinking, bizarre behaviour, and hallucinations, and is unable to distinguish between fantasy and reality.",
        },
        { term: "Psychotic", text: "Refers to an inability to perceive what is real and what is fantasy." },
        {
          term: "Positive symptoms",
          text: "Result of excess or distortion of normal functions: delusions; hallucinations; disorganised thoughts or speech; grossly disorganised or abnormal motor behaviour.",
        },
        {
          term: "Delusions",
          text: "Persistent false beliefs, e.g., of persecution, grandiosity.",
          eg: "Ben insists, despite all evidence, that the government has planted a chip in his tooth to follow him.",
        },
        {
          term: "Hallucinations",
          text: "False sensory perceptions, e.g., hearing voices that do not exist.",
        },
        {
          term: "Disorganised thoughts or speech",
          text: "Rapid switching of topics; word salad.",
        },
        {
          term: "Grossly disorganised or abnormal motor behaviour",
          text: "E.g., child-like agitation or decreased reactivity.",
        },
        {
          term: "Negative symptoms",
          text: "Decrease in or absence of normal functions (e.g., loss of affect or motivation, poverty of speech).",
        },
        {
          term: "Causes of schizophrenia",
          text: "Combination of genetic and environmental factors. Neurotransmitter system dysfunction (dopamine, GABA, glutamate and others), structural defects in the brain, inflammation and genetic influences.",
        },
        {
          term: "Stress-vulnerability model",
          text: "Assumes a biological sensitivity, or vulnerability, to a certain disorder that will develop under the right conditions of emotional, social, or environmental stress.",
        },
      ],
      table: [
        ["Positive symptoms (excess or distortion)", "Negative symptoms (decrease or absence)"],
        ["Delusions, hallucinations", "Loss of affect"],
        ["Disorganised thoughts or speech (word salad)", "Loss of motivation"],
        ["Grossly disorganised or abnormal motor behaviour", "Poverty of speech"],
      ],
    },
    {
      title: "Pros and cons of diagnostic labels",
      points: [
        {
          term: "Pros",
          text: "Provide a common language to professionals; establish distinct categories of diagnosis for treatment and understanding; can be timesaving and lifesaving tools.",
        },
        {
          term: "Cons",
          text: "Overly prejudicial; bias; 'psychology student's syndrome' (loose use of labels). Challenge stereotypes and stigma.",
          eg: "After one lecture, Wen tells her friends that her tidy roommate 'is so OCD' — a loose use of a label.",
        },
      ],
    },
  ],
  flashcards: [
    {
      id: "disorders-c01",
      scenario:
        "At a hawker centre, Darren stands on a table and loudly recites poetry to strangers. Nobody else is doing anything like it, and diners stare. Which indicator of abnormality is his behaviour most clearly showing?",
      answer: "Statistical or social norm deviance",
      why: "The behaviour is unusual and goes against social norms. Nothing in the scenario says he is distressed (subjective discomfort) or unable to function.",
    },
    {
      id: "disorders-c02",
      scenario:
        "Grace looks cheerful at work and keeps up with everything, but at night she cries for hours and says she feels unbearable emotional pain. Which indicator of abnormality is this?",
      answer: "Subjective discomfort",
      why: "Subjective discomfort = the thinking or behaviour causes the person significant emotional distress or pain. She is still functioning, so it is not inability to function normally.",
    },
    {
      id: "disorders-c03",
      scenario:
        "Hakim's fear of germs is now so strong that he cannot leave his flat, has lost his job and has stopped paying his bills. Which indicator of abnormality is most evident?",
      answer: "Inability to function normally",
      why: "His thinking is maladaptive: it stops him functioning in daily life (job, bills). The giveaway is the loss of everyday functioning rather than his feelings.",
    },
    {
      id: "disorders-c04",
      scenario:
        "Dr Tay tells a family that their son's disorder is a disease of the mind caused by chemical changes in his brain, and that it can be diagnosed from his symptoms. Which model of abnormality is she using?",
      answer: "Biological/medical model",
      why: "The medical model sees disorders as having biological or medical causes (chemical, structural or genetic changes), diagnosed by symptoms with an aetiology, course and prognosis.",
    },
    {
      id: "disorders-c05",
      scenario:
        "A psychiatrist explains to Mr Lee that his daughter will probably need treatment for about a year and is likely to recover well. What is the psychiatrist describing?",
      answer: "Prognosis",
      why: "Prognosis = the likely course, duration and outcomes. Aetiology would be the cause; course would be the path by which it develops.",
    },
    {
      id: "disorders-c06",
      scenario:
        "Researchers want to find out what originally caused Sarah's eating disorder: her genes, her family, or something else. What aspect of the disorder are they studying?",
      answer: "Aetiology",
      why: "Aetiology = origin, cause, or set of causes. The focus on what caused it is the giveaway, not how it develops (course) or how it will turn out (prognosis).",
    },
    {
      id: "disorders-c07",
      scenario:
        "A therapist believes Lina's depression comes from her habit of thinking 'I am useless, nothing I do ever works', which is irrational and illogical. Which perspective is the therapist taking?",
      answer: "Cognitive perspective",
      why: "The cognitive perspective says abnormal thinking and behaviour stems from irrational beliefs and illogical patterns of thought.",
    },
    {
      id: "disorders-c08",
      scenario:
        "A therapist believes Jonah's anxiety comes from repressed childhood conflicts and urges that are fighting to become conscious. Which view of abnormality is this?",
      answer: "Psychodynamic view",
      why: "The psychodynamic view sees abnormal thinking and behaviour as coming from repressed conflicts and urges trying to become conscious. Not behaviourism, which says it is learnt.",
    },
    {
      id: "disorders-c09",
      scenario:
        "Ms Rao explains her client's depression by pointing to his genes, his negative thinking style and the pressures from his family and culture, all together. Which perspective is this?",
      answer: "Biopsychosocial perspective",
      why: "It combines biology, psychology and culture to explain abnormality comprehensively. The sociocultural perspective alone would look only at family, social and cultural influences.",
    },
    {
      id: "disorders-c10",
      scenario:
        "Before calling a client's mourning ritual abnormal, a counsellor first checks whether it is normal practice in the client's own culture. Which principle is the counsellor following?",
      answer: "Cultural relativity",
      why: "Cultural relativity = considering the unique characteristics of the culture in which the behaviour takes place. Cultural syndromes are disorders found only in particular cultures, which is different.",
    },
    {
      id: "disorders-c11",
      scenario:
        "For three weeks, Aaron has felt low nearly all day, lost interest in gaming, sleeps badly, feels worthless and cannot concentrate. Nothing bad has happened in his life to explain it. Which disorder fits best?",
      answer: "Major depressive disorder",
      why: "Severe depression that seems to have no external cause, with at least 5 symptoms (including depressed mood and loss of interest) for at least 2 weeks. No manic periods, so not bipolar.",
    },
    {
      id: "disorders-c12",
      scenario:
        "Joyce has periods where she barely sleeps, feels on top of the world, spends all her savings and starts five businesses in a week, at full manic intensity. She has never had a depressive episode. Which disorder?",
      answer: "Bipolar I",
      why: "Bipolar I: mood spans from normal to manic, with or without episodes of depression. Full mania with no depression rules out Bipolar II, which needs major depression and only hypomania.",
    },
    {
      id: "disorders-c13",
      scenario:
        "Marcus has several bouts of major depression each year. Between them he sometimes has a few days of elevated mood, more energy than usual, but never as extreme as full mania. Which disorder?",
      answer: "Bipolar II",
      why: "Bipolar II = normal mood interspersed with episodes of major depression and hypomania (elevated mood at a lower level than full mania).",
    },
    {
      id: "disorders-c14",
      scenario:
        "After years of being criticised no matter what he did, Wei stopped trying at anything and became depressed, believing his actions made no difference. Which behavioural explanation of depression does this illustrate?",
      answer: "Learned helplessness",
      why: "Behavioural theories link depression to learned helplessness. The giveaway is that he stopped trying because he learnt his efforts did not matter.",
    },
    {
      id: "disorders-c15",
      scenario:
        "Nadia's heart pounds and she freezes as a car speeds straight towards her at a crossing. Is this fear or anxiety?",
      answer: "Fear",
      why: "Fear is a reaction to a perceived imminent threat in the present. Anxiety is anticipation of some future threat.",
    },
    {
      id: "disorders-c16",
      scenario:
        "For weeks Tom has been tense and on edge, but when asked what he is worried about he cannot name any particular object or situation. How would this anxiety be described?",
      answer: "Free-floating anxiety",
      why: "Anxiety can be specific to an object or situation or free-floating. The giveaway is that there is no particular object or situation.",
    },
    {
      id: "disorders-c17",
      scenario:
        "Kenji avoids group projects, parties and even ordering food at a counter because he is terrified others will judge him negatively. Which disorder?",
      answer: "Social anxiety disorder (social phobia)",
      why: "Fear of interacting with others or being in social situations that might lead to a negative evaluation. It is not agoraphobia, because the fear is of being judged, not of being unable to escape.",
    },
    {
      id: "disorders-c18",
      scenario:
        "Aisha refuses to take the MRT or go into crowded malls, because she is terrified of being stuck somewhere she could not get out of quickly. She now rarely leaves her home. Which phobia?",
      answer: "Agoraphobia",
      why: "Agoraphobia = fear of being in a place or situation from which escape is difficult or impossible. Not claustrophobia (small, enclosed spaces specifically) or social anxiety (fear of negative evaluation).",
    },
    {
      id: "disorders-c19",
      scenario:
        "Ryan takes the stairs to the 12th floor every day because the small, closed lift makes him panic. Open plazas and crowds do not bother him. Which phobia?",
      answer: "Claustrophobia",
      why: "Claustrophobia = fear of being in a small, enclosed space, a specific phobia. Not agoraphobia, since open and crowded spaces are fine.",
    },
    {
      id: "disorders-c20",
      scenario:
        "Lim refuses to go up to the viewing deck of a tall building and feels dizzy just looking down from a second-floor balcony. Which phobia?",
      answer: "Acrophobia",
      why: "Acrophobia = fear of heights, a type of specific phobia.",
    },
    {
      id: "disorders-c21",
      scenario:
        "While queuing at the bank, Esther suddenly feels her heart racing, she cannot breathe and she is sure she is dying. It passes in a few minutes and it has only ever happened once. What did she experience?",
      answer: "Panic attack",
      why: "A panic attack is a sudden onset of intense panic with multiple physical stress symptoms, often with feelings of dying. It is only panic disorder if attacks happen often enough to disrupt daily life.",
    },
    {
      id: "disorders-c22",
      scenario:
        "Ben has had sudden attacks of racing heart and terror several times a month. He now avoids driving and has stopped going to the gym in case one happens. Which disorder?",
      answer: "Panic disorder",
      why: "Panic disorder = panic attacks occur frequently enough to cause difficulty adjusting to daily life. The repeated attacks plus disrupted routine are the giveaway (one attack alone = panic attack).",
    },
    {
      id: "disorders-c23",
      scenario:
        "For the past eight months, Siti has felt dread about her grades, her job, her parents' health and money, with no particular source. She cannot control the worry and often has headaches and tense muscles. Which disorder?",
      answer: "Generalised anxiety disorder",
      why: "Feelings of dread and doom with physical stress symptoms lasting 6 months or more, about numerous events, with no particular source and feelings one cannot control.",
    },
    {
      id: "disorders-c24",
      scenario:
        "Every time Farid touches a door handle, he is flooded with thoughts that he is now contaminated. The anxiety only eases after he washes his hands exactly ten times. Which disorder?",
      answer: "Obsessive-compulsive disorder (OCD)",
      why: "Intruding, recurring thoughts (obsession: fear of contamination) create anxiety relieved by a repetitive, ritualistic behaviour (compulsion: handwashing).",
    },
    {
      id: "disorders-c25",
      scenario:
        "Ten days after a fire in her block, Mei Ling has nightmares, flashbacks of the smoke, trouble sleeping and cannot concentrate. Which disorder fits at this point?",
      answer: "Acute stress disorder (ASD)",
      why: "ASD results from a major traumatic stressor, with symptoms like flashbacks and nightmares lasting as long as one month. It is only PTSD once symptoms last more than one month.",
    },
    {
      id: "disorders-c26",
      scenario:
        "Eight months after a serious bus accident, Gopal still relives it in flashbacks, has recurring nightmares and feels detached. Which disorder?",
      answer: "Posttraumatic stress disorder (PTSD)",
      why: "PTSD = symptoms associated with acute stress disorder lasting more than one month. Eight months is the giveaway; under one month would be ASD.",
    },
    {
      id: "disorders-c27",
      scenario:
        "After surviving a violent robbery, Clara cannot recall her own address, her job or the names of her siblings, though she has not gone anywhere. Which disorder?",
      answer: "Dissociative amnesia",
      why: "Loss of memory for personal information, partial or complete. No travel away from home, so it is not dissociative fugue.",
    },
    {
      id: "disorders-c28",
      scenario:
        "Raymond is found working at a market in another city. He has no idea how he got there, cannot remember the trip and is unsure who he is. Which disorder?",
      answer: "Dissociative fugue",
      why: "Travelling away from familiar surroundings with amnesia for the trip and possible amnesia for personal information. The travel is the giveaway compared with dissociative amnesia.",
    },
    {
      id: "disorders-c29",
      scenario:
        "Friends notice that Nina sometimes speaks in a different voice, calls herself 'Max', has different handwriting and claims not to know Nina at all. Which disorder?",
      answer: "Dissociative identity disorder (DID)",
      why: "DID occurs when a person seems to have two or more distinct personalities within one body.",
    },
    {
      id: "disorders-c30",
      scenario:
        "Jess, 19, has cut her eating so much that her BMI is 16 and she still feels she must eat less. Which eating disorder?",
      answer: "Anorexia nervosa",
      why: "Anorexia = reducing eating until body weight is significantly low (adult BMI below 18.5). No binge cycle is mentioned, so not bulimia.",
    },
    {
      id: "disorders-c31",
      scenario:
        "Several times a week Aaron eats huge amounts of food in one sitting, then forces himself to vomit to avoid gaining weight. Which eating disorder?",
      answer: "Bulimia nervosa",
      why: "Bulimia = a cycle of binging followed by unhealthy methods to avoid weight gain. The purging is what separates it from binge-eating disorder.",
    },
    {
      id: "disorders-c32",
      scenario:
        "Wendy often feels unable to stop eating and finishes enormous amounts of food at one sitting, but she never vomits, diets or exercises to make up for it. Which eating disorder?",
      answer: "Binge-eating disorder",
      why: "Uncontrolled binge eating, but unlike bulimia, the person does not purge.",
    },
    {
      id: "disorders-c33",
      scenario:
        "For years Victor has believed his colleagues, neighbours and even his siblings are secretly plotting against him. He trusts no one and reads hidden threats into every comment. Which personality disorder?",
      answer: "Paranoid personality disorder",
      why: "Pervasive and widespread distrust and suspiciousness of others (Cluster A). It is a long-standing personality pattern rather than the hallucinations and disordered thinking of schizophrenia.",
    },
    {
      id: "disorders-c34",
      scenario:
        "Kai cons elderly people out of their savings, feels no guilt at all, and acts on impulse without caring what happens afterwards. Which personality disorder?",
      answer: "Antisocial personality disorder",
      why: "The person has no morals or conscience and behaves impulsively without regard for consequences (Cluster B).",
    },
    {
      id: "disorders-c35",
      scenario:
        "Zara's mood swings wildly within a day, she keeps changing who she says she is, and she clings desperately to each new friend. Which personality disorder?",
      answer: "Borderline personality disorder",
      why: "Moody and unstable, lacks a clear sense of identity and often clings to others. The unstable identity and moods separate it from dependent personality disorder.",
    },
    {
      id: "disorders-c36",
      scenario:
        "At 30, Eric lets his mother choose his clothes, job and meals, needs constant reassurance, and feels helpless and afraid whenever he is left alone. Which personality disorder?",
      answer: "Dependent personality disorder",
      why: "Clingy, submissive, fearful of separation, needs constant reassurance, feels helpless alone and has others take responsibility for most areas of life (Cluster C).",
    },
    {
      id: "disorders-c37",
      scenario:
        "Joseph insists he is a famous prophet chosen to save the world, even though there is no evidence for it and his family keep showing him otherwise. What is this symptom called?",
      answer: "Delusions",
      why: "Delusions are persistent false beliefs (here, grandiosity), a positive symptom of schizophrenia. A hallucination would be a false sensory perception, such as hearing voices.",
    },
    {
      id: "disorders-c38",
      scenario:
        "Aliya hears a voice telling her what to do whenever she is alone in her room, though nobody else is there. What is this symptom called?",
      answer: "Hallucinations",
      why: "Hallucinations = false sensory perceptions, e.g., hearing voices that do not exist. It is a perception, not a belief (delusion).",
    },
    {
      id: "disorders-c39",
      scenario:
        "A patient with schizophrenia speaks very little, shows no emotion on his face and has no motivation to wash or eat. What type of symptoms are these?",
      answer: "Negative symptoms",
      why: "Negative symptoms = a decrease in or absence of normal functions (loss of affect or motivation, poverty of speech). Positive symptoms are excesses or distortions, like delusions.",
    },
    {
      id: "disorders-c40",
      scenario:
        "Ivan has a family history of schizophrenia but stayed well until he lost his job and his marriage broke down in the same year, after which symptoms appeared. Which model explains this?",
      answer: "Stress-vulnerability model",
      why: "Assumes a biological vulnerability to a disorder that develops under the right conditions of emotional, social or environmental stress. Family history = vulnerability; job loss and divorce = stress.",
    },
    {
      id: "disorders-c41",
      scenario:
        "After reading about disorders for his psychology module, Arif becomes convinced he has five of them because he recognises a few symptoms in himself. Which con of diagnostic labels is this?",
      answer: "Psychology student's syndrome",
      why: "A con of diagnostic labels is their loose use ('psychology student's syndrome'): applying labels loosely, here to himself. The labels themselves are meant to give professionals a common language, which is a pro.",
    },
  ],
  questions: [
    // ---------- Official practice questions ----------
    {
      id: "disorders-m01",
      kind: "mcq",
      sub: "Schizophrenia",
      official: true,
      prompt:
        "Nick is admitted to a mental institution because he hears voices talking to him that no one else can hear, and he sees demons attacking him, though no one else could see anything near him. Nick's symptoms are known as ____.",
      options: ["delusions", "hallucinations", "obsessions", "compulsions"],
      answer: 1,
      explain:
        "Hallucinations are false sensory perceptions, such as hearing voices or seeing things that do not exist. Delusions are false beliefs, not perceptions; obsessions and compulsions belong to OCD.",
    },
    {
      id: "disorders-m02",
      kind: "mcq",
      sub: "Anxiety disorders",
      official: true,
      prompt:
        "Darcy is sitting at her desk in her office one day when, without warning, her heart begins racing rapidly, she has a sensation of being \"out of her body,\" and she experiences dulled vision and hearing, rapid breathing, and sweating. She thinks she is having a heart attack. Nothing she is doing seems to have caused such an episode. What disorder do her symptoms MOST likely reflect?",
      options: ["Panic attack", "Posttraumatic stress disorder", "Specific phobia", "Generalised anxiety disorder"],
      answer: 0,
      explain:
        "Sudden onset of intense panic with many physical stress symptoms and a feeling of dying is a panic attack. There is no trauma (PTSD), no feared object (specific phobia), and it is not long-lasting worry (generalised anxiety disorder).",
    },
    {
      id: "disorders-m03",
      kind: "mcq",
      sub: "Defining abnormality",
      official: true,
      prompt:
        "As part of a fraternity initiation ritual, Conor is instructed to interrupt a school basketball game by running on the court naked while singing the nursery rhyme \"Twinkle, Twinkle, Little Star.\" If Conor complies with this ritual, his behavior would BEST illustrate ____.",
      options: ["psychosis", "distress", "disability", "social norm deviance"],
      answer: 3,
      explain:
        "Running naked on a court is unusual and goes against social norms (statistical or social norm deviance). Nothing suggests he is distressed, unable to function, or unable to tell reality from fantasy (psychosis).",
    },
    {
      id: "disorders-f01",
      kind: "fill",
      sub: "Anxiety disorders",
      official: true,
      prompt:
        "Your aunt has a fear that makes it difficult for her to leave her home and to be out in public and open spaces. She feels trapped and is unable to work or engage in any kind of activity that requires going outside of her home. You are not surprised when you find out your aunt is diagnosed with ____.",
      answers: [["agoraphobia"]],
      explain:
        "Agoraphobia is the fear of being in a place or situation from which escape is difficult or impossible, so she feels trapped and stays home. Not social anxiety disorder, which is fear of negative evaluation.",
    },
    {
      id: "disorders-f02",
      kind: "fill",
      sub: "Models of abnormality",
      official: true,
      prompt:
        "The view that psychological disorders are diseases of the mind that have objective causes and require specific treatment is known as the ____ model.",
      answers: [["biological/medical", "medical", "biological", "biological medical", "biomedical"]],
      explain:
        "The biological/medical model treats disorders as diseases of the mind with biological or medical causes. The psychological models (psychodynamic, behavioural, cognitive) locate the cause elsewhere.",
    },
    {
      id: "disorders-f03",
      kind: "fill",
      sub: "Anxiety disorders",
      official: true,
      prompt:
        "A disorder in which intruding thoughts that occur again and again are followed by repetitive, ritualistic behavior meant to lower the anxiety caused by the thoughts is called ____ disorder.",
      answers: [["obsessive-compulsive", "obsessive compulsive", "ocd"]],
      explain:
        "In OCD, intruding recurring thoughts (obsessions) create anxiety that is relieved by repetitive ritualistic behaviour (compulsions). Generalised anxiety disorder has worry but no rituals.",
    },
    {
      id: "disorders-f04",
      kind: "fill",
      sub: "Personality disorders",
      official: true,
      prompt:
        "Dylan shows a pattern of instability in his relationships, self-image, and feelings. As such, he most likely has ____ personality disorder.",
      answers: [["borderline"]],
      explain:
        "Borderline personality disorder: moody and unstable, lacking a clear sense of identity, often clinging to others. Dependent personality disorder involves clinginess and submissiveness but not unstable identity and moods.",
    },
    {
      id: "disorders-f05",
      kind: "fill",
      sub: "Diagnosing disorders",
      official: true,
      prompt:
        "Dr. Nguyen is a psychologist who is currently evaluating a new client. Dr. Nguyen would most likely refer to the ____ to assist her in diagnosing her client's psychological disorder.",
      answers: [
        [
          "DSM-5",
          "DSM 5",
          "DSM",
          "DSM-5-TR",
          "ICD-11",
          "ICD",
          "DSM-5 and ICD-11",
          "Diagnostic and Statistical Manual of Mental Disorders",
          "International Classification of Diseases",
        ],
      ],
      explain:
        "The official answer is the DSM-5 and/or ICD-11. The DSM gives specific diagnostic criteria for more than 250 disorders; the ICD-11 is used worldwide and indexes both mental and physical illnesses.",
    },
    {
      id: "disorders-w01",
      kind: "written",
      sub: "Bipolar disorder",
      official: true,
      prompt:
        "Read the vignette below.\nJamie, a college student, has been experiencing significant mood swings over the past year. During certain periods, Jamie feels exceptionally energetic and euphoric, requiring very little sleep, and engages in numerous projects simultaneously. Friends have noted that Jamie talks rapidly, seems unusually distractible, and at times makes grandiose plans about starting a business with unrealistic expectations. These periods last about a week and are followed by episodes where Jamie struggles to get out of bed, withdraws from social activities, and expresses feelings of worthlessness and hopelessness. During these low phases, Jamie's academic performance suffers, and she mentions persistently low energy and difficulty concentrating.\n(a) Based on the symptoms described, what psychological disorder could Jamie be suffering from?\n(b) Identify and explain at least two indicators of abnormality evident in Jamie's behaviours and experiences, making sure to relate them specifically to the core symptoms of the disorder hypothesised in (a).",
      marks: 5,
      points: [
        "(a) Bipolar disorder: periods of mood ranging to manic (excessive excitement, energy and elation) alternating with episodes of depression.",
        "(a) Supporting detail: the high periods (euphoria, very little sleep, many projects, rapid talk, grandiose plans) are manic; the low phases (worthlessness, hopelessness, low energy, poor concentration) are depressive episodes.",
        "(b) Inability to function normally (maladaptive): during low phases her academic performance suffers and she withdraws from social activities and struggles to get out of bed.",
        "(b) Subjective discomfort: she expresses feelings of worthlessness and hopelessness, i.e., significant emotional distress during the depressive episodes.",
        "(b) Statistical or social norm deviance: during manic periods she needs very little sleep, talks rapidly and makes grandiose, unrealistic business plans, which is unusual compared with other students.",
      ],
      explain:
        "Name bipolar disorder and link each indicator of abnormality to a specific manic or depressive symptom from the vignette. Major depressive disorder is wrong because it has no manic periods.",
    },
    {
      id: "disorders-w02",
      kind: "written",
      sub: "Genetic basis of disorders",
      official: true,
      prompt:
        "(a) Identify one psychological disorder known to have a genetic basis.\n(b) Then describe how twin studies can be used to shed light on the influence of heredity and environment in the disorder.",
      marks: 4,
      points: [
        "(a) A disorder with a genetic basis, e.g., an eating disorder (genetic components appear significant, about 40–60% heritable), schizophrenia (combination of genetic and environmental factors) or a mood disorder (genetic origins may play a role).",
        "(b) Identical (monozygotic) twins come from one egg and one sperm that splits in two, so they share the same genetic composition (100%); fraternal (dizygotic) twins come from two eggs fertilised by separate sperm and share about 50% of genes, like ordinary siblings.",
        "(b) Compare how often both twins have the disorder in identical versus fraternal pairs: if it is shared more often by identical twins, heredity is playing a role (heritability = how much a trait in a population can be attributed to genetic influences).",
        "(b) Because identical twins share all their genes, any cases where one twin has the disorder and the other does not point to environmental influences (e.g., for schizophrenia, the stress-vulnerability model: a genetic vulnerability that develops under the right conditions of stress).",
      ],
      explain:
        "Twin studies compare identical twins (same genes) with fraternal twins (about half their genes). A larger similarity among identical twins points to heredity; differences between identical twins point to environment.",
    },

    // ---------- Fill-in-the-blank ----------
    {
      id: "disorders-f06",
      kind: "fill",
      sub: "What is abnormality?",
      prompt:
        "Dr Chua's research team characterises symptoms, tries to understand the causes of disorders and develops effective treatments. Their field, the scientific study of abnormal behaviour and psychological dysfunction, is called ____.",
      answers: [["psychopathology"]],
      explain:
        "Psychopathology is the scientific study of abnormal behaviour and psychological dysfunction. Its aims are to characterise symptoms, understand aetiology and develop treatments.",
    },
    {
      id: "disorders-f07",
      kind: "fill",
      sub: "Defining abnormality",
      prompt:
        "Wei Ling's worrying is not unusual among her friends and she still manages her job well, but it causes her significant emotional distress every day. This indicator of abnormality is called ____.",
      answers: [["subjective discomfort"]],
      explain:
        "Subjective discomfort = the thinking or behaviour causes significant emotional distress or pain. She is functioning well and is not unusual, so it is not inability to function normally or social norm deviance.",
    },
    {
      id: "disorders-f08",
      kind: "fill",
      sub: "Defining abnormality",
      prompt:
        "Tariq's need to check the stove has grown until he is late for work every day and has been given a final warning. Because his behaviour stops him from functioning normally, it is described as ____.",
      answers: [["maladaptive"]],
      explain:
        "Inability to function normally is described on the slides as maladaptive. Lateness and job warnings show the behaviour interferes with daily life.",
    },
    {
      id: "disorders-f09",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "A psychiatrist tells Mrs Ong that her son's disorder will probably last about a year and that he is likely to recover fully. She is describing the disorder's ____.",
      answers: [["prognosis"]],
      explain:
        "Prognosis = the likely course, duration and outcomes. Aetiology would be the causes; course is the path by which the disorder develops or progresses.",
    },
    {
      id: "disorders-f10",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "Researchers investigate whether Kevin's disorder was caused by his genes, a head injury, or stress at home. They are investigating the disorder's ____, its origin or set of causes.",
      answers: [["aetiology", "etiology"]],
      explain:
        "Aetiology = origin, cause, or set of causes. Prognosis is the likely outcome instead.",
    },
    {
      id: "disorders-f11",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "Doctors describe how Amy's disorder started with mild sleep problems, then worsened over several months into severe symptoms. The path by which a disorder develops or progresses is its ____.",
      answers: [["course"]],
      explain:
        "Course = a path, or way in which a disorder develops or progresses. Prognosis is the likely course, duration and outcomes predicted for the future.",
    },
    {
      id: "disorders-f12",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "Dr Lim believes Harun's anxiety stems from irrational beliefs, such as 'if I make one mistake everyone will hate me', and illogical patterns of thought. This reflects the ____ perspective.",
      answers: [["cognitive"]],
      explain:
        "The cognitive perspective explains abnormality through irrational beliefs and illogical thought patterns. Behaviourism would say the anxiety was learnt.",
    },
    {
      id: "disorders-f13",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "A therapist explains that Bella's fear of dogs is abnormal behaviour that she learnt after a dog bit her as a child. This explanation reflects the psychological model called ____.",
      answers: [["behaviourism", "behaviorism", "behavioural", "behavioral"]],
      explain:
        "Behaviourism says abnormal thinking and behaviour is learnt. The psychodynamic view would point to repressed conflicts instead.",
    },
    {
      id: "disorders-f14",
      kind: "fill",
      sub: "Models of abnormality",
      prompt: "Disorders that are found only in particular cultures are called ____.",
      answers: [["cultural syndromes", "cultural syndrome"]],
      explain:
        "Cultural syndromes are disorders found only in particular cultures. Cultural relativity is the different idea of considering a behaviour within its own culture.",
    },
    {
      id: "disorders-f15",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "Before deciding that a client's behaviour is abnormal, Dr Ho considers the unique characteristics of the culture in which it takes place. This is the principle of cultural ____.",
      answers: [["relativity"]],
      explain:
        "Cultural relativity = the need to consider the unique characteristics of the culture in which behaviour takes place.",
    },
    {
      id: "disorders-f16",
      kind: "fill",
      sub: "Models of abnormality",
      prompt:
        "To explain Ming's depression, her psychologist considers her family history of depression, her negative thinking habits, and pressure from her family and culture together. This is the ____ perspective.",
      answers: [["biopsychosocial", "bio-psycho-social"]],
      explain:
        "The biopsychosocial perspective incorporates biology, psychology and culture. The sociocultural perspective looks only at family, social and cultural influences.",
    },
    {
      id: "disorders-f17",
      kind: "fill",
      sub: "Mood disorders",
      prompt:
        "Another name for mood disorders, which are disturbances in emotion, is ____ disorders.",
      answers: [["affective"]],
      explain:
        "Affect is a term indicating emotion or mood, so mood disorders are also called affective disorders.",
    },
    {
      id: "disorders-f18",
      kind: "fill",
      sub: "Mood disorders",
      prompt:
        "Under ICD-11, a depressive episode requires at least 5 symptoms occurring most of the day, nearly every day, for at least ____ weeks.",
      answers: [["2", "two"]],
      explain:
        "ICD-11 requires at least 5 concurrent symptoms for at least 2 weeks, and one must be depressed mood or markedly diminished interest or pleasure.",
    },
    {
      id: "disorders-f19",
      kind: "fill",
      sub: "Mood disorders",
      prompt:
        "Rachel has episodes of major depression. Between them she has short periods of elevated mood and extra energy, but never as extreme as full mania. These milder elevated periods are called ____.",
      answers: [["hypomania", "hypomanic episodes", "hypomanic"]],
      explain:
        "Hypomania = elevated mood at a lower level than full mania. Major depression plus hypomania is Bipolar II.",
    },
    {
      id: "disorders-f20",
      kind: "fill",
      sub: "Mood disorders",
      prompt:
        "Jonas has periods of normal mood and periods of full mania, with no depressive episodes at all. His diagnosis would be Bipolar ____.",
      answers: [["I", "1", "one"]],
      explain:
        "Bipolar I: mood spans from normal to manic, with or without episodes of depression. Bipolar II requires episodes of major depression and hypomania.",
    },
    {
      id: "disorders-f21",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "As a car speeds straight at him, Haris's heart pounds. Because this is a reaction to a perceived imminent threat in the present, it is ____ rather than anxiety.",
      answers: [["fear"]],
      explain: "Fear is a reaction to perceived imminent threat in the present; anxiety is anticipation of some future threat.",
    },
    {
      id: "disorders-f22",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "Ravi feels anxious most of the time but cannot point to any particular object or situation causing it. His anxiety is described as ____.",
      answers: [["free-floating", "free floating"]],
      explain:
        "Anxiety can be specific to a particular object or situation, or free-floating (no particular object or situation).",
    },
    {
      id: "disorders-f23",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "Kumar avoids tutorial presentations and parties because he fears others will judge him negatively. He most likely has ____ disorder.",
      answers: [["social anxiety"]],
      explain:
        "Social anxiety disorder (social phobia) is fear of social situations that might lead to a negative evaluation. Agoraphobia is fear of places where escape is difficult.",
    },
    {
      id: "disorders-f24",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "Ying always takes the stairs because she panics in the small, enclosed space of a lift. Her specific phobia is called ____.",
      answers: [["claustrophobia"]],
      explain:
        "Claustrophobia is fear of being in a small, enclosed space. Agoraphobia is about places escape would be difficult from in general, such as crowds and public spaces.",
    },
    {
      id: "disorders-f25",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "Darius refuses to climb the ladder to clean his windows and feels dizzy on a high bridge. His specific phobia, a fear of heights, is called ____.",
      answers: [["acrophobia"]],
      explain: "Acrophobia is fear of heights, a type of specific phobia.",
    },
    {
      id: "disorders-f26",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "Over the last two months, Mei has had many sudden attacks of racing heart and terror, and she now avoids going out in case another one strikes. Because the attacks disrupt her daily life, she has ____ disorder.",
      answers: [["panic"]],
      explain:
        "Panic disorder = panic attacks occur frequently enough to cause difficulty adjusting to daily life. A single attack is only a panic attack.",
    },
    {
      id: "disorders-f27",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "For over a year, Zhi Hao has felt dread about work, school, money and his health, with no particular source, and he cannot control the feelings. He most likely has ____ anxiety disorder.",
      answers: [["generalised", "generalized"]],
      explain:
        "Generalised anxiety disorder: dread and doom with physical stress symptoms lasting 6 months or more, about numerous events, with no particular source. Panic disorder involves sudden attacks instead.",
    },
    {
      id: "disorders-f28",
      kind: "fill",
      sub: "Anxiety disorders",
      prompt:
        "Every time Lucas worries that his door might be unlocked, he goes back and checks it exactly eight times. In OCD, the repeated checking is called a(n) ____.",
      answers: [["compulsion", "compulsions"]],
      explain:
        "The compulsion is the repetitive, ritualistic behaviour that relieves anxiety. The worrying thought about the unlocked door is the obsession.",
    },
    {
      id: "disorders-f29",
      kind: "fill",
      sub: "Trauma and stress disorders",
      prompt:
        "Two weeks after a serious car crash, Jun has nightmares, flashbacks and trouble concentrating. Since it is still less than a month after the event, he would be diagnosed with ____ disorder.",
      answers: [["acute stress", "asd"]],
      explain:
        "Acute stress disorder lasts as long as one month after a traumatic event. If the symptoms last more than one month it becomes PTSD.",
    },
    {
      id: "disorders-f30",
      kind: "fill",
      sub: "Trauma and stress disorders",
      prompt:
        "Six months after surviving a flood, Anita still has flashbacks, recurring nightmares and sleep problems. Because her symptoms have lasted more than one month, she has ____ disorder.",
      answers: [["posttraumatic stress", "post-traumatic stress", "post traumatic stress", "ptsd"]],
      explain:
        "PTSD = the symptoms of acute stress disorder lasting more than one month. Acute stress disorder lasts up to one month.",
    },
    {
      id: "disorders-f31",
      kind: "fill",
      sub: "Dissociative disorders",
      prompt:
        "Paul is found living in a different town under a new name. He cannot remember travelling there or much about his past. He most likely has dissociative ____.",
      answers: [["fugue"]],
      explain:
        "Dissociative fugue = travelling away from familiar surroundings with amnesia for the trip and possibly for personal information. Dissociative amnesia does not involve the travel.",
    },
    {
      id: "disorders-f32",
      kind: "fill",
      sub: "Dissociative disorders",
      prompt:
        "After a traumatic attack, Clara cannot recall her own name or family members, though she has stayed at home the whole time. She most likely has dissociative ____.",
      answers: [["amnesia"]],
      explain:
        "Dissociative amnesia = loss of memory for personal information, partial or complete. There is no travel, so it is not fugue.",
    },
    {
      id: "disorders-f33",
      kind: "fill",
      sub: "Dissociative disorders",
      prompt:
        "A person who seems to have two or more distinct personalities within one body has ____ disorder.",
      answers: [["dissociative identity", "did"]],
      explain: "Dissociative identity disorder (DID) is defined by two or more distinct personalities within one body.",
    },
    {
      id: "disorders-f34",
      kind: "fill",
      sub: "Dissociative disorders",
      prompt:
        "A cognitive and behavioural explanation of dissociative disorders is that trauma-related thought avoidance is ____ reinforced by a reduction in anxiety and emotional pain.",
      answers: [["negatively"]],
      explain:
        "Avoidance removes something unpleasant (anxiety, emotional pain), which is negative reinforcement. The psychodynamic explanation is repression instead.",
    },
    {
      id: "disorders-f35",
      kind: "fill",
      sub: "Eating disorders",
      prompt:
        "Several times a week, Wendy eats enormous amounts of food in one sitting and feels unable to stop, but she never vomits or uses other methods to avoid weight gain. She most likely has ____ disorder.",
      answers: [["binge-eating", "binge eating"]],
      explain:
        "Binge-eating disorder involves uncontrolled binge eating without purging. Bulimia nervosa adds unhealthy methods to avoid weight gain.",
    },
    {
      id: "disorders-f36",
      kind: "fill",
      sub: "Eating disorders",
      prompt:
        "Grace binges on huge amounts of food and then makes herself vomit to avoid gaining weight. This cycle describes ____ nervosa.",
      answers: [["bulimia"]],
      explain:
        "Bulimia nervosa = binging followed by unhealthy methods to avoid weight gain. Anorexia nervosa is reducing eating until weight is significantly low.",
    },
    {
      id: "disorders-f37",
      kind: "fill",
      sub: "Eating disorders",
      prompt:
        "Hui Min has cut her eating so much that her BMI is 15.8, well below the adult cut-off of 18.5. Her condition is ____ nervosa.",
      answers: [["anorexia"]],
      explain:
        "Anorexia nervosa: reduced eating until body weight is significantly low, likely associated with an adult BMI below 18.5.",
    },
    {
      id: "disorders-f38",
      kind: "fill",
      sub: "Personality disorders",
      prompt:
        "For years, Victor has believed his coworkers and neighbours are secretly plotting against him, and he distrusts almost everyone. He most likely has ____ personality disorder.",
      answers: [["paranoid"]],
      explain:
        "Paranoid personality disorder = pervasive and widespread distrust and suspiciousness of others. It belongs to Cluster A (odd or eccentric).",
    },
    {
      id: "disorders-f39",
      kind: "fill",
      sub: "Personality disorders",
      prompt:
        "Kai steals from friends without any guilt and acts impulsively with no regard for the consequences. He most likely has ____ personality disorder.",
      answers: [["antisocial"]],
      explain:
        "Antisocial personality disorder: no morals or conscience, impulsive behaviour without regard for consequences. It is in Cluster B.",
    },
    {
      id: "disorders-f40",
      kind: "fill",
      sub: "Personality disorders",
      prompt:
        "Eric, 28, lets his parents make all his decisions, needs constant reassurance, and feels helpless and frightened when left alone. He most likely has ____ personality disorder.",
      answers: [["dependent"]],
      explain:
        "Dependent personality disorder: clingy, submissive, fearful of separation, helpless when alone, with others assuming responsibility for most areas of life. Borderline involves unstable moods and identity instead.",
    },
    {
      id: "disorders-f41",
      kind: "fill",
      sub: "Personality disorders",
      prompt:
        "Avoidant, dependent and obsessive-compulsive personality disorders, which involve predominantly anxious or fearful thinking and behaviour, belong to Cluster ____.",
      answers: [["c"]],
      explain:
        "Cluster C = anxious or fearful. Cluster A = odd or eccentric; Cluster B = dramatic, emotional or erratic.",
    },
    {
      id: "disorders-f42",
      kind: "fill",
      sub: "Schizophrenia",
      prompt:
        "Despite all evidence, Ah Seng is convinced that secret agents are following him everywhere. Persistent false beliefs like this are called ____.",
      answers: [["delusions", "delusion", "delusions of persecution"]],
      explain:
        "Delusions are persistent false beliefs (here, of persecution), a positive symptom of schizophrenia. Hallucinations are false sensory perceptions instead.",
    },
    {
      id: "disorders-f43",
      kind: "fill",
      sub: "Schizophrenia",
      prompt:
        "A patient with schizophrenia shows almost no facial emotion, speaks very little and has no motivation. These are ____ symptoms.",
      answers: [["negative"]],
      explain:
        "Negative symptoms are a decrease in or absence of normal functions (loss of affect or motivation, poverty of speech). Positive symptoms are excesses or distortions.",
    },
    {
      id: "disorders-f44",
      kind: "fill",
      sub: "Schizophrenia",
      prompt:
        "Asked about his weekend, Leon replies with a jumble of unrelated words strung together that make no sense. This disorganised speech is known as word ____.",
      answers: [["salad"]],
      explain: "Word salad is a form of disorganised thoughts or speech, which is a positive symptom of schizophrenia.",
    },
    {
      id: "disorders-f45",
      kind: "fill",
      sub: "Schizophrenia",
      prompt:
        "The ____ model assumes a biological sensitivity to a disorder that will develop under the right conditions of emotional, social, or environmental stress.",
      answers: [["stress-vulnerability", "stress vulnerability"]],
      explain:
        "The stress-vulnerability model combines a biological vulnerability with stress that triggers the disorder. It is used to explain schizophrenia.",
    },
    {
      id: "disorders-f46",
      kind: "fill",
      sub: "Schizophrenia",
      prompt:
        "The term ____ refers to an inability to perceive what is real and what is fantasy.",
      answers: [["psychotic", "psychosis"]],
      explain:
        "Psychotic refers to an inability to perceive what is real and what is fantasy; schizophrenia is a severe psychotic disorder.",
    },

    // ---------- MCQ ----------
    {
      id: "disorders-m04",
      kind: "mcq",
      sub: "What is abnormality?",
      prompt: "Around 400 B.C., Hippocrates explained abnormal behaviour as caused by:",
      options: [
        "possession by demons and spirits",
        "an imbalance of four vital fluids or 'humours'",
        "repressed conflicts fighting to become conscious",
        "witchcraft",
      ],
      answer: 1,
      explain:
        "Hippocrates proposed biological causes: an imbalance of blood, phlegm, black bile and yellow bile. Possession and witchcraft were the explanations of the ancient world, Middle Ages and Renaissance.",
    },
    {
      id: "disorders-m05",
      kind: "mcq",
      sub: "Diagnosing disorders",
      prompt: "Which statement about the DSM-5 is correct?",
      options: [
        "It classifies disorders by their underlying causes",
        "It indexes both mental and physical illnesses for insurance coding",
        "It classifies disorders by symptoms, not by underlying causes",
        "It contains criteria for fewer than 100 disorders",
      ],
      answer: 2,
      explain:
        "The DSM-5 gives criteria for more than 250 disorders and classifies by symptoms, NOT causes. Indexing both mental and physical illnesses for insurance coding describes the ICD-11.",
    },
    {
      id: "disorders-m06",
      kind: "mcq",
      sub: "Diagnosing disorders",
      prompt:
        "A clinic needs a system that is used worldwide, especially for insurance coding, and that covers physical as well as mental illnesses. Which should it use?",
      options: ["DSM-5", "ICD-11", "MMPI-2", "NEO-PI"],
      answer: 1,
      explain:
        "The ICD-11 is used worldwide, especially for insurance coding, and indexes both mental and physical illnesses. The DSM-5 covers mental disorders only; MMPI-2 and NEO-PI are personality inventories.",
    },
    {
      id: "disorders-m07",
      kind: "mcq",
      sub: "Mood disorders",
      prompt:
        "Felicia has episodes of major depression. Between them she has a few days of elevated mood that are noticeable but much milder than full mania. Which diagnosis fits best?",
      options: ["Major depressive disorder", "Bipolar I", "Bipolar II", "Generalised anxiety disorder"],
      answer: 2,
      explain:
        "Bipolar II = episodes of major depression plus hypomania (elevated mood at a lower level than full mania). Bipolar I involves full mania; major depressive disorder has no elevated periods.",
    },
    {
      id: "disorders-m08",
      kind: "mcq",
      sub: "Mood disorders",
      prompt:
        "After repeatedly failing to get a job despite many applications, Ethan stops applying and becomes depressed, believing nothing he does matters. Which explanation of depression does this fit?",
      options: [
        "Behavioural: learned helplessness",
        "Biological: serotonin, norepinephrine and dopamine systems",
        "Psychodynamic: repressed urges",
        "Cultural syndromes",
      ],
      answer: 0,
      explain:
        "Behavioural theories link depression to learned helplessness: he learnt his efforts make no difference and stopped trying. Nothing in the scenario points to neurotransmitters or repressed urges.",
    },
    {
      id: "disorders-m09",
      kind: "mcq",
      sub: "Mood disorders",
      prompt: "According to the lecture, mood is considered disordered when it:",
      options: [
        "lasts a few hours after a disappointing event",
        "lasts for long periods, persists across life events and often has no identifiable source",
        "always has an obvious external cause",
        "occurs only in particular cultures",
      ],
      answer: 1,
      explain:
        "Disordered mood lasts for long periods, persists across life events and often has no identifiable source. Disorders found only in particular cultures are cultural syndromes.",
    },
    {
      id: "disorders-m10",
      kind: "mcq",
      sub: "Anxiety disorders",
      prompt:
        "Yusuf believes his dog phobia developed because he learnt to be afraid after a dog chased him as a child. Which explanation of anxiety disorders is this?",
      options: ["Biological", "Cognitive", "Behavioural", "Cultural"],
      answer: 2,
      explain:
        "The behavioural explanation says anxious reactions such as phobias are learnt. The cognitive explanation points to irrational thinking; the biological one to neurotransmitters such as serotonin and GABA.",
    },
    {
      id: "disorders-m11",
      kind: "mcq",
      sub: "Anxiety disorders",
      prompt:
        "Sophie keeps thinking that she might have hurt someone while driving, so she repeatedly drives back along her route to check. In OCD terms, the driving back to check is the:",
      options: ["obsession", "compulsion", "delusion", "hallucination"],
      answer: 1,
      explain:
        "The compulsion is the repetitive behaviour that relieves the anxiety. The recurring thought of having hurt someone is the obsession.",
    },
    {
      id: "disorders-m12",
      kind: "mcq",
      sub: "Dissociative disorders",
      prompt:
        "Which explanation of dissociative disorders says that avoiding trauma-related thoughts is negatively reinforced because it reduces anxiety and emotional pain?",
      options: ["Psychodynamic", "Cognitive and behavioural", "Biological", "Sociocultural"],
      answer: 1,
      explain:
        "The cognitive and behavioural view stresses negative reinforcement of thought avoidance. The psychodynamic view uses repression as the main defence mechanism; the biological view points to low activity in body-awareness areas.",
    },
    {
      id: "disorders-m13",
      kind: "mcq",
      sub: "Eating disorders",
      prompt: "Which statement about eating disorders is supported by the lecture?",
      options: [
        "They are found only in Western cultures",
        "Genetic components appear to be significant (about 40–60% heritable)",
        "Binge-eating disorder always involves purging",
        "The greatest risk factor is being a middle-aged male",
      ],
      answer: 1,
      explain:
        "Eating disorders are about 40–60% heritable, are found in both Western and non-Western cultures, and the greatest risk factor is being an adolescent or young adult female. Binge-eating disorder does NOT involve purging.",
    },
    {
      id: "disorders-m14",
      kind: "mcq",
      sub: "Personality disorders",
      prompt:
        "Leila is dramatic, highly emotional and erratic, with frequent mood swings and an unstable sense of who she is. Her personality disorder belongs to which cluster?",
      options: ["Cluster A", "Cluster B", "Cluster C", "It is not a personality disorder"],
      answer: 1,
      explain:
        "Her symptoms fit borderline personality disorder, which is in Cluster B (very dramatic, emotional or erratic). Cluster A is odd or eccentric; Cluster C is anxious or fearful.",
    },
    {
      id: "disorders-m15",
      kind: "mcq",
      sub: "Schizophrenia",
      prompt: "Which of the following is a NEGATIVE symptom of schizophrenia?",
      options: ["Delusions of grandiosity", "Hearing voices", "Word salad", "Poverty of speech"],
      answer: 3,
      explain:
        "Negative symptoms are a decrease in or absence of normal functions, such as poverty of speech. Delusions, hallucinations and word salad are positive symptoms (excess or distortion).",
    },
    {
      id: "disorders-m16",
      kind: "mcq",
      sub: "Diagnostic labels",
      prompt: "Which is a CON of diagnostic labels, according to the lecture?",
      options: [
        "They provide a common language to professionals",
        "They can be timesaving and lifesaving tools",
        "They can be overly prejudicial",
        "They establish distinct categories for treatment",
      ],
      answer: 2,
      explain:
        "Labels can be overly prejudicial and biased, and are used loosely ('psychology student's syndrome'). The other three options are pros.",
    },
    {
      id: "disorders-m17",
      kind: "mcq",
      sub: "Mental health in Singapore",
      prompt:
        "According to the 2022–2023 National Youth Mental Health Survey, which of these made young people more likely to report mental health symptoms?",
      options: [
        "Spending more than three hours daily on social media",
        "Living in a high-income country",
        "Being aged over 35",
        "Seeking help from family and friends",
      ],
      answer: 0,
      explain:
        "Young people were more likely to report symptoms if they had experienced cyber bullying, had body-shape concerns, or spent more than three hours daily on social media. The survey covered ages 15–35.",
    },

    // ---------- Written ----------
    {
      id: "disorders-w03",
      kind: "written",
      sub: "Schizophrenia",
      prompt:
        "Daniel, 24, believes his neighbours are poisoning his food to control his mind and says he hears them whispering orders through the walls when no one is there. When he talks, he jumps rapidly from topic to topic. He has also stopped showing emotion and rarely speaks unless asked. Daniel's uncle had the same disorder, and Daniel's symptoms began during a very stressful final year at university.\n(a) Identify the disorder. (b) Classify two of Daniel's symptoms as positive and one as negative, explaining each. (c) Use a model from the lecture to explain why the disorder appeared when it did.",
      marks: 5,
      points: [
        "(a) Schizophrenia: a severe psychotic disorder with disordered thinking, bizarre behaviour and hallucinations, unable to distinguish fantasy from reality.",
        "(b) Positive symptom: delusions (persistent false beliefs), e.g., believing the neighbours are poisoning him to control his mind (persecution).",
        "(b) Positive symptom: hallucinations (false sensory perceptions) — hearing whispering through the walls when no one is there; or disorganised speech — rapidly switching topics.",
        "(b) Negative symptom (decrease in or absence of normal functions): loss of affect (no emotion) and poverty of speech (rarely speaks).",
        "(c) Stress-vulnerability model: his uncle's disorder suggests a biological (genetic) vulnerability, and the disorder developed under the stress of his final year.",
      ],
      explain:
        "Positive symptoms are excesses or distortions (delusions, hallucinations, disorganised speech); negative symptoms are losses (affect, motivation, speech). The stress-vulnerability model links his genetic risk to his stress.",
    },
    {
      id: "disorders-w04",
      kind: "written",
      sub: "Anxiety disorders",
      prompt:
        "Every time Farah touches something in public, she has recurring thoughts that she has picked up deadly germs. She becomes very anxious until she washes her hands in a fixed sequence twenty times, which makes her late for lectures every day.\n(a) Identify the disorder and explain it using Farah's (i) obsession and (ii) compulsion. (b) Identify one indicator of abnormality shown, with evidence from the scenario.",
      marks: 4,
      points: [
        "(a) Obsessive-compulsive disorder (OCD): intruding, recurring thoughts create anxiety that is relieved by a repetitive, ritualistic behaviour.",
        "(a)(i) Obsession: her recurring thoughts that she has picked up deadly germs (fear of contamination), which make her anxious.",
        "(a)(ii) Compulsion: washing her hands in a fixed sequence twenty times, a repetitive ritualistic behaviour that relieves the anxiety.",
        "(b) Inability to function normally (maladaptive): the ritual makes her late for lectures every day; or subjective discomfort: she becomes very anxious (emotional distress).",
      ],
      explain:
        "The obsession is the intrusive thought; the compulsion is the ritual that reduces anxiety. Lateness shows the behaviour is maladaptive.",
    },
  ],
};

export default data;
