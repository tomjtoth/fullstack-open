interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescr extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescr {
  kind: 'basic';
}

interface CoursePartSpecial extends CoursePartDescr {
  requirements: string[];
  kind: 'special';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescr {
  backgroundMaterial: string;
  kind: 'background';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export interface HeaderProps {
  courseName: string;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface TotalProps {
  totalExercises: number;
}
