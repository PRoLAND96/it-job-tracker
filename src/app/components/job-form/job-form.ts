import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JOB_STATUSES, Job, JobInput } from '../../models/job.model';

@Component({
  selector: 'app-job-form',
  imports: [ReactiveFormsModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.scss',
})
export class JobForm {
  private fb = inject(FormBuilder);

  job = input<Job | null>(null);
  saved = output<JobInput>();
  cancelled = output<void>();

  statuses = JOB_STATUSES;

  form = this.fb.nonNullable.group({
    company: ['', Validators.required],
    position: ['', Validators.required],
    link: [''],
    appliedDate: [this.today(), Validators.required],
    status: [JOB_STATUSES[0] as Job['status'], Validators.required],
    notes: [''],
  });

  constructor() {
    effect(() => {
      const job = this.job();
      if (job) {
        this.form.patchValue(job);
      } else {
        this.reset();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit(this.form.getRawValue());
    this.reset();
  }

  cancel(): void {
    this.reset();
    this.cancelled.emit();
  }

  private reset(): void {
    this.form.reset({
      company: '', position: '', link: '',
      appliedDate: this.today(), status: JOB_STATUSES[0], notes: '',
    });
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }
}