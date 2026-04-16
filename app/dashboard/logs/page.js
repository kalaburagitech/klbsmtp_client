"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useToast } from "../../../components/ToastProvider";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [emailsSentToday, setEmailsSentToday] = useState(0);
  const { notify } = useToast();

  useEffect(() => {
    api
      .get("/admin/logs")
      .then((res) => {
        setLogs(res.data.logs || []);
        setEmailsSentToday(res.data.emailsSentToday || 0);
      })
      .catch(() => notify("Failed to load logs", "error"));
  }, [notify]);

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-2xl font-semibold">Email Logs</h1>
      <p className="mt-2 text-sm text-slate-300">Emails sent today: {emailsSentToday}</p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3">Organization</th>
              <th className="p-3">To</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Status</th>
              <th className="p-3">Attempts</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-slate-800">
                <td className="p-3">{log.organization?.name || "-"}</td>
                <td className="p-3">{log.email}</td>
                <td className="p-3">{log.subject}</td>
                <td className="p-3">{log.status}</td>
                <td className="p-3">{log.attempts}</td>
                <td className="p-3">{new Date(log.timestamp || log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
