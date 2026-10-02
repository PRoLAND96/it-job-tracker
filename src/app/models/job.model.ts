export const JOB_STATUSES = ['Jelentkezve', 'Interjú', 'Ajánlat', 'Elutasítva'] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job {
  id: string;
  company: string;
  position: string;
  link: string;
  appliedDate: string; // 'YYYY-MM-DD'
  status: JobStatus;
  notes: string;
}

export type JobInput = Omit<Job, 'id'>;