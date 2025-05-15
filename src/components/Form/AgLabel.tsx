import AgPopover from "./AgPopover";

export default function AgLabel({
  label,
  isRequired,
  content,
}: {
  label: string;
  isRequired?: boolean;
  content?: string;
}) {
  console.log(label);
  return (
    <div className="text-sm text-gray-500">
      <span>{label}</span>
      {isRequired && <span className="text-red-500 ml-1 text-xs">*</span>}
      {content && <AgPopover content={content} />}
    </div>
  );
}
