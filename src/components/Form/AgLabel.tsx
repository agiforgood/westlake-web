import AgPopover from "./AgPopover";

export default function AgLabel({
  label,
  isRequired,
  content,
  description,
}: {
  label: string;
  isRequired?: boolean;
  content?: string;
  description?: string;
}) {
  return (
    <div className="text-sm text-gray-500">
      <span>{label}</span>
      {isRequired && <span className="text-red-500 ml-1 text-xs">*</span>}
      {content && <AgPopover content={content} />}
      <br />
      {description && (
        <span className="text-gray-400 text-xs">{description}</span>
      )}
    </div>
  );
}
