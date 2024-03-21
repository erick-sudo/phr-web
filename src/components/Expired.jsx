export function Expired({ onCancel = () => {}, onLogin = () => {} }) {
  return (
    <div
      style={{ zIndex: 6 }}
      className="fixed flex items-center justify-center inset-0 bg-gray-300/75"
    >
      <div className="bg-white/50 p-8 rounded-lg border-2 border-emerald-700">
        <h3 className="mb-4">
          Your login session has expired?
          <br />
          Please login again.
        </h3>
        <div className="flex">
          <button
            onClick={onCancel}
            className={`m-2 duration-300 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white rounded-lg block px-8 py-1`}
            type="submit"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className={`m-2 duration-300 bg-emerald-700 hover:bg-emerald-500 text-white rounded-lg block px-8 py-1`}
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
