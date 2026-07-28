import type { Scenario } from "@/lib/onramp/scenarios";

export function ScenarioView({ scenario }: { scenario: Scenario }) {
  return (
    <div className="rounded-lg border border-card-border border-l-4 border-l-success bg-card p-4">
      <h4 className="m-0 mb-2 font-serif text-base text-success">
        {scenario.heading}
      </h4>
      <p className="my-2 text-[14.5px]">{scenario.intro}</p>
      <div className="my-2.5 overflow-x-auto">
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              {scenario.columns.map((col) => (
                <th
                  key={col}
                  className="border border-card-border bg-success-soft px-2.5 py-1.5 text-left font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scenario.rows.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <td
                    key={j}
                    className={`border border-card-border px-2.5 py-1.5 ${
                      j > 0 ? "text-right tabular-nums" : ""
                    } ${row.flagCol === j ? "text-accent font-medium" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="my-2 text-[14.5px]">
        <span className="text-accent font-medium">{scenario.notesLabel}</span>{" "}
        {scenario.notes}
      </p>
      <p className="my-2 text-[14.5px]">
        <strong>Your task:</strong> {scenario.task}
      </p>
    </div>
  );
}
