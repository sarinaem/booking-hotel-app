import { LoaderIcon } from 'react-hot-toast'
function Loader() {
  return (<div
    style={{
      color: "var(--slate-300)",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}
  >
   <p> Loading Data...</p>
    <LoaderIcon style={{ width: "1rem", height: "1rem", }} />
  </div>
  )
}

export default Loader