import { Campaign, ICampaign } from '../models/Campaign';
import { Complaint } from '../models/Complaint';
import mongoose from 'mongoose';

export const createCampaignFromHotspot = async (
  city: string,
  state: string,
  coordinates: [number, number],
  radiusMetres: number,
  createdBy: string
): Promise<ICampaign> => {
  // Find complaints within radius
  const nearbyComplaints = await Complaint.find({
    'location.type': 'Point',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates },
        $maxDistance: radiusMetres,
      },
    },
    status: { $ne: 'resolved' },
  }).select('_id pressureScore');

  const totalPressureScore = nearbyComplaints.reduce(
    (sum, c) => sum + (c.pressureScore || 0),
    0
  );

  const campaign = await Campaign.create({
    title: `Hotspot Campaign – ${city}`,
    description: `Auto-generated campaign for civic hotspot in ${city}, ${state}`,
    area: {
      type: 'Point',
      coordinates,
      radius: radiusMetres,
    },
    complaints: nearbyComplaints.map((c) => c._id),
    city,
    state,
    totalPressureScore,
    createdBy,
  });

  // Link complaints to this campaign
  await Complaint.updateMany(
    { _id: { $in: nearbyComplaints.map((c) => c._id) } },
    { campaign: campaign._id }
  );

  return campaign;
};

export const updateCampaignScore = async (campaignId: string): Promise<void> => {
  const campaign = await Campaign.findById(campaignId).populate('complaints');
  if (!campaign) return;

  const total = await Complaint.aggregate([
    { $match: { campaign: new mongoose.Types.ObjectId(campaignId) } },
    { $group: { _id: null, total: { $sum: '$pressureScore' } } },
  ]);

  const totalPressureScore = total[0]?.total ?? 0;
  await Campaign.findByIdAndUpdate(campaignId, { totalPressureScore });
};

export const getActiveCampaigns = async (city?: string) => {
  const query: Record<string, unknown> = { status: 'active' };
  if (city) query.city = city;
  return Campaign.find(query)
    .sort({ totalPressureScore: -1 })
    .limit(20)
    .lean();
};
