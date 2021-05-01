export default function EmptyStateElement() {
  return (
    <div className="text-center space-1">
      <img
        className="avatar avatar-xl mb-3"
        src="/assets/svg/components/empty-state-no-data.svg"
        alt="Image Description"
      />
      <p className="card-text">No data to show</p>
      <a className="btn btn-sm btn-white" href="#">
        За покупками
      </a>
    </div>
  );
}
