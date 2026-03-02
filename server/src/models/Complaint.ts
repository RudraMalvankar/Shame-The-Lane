import mongoose, { Document, Schema } from 'mongoose';

export type ComplaintStatus =
  | 'pending'
  | 'acknowledged'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

export type ComplaintCategory =
  | 'road'
  | 'water'
  | 'electricity'
  | 'garbage'
  | 'sewage'
  | 'encroachment'
  | 'corruption'
  | 'noise'
  | 'other';

export interface IComplaint extends Document {
  rawRant: string;
  cleanTitle: string;
  cleanDescription: string;
  category: ComplaintCategory;
  severity: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
    address: string;
    ward?: string;
    city: string;
    state: string;
  };
  images: string[];
  author: mongoose.Types.ObjectId;
  status: ComplaintStatus;
  pressureScore: number;
  voteCount: number;
  rtiDraft?: string;
  rtiFiledAt?: Date;
  department?: string;
  campaign?: mongoose.Types.ObjectId;
  aiProcessed: boolean;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    rawRant: { type: String, required: true, maxlength: 5000 },
    cleanTitle: { type: String, required: true, maxlength: 200 },
    cleanDescription: { type: String, required: true, maxlength: 2000 },
    category: {
      type: String,
      enum: ['road', 'water', 'electricity', 'garbage', 'sewage', 'encroachment', 'corruption', 'noise', 'other'],
      required: true,
    },
    severity: { type: Number, min: 1, max: 5, default: 3 },
    tags: [{ type: String }],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true },
      ward: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    images: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'acknowledged', 'in_progress', 'resolved', 'rejected'],
      default: 'pending',
    },
    pressureScore: { type: Number, default: 0 },
    voteCount: { type: Number, default: 0 },
    rtiDraft: { type: String },
    rtiFiledAt: { type: Date },
    department: { type: String },
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
    aiProcessed: { type: Boolean, default: false },
    isAnonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ComplaintSchema.index({ location: '2dsphere' });
ComplaintSchema.index({ pressureScore: -1 });
ComplaintSchema.index({ status: 1 });
ComplaintSchema.index({ category: 1 });
ComplaintSchema.index({ author: 1 });
ComplaintSchema.index({ createdAt: -1 });

export const Complaint = mongoose.model<IComplaint>('Complaint', ComplaintSchema);
