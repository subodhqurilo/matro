"use client"
import { useState } from "react"
import IShortlisted from "./IShortlisted"
import TheyShortlisted from "./TheyShortlisted"

export default function Page() {
  const [activeTab, setActiveTab] = useState("They Shortlisted")

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-center gap-12 border-b pb-4 mb-6">
        <button
          onClick={() => setActiveTab("They Shortlisted")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeTab === "They Shortlisted" ? "text-[#7D0A0A] font-bold" : "text-gray-500"
          }`}
        >
          They Shortlisted
        </button>
        <button
          onClick={() => setActiveTab("I Shortlisted")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeTab === "I Shortlisted" ? "text-[#7D0A0A] font-bold" : "text-gray-500"
          }`}
        >
          I Shortlisted
        </button>
      </div>

      {activeTab === "They Shortlisted" ? <TheyShortlisted /> : <IShortlisted />}
    </div>
  )
}
