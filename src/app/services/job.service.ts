import { Injectable, effect, signal } from '@angular/core';
import { Job, JobInput } from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly STORAGE_KEY = 'it-job-tracker.jobs';
  private readonly _jobs = signal<Job[]>(this.load());

  readonly jobs = this._jobs.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._jobs()));
    });
  }

  add(input: JobInput): void {
    const job: Job = { ...input, id: crypto.randomUUID() };
    this._jobs.update(jobs => [job, ...jobs]);
  }

  update(id: string, input: JobInput): void {
    this._jobs.update(jobs => jobs.map(j => (j.id === id ? { ...input, id } : j)));
  }

  remove(id: string): void {
    this._jobs.update(jobs => jobs.filter(j => j.id !== id));
  }

  private load(): Job[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Job[]) : [];
    } catch {
      return [];
    }
  }
}