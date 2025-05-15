import { Link, cn } from "@heroui/react";

export default function ProfileAnchor({ className }: { className?: string }) {
  const anchorList = [
    {
      label: "个人基础信息",
      href: "#name",
    },
    {
      label: "专业能力与贡献意向",
      href: "#backgroundDescription",
    },
    {
      label: "价值观与期望连接",
      href: "#motivation",
    },
    {
      label: "联系信息和可参与时间",
      href: "#weekDay",
    },
  ];
  return (
    <nav className={cn("fixed", className)}>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-primary">说明书</div>
        {anchorList.map((item) => (
          <Link className="text-sm" key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
