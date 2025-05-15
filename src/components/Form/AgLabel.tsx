export default function AgLabel({
  label,
  isRequired,
}: {
  label: string;
  isRequired?: boolean;
}) {
  console.log(label);
  return (
    <div className="text-sm text-gray-500">
      <span>{label}</span>
      {isRequired && <span className="text-red-500 ml-1 text-xs">*</span>}
    </div>
  );
}
