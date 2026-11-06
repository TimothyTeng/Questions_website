import type { TopicId } from "./types";

export interface TopicMeta {
  id: TopicId;
  name: string;
  chapter: string;
  blurb: string;
  color: string;
}

export const TOPICS: TopicMeta[] = [
  { id: "orthogonality", name: "Orthogonality", chapter: "Ch 6", blurb: "Dot products, projections, orthogonal bases, Gram–Schmidt, QR", color: "var(--t-orth)" },
  { id: "least-squares", name: "Least Squares", chapter: "Ch 7", blurb: "Normal equations, projection matrices, QR solve, linear models", color: "var(--t-ls)" },
  { id: "eigen", name: "Eigenvalues & Eigenvectors", chapter: "Ch 8", blurb: "Characteristic equation, diagonalisation, powers, complex eigenvalues", color: "var(--t-eig)" },
  { id: "complex", name: "Complex Numbers", chapter: "Ch 8A", blurb: "Polar/exponential form, De Moivre, roots, quadratics", color: "var(--t-cx)" },
  { id: "dft", name: "DFT", chapter: "Ch 8A", blurb: "DFT matrix, analysis & synthesis, complex inner products", color: "var(--t-dft)" },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;
