import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from '../../flight-diary-backend/src/types';

export type { NewDiaryEntry, NonSensitiveDiaryEntry };

export interface FlightsProps {
  flights: NonSensitiveDiaryEntry[];
}

type EntrySetter = React.Dispatch<
  React.SetStateAction<NonSensitiveDiaryEntry[]>
>;

type StringSetter = React.Dispatch<React.SetStateAction<string>>;

export interface NewFormProps {
  setEntries: EntrySetter;
  entries: NonSensitiveDiaryEntry[];
  setFeedback: StringSetter;
}

export interface NewFormPropsSvc extends NewFormProps {
  content: NewDiaryEntry;
}

export interface FeedbackProps {
  feedback: string;
  setFeedback: StringSetter;
}
