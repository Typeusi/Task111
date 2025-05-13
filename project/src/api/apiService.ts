import { Record } from '../types/Record';

// Mock database - in a real app, this would connect to a backend service
let mockDatabase: Record[] = [
  {
    id: '1',
    title: 'First Record',
    body: 'This is the body of the first record in our database.',
  },
  {
    id: '2',
    title: 'Second Record',
    body: 'The second record contains different information than the first one.',
  },
  {
    id: '3',
    title: 'Another Entry',
    body: 'Here is another entry with some additional information for testing.',
  },
  {
    id: '4',
    title: 'Important Data',
    body: 'This record contains important information that should not be lost.',
  },
  {
    id: '5',
    title: 'Final Example',
    body: 'The last example record in our initial dataset.',
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all records
export const fetchRecords = async (): Promise<Record[]> => {
  await delay(800); // Simulate network delay
  return [...mockDatabase];
};

// Fetch a single record by ID
export const fetchRecordById = async (id: string): Promise<Record | null> => {
  await delay(600);
  const record = mockDatabase.find(record => record.id === id);
  return record || null;
};

// Create a new record
export const createRecord = async (record: Omit<Record, 'id'>): Promise<Record> => {
  await delay(1000);
  const newRecord = {
    ...record,
    id: String(Date.now()), // Generate a unique ID
  };
  
  mockDatabase = [...mockDatabase, newRecord];
  return newRecord;
};

// Update an existing record
export const updateRecord = async (record: Record): Promise<Record> => {
  await delay(1000);
  const index = mockDatabase.findIndex(r => r.id === record.id);
  
  if (index === -1) {
    throw new Error(`Record with ID ${record.id} not found`);
  }
  
  mockDatabase[index] = record;
  return record;
};

// Delete a record
export const deleteRecord = async (id: string): Promise<boolean> => {
  await delay(800);
  const initialLength = mockDatabase.length;
  mockDatabase = mockDatabase.filter(record => record.id !== id);
  
  return mockDatabase.length < initialLength;
};