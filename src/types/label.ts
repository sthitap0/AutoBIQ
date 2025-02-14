export interface Label {
  id: string;
  name: string;
  color: string;
  testCases: string[]; // Array of task IDs
}

export type LabelColor = {
  id: string;
  bg: string;
  text: string;
  border: string;
};

export const labelColors: LabelColor[] = [
  { id: 'red', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  { id: 'blue', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  { id: 'green', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  { id: 'purple', bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  { id: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  { id: 'indigo', bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
];