import type { Lesson } from "@/lib/types";
import { complexLesson } from "./complex";
import { determinantsLesson } from "./determinants";
import { dftLesson } from "./dft";
import { eigenLesson } from "./eigen";
import { leastSquaresLesson } from "./least-squares";
import { matricesLesson } from "./matrices";
import { matrixAlgebraLesson } from "./matrix-algebra";
import { orthogonalityLesson } from "./orthogonality";
import { systemsLesson } from "./systems";
import { transformationsLesson } from "./transformations";
import { vectorSpacesLesson } from "./vector-spaces";
import { vectorsLesson } from "./vectors";

export const lessons: Lesson[] = [
  vectorsLesson,
  matricesLesson,
  systemsLesson,
  transformationsLesson,
  matrixAlgebraLesson,
  determinantsLesson,
  vectorSpacesLesson,
  orthogonalityLesson,
  leastSquaresLesson,
  eigenLesson,
  complexLesson,
  dftLesson,
];
