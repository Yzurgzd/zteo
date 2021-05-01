export default function LoadingElement() {
  return (
    <div className="container space-1 space-md-2">
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
