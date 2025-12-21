"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
// import crypto from 'crypto';

export default function EntryPage() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const TempID = localStorage.getItem("WF_sessionId");
    if (TempID) {
      router.replace("/chat");
      return;
    }
  }, [router])

  const handleSubmit = () => {
    setSubmitting(true);
    if (!gender || gender === "") {
      setSubmitting(false);
      setError("!please select Gender");
      return;
    };
    setError("")
    setSuccess("Redirecting...");
    setTimeout(() => {
      const sessionID = `ano-${gender}-${crypto.randomUUID()}`;
      localStorage.setItem("WF_sessionId", sessionID);
      router.push("/chat")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-xl">
        {/* Title */}
        <h1 className="text-center text-3xl font-semibold">
          Wolf Chat
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Anonymous • Global • Live
        </p>

        {/* Inputs */}
        <div className="mt-10 space-y-6">

          {error && !isSubmitting && (
            <p className="text-center text-red-300">{error}</p>
          )}
          {success && isSubmitting && (
            <p className="text-center text-green-400">{success}</p>
          )}

          <label htmlFor="gender">Select Gender</label>
          <div className="flex items-center gap-4 rounded-full bg-gray-100 px-6 py-4">
            <FiUser className="text-xl text-gray-400 shrink-0" />
            <select id="gender" className="w-100" onChange={(e) => isSubmitting ? setSuccess(false) : setGender(e.target.value)}>
              <option>select</option>
              <option value="girl">Girl</option>
              <option value="boy">Boy</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            onClick={() => handleSubmit()}
            className="
              w-full
              rounded-full
              bg-blue-600
              py-4
              text-base
              font-medium
              text-white
              transition
              hover:bg-blue-500
              active:scale-[0.98]
              disabled
            " disabled={isSubmitting}>
            Start Chat
          </button>

        </div>
      </div>
    </div>
  );
}
