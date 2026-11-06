import type { Lesson } from "@/lib/types";
import { complexLesson } from "./complex";
import { dftLesson } from "./dft";
import { eigenLesson } from "./eigen";
import { leastSquaresLesson } from "./least-squares";
import { orthogonalityLesson } from "./orthogonality";

export const lessons: Lesson[] = [orthogonalityLesson, leastSquaresLesson, eigenLesson, complexLesson, dftLesson];
