export const FormInput = ({ label, type = 'text', ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} className="form-control" {...props} />
  </div>
);