import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../Helpers/axiosInstance";
import Homelayout from "../Layouts/HomeLayouts";

// ---- Helpers ----
const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-",
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Section({ title, children, subtitle }) {
  return (
    <div className="rounded-2xl bg-gray-900/50 border border-gray-700 p-4 md:p-6 shadow-md">
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-600 px-3 py-1 text-sm text-gray-200 mr-2 mb-2">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full w-5 h-5 grid place-items-center border border-gray-500 hover:bg-gray-700"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  );
}

function TagInput({ label, placeholder, values, setValues }) {
  const [input, setInput] = useState("");

  function addFromInput() {
    const cleaned = input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length);
    if (!cleaned.length) return;
    const next = Array.from(new Set([...(values || []), ...cleaned]));
    setValues(next);
    setInput("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFromInput();
    }
    if (e.key === "Backspace" && !input && values?.length) {
      setValues(values.slice(0, -1));
    }
  }

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      <div className="rounded-xl bg-gray-800 border border-gray-700 p-2">
        <div className="flex flex-wrap">
          {(values || []).map((v, idx) => (
            <Chip key={v + idx} label={v} onRemove={() => setValues(values.filter((x, i) => i !== idx))} />
          ))}
          <input
            className="flex-1 min-w-[200px] bg-transparent outline-none text-gray-100 placeholder-gray-500 p-2"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={addFromInput}
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add</p>
    </div>
  );
}

export default function MedicalHistoryCreate() {
  const navigate = useNavigate();

  // ---- Form State ----
  const [patient, setPatient] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [healthMeter, setHealthMeter] = useState("");

  const [allergies, setAllergies] = useState([]);
  const [pastSurgeries, setPastSurgeries] = useState([]);
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [medications, setMedications] = useState([]);

  // Array of weight entries: { month: '2025-08', weight: '72' }
  const [weights, setWeights] = useState([{ month: "", weight: "" }]);

  // Array of health stats: { name: 'BP', value: '120' }
  const [healthStats, setHealthStats] = useState([{ name: "", value: "" }]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function updateWeightRow(idx, patch) {
    setWeights((rows) => rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  }
  function addWeightRow() {
    setWeights((rows) => [...rows, { month: "", weight: "" }]);
  }
  function removeWeightRow(idx) {
    setWeights((rows) => rows.filter((_, i) => i !== idx));
  }

  function updateStatRow(idx, patch) {
    setHealthStats((rows) => rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  }
  function addStatRow() {
    setHealthStats((rows) => [...rows, { name: "", value: "" }]);
  }
  function removeStatRow(idx) {
    setHealthStats((rows) => rows.filter((_, i) => i !== idx));
  }

  function validate() {
    const e = {};
    if (!patient.trim()) e.patient = "Patient is required";
    if (bloodGroup && !BLOOD_GROUPS.includes(bloodGroup)) e.bloodGroup = "Invalid blood group";

    const num = (x) => (x === "" || x === null || x === undefined ? null : Number(x));
    if (height && (Number.isNaN(num(height)) || Number(num(height)) <= 0)) e.height = "Height must be a positive number";
    if (healthMeter && (Number.isNaN(num(healthMeter)) || Number(num(healthMeter)) < 0)) e.healthMeter = "Health meter must be >= 0";

    // Validate weight rows
    weights.forEach((w, i) => {
      if (!w.month && !w.weight) return; // allow empty row
      if (!w.month) e[`weight_${i}_month`] = "Month is required";
      if (w.weight === "" || Number.isNaN(Number(w.weight)) || Number(w.weight) <= 0) e[`weight_${i}_value`] = "Weight must be > 0";
    });

    // Validate health stat rows
    healthStats.forEach((s, i) => {
      if (!s.name && !s.value) return;
      if (!s.name?.trim()) e[`stat_${i}_name`] = "Name is required";
      if (s.value === "" || Number.isNaN(Number(s.value))) e[`stat_${i}_value`] = "Value must be a number";
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    const toNum = (x) => (x === "" ? undefined : Number(x));

    const weightPayload = weights
      .filter((w) => w.month && w.weight)
      .map((w) => ({ month: w.month, weight: Number(w.weight) }));

    const statPayload = healthStats
      .filter((s) => s.name && s.value !== "")
      .map((s) => ({ name: s.name.trim(), value: Number(s.value) }));

    const payload = {
      allergies,
      pastSurgeries,
      chronicDiseases,
      medications,
      height: toNum(height),
      healthMeter: toNum(healthMeter),
      weight: weightPayload,
      healthStats: statPayload,
      // Only include bloodGroup if selected to avoid enum "" error
      ...(bloodGroup ? { bloodGroup } : {}),
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/medicalrecord/api/v1/create/${encodeURIComponent(patient)}`,
        payload
      );
      console.log("Medical history created:", res?.data);
      toast.success("Medical history created successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Creation failed:", err);
      const msg = err?.response?.data?.message || "Failed to create medical history";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Homelayout>
      <div className="p-4 md:p-6 lg:p-8 text-white max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Create Medical History</h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-3 py-2 rounded-xl border border-gray-600 hover:bg-gray-800"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient & Basics */}
          <Section title="Patient & Basics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient ID / Email <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  placeholder="patient@example.com or ID"
                  className={classNames(
                    "w-full p-2 rounded-xl bg-gray-800 border",
                    errors.patient ? "border-red-500" : "border-gray-700"
                  )}
                  required
                />
                {errors.patient && <p className="text-xs text-red-400 mt-1">{errors.patient}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2 rounded-xl bg-gray-800 border border-gray-700"
                >
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                {errors.bloodGroup && <p className="text-xs text-red-400 mt-1">{errors.bloodGroup}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Height (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g., 172"
                  className={classNames(
                    "w-full p-2 rounded-xl bg-gray-800 border",
                    errors.height ? "border-red-500" : "border-gray-700"
                  )}
                />
                {errors.height && <p className="text-xs text-red-400 mt-1">{errors.height}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Health Meter (score)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={healthMeter}
                  onChange={(e) => setHealthMeter(e.target.value)}
                  placeholder="e.g., 80"
                  className={classNames(
                    "w-full p-2 rounded-xl bg-gray-800 border",
                    errors.healthMeter ? "border-red-500" : "border-gray-700"
                  )}
                />
                {errors.healthMeter && <p className="text-xs text-red-400 mt-1">{errors.healthMeter}</p>}
              </div>
            </div>
          </Section>

          {/* Multi-value text fields as chips */}
          <Section title="Conditions & Medications" subtitle="Add multiple items using Enter or comma; click × to remove.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TagInput label="Allergies" placeholder="e.g., Penicillin, Dust" values={allergies} setValues={setAllergies} />
              <TagInput label="Past Surgeries" placeholder="e.g., Appendectomy" values={pastSurgeries} setValues={setPastSurgeries} />
              <TagInput label="Chronic Diseases" placeholder="e.g., Diabetes" values={chronicDiseases} setValues={setChronicDiseases} />
              <TagInput label="Medications" placeholder="e.g., Metformin 500mg" values={medications} setValues={setMedications} />
            </div>
          </Section>

          {/* Weight Tracker */}
          <Section title="Weight Entries" subtitle="Track patient weight by month.">
            <div className="space-y-3">
              {weights.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-5">
                    <label className="block text-sm text-gray-300 mb-2">Month</label>
                    <input
                      type="month"
                      value={row.month}
                      onChange={(e) => updateWeightRow(idx, { month: e.target.value })}
                      className={classNames(
                        "w-full p-2 rounded-xl bg-gray-800 border",
                        errors[`weight_${idx}_month`] ? "border-red-500" : "border-gray-700"
                      )}
                    />
                    {errors[`weight_${idx}_month`] && (
                      <p className="text-xs text-red-400 mt-1">{errors[`weight_${idx}_month`]}</p>
                    )}
                  </div>
                  <div className="md:col-span-5">
                    <label className="block text-sm text-gray-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={row.weight}
                      onChange={(e) => updateWeightRow(idx, { weight: e.target.value })}
                      placeholder="e.g., 72.5"
                      className={classNames(
                        "w-full p-2 rounded-xl bg-gray-800 border",
                        errors[`weight_${idx}_value`] ? "border-red-500" : "border-gray-700"
                      )}
                    />
                    {errors[`weight_${idx}_value`] && (
                      <p className="text-xs text-red-400 mt-1">{errors[`weight_${idx}_value`]}</p>
                    )}
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button
                      type="button"
                      onClick={addWeightRow}
                      className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-600 hover:bg-gray-800"
                    >
                      + Add
                    </button>
                    {weights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWeightRow(idx)}
                        className="w-full md:w-auto px-3 py-2 rounded-xl border border-red-500 text-red-300 hover:bg-red-950/30"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Health Stats */}
          <Section title="Health Stats" subtitle="Record metric-value pairs (e.g., BP, Pulse, Sugar).">
            <div className="space-y-3">
              {healthStats.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-6">
                    <label className="block text-sm text-gray-300 mb-2">Metric Name</label>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateStatRow(idx, { name: e.target.value })}
                      placeholder="e.g., BP, Pulse, Sugar"
                      className={classNames(
                        "w-full p-2 rounded-xl bg-gray-800 border",
                        errors[`stat_${idx}_name`] ? "border-red-500" : "border-gray-700"
                      )}
                    />
                    {errors[`stat_${idx}_name`] && (
                      <p className="text-xs text-red-400 mt-1">{errors[`stat_${idx}_name`]}</p>
                    )}
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-sm text-gray-300 mb-2">Value</label>
                    <input
                      type="number"
                      step="0.1"
                      value={row.value}
                      onChange={(e) => updateStatRow(idx, { value: e.target.value })}
                      placeholder="e.g., 120"
                      className={classNames(
                        "w-full p-2 rounded-xl bg-gray-800 border",
                        errors[`stat_${idx}_value`] ? "border-red-500" : "border-gray-700"
                      )}
                    />
                    {errors[`stat_${idx}_value`] && (
                      <p className="text-xs text-red-400 mt-1">{errors[`stat_${idx}_value`]}</p>
                    )}
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button
                      type="button"
                      onClick={addStatRow}
                      className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-600 hover:bg-gray-800"
                    >
                      + Add
                    </button>
                    {healthStats.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStatRow(idx)}
                        className="w-full md:w-auto px-3 py-2 rounded-xl border border-red-500 text-red-300 hover:bg-red-950/30"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl border border-gray-600 hover:bg-gray-800"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classNames(
                "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed",
                loading && "animate-pulse"
              )}
              disabled={loading}
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Homelayout>
  );
}
