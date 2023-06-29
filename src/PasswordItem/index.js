import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePasswordItem} = props
  const {website, userName, password, profileColorClassName} = passwordDetails

  const profile = website.slice(0, 1).toUpperCase()

  const onClickDeleteIcon = () => {
    const {id} = passwordDetails
    onDeletePasswordItem(id)
  }

  return (
    <li className="password-item">
      <div className="password-item-details">
        <p className={`profile ${profileColorClassName}`}>{profile}</p>
        <div>
          <p className="input-text">{website}</p>
          <p className="input-text">{userName}</p>
          <p className="input-text">{password}</p>
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeleteIcon}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
