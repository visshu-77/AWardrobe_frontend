type FormAlertProps = { message: string | null; tone?: "error" | "info" };

export default function FormAlert({ message, tone = "error" }: FormAlertProps) {
  if (!message) return null;
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`mb-4 rounded-md px-3.5 py-2.5 text-[13px] ${
        tone === "error" ? "bg-red-50 text-red-700 ring-1 ring-red-200" : "bg-muted text-foreground"
      }`}
    >
      {message}
    </p>
  );
}
