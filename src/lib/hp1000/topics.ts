import type { TopicId } from "./types";

export interface TopicMeta {
  id: TopicId;
  /** Lecture order, 1–11. */
  n: number;
  name: string;
  /** 1 = before the midterm (Weeks 1–6), 2 = after recess (Weeks 8–13), weighted more heavily in the final. */
  part: 1 | 2;
  blurb: string;
  color: string;
}

export const TOPICS: TopicMeta[] = [
  { id: "bio", n: 1, part: 1, name: "Biopsychology & Neuroscience", blurb: "Brain methods, neurons & neurotransmitters, nervous & endocrine systems, brain structures, lobes, split brain, neuroplasticity", color: "#4b5bdc" },
  { id: "sensation", n: 2, part: 1, name: "Sensation & Perception", blurb: "Transduction, thresholds & Weber's law, vision, colour theories, hearing, chemical & body senses, Gestalt, top-down processing, constancies, illusions", color: "#0f9488" },
  { id: "learning", n: 3, part: 1, name: "Learning", blurb: "Classical conditioning, operant conditioning, reinforcement & punishment, schedules, latent learning, learned helplessness, observational learning", color: "#c2410c" },
  { id: "memory", n: 4, part: 1, name: "Memory", blurb: "Encoding/storage/retrieval, amnesia, STM vs working memory, levels of processing, LTM types, retrieval, reconstruction, forgetting", color: "#9333ea" },
  { id: "cognition", n: 5, part: 1, name: "Cognition", blurb: "Concepts & schemas, problem solving, heuristics & biases, mental set, creativity, theories of intelligence, IQ", color: "#be185d" },
  { id: "disorders", n: 6, part: 2, name: "Psychological Disorders", blurb: "Defining abnormality, models, DSM-5 & ICD-11, mood, anxiety, OCD, trauma, dissociative, eating, personality disorders, schizophrenia", color: "#2563eb" },
  { id: "personality", n: 7, part: 2, name: "Personality", blurb: "Temperament, traits & the Big Five, inventories, Freud & defence mechanisms, psychosexual stages, Jung, social cognitive & humanistic views", color: "#059669" },
  { id: "development", n: 8, part: 2, name: "Development Across the Life Span", blurb: "Nature-nurture, prenatal, infant abilities, Piaget, theory of mind, attachment, parenting styles, Erikson, Marcia, ageing", color: "#d97706" },
  { id: "motivation", n: 9, part: 2, name: "Motivation & Emotion", blurb: "Intrinsic/extrinsic, drive, arousal & Yerkes-Dodson, needs theories, Maslow, SDT, components of emotion, theories of emotion", color: "#7c3aed" },
  { id: "stress", n: 10, part: 2, name: "Stress & Health", blurb: "Distress/eustress, stressors, conflict types, GAS & HPA axis, immune system, appraisal, personality types, social factors, coping", color: "#db2777" },
  { id: "social", n: 11, part: 2, name: "Social Psychology", blurb: "Attribution & biases, attitudes, dissonance, prejudice, attraction, conformity, groupthink, compliance, obedience, bystander effect", color: "#0891b2" },
];

export const PARTS = [
  { part: 1 as const, name: "Before the midterm", note: "Weeks 1–6" },
  { part: 2 as const, name: "After recess", note: "Weeks 8–13 · weighted more heavily in the final" },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;
