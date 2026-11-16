import type { TopicId } from "./types";

export interface TopicMeta {
  id: TopicId;
  name: string;
  chapter: string;
  /** 1 = first half of the semester (vectors → vector spaces), 2 = second half (orthogonality → DFT). */
  half: 1 | 2;
  blurb: string;
  color: string;
}

export const TOPICS: TopicMeta[] = [
  { id: "vectors", name: "Vectors, Lines & Planes", chapter: "Ch 0A", half: 1, blurb: "Vector algebra, dot & cross products, angles, lines and planes", color: "var(--t-vec)" },
  { id: "matrices", name: "Matrices", chapter: "Ch 0B", half: 1, blurb: "Matrix operations, transpose, trace, row/column methods, special matrices", color: "var(--t-mat)" },
  { id: "systems", name: "Linear Systems", chapter: "Ch 1", half: 1, blurb: "Row reduction, RREF, consistency with parameters, span, linear independence", color: "var(--t-sys)" },
  { id: "transformations", name: "Linear Transformations", chapter: "Ch 1, 4", half: 1, blurb: "Standard matrices, rotations & reflections, composition, kernel and range", color: "var(--t-ltr)" },
  { id: "matrix-algebra", name: "Matrix Algebra", chapter: "Ch 2", half: 1, blurb: "Inverses, Invertible Matrix Theorem, elementary matrices, LU factorization", color: "var(--t-alg)" },
  { id: "determinants", name: "Determinants", chapter: "Ch 3", half: 1, blurb: "Cofactor expansion, row operations, properties, area & volume", color: "var(--t-det)" },
  { id: "vector-spaces", name: "Vector Spaces", chapter: "Ch 4", half: 1, blurb: "Subspaces, N(A) & C(A), basis, dimension, rank, coordinates, change of basis", color: "var(--t-vsp)" },
  { id: "orthogonality", name: "Orthogonality", chapter: "Ch 6", half: 2, blurb: "Dot products, projections, orthogonal bases, Gram–Schmidt, QR", color: "var(--t-orth)" },
  { id: "least-squares", name: "Least Squares", chapter: "Ch 7", half: 2, blurb: "Normal equations, projection matrices, QR solve, linear models", color: "var(--t-ls)" },
  { id: "eigen", name: "Eigenvalues & Eigenvectors", chapter: "Ch 8", half: 2, blurb: "Characteristic equation, diagonalisation, powers, complex eigenvalues", color: "var(--t-eig)" },
  { id: "complex", name: "Complex Numbers", chapter: "Ch 8A", half: 2, blurb: "Polar/exponential form, De Moivre, roots, quadratics", color: "var(--t-cx)" },
  { id: "dft", name: "DFT", chapter: "Ch 8A", half: 2, blurb: "DFT matrix, analysis & synthesis, complex inner products", color: "var(--t-dft)" },
];

export const HALVES = [
  { half: 1 as const, name: "First half", note: "Vectors → Vector spaces" },
  { half: 2 as const, name: "Second half", note: "Orthogonality → DFT" },
];

export const topicById = (id: TopicId) => TOPICS.find((t) => t.id === id)!;
