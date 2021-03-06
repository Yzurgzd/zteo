export const AlertSoftPrimaryTemplate = ({
  style,
  options,
  message,
  close,
}) => (
  <div style={style} className="alert alert-primary media" role="alert">
    <strong>
      {options.type === "info" && (
        <i className="fas fa-info-circle mt-1 mr-1" />
      )}
      {options.type === "success" && (
        <i className="fas fa-check-circle mt-1 mr-1" />
      )}
      {options.type === "error" && (
        <i className="fas fa-times-circle mt-1 mr-1" />
      )}
    </strong>{" "}
    <div className="media-body" role="alert">
      {message}
    </div>
    <button
      onClick={close}
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <svg
        aria-hidden="true"
        className="mb-0"
        width="14"
        height="14"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
        />
      </svg>
    </button>
  </div>
);
