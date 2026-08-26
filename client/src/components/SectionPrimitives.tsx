import type React from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function Metric({
  icon,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="metric-card">
      <span className="metric-icon">{icon}</span>
      <p>{label}</p>
      <b>{value}</b>
      <small>{caption}</small>
    </div>
  );
}
