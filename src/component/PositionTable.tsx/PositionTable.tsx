import { Position, Asset } from "../../types/types";

interface PositionsTableProps {
  positions: Position[];
  assets: Asset[] | undefined;
}

const PositionsTable = ({ positions, assets }: PositionsTableProps) => {
  function getAssetType(assetName: string): string {
    const found = assets?.find((a) => a.name === assetName);
    return found?.type || "unknown";
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Positions</h1>

      <table className="min-w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-slate-300 px-4 py-2 text-left">
              Asset
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Type
            </th>
            <th className="border border-slate-300 px-4 py-2 text-right">
              Quantity
            </th>
            <th className="border border-slate-300 px-4 py-2 text-right">
              Price
            </th>
            <th className="border border-slate-300 px-4 py-2 text-right">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => {
            const assetType = getAssetType(pos.asset);
            const price = pos.price || 0;
            const value = price * pos.quantity;

            return (
              <tr key={pos.id} className="hover:bg-gray-100">
                <td className="border border-slate-300 px-4 py-2">
                  {pos.asset}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  {assetType}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-right">
                  {pos.quantity}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-right">
                  {price}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-right">
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
