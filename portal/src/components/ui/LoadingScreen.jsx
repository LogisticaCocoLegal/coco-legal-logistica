import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Carregando">
      <div className="loading-logo">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.2"/>
          <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="2" strokeDasharray="138" strokeDashoffset="100" strokeLinecap="round" className="loading-ring"/>
        </svg>
      </div>
      <p className="loading-text">Coco Legal</p>
    </div>
  )
}
