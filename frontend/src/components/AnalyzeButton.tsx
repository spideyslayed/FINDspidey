type AnalyzeButtonProps = {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
};

export default function AnalyzeButton({
  loading,
  disabled,
  onClick,
}: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      className="analyze-button"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <>
          <span className="spinner" />
          Spidey is scanning...
        </>
      ) : (
        <>🔍 Find Bugs</>
      )}
    </button>
  );
}