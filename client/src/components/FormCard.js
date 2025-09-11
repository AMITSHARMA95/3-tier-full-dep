export default function FormCard({ title, children }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      {children}
    </div>
  );
}

