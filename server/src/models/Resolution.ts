import mongoose, { Document, Schema } from 'mongoose';

export interface IResolution extends Document {
  complaint: mongoose.Types.ObjectId;
  resolvedBy: mongoose.Types.ObjectId;
  description: string;
  evidenceImages: string[];
  officialRef?: string;
  verifiedByAdmin: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResolutionSchema = new Schema<IResolution>(
  {
    complaint: {
      type: Schema.Types.ObjectId,
      ref: 'Complaint',
      required: true,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: { type: String, required: true, maxlength: 3000 },
    evidenceImages: [{ type: String }],
    officialRef: { type: String },
    verifiedByAdmin: { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

ResolutionSchema.index({ complaint: 1 });

export const Resolution = mongoose.model<IResolution>('Resolution', ResolutionSchema);
