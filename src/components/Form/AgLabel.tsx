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
      <div className="flex items-center">
        <span>{label}</span>
        {isRequired && <span className="text-red-500 ml-1 text-xs">*</span>}
        <div className="z-50">{content && <AgPopover content={content} />}</div>
      </div>
      {description && (
        <div className="text-gray-400 text-xs">{description}</div>
      )}
    </div>
  );
}
