/**
 * Seed database with demo complaints, users, and votes.
 * Run: npm run seed  (from project root)
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import mongoose from 'mongoose';
import { User } from '../server/src/models/User';
import { Complaint } from '../server/src/models/Complaint';
import { Vote } from '../server/src/models/Vote';

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/shame-the-lane';

const DEMO_USERS = [
  { name: 'Rahul Sharma', email: 'rahul@demo.com', password: 'demo1234' },
  { name: 'Priya Nair', email: 'priya@demo.com', password: 'demo1234' },
  { name: 'Admin User', email: 'admin@demo.com', password: 'admin1234', role: 'admin' },
];

const DEMO_COMPLAINTS = [
  {
    rawRant: 'The road on MG Road has been broken for 6 months! Nobody cares!',
    cleanTitle: 'Severely damaged road surface on MG Road',
    cleanDescription:
      'The road surface on MG Road has multiple large potholes and cracks spanning approximately 200 meters, causing vehicle damage and safety hazards for over 6 months without municipal action.',
    category: 'road',
    severity: 4,
    tags: ['pothole', 'road-damage', 'mg-road'],
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716],
      address: 'MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
    department: 'BBMP Roads Department',
  },
  {
    rawRant: 'Water supply cut for 3 days in Andheri West. No notice given!',
    cleanTitle: 'Unannounced 3-day water supply disruption in Andheri West',
    cleanDescription:
      'Residents of Andheri West have been without piped water supply for three consecutive days with no prior notice from authorities, causing severe hardship to over 5,000 households.',
    category: 'water',
    severity: 5,
    tags: ['water-supply', 'andheri-west', 'no-notice'],
    location: {
      type: 'Point',
      coordinates: [72.8479, 19.1196],
      address: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    department: 'BMC Water Department',
  },
  {
    rawRant: 'Garbage not collected for 2 weeks in Sector 15. Stray dogs everywhere!',
    cleanTitle: 'Garbage collection failure for 2 weeks in Sector 15',
    cleanDescription:
      'Municipal garbage collection has not occurred for 14 days in Sector 15, leading to overflowing waste bins, attracting stray animals and creating a public health hazard.',
    category: 'garbage',
    severity: 3,
    tags: ['garbage', 'sector-15', 'public-health'],
    location: {
      type: 'Point',
      coordinates: [77.3261, 28.5706],
      address: 'Sector 15',
      city: 'Noida',
      state: 'Uttar Pradesh',
    },
    department: 'Noida Authority Sanitation Wing',
  },
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Complaint.deleteMany({}),
    Vote.deleteMany({}),
  ]);
  console.log('🧹 Cleared existing data');

  // Create users
  const users = await User.create(DEMO_USERS);
  console.log(`👤 Created ${users.length} demo users`);

  // Create complaints
  const complaintDocs = DEMO_COMPLAINTS.map((c, i) => ({
    ...c,
    author: users[i % 2]._id, // alternate between non-admin users
    aiProcessed: true,
  }));

  const complaints = await Complaint.create(complaintDocs);
  console.log(`📋 Created ${complaints.length} demo complaints`);

  // Create votes
  const votes = [];
  for (const complaint of complaints) {
    for (const user of users.slice(0, 2)) {
      votes.push({
        user: user._id,
        complaint: complaint._id,
        type: 'upvote',
      });
    }
  }

  await Vote.create(votes);
  console.log(`👍 Created ${votes.length} demo votes`);

  // Update pressure scores
  for (const complaint of complaints) {
    const voteCount = await Vote.countDocuments({
      complaint: complaint._id,
      type: 'upvote',
    });
    await Complaint.findByIdAndUpdate(complaint._id, {
      pressureScore: voteCount * (complaint.severity as number) * 1.5,
      voteCount,
    });
  }

  console.log('🔥 Pressure scores updated');
  console.log('\n✨ Seed complete! Demo credentials:');
  DEMO_USERS.forEach((u) => console.log(`  ${u.email} / ${u.password}`));

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
