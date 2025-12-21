import './loader.css'
export default function PageLoader({ status }) {
  return (
    <div id="page-loader">
      <div className="loader-inner">
        <h1>WOLF CHAT</h1>
        <p className="sub-text">Loading...</p>
        <h1 className="neumo-text glow">{status ? status : "by Shivam Kashyap"}</h1>
      </div>
    </div>
  );
}
