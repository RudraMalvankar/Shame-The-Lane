import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType =
  | 'vote'
  | 'comment'
  | 'status_change'
  | 'rti_filed'
  | 'resolution'
  | 'escalation'
  | 'system';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  relatedComplaint?: mongoose.Types.ObjectId;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['vote', 'comment', 'status_change', 'rti_filed', 'resolution', 'escalation', 'system'],
      required: true,
    },
    title: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 1000 },
    relatedComplaint: { type: Schema.Types.ObjectId, ref: 'Complaint' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotificationSchema.index({ recipient: 1, read: 1 });
NotificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>(
  'Notification',
  NotificationSchema
);
