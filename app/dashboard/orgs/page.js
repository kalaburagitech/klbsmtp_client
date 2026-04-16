"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useToast } from "../../../components/ToastProvider";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState([]);
  const { notify } = useToast();

  useEffect(() => {
    api
      .get("/admin/orgs")
      .then((res) => setOrgs(res.data))
      .catch(() => notify("Failed to load organizations", "error"));
  }, [notify]);

  const selectApiKey = (apiKey) => {
    localStorage.setItem("selectedOrgApiKey", apiKey);
    notify("Organization API key selected for Send Email page");
  };

  const copyApiKey = async (apiKey) => {
    try {
      await navigator.clipboard.writeText(apiKey);
      notify("API key copied");
    } catch {
      notify("Failed to copy API key", "error");
    }
  };

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-2xl font-semibold">Organization List</h1>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Daily Limit</th>
              <th className="p-3">API Key</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((org) => (
              <tr key={org.id} className="border-t border-slate-800">
                <td className="p-3">{org.name}</td>
                <td className="p-3">{org.status}</td>
                <td className="p-3">{org.dailyLimit}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block max-w-[220px] truncate align-middle">{org.apiKey}</span>
                    <button
                      type="button"
                      aria-label="Copy API key"
                      title="Copy API key"
                      className="rounded border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800"
                      onClick={() => copyApiKey(org.apiKey)}
                    >
                      📋
                    </button>
                  </div>
                </td>
                <td className="p-3">
                  <button
                    className="rounded border border-slate-700 px-3 py-1"
                    onClick={() => selectApiKey(org.apiKey)}
                    type="button"
                  >
                    Use for testing
                  </button>
                </td>
              </tr>
            ))}
            {orgs.length === 0 && (
              <tr>
                <td className="p-4 text-slate-300" colSpan={5}>
                  No organizations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
