import RantForm from '../components/complaints/RantForm';

export default function PostRantPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-rage-500">🤬 Post Your Rant</h1>
        <p className="text-gray-400 mt-2">
          Let it all out. Our AI will convert your rant into a professional civic complaint + RTI draft.
        </p>
      </div>
      <RantForm />
    </div>
  );
}
