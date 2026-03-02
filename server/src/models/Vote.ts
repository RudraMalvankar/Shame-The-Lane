import mongoose, { Document, Schema } from 'mongoose';

export interface IVote extends Document {
  user: mongoose.Types.ObjectId;
  complaint: mongoose.Types.ObjectId;
  type: 'upvote' | 'downvote';
  createdAt: Date;
}

const VoteSchema = new Schema<IVote>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    complaint: { type: Schema.Types.ObjectId, ref: 'Complaint', required: true },
    type: { type: String, enum: ['upvote', 'downvote'], required: true },
  },
  { timestamps: true }
);

// One vote per user per complaint
VoteSchema.index({ user: 1, complaint: 1 }, { unique: true });
VoteSchema.index({ complaint: 1 });

export const Vote = mongoose.model<IVote>('Vote', VoteSchema);
