import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  description: string;
  area: {
    type: 'Polygon' | 'Point';
    coordinates: number[][][] | [number, number];
    radius?: number; // metres (for Point-based hotspot)
  };
  complaints: mongoose.Types.ObjectId[];
  city: string;
  state: string;
  totalPressureScore: number;
  status: 'active' | 'resolved' | 'archived';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 2000 },
    area: {
      type: { type: String, enum: ['Polygon', 'Point'] },
      coordinates: { type: Schema.Types.Mixed },
      radius: { type: Number },
    },
    complaints: [{ type: Schema.Types.ObjectId, ref: 'Complaint' }],
    city: { type: String, required: true },
    state: { type: String, required: true },
    totalPressureScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'resolved', 'archived'],
      default: 'active',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

CampaignSchema.index({ totalPressureScore: -1 });
CampaignSchema.index({ status: 1 });

export const Campaign = mongoose.model<ICampaign>('Campaign', CampaignSchema);
