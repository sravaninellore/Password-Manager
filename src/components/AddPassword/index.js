import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import NoPasswordView from '../NoPasswordView'

import PasswordItem from '../PasswordItem'

import './index.css'

const colors = [
  'light-violet',
  'thick-blue',
  'light-grey',
  'pastel-blue',
  'moody-blue',
  'orange',
  'thick-green',
  'light-red',
  'light-green',
  'thick-red',
  'light-blue',
  'thick-grey',
]

class AddPassword extends Component {
  state = {
    passwordItems: [],
    website: '',
    userName: '',
    password: '',
    searchInput: '',
    isShowPasswordsClicked: false,
  }

  onChangeWebsite = event => this.setState({website: event.target.value})

  onChangeUserName = event => this.setState({userName: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onDeletePasswordItem = passwordItemId => {
    const {passwordItems} = this.state

    const filteredPasswordItems = passwordItems.filter(
      eachPasswordItem => eachPasswordItem.id !== passwordItemId,
    )

    this.setState({passwordItems: filteredPasswordItems})
  }

  showOrHidePasswordItems = () =>
    this.setState(prevState => ({
      isShowPasswordsClicked: !prevState.isShowPasswordsClicked,
    }))

  onSearchWebsite = event => this.setState({searchInput: event.target.value})

  onAddPassword = event => {
    event.preventDefault()

    const {website, userName, password} = this.state

    const sizeOfColorsArray = colors.length

    const randomIndex = Math.ceil(Math.random() * sizeOfColorsArray - 1)

    const profileColorClassName = colors[randomIndex]

    // console.log(profileBackgroundColor)

    const newPasswordItem = {
      id: uuidv4(),
      website,
      userName,
      password,
      profileColorClassName,
    }

    this.setState(prevState => ({
      passwordItems: [...prevState.passwordItems, newPasswordItem],
      website: '',
      userName: '',
      password: '',
    }))
  }

  render() {
    const {
      passwordItems,
      website,
      userName,
      password,
      isShowPasswordsClicked,
      searchInput,
    } = this.state

    const starsImage = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars"
      />
    )

    let passwordHistoryItems = isShowPasswordsClicked
      ? passwordItems
      : passwordItems.map(eachPasswordItem => ({
          ...eachPasswordItem,
          password: starsImage,
        }))

    passwordHistoryItems = passwordHistoryItems.filter(eachPasswordItem =>
      eachPasswordItem.website
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    const passwordItemsCount = passwordHistoryItems.length

    const isPasswordsExist = passwordHistoryItems.length !== 0

    return (
      <div className="bg-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-password-container">
            <div className="password-inputs-container">
              <h1 className="add-password-heading">Add New Password</h1>
              <form onSubmit={this.onAddPassword}>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                  <hr className="hr-line" />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input"
                    value={website}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                  <hr className="hr-line" />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input"
                    value={userName}
                    onChange={this.onChangeUserName}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                  <hr className="hr-line" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="button-align">
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-small-image"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-large-image"
              />
            </div>
          </div>
          <div className="passwords-history-container">
            <div className="history-container-top-view">
              <div className="your-password-heading-and-password-count">
                <h1 className="history-container-heading">Your Passwords</h1>
                <p className="passwords-count"> {passwordItemsCount} </p>
              </div>

              <div className="search-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-icon"
                />
                <hr className="hr-line" />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onSearchWebsite}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="history-section-hr-line" />
            <div className="show-passwords-label-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox-input"
                onClick={this.showOrHidePasswordItems}
              />
              <label htmlFor="checkbox" className="show-passwords-label">
                Show Passwords
              </label>
            </div>
            {!isPasswordsExist && <NoPasswordView />}
            {isPasswordsExist && (
              <ul className="history-items-container">
                {passwordHistoryItems.map(eachPasswordItem => (
                  <PasswordItem
                    key={eachPasswordItem.id}
                    passwordDetails={eachPasswordItem}
                    onDeletePasswordItem={this.onDeletePasswordItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default AddPassword
