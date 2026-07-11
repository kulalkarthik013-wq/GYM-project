import React, { useEffect, useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const categoryColors = {
  "Mixed Workout": "#3b82f6",
  "Chest Workout": "#2563eb",
  "Back Workout": "#1d4ed8",
  "Biceps Workout": "#6366f1",
  "Triceps Workout": "#4f46e5",
  "Shoulder Workout": "#64748b",
  "Leg Workout": "#10b981",
  "Cardio Workout": "#f59e0b",
};

const WeeklyProgress = () => {
  const storedUser = localStorage.getItem("gymUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userKey = user?.id ? `workoutLogs_${user.id}` : null;

  const [logs, setLogs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 5;

  // ------------------- LOAD LOGS -------------------
  useEffect(() => {
    if (!userKey) return;

    const loadLogs = () => {
      const storedLogs = JSON.parse(localStorage.getItem(userKey)) || [];

      const cleanedLogs = storedLogs.map((log, index) => {
        const clockIn = log.clockIn || "-";
        const clockOut = log.clockOut || "-";

        let duration = log.hours;

        if ((!duration || duration <= 0) && clockIn !== "-" && clockOut !== "-") {
          try {
            const start = new Date(`${log.date} ${clockIn}`);
            const end = new Date(`${log.date} ${clockOut}`);
            duration = Math.max(0, Math.floor((end - start) / 1000));
          } catch {
            duration = 0;
          }
        }

        return {
          ...log,
          clockIn,
          clockOut,
          hours: duration || 0,
          timestamp:
            log.timestamp ||
            new Date(`${log.date} ${clockIn !== "-" ? clockIn : "00:00"}`).getTime() + index,
        };
      });

      cleanedLogs.sort((a, b) => b.timestamp - a.timestamp);

      console.log("Loading for:", userKey); // 🔍 debug
      setLogs(cleanedLogs);
    };

    loadLogs();
    window.addEventListener("workoutUpdated", loadLogs);

    return () => window.removeEventListener("workoutUpdated", loadLogs);
  }, [userKey]);

  const visibleLogs = showAll ? logs : logs.slice(0, VISIBLE_COUNT);

  // ------------------- FORMAT TIME -------------------
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "-";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

  // ------------------- DELETE -------------------
  const deleteRow = (timestamp) => {
    const updatedLogs = logs.filter(log => log.timestamp !== timestamp);
    setLogs(updatedLogs);
    localStorage.setItem(userKey, JSON.stringify(updatedLogs));
    window.dispatchEvent(new Event("workoutUpdated"));
  };

  // ------------------- CLEAR ALL -------------------
  const clearAllLogs = () => {
    if (!window.confirm("Delete all workout logs?")) return;
    localStorage.removeItem(userKey);
    setLogs([]);
  };

  // ------------------- EXPORT -------------------
  const downloadCSV = () => {
    if (!logs.length) return;

    const headers = ["Date", "Category", "Clock In", "Clock Out", "Duration"];
    const rows = logs.map(log => [
      log.date,
      log.category,
      log.clockIn,
      log.clockOut,
      formatTime(log.hours),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "weekly_progress.csv";
    link.click();
  };

  const downloadPDF = () => {
    if (!logs.length) return;

    const doc = new jsPDF();
    doc.text("Weekly Progress", 14, 20);

    let y = 30;

    logs.forEach((log) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(
        `${log.date} | ${log.category} | ${log.clockIn} | ${log.clockOut} | ${formatTime(log.hours)}`,
        14,
        y
      );

      y += 10;
    });

    doc.save("weekly_progress.pdf");
  };

  const shareSnapshot = async () => {
    const table = document.querySelector(".weekly-progress-container");
    if (!table) return;

    const canvas = await html2canvas(table, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "weekly_progress.png";
    link.click();
  };

  // ------------------- UI -------------------
  return (
    <DashboardLayout>
      <div className="weekly-progress-container">
        <h2>📊 Weekly Progress</h2>

        {!user ? (
          <p style={{ textAlign: "center" }}>
            Please login to view your progress
          </p>
        ) : (
          <>
            <div className="weekly-table-scroll">
              <table className="weekly-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Duration</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleLogs.length ? (
                    visibleLogs.map(log => (
                      <tr key={log.timestamp}>
                        <td>{log.date}</td>

                        <td>
                          <span
                            style={{
                              backgroundColor: categoryColors[log.category] || "#64748b",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              color: "#fff"
                            }}
                          >
                            {log.category}
                          </span>
                        </td>

                        <td>{log.clockIn}</td>
                        <td>{log.clockOut}</td>
                        <td>{formatTime(log.hours)}</td>

                        <td>
                          <button onClick={() => deleteRow(log.timestamp)}>
                            ❌
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No workouts yet 💪 Start training!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {logs.length > VISIBLE_COUNT && (
              <button onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : `Show All (${logs.length})`}
              </button>
            )}

            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <button onClick={downloadCSV}>Download CSV</button>
              <button onClick={downloadPDF}>Download PDF</button>
              <button onClick={shareSnapshot}>Snapshot</button>
              <button onClick={clearAllLogs} style={{ color: "red" }}>
                Clear All
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WeeklyProgress;