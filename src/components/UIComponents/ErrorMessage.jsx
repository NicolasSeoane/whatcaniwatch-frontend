
export const ErrorMessage = ({
  message = "Unexpected error.",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl bg-neutral-900/50 text-gray-200 ${className}`}
    >
      <p className="text-xl font-medium">{message}</p>

    </div>
  );
};