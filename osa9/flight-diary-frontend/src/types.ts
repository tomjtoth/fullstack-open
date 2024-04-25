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

export interface NewFormProps {
  setEntries: EntrySetter;
  entries: NonSensitiveDiaryEntry[];
}

export interface NewFormPropsSvc extends NewFormProps {
  content: NewDiaryEntry;
}
