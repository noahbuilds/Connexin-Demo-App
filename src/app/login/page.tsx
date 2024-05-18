"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginProcess, setLoginProcess] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoginProcess(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.status === 401) {
        setError("bad credentials");
        setLoginProcess(false);
      } else {
        localStorage.setItem("token", data.token);
        setLoginProcess(false);
        router.push("/profile");
      }
    } catch (error) {
      setLoginProcess(false);
      console.log(error);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="card card-body m-5" style={{ height: "28rem" }}>
      <h4 className="text-center mb-5"> Login to Connexin Demo App</h4>

      {error ? (
        <div className=" d-flex  justify-content-center bg-danger p-1 text-white rounded text-center">
          <div>{error}</div>
        </div>
      ) : null}
      <form className="" onSubmit={handleLogin}>
        <div className="mb-3 d-flex justify-content-center">
          {" "}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control "
              style={{ width: "30vw" }}
            />
          </label>
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              style={{ width: "30vw" }}
            />
          </label>
        </div>

        {!loginProcess ? (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary mt-3"
              style={{ width: "30vw" }}
              type="submit"
              disabled={!username || !password}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="button"
              disabled
              style={{ width: "30vw" }}
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Processing...
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
