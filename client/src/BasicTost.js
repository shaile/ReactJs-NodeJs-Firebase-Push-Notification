import Toast from "react-bootstrap/Toast";
import "bootstrap/dist/css/bootstrap.min.css";

function BasicTost(title, body) {
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

export default BasicTost;
