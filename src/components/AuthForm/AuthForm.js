import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../contexts/ErrorContext";
import "./AuthForm.css";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function AuthForm({ pathname }) {
  const [localError, setLocalError] = useState({});
  const [passClass, setPassClass] = useState("label-passive");
  const [mailClass, setMailClass] = useState("label-passive");
  const [rePassClass, setRePassClass] = useState("label-passive");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailLabel, setEmailLabel] = useState("Въведете електронна поща");
  const [passwordLabel, setPasswordLabel] = useState("Въведете парола");
  const [rePasswordLabel, setRePasswordLabel] = useState(
    "Въведете повторно паролата"
  );

  const { register, login } = useAuth();
  const { error, clearError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    if (error.origin === "client") {
      setLocalError((state) => ({
        msg: error.msg,
        open: true,
      }));
      setTimeout(() => {
        setLocalError((state) => ({
          msg: "Невалидно попълнени данни",
          open: false,
        }));
        clearError("");
      }, 3000);
    } else {
      setLocalError((state) => ({
        msg: "Невалидно попълнени данни",
        open: false,
      }));
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname === "/register") {
      if (
        emailRegex.test(email) &&
        password.length >= 4 &&
        password === rePassword
      ) {
        register(email, password);
      } else {
        setLocalError((state) => ({
          msg: "Невалидно попълнени данни",
          open: true,
        }));
        setTimeout(() => {
          setLocalError((state) => ({
            msg: "Невалидно попълнени данни",
            open: false,
          }));
          clearError();
        }, 3000);
      }
    } else {
      if (emailRegex.test(email) && password.length >= 4) {
        login(email, password);
      } else {
        setLocalError((state) => ({
          msg: "Невалидно попълнени данни",
          open: true,
        }));
        setTimeout(() => {
          setLocalError((state) => ({
            msg: "Невалидно попълнени данни",
            open: false,
          }));
          clearError();
        }, 3000);
      }
    }
  };

  const onChangeEmail = (e) => {
    if (emailRegex.test(e.target.value)) {
      setEmail(e.target.value);
      setEmailLabel("Достоверна електронна поща");
      setMailClass("label-active correct");
    } else {
      setEmail(e.target.value);
      setEmailLabel("Невалидна електронна поща");
      setMailClass("label-active incorrect");
    }
  };
  const onChangePassword = (e) => {
    if (e.target.value.length >= 4) {
      setPassword(e.target.value);
      setPasswordLabel("Достоверна парола");
      setPassClass("label-active correct");
    } else {
      setPassword(e.target.value);
      setPasswordLabel("Твърде кратка парола");
      setPassClass("label-active incorrect");
    }
  };
  const onChangeRePassword = (e) => {
    if (e.target.value === password) {
      setRePassword(e.target.value);
      setRePasswordLabel("Паролата съвпада");
      setRePassClass("label-active correct");
    } else {
      setRePassword(e.target.value);
      setRePasswordLabel("Паролата не съвпада");
      setRePassClass("label-active incorrect");
    }
  };

  return (
    <div className="auth-form-container">
      <form action="" className="auth-form" onSubmit={handleSubmit}>
        <div>
          <br />
          <input
            onChange={onChangeEmail}
            onFocus={(e) => {
              if (e.target.value == "") {
                setMailClass("label-active");
              } else {
                if (emailRegex.test(e.target.value)) {
                  setMailClass("label-active correct");
                } else {
                  setMailClass("label-active incorrect");
                }
              }
            }}
            onBlur={(e) => {
              if (e.target.value == "") {
                setEmailLabel("Въведете електронна поща");
                setMailClass("label-passive");
              }
            }}
            className="input-auth"
            type="text"
            id="email"
            name="email"
            value={email}
          />
          <br />
          <label className={mailClass} htmlFor="email">
            {emailLabel}
          </label>
        </div>
        <div>
          <br />
          <input
            onChange={onChangePassword}
            onFocus={(e) => {
              if (e.target.value == "") {
                setPassClass("label-active");
              } else {
                if (e.target.value.length >= 4) {
                  setPassClass("label-active correct");
                } else {
                  setPassClass("label-active incorrect");
                }
              }
            }}
            onBlur={(e) => {
              if (e.target.value == "") {
                setPasswordLabel("Въведете парола");
                setPassClass("label-passive");
              }
            }}
            className="input-auth"
            type="password"
            id="password"
            name="password"
            value={password}
          />
          <br />
          <label className={passClass} htmlFor="password">
            {passwordLabel}
          </label>
        </div>
        {pathname === "/register" ? (
          <div>
            <br />
            <input
              onChange={onChangeRePassword}
              onFocus={(e) => {
                if (e.target.value === "") {
                  setRePassClass("label-active");
                } else {
                  if (e.target.value === password) {
                    setRePassClass("label-active correct");
                  } else {
                    setRePassClass("label-active incorrect");
                  }
                }
              }}
              onBlur={(e) => {
                if (e.target.value == "") {
                  setRePasswordLabel("Въведете повторно паролата");
                  setRePassClass("label-passive");
                }
              }}
              className="input-auth"
              type="password"
              id="rePassword"
              name="rePassword"
              value={rePassword}
            />
            <br />
            <label className={rePassClass} htmlFor="rePassword">
              {rePasswordLabel}
            </label>
          </div>
        ) : null}
        <br />
        <div className="auth-buttons">
          <div className="button-auth cancel" onClick={() => navigate("/")}>
            Откажи
          </div>
          {pathname === "/register" ? (
            <button type="submit" className="button-auth continue">
              Създай
            </button>
          ) : (
            <button type="submit" className="button-auth continue">
              Вход
            </button>
          )}
        </div>
      </form>
      {error.origin === "client" ? (
        <div className="error-container">
          <div className="auth-form-error-show">{localError.msg}</div>
        </div>
      ) : (
        <div className="error-container">
          <div className="auth-form-error-hide">{localError.msg}</div>
        </div>
      )}
    </div>
  );
}

export default AuthForm;
