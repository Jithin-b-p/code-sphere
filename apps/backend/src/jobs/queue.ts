import EventEmitter from 'events'

type Job = { submissionId: number }
class SubmissionQueue extends EventEmitter {
  enqueue(job: Job) {
    process.nextTick(() => this.emit('job', job))
  }
}

export const submissionQueue = new SubmissionQueue()

export function queueSubmission(job: Job) {
  submissionQueue.enqueue(job)
}
