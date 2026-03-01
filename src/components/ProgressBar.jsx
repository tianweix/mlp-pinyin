import './ProgressBar.css';

export default function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: value + '%' }} />
    </div>
  );
}
